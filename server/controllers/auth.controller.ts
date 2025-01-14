import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import User from "../models/User";


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hash, });
        res.status(201).json({ message: "Register success", user });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const login = async (req: Request, res: Response): Promise<any> => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email Not found" })
        }
        const verify = await bcrypt.compare(password, user.password)
        if (!verify) {
            return res.status(400).json({ message: "Password Not match" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "your_jwt_secret", {
            expiresIn: "1h",
        });
        res.status(200).json({
            result: {
                _id: user._id,
                email: user.email,
                role: user.role,
                token
            }
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

export const logout = (req: Request, res: Response) => {
    res.status(200).json({ message: "Logged out successfully" });
};

export const viewProfile = async (req: Request, res: Response) => {
    console.log("DRRR");
    const user = req.user
    if (user) {
        const result = await User.findOne({ _id: user })
        console.log(result);

        res.status(200).json({ message: "Access to protected route successful!", result });
    }
};
