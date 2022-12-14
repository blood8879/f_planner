import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import { HYDRATE, createWrapper, MakeStore } from "next-redux-wrapper";
import { TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import user from "./user";
import registerCustomer from "./registerCustomer";
import customer from "./customer";

const rootReducer = combineReducers({
    auth: auth.reducer,
    user: user.reducer,
    registerCustomer: registerCustomer.reducer,
    customer: customer.reducer,
});

// 스토어 타입 설정
export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        if (state === initialRootState) {
            return {
                ...state,
                ...action.payload
            };
        }
        return state;
    }
    return rootReducer(state, action);
};

// 타입 지원되는 커스텀 useSelector 만들기
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const initStore: MakeStore<any> = () => {
    const store = configureStore({
        reducer,
        devTools: true,
    });
    initialRootState = store.getState();
    return store;
};

export const wrapper = createWrapper(initStore);