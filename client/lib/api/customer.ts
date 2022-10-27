import axios from "axios";
import { CustomerType } from "../../types/customer";

export const registerCustomerAPI = (body: CustomerType) =>
    axios.post<CustomerType>("/api/customer/register", body);

export const getCustomerListAPI = () => 
    axios.get<CustomerType>("/api/customer");