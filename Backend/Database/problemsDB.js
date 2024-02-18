const mongoose = require("mongoose");


const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  difficulty: String,
  acceptance_rate: String,
  companies: String,
  related_topics: String,
});

const Problems = mongoose.model("Test", ProblemSchema, "Test");

module.exports = {
  Problems,
};

