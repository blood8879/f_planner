import { Request, Response } from "express";
import { Customer } from "../models/Customer";

const register = async (req: Request, res: Response) => {
    const { name, opened, imageUrl, handler, handlerNum, license } = req.body;

    try {
        let errors: any = {};

        // 이미 등록된 고객사인지 확인
        const nameCustomer = await Customer.findOne({ name });

        if(nameCustomer) errors.name = "이미 등록되어 있는 고객사입니다."

    } catch(e) {
        console.log(e);
    }
}

// const signup = async (req: Request, res: Response) => {
//     const { email, name, password } = req.body;

//     try {
//         let errors: any = {};

//         // 이미 사용중인 이메일인지 확인
//         const emailUser = await User.findOne({ email });

//         if (emailUser) errors.email = "이미 사용중인 이메일 주소입니다."

//         const user = new User(req.body);
//         // console.log("req.body ====", req);

//         user.save((err, doc) => {
//             if (err) return res.json({ success: false, err });
//             return res.status(200).json({
//                 success: true
//             });
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }