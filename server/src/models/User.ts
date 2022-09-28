import { Model, Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import moment from "moment";

const saltRounds = 10;

interface DBUser {
    name: string;
    email: string;
    password: string;
    role: number;
    token: string;
    tokenExp: number;
}

interface DBUserModel extends Model<DBUser> {}

const userSchema = new Schema<DBUser> ({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:1 },
    password: { type: String, required: true },
    role: { type: Number, default: 1 },
    token: { type: String },
    tokenExp: { type: Number }
});

userSchema.pre('save', function(next) {
    var user = this;

    // 비밀번호 암호화(10회)
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
};

userSchema.methods.generateToken = function(cb) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user) {
        if (err)return cb(err)
        cb(null, user)
    })
}

const User = model<DBUser, DBUserModel>('User', userSchema);

export { User };