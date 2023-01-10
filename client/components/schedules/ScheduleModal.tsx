import { useRouter } from "next/router";
import React, { useState } from "react";
import useModal from "../../hooks/useModal";
import { reviseScheduleAPI } from "../../lib/api/schedule";
import { useSelector } from "../../store";
import Button from "../common/Button";
import DatePicker from "../common/DatePicker";
import Input from "../common/Input";

interface IProps {
    closeModal: () => void;
    info: any;
    start?: Date | null;
}

const ScheduleModal: React.FC<IProps> = ({ closeModal, info, start }) => {
    console.log("info",info)
    console.log("start", start)
    const id = info._id;
    console.log("id===", id);
    const router = useRouter();
    // console.log("router===", router);
    // const startDate = start?.toUTCString();
    const [customer, setCustomer] = useState(info.customer);
    const [type, setType] = useState(info.type)
    const [startDate, setStartDate] = useState<Date | null | undefined>(start)
    const name = useSelector((state) => state.user.name);

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
        } catch (error) {
            console.log(error);
        }
    }

    const selectIssueDate = (date: Date | null) => {
        const date1 = date ? new Date(date) : null;
        console.log("date===", date1);
        setStartDate(date1);
        console.log(startDate);
    }

    return (
        // <div>모달</div>
        <>
            <form onSubmit={onSubmitReviseSchedule}>
                <div>
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
                </div>
                <div>
                    <Button type="submit" color="bittersweet">수정</Button>
                </div>
            </form>
        </>
    )
}

export default ScheduleModal;