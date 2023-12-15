import express from "express";
import { addCalorieintake } from "../Controllers/CalorieIntake.js";
import { getcalorieintakebydate } from "../Controllers/CalorieIntake.js";
import { getcalorieintakebylimit } from "../Controllers/CalorieIntake.js";
import { deletecalorieintake } from "../Controllers/CalorieIntake.js";
import { getgoalcalorieintake } from "../Controllers/CalorieIntake.js";
import { test } from "../Controllers/CalorieIntake.js";
import  checkAuthToken from "../Middlewares/checkAuthToken.js"

const router = express.Router()

router.get("/test", test)
router.post("/addCalorieintake", checkAuthToken, addCalorieintake)
router.post("/getcalorieintakebydate",  checkAuthToken, getcalorieintakebydate)
router.post("/getcalorieintakebylimit",  checkAuthToken, getcalorieintakebylimit)
router.delete("/deletecalorieintake",  checkAuthToken, deletecalorieintake)
router.get("/getgoalcalorieintake",  checkAuthToken, getgoalcalorieintake)

export default router 