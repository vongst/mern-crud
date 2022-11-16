const express = require("express");
const authRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();
process.env.TOKEN_SECRET;

authRoutes.route("/auth").post(function (req, res) {
  console.log("authRoutes /auth POST " + JSON.stringify(req.body));

  const submitted_hash = crypto
    .createHmac("sha256", process.env.SHA256_SALT)
    .update(req.body.password)
    .digest("hex");

  let db_connect = dbo.getDb();
  db_connect
    .collection("admin_users")
    .findOne({ username: req.body.username }, function (err, result) {
      if (err) {
        throw err;
      } else if (result.hash == submitted_hash) {
        const token = jwt.sign(
          {
            username: req.body.username,
          },
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          { expiresIn: "1800s" }
        );
        res.status(200).json({ token: token, username: req.body.username });
      } else {
        res.status(401).json({ error: "no user" });
      }
    });
});

module.exports = authRoutes;
