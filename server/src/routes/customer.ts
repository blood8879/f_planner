import { NextFunction, Request, Response, Router } from "express";
import { Customer } from "../models/Customer";
import authMiddleware from "../middlewares/auth";
import userMiddleware from "../middlewares/user";
import multer, { FileFilterCallback } from "multer";

const register = async (req: Request, res: Response) => {
    const { name, opened, imageUrl, handler, handlerNum, license } = req.body;
    console.log("req.body===", req.body);

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

const upload = multer({
    storage: multer.diskStorage({
        destination: "public/logos",
        filename: (_, file, callback) => {
            console.log("file===", file);
            const filename = `${Date.now()}_${file.originalname}`;
            callback(null, filename)
        },
    }),
    fileFilter: (_, file: any, callback: FileFilterCallback) => {
        if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            callback(null, true);
        } else {
            callback(new Error("This File is not image Files."))
        }
    }
});

const uploadLogo = async(req: Request, res: Response) => {
    try {
        const type = req.body.type;

        console.log("req.file===", req.file);
    } catch(e) {
        console.log(e);
    }
}

const router = Router();
router.post("/register", userMiddleware, authMiddleware, register);
router.post("/register/upload", userMiddleware, authMiddleware, upload.single('file'), uploadLogo);

export default router;