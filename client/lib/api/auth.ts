import axios from "axios";
import { UserType } from "../../types/user";

interface signUpBodyAPI {
    email: string;
    name: string;
    password: string;
}

export const signupAPI = (body: signUpBodyAPI) =>
    axios.post<UserType>("/api/auth/signup", body);