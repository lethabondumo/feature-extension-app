var createError = require("http-errors");
const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const cleanersRouter = require("./routes/cleaners");
const clientsRouter = require("./routes/clients");
const bookingsRouter = require("./routes/bookings");

var app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/cleaners", cleanersRouter);
app.use("/api/clients", clientsRouter);
app.use("/api/bookings", bookingsRouter);

module.exports = app;
