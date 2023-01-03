import React from "react";
import useModal from "../../hooks/useModal";

interface IProps {
    closeModal: () => void;
}

const ScheduleModal: React.FC<IProps> = ({ closeModal }) => {
    return (
        <div>모달</div>
    )
}

export default ScheduleModal;