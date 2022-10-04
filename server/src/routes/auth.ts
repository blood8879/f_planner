import { Router, Request, Response } from "express";
import { User } from "../models/User";
import { isEmpty, validate } from "class-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import authMiddleware from "../middlewares/auth";
import userMiddleware from "../middlewares/user";

const me = async (_: Request, res: Response) => {
    return res.json(res.locals.user);
};

const signup = async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    try {
        let errors: any = {};

        // 이미 사용중인 이메일인지 확인
        const emailUser = await User.findOne({ email });

        if (emailUser) errors.email = "이미 사용중인 이메일 주소입니다."

        const user = new User(req.body);
        // console.log("req.body ====", req);

        user.save((err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true
            });
        });
    } catch (error) {
        console.log(error);
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        let errors : any = {}

        // 비워져 있다면 에러를 프론트앤드로 보내주기
        if (isEmpty(email)) errors.email = "이메일을 입력해 주세요.";
        if (isEmpty(password)) errors.password = "비밀번호를 입력해 주세요.";
        if (Object.keys(errors).length > 0) {
            return res.json(400).json(errors);
        }

        // DB에서 유저 찾기
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ email: "등록되지 않은 이메일입니다." });

        // 유저가 있다면 비밀번호 비교
        const passwordMatches = await bcrypt.compare(password, user.password);

        // 비밀번호가 다르면 에러 보내기
        if (!passwordMatches) {
            return res.status(401).json({ password: "비밀번호가 잘못되었습니다. "});
        }

        // 비밀번호가 맞다면 토큰 생성
        const token = jwt.sign({ email }, process.env.JWT_SECRET);

        // 쿠키 저장
        // res.set("Set-Cookie", cookie.serialize("token", token, {
        //     httpOnly: true,
        //     maxAge: 60 * 60 * 24 * 7,
        //     path: "/"
        // }));
        res.setHeader(
            "Set-Cookie",
            `access-token=${token}; path=/; expires=${new Date(
                Date.now() + 60 * 60 * 24 * 1000 * 3
            ).toUTCString}; httponly`
        );

        const check1 = res.setHeader(
            "Set-Cookie",
            `access-token=${token}; path=/; expires=${new Date(
                Date.now() + 60 * 60 * 24 * 1000 * 3
            ).toUTCString}; httponly`
        );
        
        console.log("chk1===", check1)
        return res.json({ user, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const logout = async (_: Request, res: Response) => {
    res.set(
        "Set-Cookie",
        cookie.serialize("token", "", {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
            path: "/",
        })
    );

    res.status(200).json({ success: true })
};

const router = Router();
router.get("/me", userMiddleware, authMiddleware, me);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", userMiddleware, authMiddleware, logout);

export default router;