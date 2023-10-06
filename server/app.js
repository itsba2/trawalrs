import fs from "fs";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import fileUpload from "express-fileupload";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

import walrRoutes from "./routes/walrs.js";
import authRoutes from "./routes/auth.js";
import { initializePassport } from "./passport-config.js";

// ENV
config();
const DB_URL = process.env.DB_URL;
const API_PORT = process.env.API_PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_COOKIE_MAX_AGE = process.env.SESSION_COOKIE_MAX_AGE;
const MONGO_STORE_MAX_AGE = process.env.MONGO_STORE_MAX_AGE;
const cwd = process.cwd();
const UPLOAD_DIR = process.env.UPLOAD_DIR;

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Access LOG middleware
const accessLogStream = fs.createWriteStream(`${cwd}\\access.log`);

app.use(morgan("tiny", { stream: accessLogStream }));

// CORS config
app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// File upload middleware
app.use(fileUpload());

// Session
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: parseInt(SESSION_COOKIE_MAX_AGE, 10),
    },
    store: MongoStore.create({
      mongoUrl: DB_URL,
      ttl: parseInt(MONGO_STORE_MAX_AGE, 10),
    }),
  })
);

// Passport middleware
initializePassport();

app.use(passport.initialize());
app.use(passport.session());

// Create directory to upload photos
if (!fs.existsSync(`${cwd}\\${UPLOAD_DIR}\\`)) {
  fs.mkdirSync(`${cwd}\\${UPLOAD_DIR}\\`);
}

app.use(express.static(UPLOAD_DIR));

// Routes
app.use("/auth", authRoutes);
app.use(
  "/walrs",
  (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).json({ message: "Please log in to continue." });
    }
  },
  walrRoutes
);

// MongoDB connection
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log(`MongoDB connected successfully to ${DB_URL}.`);
  })
  .catch((error) => {
    console.error(error);
  });

app.listen(API_PORT, () => {
  console.log(`Server is listening on port ${API_PORT}`);
});
