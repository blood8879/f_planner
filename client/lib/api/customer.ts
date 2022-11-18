import axios from "axios";
import { CustomerType } from "../../types/customer";
import { makeQueryString } from "../utils";

export const registerCustomerAPI = (body: CustomerType) =>
    axios.post("/api/customer/register", body);

// 고객사 list 불러오기 query
type getCustomerLISTAPIQueries = {
    handler?: string | string[];
    name?: string | string[];
    opened?: string | string[];
    paidSupport?: string | string[];
    supportHistory?: string | string[];
}

export const getCustomerListAPI = (queries: getCustomerLISTAPIQueries) => {
    return axios.get<CustomerType[]>(makeQueryString("/api/customer", queries));
};
    