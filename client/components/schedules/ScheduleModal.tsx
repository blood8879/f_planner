import { useRouter } from "next/router";
import React from "react";
import useModal from "../../hooks/useModal";

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
    console.log("router===", router);
    const startDate = start?.toUTCString(); 
    return (
        // <div>모달</div>
        <>
            <div>고객사 : {info.customer}</div>
            <div>유형 : {info.type}</div>
            <div>점검일 : {startDate}</div>
        </>
    )
}

export default ScheduleModal;