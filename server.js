const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const path = require("path");
const cookieParser = require("cookie-parser");
const connection = require("./database/index");
const expressLayouts = require("express-ejs-layouts");

// Middleware
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "*" }));
connection();

app.use("/api/workers", require("./router/workerRouter"));

server.listen(3000, () => {
  console.log("Server is running");
});
