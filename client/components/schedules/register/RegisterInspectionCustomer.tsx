import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
    const [customerList, setCustomerList] = useState([])
    const [list, setList] = useState<any>([])
    const getCustomer = async() => {
        try {
            await axios.get("/api/customer")
                .then(response => {
                    if(response.data.success) {
                        setCustomerList(response.data.customers);
                        console.log("customer===", customerList);
                        for(let i=0; i<customerList.length; i++) {
                            // let targetData = Object.values(customerList[i]);
                            let targetData = Object.keys(customerList[i]['name']);
                            // console.log("Object", Object)
                            console.log("tt", targetData)
                        }
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