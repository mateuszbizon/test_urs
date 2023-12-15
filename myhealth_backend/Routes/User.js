import express from "express";
import { register } from "../Controllers/User.js";
import { login } from "../Controllers/User.js";

const router = express.Router()

router.post("/register", register)
router.post("/login", login)

export default router 