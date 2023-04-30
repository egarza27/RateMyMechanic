const mysql = require("mysql2");
const pool = require("../sql/connections");
const { handleSQLError } = require("../sql/error");

const getAllVehicles = (req, res) => {
  pool.query("SELECT * FROM usersVehicles", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getVehiclesByUserId = (req, res) => {
  let sql = "SELECT * FROM usersVehicles WHERE user_id = ?";
  sql = mysql.format(sql, [req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createVehicle = (req, res) => {
  const { brand, model, year, vin } = req.body;
  let sql =
    "INSERT INTO usersVehicles (brand, model, year, vin) VALUES (?, ?, ?, ?)";
  sql = mysql.format(sql, [brand, model, year, vin]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

const updateVehicle = (req, res) => {
  const { brand, model, year, vin } = req.body;
  let sql =
    "UPDATE usersVehicles SET brand = ?, model = ?, year = ?,  vin = ? WHERE user_id = ?";
  sql = mysql.format(sql, [brand, model, year, vin]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

// ADD DELETE METHOD

module.exports = {
  getAllVehicles,
  getVehiclesByUserId,
  createVehicle,
  updateVehicle,
};
