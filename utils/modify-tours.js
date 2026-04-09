// Fuck MongoDB
// It is making me write this shitty script to modify its ObjectIds because it is too impotent to take it on its own

import mongoose from "mongoose";
import Tours from "../models/Tours.js";
import { config } from "dotenv";

config();

const DB_URL = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB_URL).then(()=>{
	console.log("Connected To Database");
});

const guides = ["69d7b98059d4ab8ac4d139dc", "69d7b98059d4ab8ac4d139dd", "69d7b98059d4ab8ac4d139e4", "69d7b98059d4ab8ac4d139de"];

const get2Random = () => {
	const arr = [];
	for(let i=0;i<2;i++){
		arr.push(guides[Math.round(Math.random() * 100) % guides.length]);
	}

	return arr;
} 

const allTours = await Tours.find();

allTours.forEach(async (el)=>{
	await Tours.findByIdAndUpdate(el.id, {
		guides: get2Random()
	});
});	

// 1AM UPDATE: IT WORKED AFTER SOME FUCKING 10 TRIES. FUCKING SHIT WHILE IMPORTING DATA THOUGH