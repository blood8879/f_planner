import express from "express";
import authRoutes from "./routes/auth";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

dotenv.config();

const origin = process.env.ORIGIN;

app.use(cors({
    origin,
    credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));


const mongoose = require("mongoose");

const mongo_URI = "mongodb://127.0.0.1:27017/f_planner"

const connect = mongoose.connect(mongo_URI, {
    useNewUrlParser: true, useUnifiedTopology: true,
})
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

app.get("/", (_, res) => res.send("Server is running"));
app.use("/api/auth", authRoutes);

let port = 4000;

app.listen(port, async () => {
    console.log(`Server running at http://localhost:4000`);
})