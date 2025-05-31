require("dotenv").config();
const express = require("express");
const cors = require("cors");
const crudRoutes = require("./src/crud/routes/crud.route");
const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Set up the routes for CRUD operations
app.use("/api/", crudRoutes);

// default route
app.get("/", (req, res) => {
  res.send("API is ready to use...");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}..`);
});
