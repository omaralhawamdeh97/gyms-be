const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { localStrategy } = require("./middlewares/passport");
const { jwtStrategy } = require("./middlewares/passport");
const path = require("path");
const app = express();
const usersRouter = require("./routes/users");
const gymsRouter = require("./routes/gyms");
const typesRouter = require("./routes/types");

// Middlewares
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
passport.use(jwtStrategy);
passport.use(localStrategy);

// Routes
app.use(usersRouter);
app.use("/types", typesRouter);
app.use("/gyms", gymsRouter);
app.use("/media", express.static("media"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
