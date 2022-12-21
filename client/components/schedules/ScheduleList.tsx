import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import koLocale from "@fullcalendar/core/locales/ko";
import axios from "axios";

const Container = styled.div`
    .registered-schedule-wrapper {
        width: 80%;
        align-items: center;
    }
`;

// const data = [{ title: 'test', start: '2022-12-12', end: '2022-12-13'}]



const ScheduleList: React.FC = () => {
    const [schedules, setSchedules] = useState<any>([]);

    const getSchedules = async() => {
        try {
            await axios.get("/api/schedule")
                .then(response => {
                    if(response.data.success) {
                        console.log(response.data.schedules);
                        setSchedules([]);
                        for(let i=0; i<response.data.schedules.length; i++) {
                            setSchedules((schedules: any) => [...schedules, response.data.schedules[i]]);
                        }
                    }
                })
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getSchedules();
    }, [])
    
    return (
        <Container>
            <div className="registered-schedule-wrapper">
                <FullCalendar 
                    plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
                        initialView='dayGridMonth'
                        // editable
                        // selectable
                        nowIndicator={true}
                        events={schedules}
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