/**
 * Script to Load Data from JSON file to the MongoDB Database via the ORM
 * Alternatively, we can load it directly from the MongoDB Compass GUI
 * That results in loss of Schema Validation as it is not defined.
 */

import { config } from "dotenv";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import Tours from "../models/Tours.js";
import Users from "../models/Users.js";
import Reviews from "../models/Reviews.js";

config();

const DB_URL = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB_URL).then(()=>{
	console.log("Connected To Database");
});

const loadData = async (model, fileName)=>{
	let fileData = JSON.parse(readFileSync(fileName, "utf-8"));
	fileData.forEach(e => delete e._id);
	await model.create(fileData);
}

await loadData(Tours, "./data/tours-full.json");
await loadData(Users, "./data/users.json");
await loadData(Reviews, "./data/reviews.json");

// The Create Method takes as many documents as possible in the parameters, as an array
// We can supply multiple documents into it at once