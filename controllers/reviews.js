const mysql = require("mysql2");
const pool = require("../sql/connections");
const { handleSQLError } = require("../sql/error");

const getReviewByUserId = (req, res) => {
  let sql = "SELECT * FROM usersReviews WHERE user_id = ?";
  sql = mysql.format(sql, [req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createReview = (req, res) => {
  let sql =
    "INSERT INTO usersReviews (`location`, `stars`, `reccomend`, `comment`) VALUES (?,?,?,?)";

  sql = mysql.format(sql, [
    req.body.location,
    req.body.stars,
    req.body.reccomend,
    req.body.comment,
  ]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

module.exports = {
  getReviewByUserId,
  createReview,
};
