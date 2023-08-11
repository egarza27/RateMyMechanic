const mysql = require("mysql2");
const pool = require("../sql/connections");
const { handleSQLError } = require("../sql/error");

const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

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

const createUser = (req, res) => {
  let sql =
    "INSERT INTO users (`first_name`, `last_name`,  `username`, `pwd`) VALUES (?,?, ?, ?)";

  sql = mysql.format(sql, [
    req.body.first_name,
    req.body.last_name,
    req.body.username,
    req.body.password,
  ]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
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

const deleteUserByFirstName = (req, res) => {
  let sql = "DELETE FROM users WHERE first_name = ?";
  sql = mysql.format(sql, [req.params.first_name]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  });
};

module.exports = {
  getAllUsers,
  getUserProfileWithVehicles,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName,
};
