import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import React from "react";
import styled from "styled-components";
import koLocale from "@fullcalendar/core/locales/ko";

const Container = styled.div`
    .registered-schedule-wrapper {
        width: 80%;
        align-items: center;
    }
`;

const data = [{ title: 'test', start: '2022-12-12', end: '2022-12-13'}]

const ScheduleList: React.FC = () => {
    
    console.log("데이터====", data)
    return (
        <Container>
            <div className="registered-schedule-wrapper">
                <FullCalendar 
                    plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                        initialView='dayGridMonth'
                        // editable
                        // selectable
                        nowIndicator={true}
                        events={data}
                        locale='ko'
                        // titleFormat=
                        // initialEvents={[
                        //   { title: '테스트', start: new Date() }
                        // ]}
                />
            </div>
        </Container>
    )
}

export default ScheduleList;