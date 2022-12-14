import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/reduxState";
import { UserType } from "../types/user";

// 초기 상태
const initialState: UserState = {
    id: "",
    email: "",
    name: "",
    role: 0,
    profileImage: "",
    isLogged: false
};

const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        // user login
        setLoggedUser(state, action: PayloadAction<UserType>) {
            state = { ...action.payload, isLogged: true };
            return state;
        },
        // admin login
        setLoggedAdmin(state, action: PayloadAction<UserType>) {
            state = { ...action.payload, isLogged: true, role: 0 };
            return state;
        },
        // 회원가입
        setRegisterUser(state, action: PayloadAction<UserType>) {
            state = { ...action.payload, isLogged: false };
            return state;
        },
        // 유저 초기화
        initUser(state) {
            state = initialState;
            return state;
        },
    },
});

export const userActions = { ...user.actions };

export default user;