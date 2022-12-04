import { NextFunction, Request, Response, Router } from "express";
import { Schedule } from "../models/Schedule";
import authMiddleware from "../middlewares/auth";
import userMiddleware from "../middlewares/user";

const registerSchedule = async(req: Request, res: Response) => {
    const { customer, type, issued } = req.body;

    try {
        // 이미 등록되어 있는 Date일 경우 기존 내용에 update
    
        // 새로운 Date일 경우, 신규 등록
        const schedule = new Schedule(req.body);

        schedule.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        });
    } catch(e) {
        console.log(e);
    }
}

const router = Router();

router.post("/registerSchedule", userMiddleware, authMiddleware, registerSchedule);
export default router;