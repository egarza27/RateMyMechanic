const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../sql/connections");
const { handleSQLError } = require("../sql/error");

// for bcrypt
const saltRounds = 10;

const signup = (req, res) => {
  const { first_name, last_name, username, password } = req.body;

  let sql =
    "INSERT INTO users (`first_name`, `last_name`,  `username`, `pwd`) VALUES (?,?, ?, ?)";

  bcrypt.hash(password, saltRounds, function (err, hash) {
    sql = mysql.format(sql, [first_name, last_name, username, hash]);

    pool.query(sql, (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(409).send("Username is taken");
        return handleSQLError(res, err);
      }
      return res.send("Sign-up successful");
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  let sql = "SELECT * FROM users WHERE username = ?";
  sql = mysql.format(sql, [username]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    if (!rows.length) return res.status(404).send("No matching users");

    const hash = rows[0].pwd;
    bcrypt.compare(password, hash).then((result) => {
      if (!result) return res.status(400).send("Invalid password");

      const data = { ...rows[0] };
      data.pwd = "REDACTED";

      const token = jwt.sign(data, process.env.JWTSECRET);
      res.json({
        msg: "Login successful",
        token,
      });
    });
  });
};

module.exports = {
  signup,
  login,
};
