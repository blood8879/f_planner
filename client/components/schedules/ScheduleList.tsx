import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import React from "react";
import styled from "styled-components";

const Container = styled.div`

`;

const data = [{ title: 'test', start: '2021-12-12', end: '2022-12-13'}]

const ScheduleList: React.FC = () => {
    
    console.log("데이터====", data)
    return (
        <Container>
            <FullCalendar 
                plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                    initialView='dayGridMonth'
                    // editable
                    // selectable
                    nowIndicator={true}
                    events={[data]}
                    // initialEvents={[
                    //   { title: '테스트', start: new Date() }
                    // ]}
            />
        </Container>
    )
}

export default ScheduleList;