import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";

export default async(req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log("req====", req)
        
        let token = "";
        // const token = req.cookies.token;
        console.log("router===", req.route.path)
        if(req.route.path === "/me") {
            token = req.headers.cookie;
        } else {
            token = req.cookies.token;
        }
            
        
        console.log("token===", token);
        if (!token) return next();

        const { email } : any = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ email });
        // console.log("user", user);

        if (!user) throw new Error("Unauthenticated");

        // 유저 정보를 res.locals.user에 넣어주기
        res.locals.user = user;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: "Something went wrong" });
    }
}