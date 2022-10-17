import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/reduxState";
import { UserType } from "../types/user";

type RegisterCustomerState = {
    name: string | null;
    opened: string | null;
    imageUrl: string;
    handler: string;
    handlerNum: string | null;
    paidSupport: boolean | null;
    supportHistory: { id: string; type: string; content: string }[];
    license: string | null;
}

// 초기 상태
const initialState: RegisterCustomerState = {
    name: null,
    opened: null,
    imageUrl: "",
    handler: "",
    handlerNum: null,
    paidSupport: false,
    supportHistory: [],
    license: null
};

const registerCustomer = createSlice({
    name: "registerCustomer",
    initialState,
    reducers: {
        // 고객사 등록
        setRegisterCustomer(state, action: PayloadAction<RegisterCustomerState>) {
            state = { ...action.payload };
            return state;
        },
    }
});

export const registerCustomerActions = { ...registerCustomer.actions };

export default registerCustomer;