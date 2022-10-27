import { NextFunction, Request, Response, Router } from "express";
import { Customer } from "../models/Customer";
import authMiddleware from "../middlewares/auth";
import userMiddleware from "../middlewares/user";
import multer, { FileFilterCallback } from "multer";

// server단에서 multer를 이용한 이미지 업로드와 client 단에서 register request보낼 때 Date.now() 시간 차이가 발생하여 
// db적재시 시간 통일을 위한 가변수 설정.
let filenameForRegister = "";

const getCustomer = async(req: Request, res: Response) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    Customer.find()
        .exec((err, customers) => {
            if(err) res.status(400).send(err);
            res.status(200).json({ success: true, customers })
        })
}

const registerCustomer = async (req: Request, res: Response) => {
    const { name, opened, handler, handlerNum, license } = req.body;
    

    try {
        // 이미 등록된 고객사인지 확인
        const nameCustomer = await Customer.findOne({ name });

        if(nameCustomer) {
            return res.json({ success: false, error: "이미 등록되어 있는 고객사입니다." })
        }

        const customer = new Customer(req.body);
        customer.imageUrl = filenameForRegister;

        customer.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        });
        filenameForRegister = "";
    } catch(e) {
        console.log(e);
    }
}

const upload = multer({
    storage: multer.diskStorage({
        destination: "public/logos",
        filename: (req: Request, file, callback) => {
            const filename = `${Date.now()}_${file.originalname}`;
            filenameForRegister = filename;
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

        // console.log("req.file===", req.file);
    } catch(e) {
        console.log(e);
    }
}

const router = Router();
router.get("/", getCustomer);
router.post("/register", userMiddleware, authMiddleware, registerCustomer);
router.post("/register/upload", userMiddleware, authMiddleware, upload.single('file'), uploadLogo);

export default router;