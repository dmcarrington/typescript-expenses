let mongoose = require("mongoose");
import "dotenv/config";

// connect to mongo, for now on our local docker network
const mongoURI = process.env.MONGO_CONNECTION_STRING;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to mongo 🌳: " + mongoURI));

let expenseSchema = new mongoose.Schema({
  originatorName: String, // username of the claimant
  description: String, // Description of this expense claim
  amount: Number, // amount of this claim
  dateSubmitted: Date,
});

// Instantiate expense schema
let expense = mongoose.model("expenses", expenseSchema);

// getReportByUser gets all reports belonging to the given user
export async function getReportsByUser(username: String) {
  return await expense.find({originatorName: username},{"_id":0, "__v":0})
}

// addReport creates an expense report for the given user with provided description and amount
export async function addReport(username: String, description: String, amount: Number) {
  return await expense.create({originatorName: username, description: description, amount: amount, dateSubmitted: new Date()})
}
