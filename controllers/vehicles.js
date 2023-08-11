const { application } = require("express");
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
  sql = mysql.format(sql, [req.user.id]);
  console.log(req.user.id);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createVehicle = (req, res) => {
  let sql =
    "INSERT INTO usersVehicles (`user_id`, `vin`, `mileage`) VALUES (?,?,?)";

  sql = mysql.format(sql, [req.body.user_id, req.body.vin, req.body.mileage]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

const updateVehicle = (req, res) => {
  let sql = "UPDATE usersVehicles SET `vin` = ?, `mileage` = ?, WHERE id = ? ";
  sql = mysql.format(sql, [brand, model, year, vin]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

// ADD DELETE METHOD

const deleteVehicleByVin = (req, res) => {
  let sql = "DELETE FROM usersVehicles WHERE vin = ?";
  sql = mysql.format(sql, [req.params.vin]);

  pool.query(sql, req.params.vin, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  });
};

module.exports = {
  getAllVehicles,
  getVehiclesByUserId,
  createVehicle,
  updateVehicle,
  deleteVehicleByVin,
};
