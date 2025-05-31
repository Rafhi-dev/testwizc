require("dotenv").config();
const express = require("express");
const cors = require("cors");
const crudRoutes = require("./src/crud/routes/crud.route");
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json({limit:'10kb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "*", // Allow all origins
  methods: "HEAD,PUT,PATCH,POST,DELETE", // Allow specific HTTP methods
  allowedHeaders: "Content-Type, Authorization", // Allow specific headers
}));

// Set up the routes for CRUD operations
app.use("/api/", crudRoutes);

// default route
app.get("/", (req, res) => {
  res.send("API is ready to use...");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}..`);
});
