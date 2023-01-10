import { NextFunction, Request, Response, Router } from "express";
import { Schedule } from "../models/Schedule";
import authMiddleware from "../middlewares/auth";
import userMiddleware from "../middlewares/user";

// 등록된 일정 불러오기
const getSchedules = async(req: Request, res: Response) => {
    Schedule.find()
        .exec((err, schedules) => {
            if(err) res.status(400).send(err);
            res.status(200).json({ success: true, schedules })
        })
}

// 신규 일정 등록
const registerSchedule = async(req: Request, res: Response) => {
    const { name, customer, type, start } = req.body;

    try {
        // 이미 등록되어 있는 Date일 경우 기존 내용에 update
    
        // 새로운 Date일 경우, 신규 등록
        const schedule = new Schedule(req.body);
        schedule.title = name + "-" + customer;

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

// 개별 일정 불러오기(TEST)
const findSchedulebyid = async(req: Request, res: Response) => {
    const { id } = req.body;
    
    Schedule.find({ _id : id })
        .exec((err, schedule) => {
            if(err) res.status(400).send(err);
            res.status(200).json({ success: true, schedule });
        })
        
}

// 개별 일정 수정
const findSchedulebyidAndUpdate = async(req: Request, res: Response) => {
    const { id, customer, name, start } = req.body;
    console.log(req.body);
    
    Schedule.findByIdAndUpdate({ _id: id}, { $set: { customer: customer, title: name + "-" + customer, start: start }})
        .exec((err, schedule) => {
            if(err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true, schedule
            })
        })
        
}

const router = Router();

router.get("/", getSchedules);
router.post("/registerSchedule", userMiddleware, authMiddleware, registerSchedule);
router.get("/:id", findSchedulebyid);
router.put("/:id", findSchedulebyidAndUpdate);
// router.put("/:id", userMiddleware, authMiddleware, findSchedulebyidAndUpdate);

export default router;