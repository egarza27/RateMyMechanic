require("dotenv").config();
const express = require("express");
const usersRouter = require("./routes/users");
const vehiclesRouter = require("./routes/vehicles");
const authRouter = require("./routes/auth");
const http = require("http");

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

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.API_KEY}`,
        "Partner-Token": process.env.PARTNER_TOKEN,
      },
    };

    http.get(apiUrl, options, (responseFromExternalAPI) => {
      let data = "";

      responseFromExternalAPI.on("data", (chunk) => {
        data += chunk;
      });

      responseFromExternalAPI.on("end", () => {
        console.log(
          `API request successful for VIN: ${vin}, Mileage: ${mileage}`
        );
        const responseData = JSON.parse(data);
        console.log("Received data from external service:", responseData);
        res.json(responseData);
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/", (req, res) => res.send("Welcome to my API!"));

app.listen(port, () => console.log(`App listening on port ${port}!`));
