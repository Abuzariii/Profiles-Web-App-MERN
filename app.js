const express = require("express");
const app = express();
const router = require("./routes/router");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(router);

app.use("/uploads", express.static("./uploads"));

// Start Express Server
app.listen(process.env.PORT, () => {
  console.log(
    `Server started at port: ${process.env.PORT}, waiting for Database connection...`
  );
});

// Connect to Database
const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.MONGO_URL;

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.log("error" + err.message));
