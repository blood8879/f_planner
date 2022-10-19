import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/reduxState";
import { UserType } from "../types/user";

type RegisterCustomerState = {
    name: string | null;
    project: string;
    opened: string | null;
    imageUrl: string;
    handler: string;
    handlerNum: string | null;
    paidSupport: boolean | null;
    supportHistory: { id: string; type: string; content: string }[];
    licenseExp: string | null;
    licenseVolume: number;
}

// 초기 상태
const initialState: RegisterCustomerState = {
    name: null,
    project: "",
    opened: null,
    imageUrl: "",
    handler: "",
    handlerNum: null,
    paidSupport: false,
    supportHistory: [],
    licenseExp: null,
    licenseVolume: 0
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
        // 서비스 오픈
        setOpenDate(state, action: PayloadAction<string | null>) {
            state.opened = action.payload;
        },
        // 라이센스 만료
        setLicenseExpired(state, action: PayloadAction<string | null>) {
            state.licenseExp = action.payload;
        }
    }
});

export const registerCustomerActions = { ...registerCustomer.actions };

export default registerCustomer;