import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";
// import { IUser } from "../model/User";
import { NextFunction } from "express";
import { IUser } from "../models/User";

dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || "your_jwt_secret",
};

passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
        console.log(options, "RRRRR");

        try {
            // const user = await User.findById(jwtPayload.id);
            // if (user) return done(null, user);
            return done(null, jwtPayload.id);
        } catch (error) {
            return done(error, false);
        }


    })

);


export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    console.log("DD");
    passport.authenticate("jwt", { session: false }, (err: Error, user: IUser | false) => {
        if (err || !user) {
            return (res as any).status(401).json({ message: "Unauthorized access. Please login." });
        }
        (req as any).user = user;
        next();
    })(req, res, next);
};


