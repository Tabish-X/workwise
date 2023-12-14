// ***** IMPORTS
require("dotenv").config({ path: "config.env" });
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const CorsOptions = require("./config/corsOptions");

const { PORT, MONGO_URI } = require("./constant/constant");

const app = express();

// **** MIDDLEWARES
app.use(cors(CorsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// **** ROUTES
app.use("/public", express.static(__dirname + "/public")); // public route
app.use("/auth", require("./routes/auth")); // auth route
app.use("/profile", require("./routes/profile")); // profile route
app.use("/posts", require("./routes/posts")); // posts route
app.use("/users", require("./routes/users")); // users route
app.use("/", require("./routes/index")); // index route

// **** SERVER STARTING
const server = (message) => {
  return app.listen(PORT, () => {
    console.log(`server has been started on port ${PORT}`);
    console.log(message);
  });
};

// **** MONGODB CONNECTION
mongoose
  .connect(MONGO_URI)
  .then(() => {
    server("mongodb has been connected with server");
  })
  .catch((error) => {
    console.log({ ERROR: error.message });
  });
