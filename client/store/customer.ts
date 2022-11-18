import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerType } from "../types/customer";
import { CustomerState } from "../types/reduxState";

const initialState: CustomerState = {
    customers: [],
}

const customer = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setCustomers(state, action: PayloadAction<CustomerType[]>) {
            state.customers = action.payload;
        },
    }
});

export const customerActions = { ...customer.actions };

export default customer;