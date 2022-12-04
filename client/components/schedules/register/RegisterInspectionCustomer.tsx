import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getCustomerListAPI } from "../../../lib/api/customer";
import { useSelector } from "../../../store";
import { customerActions } from "../../../store/customer";
import Button from "../../common/Button";
import DatePicker from "../../common/DatePicker";
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

const list: any = [];

const RegisterInspectionCustomer: React.FC = () => {
    const dispatch = useDispatch();
    const [list, setList] = useState<any>([]);
    // const customers = useSelector((state) => state.customer.customers.customers);
    const [customer, setCustomer] = useState<string | undefined>();
    const [type, setType] = useState<string | undefined>();
    // const visitDate = new Date();
    const [issued, setIssued] = useState<Date | null>();

    // const getCustomer = async() => {
    //     setList([]);
    //     if(customers) {
    //         for(let i=0; i<customers.length; i++) {
    //             setList((list:any) => [...list, customers[i]['name']])    
    //         }
    //     }
    // }

    const selectCustomer = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCustomer(event.target.value);
        console.log(event.target.value);
    }

    const selectType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
    }

    const selectIssueDate = (date: Date | null) => {
        // setVisitDate(event.target.value.toISOString());
        setIssued(date);
        console.log(date);
    }

    const onSubmitInspection = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // _id 검색 후, inspection_history에 추가
        try {
            const registerInspectionBody = {
                customer,
                type,
                issued
            };
            
            console.log("registerInspectionBody====", registerInspectionBody)
        } catch(e) {
            console.log(e);
        }
    }

    // const dateLicense = licenseExp ? new Date(licenseExp) : null;

    // mongoDB 사용하여 리스트 불러올 시 
    const getCustomer = async() => {
        try {
            await axios.get("/api/customer")
                .then(response => {
                    if(response.data.success) {
                        console.log("1---", response.data.customers);
                        setList([]);
                        for(let i=0; i<response.data.customers.length; i++) {
                            setList((list: any) => [...list, response.data.customers[i]['name']])
                        }
                    } else {
                        alert("고객사리스트 가져오기 실패.")
                    }
                });
        } catch(e) {
            console.log(e)
        }
    }
    
    useEffect(() => {
        getCustomer();
    }, [])

    return (
        <RegisterInspection>
            <Container>
                <form onSubmit={onSubmitInspection}>
                    <div className="inspection-wrapper">
                        <div className="inspection-selector-wrapper">
                            {/* {customerlength} */}
                            <Selector 
                                type="normal"
                                options={list}
                                label="고객사를 선택해주세요."
                                onChange={selectCustomer}
                                defaultValue="고객사목록"
                                disabledOptions={["고객사목록"]}
                            />
                        </div>
                        <div className="inspection-selector-wrapper">
                            <Selector
                                type="normal"
                                options={inspectionType}
                                label="점검 유형을 선택해주세요."
                                defaultValue="고객사목록"
                                onChange={selectType}
                                disabledOptions={["점검유형"]}
                            />
                        </div>
                        <div className="inspection-content-wrapper">
                            방문일을 선택해 주세요
                            <div>
                                <DatePicker
                                    selected={issued}
                                    onChange={selectIssueDate}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button type="submit" color="bittersweet">일정등록</Button>
                    </div>
                </form>
            </Container>        
        </RegisterInspection>
    )
}

export default RegisterInspectionCustomer;