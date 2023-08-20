const mysql = require("mysql2");
const pool = require("../sql/connections");
const { handleSQLError } = require("../sql/error");

const getUserProfileWithVehicles = (req, res) => {
  let sql =
    "SELECT `first_name`, `last_name`, `username`, `vin`, `mileage` FROM users LEFT JOIN usersVehicles ON users.id = usersVehicles.user_id WHERE users.id = ?";
  sql = mysql.format(sql, [req.user.id]);
  console.log(req.user.id);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getUserById = (req, res) => {
  let sql = "SELECT * FROM users WHERE id = ?";
  sql = mysql.format(sql, [req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const updateUserProfile = (req, res) => {
  let sql =
    "UPDATE users SET `first_name` = COALESCE(?, `first_name`), `last_name` = COALESCE(?, `last_name`), `username` = COALESCE(?, `username`) WHERE `id` = ?";
  sql = mysql.format(sql, [
    req.body.first_name,
    req.body.last_name,
    req.body.username,
    req.user.id,
  ]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

const updateUserById = (req, res) => {
  let sql =
    "UPDATE users SET `first_name` = ?, `last_name` = ?  `username` = ?, `pwd` = ?, WHERE id = ? ";

  sql = mysql.format(sql, [
    req.body.first_name,
    req.body.last_name,
    req.body.username,
    req.body.password,
    req.params.id,
  ]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

module.exports = {
  getUserProfileWithVehicles,
  getUserById,
  updateUserById,
  updateUserProfile,
};
