import { Request, Response } from "express";
import { Customer } from "../models/Customer";

const register = async (req: Request, res: Response) => {
    const { name, opened, imageUrl, handler, handlerNum, license } = req.body;

    try {
        // 이미 등록된 고객사인지 확인
        const nameCustomer = await Customer.findOne({ name });

        if(nameCustomer) {
            return res.json({ success: false, error: "이미 등록되어 있는 고객사입니다." })
        }

        const customer = new Customer(req.body);

        customer.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        });
    } catch(e) {
        console.log(e);
    }
}