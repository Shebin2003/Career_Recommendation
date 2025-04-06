const cors = require("cors");
const config = require("./config/config");
const express = require("express");
const session = require("express-session");

const app = express();
const port = config.PORT;


app.use(express.json()); // Parses JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded payloads

app.use(cors({
    origin: "http://localhost:3000", // React frontend URL
    credentials: true // Allow sending cookies
}));


app.use(
  session({
      secret: process.env.SESSION_SECRET || "CareerGoSession",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false, httpOnly: true,sameSite: "lax", maxAge: 1000 * 60 * 60 } // 1-hour session
  })
);

// This order matters
const userRoute = require("./routes/index");
app.use("/", userRoute);

const createTable = require("./models/initDb");
createTable();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
