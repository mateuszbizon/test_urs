import User from "../Models/UserSchema.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, password, weight, height, gender, dob, goal, activityLevel } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exsisted!" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
       await User.create({
            name,
            password: hashedPassword,
            email,
            weight,
            height,
            gender,
            dob,
            goal,
            activityLevel
        });
    
        //await newUser.save(); // Await the save operation

        res.status(201).json({ message: "User created" });

    }
    catch (err) {
        console.log(err)
    }
}

export const login = async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentia;" });
        }

        const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5h' });
        //const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '100m' });

        res.cookie('authToken', authToken, { httpOnly: true });
        //res.cookie('refreshToken', refreshToken, { httpOnly: true });
        res.status(200).json({ message: "Login successful!", token: authToken });
    }
    catch (err) {
        console.log(err)
    }
}