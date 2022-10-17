import React from "react";
import styled from "styled-components";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import addHours from "date-fns/addHours";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";

const Container = styled.div`
    width: 100%;
    height: 100%;
    .react-datepicker {
        padding: 16px 32px;
        background-color: white;
    }
`;

const DatePicker: React.FC<ReactDatePickerProps> = ({ onChange, ...props}) => {
    return (
        <Container>
            <ReactDatePicker 
                {...props}
                dateFormat="yyyy-MM-dd"
                locale={ko}
                onChange={(date, event) => {
                    if(date) {
                        onChange(addHours(date as Date, 9), event);
                    } else {
                        onChange(null, event);
                    }
                }}
            />
        </Container>
    );
};

export default DatePicker;