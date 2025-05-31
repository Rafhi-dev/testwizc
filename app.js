require("dotenv").config();
const express = require("express");
const cors = require("cors");
const crudRoutes = require("./src/crud/routes/crud.route");
const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/", crudRoutes);

app.get("/", (req, res) => {
  res.send("API ready.");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}..`);
});
