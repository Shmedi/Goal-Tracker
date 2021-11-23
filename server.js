const express = require("express");
const cors = require("cors");
const pool = require("./db");
const path = require("path");

const PORT = process.env.PORT || 4000;

const api = express();

//middleware
api.use(express.urlencoded({ extended: true }));
api.use(express.json());
api.use(cors());

if (process.env.NODE_ENV === "production") {
  api.use(express.static(path.join(__dirname, "../client/build")));
}

//catch all function to redirect to the homepage if the path does not exist
api.get("*", cors(), (request, response) => {
  response.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// listen for API at the given port
api.listen(PORT, () => {
  console.log(`API running at PORT: ${PORT}`);
});
