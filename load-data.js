/**
 * Script to Load Data from JSON file to the MongoDB Database via the ORM
 * Alternatively, we can load it directly from the MongoDB Compass GUI
 * That results in loss of Schema Validation as it is not defined.
 */

import { config } from "dotenv";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import Tours from "./models/Tours.js";

config();

const DB_URL = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB_URL).then(()=>{
	console.log("Connected To Database");
});

const fileData = JSON.parse(readFileSync("./data/tours.json", "utf-8"));

await Tours.create(fileData);

// The Create Method takes as much documents as possible in the parameters, as an array
// We can supply multiple documents into it at once