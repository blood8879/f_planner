import React from "react";
import { NextPage } from "next";
import RegisterInspectionCustomer from "../../../components/schedules/register/RegisterInspectionCustomer";
import { getCustomerListAPI } from "../../../lib/api/customer";
import { customerActions } from "../../../store/customer";

const inspectionCustomer: NextPage = () => {
    return <RegisterInspectionCustomer />
};

inspectionCustomer.getInitialProps = async({ store, query }) => {
    const {
        name,
        opened,
        handler,
        paidSupport,
        supportHistory
    } = query;
    try {
        const { data } = await getCustomerListAPI({
            name,
            opened,
            handler,
            paidSupport,
            supportHistory
        });
        store.dispatch(customerActions.setCustomers(data));
    } catch(e) {
        console.log(e);
    }

    return {};
};

export default inspectionCustomer;