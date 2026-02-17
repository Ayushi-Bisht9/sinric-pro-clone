const express = require("express");
const cors = require("cors");
const db = require("./db");

const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

/* =====================
   MIDDLEWARE
   ===================== */

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,   // 🔥 IMPORTANT
  })
);



app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret: "sinric_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true only in production HTTPS
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);


/* =====================
   HEALTH CHECK
   ===================== */

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

/* =====================
   REGISTER API
   ===================== */

app.post("/register", (req, res) => {
  console.log("👉 REGISTER API HIT");

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  // Check if user already exists
  const checkSql = "SELECT * FROM users WHERE email = ?";

  db.query(checkSql, [email], (err, rows) => {
    if (err) {
      console.error("❌ DB ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Insert new user
    const insertSql = "INSERT INTO users (email, password) VALUES (?, ?)";

    db.query(insertSql, [email, password], (err, result) => {
      if (err) {
        console.error("❌ INSERT ERROR:", err);
        return res.status(500).json({ message: "Insert failed" });
      }

      console.log("✅ User registered:", email);

      res.json({
        message: "Account created successfully",
        userId: result.insertId,
      });
    });
  });
});

/* =====================
   LOGIN API
   ===================== */

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = {
      u_id: rows[0].u_id,
      email: rows[0].email,
    };

    // 🔥 CREATE SESSION
    req.session.user = user;

    res.json({
      message: "Login successful",
      user,
    });
  });
});


app.get("/me", (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  }

  res.status(401).json({ message: "Not authenticated" });
});


app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid"); // remove session cookie
    res.json({ message: "Logged out successfully" });
  });
});




/* =====================
   GET USERS (for testing)
   ===================== */

app.get("/users", (req, res) => {
  db.query("SELECT u_id, email FROM users", (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    res.json(rows);
  });
});


/* =====================
   GET USER DEVICES
===================== */

app.get("/devices/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = "SELECT * FROM devices WHERE user_id = ?";

  db.query(sql, [userId], (err, rows) => {
    if (err) {
      console.error("❌ DEVICE FETCH ERROR:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(rows);
  });
});


app.post("/devices", (req, res) => {
  const { user_id, name, type, room } = req.body;

  const sql = "INSERT INTO devices (user_id, name, type, room, status, isOn) VALUES (?, ?, ?, ?, 'online', false)";

  db.query(sql, [user_id, name, type, room], (err, result) => {
    if (err) return res.status(500).json({ message: "Insert failed" });

    res.json({ message: "Device added" });
  });
});


app.put("/devices/:id", (req, res) => {
  const { id } = req.params;
  const { isOn, brightness, speed, temperature } = req.body;
  const sql = `
    UPDATE devices 
    SET 
      isOn = ?, 
      brightness = ?, 
      speed = ?, 
      temperature = ?
    WHERE d_id = ?
  `;
  db.query(
    sql,
    [
      isOn ? 1 : 0,
      brightness ?? null,
      speed ?? null,
      temperature ?? null,
      parseInt(id)
    ],
    (err) => {
      if (err) {
        console.error("❌ DEVICE UPDATE ERROR:", err);
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: "Device updated successfully" });
    }
  );
});


app.put("/scene_devices/:sceneId", async (req, res) => {
  const { sceneId } = req.params;
  const { devices } = req.body;

  try {
    await new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM scene_devices WHERE scene_id = ?",
        [sceneId],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    for (const device of devices) {
      await new Promise((resolve, reject) => {
        db.query(
          `
          INSERT INTO scene_devices
          (scene_id, device_id, isOn, brightness, speed, temperature)
          VALUES (?, ?, ?, ?, ?, ?)
          `,
          [
            sceneId,
            device.device_id,
            device.isOn ? 1 : 0,
            device.brightness ?? null,
            device.speed ?? null,
            device.temperature ?? null
          ],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    }

    res.json({ message: "Scene devices updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});



app.get("/scenes/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = "SELECT * FROM scenes WHERE user_id = ?";

  db.query(sql, [userId], (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(rows);
  });
});

app.post("/scenes", (req, res) => {
  const { user_id, name, icon, description } = req.body;

  const sql = "INSERT INTO scenes (user_id, name, icon, description) VALUES (?, ?, ?, ?)";

  db.query(sql, [user_id, name, icon, description], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error" });

    res.json({ message: "Scene created", s_id: result.insertId });
  });
});


app.post("/scene_devices/bulk", async (req, res) => {
  const { scene_id, devices } = req.body;

  try {
    for (const device of devices) {
      await new Promise((resolve, reject) => {
        db.query(
          `
          INSERT INTO scene_devices 
          (scene_id, device_id, isOn, brightness, speed, temperature)
          VALUES (?, ?, ?, ?, ?, ?)
          `,
          [
            scene_id,
            device.device_id,
            device.isOn ? 1 : 0,
            device.brightness ?? null,
            device.speed ?? null,
            device.temperature ?? null
          ],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    }

    res.json({ message: "All scene devices saved correctly" });

  } catch (err) {
    console.error("Bulk insert error:", err);
    res.status(500).json({ message: "Scene device save failed" });
  }
});
c


app.put("/scenes/activate/:sceneId", (req, res) => {
  const { sceneId } = req.params;

  const sql = `
    SELECT * FROM scene_devices WHERE scene_id = ?
  `;

  db.query(sql, [sceneId], (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error" });

    rows.forEach(device => {
      const updateSql = `
        UPDATE devices
        SET isOn = ?, brightness = ?, speed = ?, temperature = ?
        WHERE d_id = ?
      `;

      db.query(updateSql, [
        device.isOn,
        device.brightness,
        device.speed,
        device.temperature,
        device.device_id
      ]);
    });

    res.json({ message: "Scene activated" });
  });
});


app.post("/scenes/:id/activate", (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM scene_devices WHERE scene_id = ?",
    [id],
    (err, sceneDevices) => {
      if (err) return res.status(500).json({ message: "DB error" });

      if (sceneDevices.length === 0)
        return res.status(404).json({ message: "Scene empty" });

      sceneDevices.forEach(sd => {
        db.query(
          `UPDATE devices 
           SET isOn = ?, brightness = ?, speed = ?, temperature = ?
           WHERE d_id = ?`,
          [
            sd.isOn,
            sd.brightness ?? null,
            sd.speed ?? null,
            sd.temperature ?? null,
            sd.device_id
          ]
        );
      });

      res.json({ message: "Scene activated successfully" });
    }
  );
});



app.delete("/scenes/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM scenes WHERE s_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ message: "Delete failed" });
    }

    res.json({ message: "Scene deleted successfully" });
  });
});


app.put("/scenes/:id", (req, res) => {
  const { id } = req.params;
  const { name, icon, description } = req.body;

  const sql = `
    UPDATE scenes
    SET name = ?, icon = ?, description = ?
    WHERE s_id = ?
  `;

  db.query(sql, [name, icon, description, id], (err) => {
    if (err) {
      console.error("Update failed:", err);
      return res.status(500).json({ message: "Update failed" });
    }

    res.json({ message: "Scene updated successfully" });
  });
});




/* ===================== */

app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});
