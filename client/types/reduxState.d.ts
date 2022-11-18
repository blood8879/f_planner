import { CustomerType } from "./customer";
import { UserType } from "./user";

export type UserState = UserType & {
    isLogged: boolean;
}

export type CustomerState = {
    customers: CustomerType[];
}