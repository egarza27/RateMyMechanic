require("dotenv").config();
const express = require("express");
const usersRouter = require("./routes/users");
const vehiclesRouter = require("./routes/vehicles");
const authRouter = require("./routes/auth");

const cors = require("cors");

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/vehicles", vehiclesRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => res.send("Welcome to my API!"));

app.listen(port, () => console.log(`App listening on port ${port}!`));
