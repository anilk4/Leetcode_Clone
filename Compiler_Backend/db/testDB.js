const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  // Common fields for all languages
  initial_code: { type: String, required: true },
  user_code: { type: String, required: true },
});

const testSchema = new mongoose.Schema({
  result_id: { type: Number, required: true },
  cpp: solutionSchema,
  java: solutionSchema,
  py: solutionSchema,
  js: solutionSchema,
  output: { type: [[Number]], required: true }, 
});

const Test = mongoose.model('Test', testSchema,'test');

module.exports = Test;
