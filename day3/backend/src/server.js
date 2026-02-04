const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const morgan = require("morgan");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
}
app.use(logger);

const urlStorage = new Map();

function isValidUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function newId(length = 6) {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length);
}

function shortUrl(req, id) {
  return `${req.protocol}://${req.get("host")}/${id}`;
}

function valideteNewUrl(req, res, next) {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res(400).json({ erro: "original Url is required" });
  }
  if (!isValidUrl(originalUrl)) {
    return res
      .status(400)
      .json({ error: "original url must be a valid URL http or https" });
  }
  next();
}

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/urls", valideteNewUrl, (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    let id;
    do {
      id = generateId(6);
    } while (urlStorage.has(id));
    const saveUrl = {
      id,
      originalUrl,
      shUrl: shortUrl(req, id),
      createdAt: new Date().toISOString(),
      clickCount: 0,
    };
    urlStorage.set(id, record);

    return res.status(201).json(saveUrl);
  } catch (err) {
    next(err);
  }
});
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: "server error",
  });
});
app.listen(port, "0.0.0.0", () => {
  console.log("server is online ! ");
});
module.exports = app;
