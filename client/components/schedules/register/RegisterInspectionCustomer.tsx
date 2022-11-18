import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getCustomerListAPI } from "../../../lib/api/customer";
import { customerActions } from "../../../store/customer";
import Selector from "../../common/Selector";
import RegisterInspection from "./RegisterInspection";

const Container = styled.div`
    .inspection-wrapper {
        padding: 20px 10px 0 10px;
        display: flex;
    }

    .inspection-selector-wrapper {
        padding: 20px 10px 0 10px;
        width: 15%;
    }

    .inspection-content-wrapper {
        padding: 20px 10px 0 10px;
        width: 85%;
    }
`;

const inspectionType = [
    "정기점검",
    "기술지원",
    "인수인계"
]

const RegisterInspectionCustomer: React.FC = () => {
    const dispatch = useDispatch();
    const [list, setList] = useState<any>([]);
    const [customerList, setCustomerList] = useState<any>([]);

    // const getCustomer = async() => {
    //     const { data } = await getCustomerListAPI();
    //     console.log("data===", data);
    //     if(data)
    //         dispatch(customerActions.setCustomers);
    // }
    const getCustomer = async() => {
        try {
            await axios.get("/api/customer")
                .then(response => {
                    if(response.data.success) {
                        console.log("1---", response.data.customers);
                        for(let i=0; i<response.data.customers; i++) {
                            setCustomerList(response.data.customers[i]['name']);
                        }
                        setCustomerList(response.data.customers);
                        console.log("customer===", customerList);
                        // const tt = JSON.stringify(customerList, null, 2);
                        // setList(tt);
                        // console.log("tt===", tt);
                        // console.log("OB values===", customerList.values());
                        // setList([]);
                        
                        // for(let i=0; i<customerList.length; i++) {
                        //     for(let l of customerList) {
                        //         // list.push(l['name']);
                        //         console.log(l['name']);
                        //         // setList(list => [...list, l['name']]);
                        //     }
                        //     // let targetData = Object.values(customerList[i]);
                        //     // let targetData = Object.keys(customerList[i]['name']);
                        //     // let targetData = list.push(customerList[i]['name']);
                        //     // list.push(customerList[i]['name']);
                        //     // setList(customerList[i]['name']);
                        //     // setList(list => [...list, customerList[i]['name']]);
                        //     // console.log("Object", list);
                        //     // console.log("tt", targetData)
                        // }
                    } else {
                        alert("고객사리스트 가져오기 실패.")
                    }
                });
        } catch(e) {
            console.log(e)
        }
    }

    // const renderLists = customerList.map((customer, index) => {
    //     return (
    //         <div key={index}>
    //             <label>{customer['name']}</label>
    //         </div>
    //     )
    //     // <label key={index}>
    //     //     <span>{customer['name']}</span>
    //     // </label>
    // })

    useEffect(() => {
        getCustomer();
        // console.log("inspectionType",inspectionType)
    }, [])

    return (
        <RegisterInspection>
            <Container>
                <div className="inspection-wrapper">
                    <div>
                        {/* {renderLists} */}
                        <Selector 
                            type="normal"
                            options={list}
                            label="어느 고객사인가요?"
                            defaultValue="데이타밸류"
                        />
                    </div>
                    <div className="inspection-selector-wrapper">
                        <Selector
                            type="normal"
                            options={inspectionType}
                            label="점검 유형을 선택해주세요."
                            defaultValue="정기점검"
                        />
                    </div>
                    <div className="inspection-content-wrapper">
                        2
                    </div>
                </div>
            </Container>        
        </RegisterInspection>
    )
}

export default RegisterInspectionCustomer;