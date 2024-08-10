const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const todos = require("./model/todo.js");
const methodOverride = require("method-override");

app.use(methodOverride('_method'));

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Connection to database
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todo");
    console.log("Connection successful");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit the process if there's a database connection error
  }
}

main();

// Index route
app.get("/job", async (req, res) => {
  try {
    const alljob = await todos.find();
    res.render("index", { alljob });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).send("Error fetching jobs");
  }
});

// New job form route
app.get("/job/new", (req, res) => {
  res.render("new.ejs");
});

// Create job route
app.post("/job", async (req, res) => {
  const { njob } = req.body;

  try {
    const newjob = new todos({
      job: njob
    });

    await newjob.save();
    console.log("Job was saved...");
    res.redirect("/job");
  } catch (err) {
    console.error("Error saving job:", err);
    res.status(500).send("Error saving job");
  }
});

// Delete route
app.delete("/job/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await todos.findByIdAndDelete(id);
    if (deletedJob) {
      console.log("Deleted job:", deletedJob);
      res.redirect("/job");
    } else {
      res.status(404).send("Job not found");
    }
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).send("Error deleting job");
  }
});

// Port
app.listen(8080, () => {
  console.log("App is listening on port 8080");
});
