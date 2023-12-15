import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userSymptomRoutes from "./Routes/Symptom.js"
import userRoutes from "./Routes/User.js"

const app = express() 
dotenv.config()
app.use(bodyParser.json({limit: "1gb", extended: true}));
app.use(bodyParser.urlencoded({limit: "1gb", extended: true}));
app.use(cors());

app.use("/user", userRoutes)
app.use("/symptom", userSymptomRoutes)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    () => {
        app.listen(8080, () => console.log('Connected to database'))
    }
).catch((err) => {
    console.log('Error connecting to database ' + err);
})