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

app.get("/api/proxy", async (req, res) => {
  try {
    const { vin, mileage } = req.query;

    if (!vin || !mileage) {
      console.error("Invalid parameters: vin or mileage missing");
      return res.status(400).json({ error: "Vin and mileage required" });
    }

    console.log(
      `Making API request to external service for VIN: ${vin}, Mileage: ${mileage}`
    );

    const apiUrl = `http://api.carmd.com/v3.0/maint?vin=${vin}&mileage=${mileage}`;
    const response = await fetch(apiUrl, {
      headers: {
        "content-type": "application/json",
        authorization: `Basic ${process.env.API_KEY}`,
        "partner-token": process.env.PARTNER_TOKEN,
      },
    });

    console.log(`API request successful for VIN: ${vin}, Mileage: ${mileage}`);

    const data = await response.json();
    console.log("Received data from external service:", data);

    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/", (req, res) => res.send("Welcome to my API!"));

app.listen(port, () => console.log(`App listening on port ${port}!`));
