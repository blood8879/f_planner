import axios from "axios";
import { LoginBodyAPI, SignUpBodyAPI } from "../../types/api";
import { UserType } from "../../types/user";

export const signupAPI = (body: SignUpBodyAPI) =>
    axios.post<UserType>("/api/auth/signup", body);

export const loginAPI = (body: LoginBodyAPI) =>
    axios.post<UserType>("/api/auth/login", body);

export const logoutAPI = () => axios.post("/api/auth/logout");

export const meAPI = () => axios.get("/api/auth/me");