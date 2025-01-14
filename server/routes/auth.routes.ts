import { NextFunction, Router } from "express";
// import passport, { authenticate } from "passport";
import { login, logout, register, viewProfile } from "../controllers/auth.controller";
import { authenticate } from "../services/passport";

const authrouter = Router();

authrouter.post("/register", register);
authrouter.post("/login", login);
authrouter.post("/logout", logout);
// authrouter.get("/profile", authenticate as any, viewProfile);
authrouter.get("/profile", authenticate as any, viewProfile);



export default authrouter;
