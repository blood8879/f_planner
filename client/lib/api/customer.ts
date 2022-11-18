import axios from "axios";
import { CustomerType } from "../../types/customer";

export const registerCustomerAPI = (body: CustomerType) =>
    axios.post<CustomerType>("/api/customer/register", body);

// 고객사 list 불러오기 query
// type getCustomerLISTAPIQueries = {

// }

export const getCustomerListAPI = () => 
    axios.get<CustomerType>("/api/customer");