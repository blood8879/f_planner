import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useModal from "../../hooks/useModal";
import { deleteScheduleAPI, reviseScheduleAPI } from "../../lib/api/schedule";
import { useSelector } from "../../store";
import Button from "../common/Button";
import DatePicker from "../common/DatePicker";
import Input from "../common/Input";
import Selector from "../common/Selector";

interface IProps {
    closeModal: () => void;
    info: any;
    start?: Date | null;
}

const inspectionType = [
    "정기점검",
    "기술지원",
    "인수인계"
]

const ScheduleModal: React.FC<IProps> = ({ closeModal, info, start }) => {
    // console.log("info",info)
    // console.log("start", start)
    const id = info._id;
    // console.log("id===", id);
    const router = useRouter();
    // console.log("router===", router);
    const textDate = start?.toUTCString();
    const [customer, setCustomer] = useState(info.customer);
    const [type, setType] = useState(info.type);
    const [startDate, setStartDate] = useState<Date | null | undefined>(start);
    const name = useSelector((state) => state.user.name);
    const isLogged = useSelector((state) => state.user.isLogged);
    const [list, setList] = useState<any>([]);

    const onSubmitReviseSchedule = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const reviseScheculeBody = {
                id,
                customer,
                type,
                name,
                start : startDate,
            };

            console.log("reviseScheduleBody====", reviseScheculeBody);
            await reviseScheduleAPI(reviseScheculeBody);
            // router.push("/")
            document.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }

    const onDelete = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await deleteScheduleAPI(id);
            document.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }

    // DatePicker 사용하기 위해 Date형태로 전환
    const selectIssueDate = (date: Date | null) => {
        const date1 = date ? new Date(date) : null;
        console.log("date===", date1);
        setStartDate(date1);
        console.log(startDate);
    }

    const selectCustomer = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCustomer(event.target.value);
    }

    const selectType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
    }

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
        // <div>모달</div>
        <>
            {isLogged && (name === info.name) && (
                <>
                    <form onSubmit={onSubmitReviseSchedule}>
                        {/* <div>
                            고객사 : <Input 
                                        type="text"
                                        value={customer}
                                        onChange={(e) => {setCustomer(e.target.value)}}
                                    />
                        </div>
                        <div>
                            유형 : <Input 
                                        type="text"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    />
                        </div>
                        <div>
                            점검일 : <DatePicker 
                                        selected={startDate}
                                        onChange={selectIssueDate}
                                    /> 
                        </div> */}
                        <div>
                            고객사 :
                            <Selector 
                                type="normal"
                                options={list}
                                onChange={selectCustomer}
                                defaultValue={customer}
                                disabledOptions={["고객사목록"]}
                            />
                        </div>
                        <div>
                            유형 :
                            <Selector 
                                type="normal"
                                options={inspectionType}
                                defaultValue={type}
                                // (e)를 이용한 target.value 설정은 적용안됨
                                // onChange={(e) => setType(e.target.value)}
                                onChange={selectType}
                                disabledOptions={["점검유형"]}
                            />
                        </div>
                        <div>
                            점검일 :
                            <DatePicker 
                                selected={startDate}
                                onChange={selectIssueDate}
                            />
                        </div><br/>
                        <div>
                            <Button type="submit" color="bittersweet">수정</Button>
                        </div><br/>
                    </form>
                    <form onSubmit={onDelete}>
                        <Button type="submit" color="dark_cyan">삭제</Button>
                    </form>
                </>
            )}
            {isLogged && (name !== info.name) && (
                <>
                    <div>
                        {info.name} 님은 {type}을 위해 {customer} 방문이 &nbsp;
                        {textDate}에 계획되어 있어요.
                    </div>
                    {/* <div>
                        고객사 : {customer}
                    </div>
                    <div>
                        유형 : {type}
                    </div>
                    <div>
                        점검일 : {textDate}
                    </div> */}
                </>
            )}
            {!isLogged && (
                <>
                    <div>
                        고객사 : {customer}
                    </div>
                    <div>
                        유형 : {type}
                    </div>
                    <div>
                        점검일 : {textDate}
                    </div>
                </>
            )}
        </>
    )
}

export default ScheduleModal;