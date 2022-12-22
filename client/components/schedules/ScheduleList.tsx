import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import RegisterInspectionCustomer from "./register/RegisterInspectionCustomer";
import Link from "next/link";
import { useRouter } from "next/router";
// import googleCalendarPlugin from "@fullcalendar/google-calendar";

const Container = styled.div`
    .registered-schedule-wrapper {
        width: 80%;
        align-items: center;
    }
`;

// const data = [{ title: 'test', start: '2022-12-12', end: '2022-12-13'}]

const ScheduleList: React.FC = () => {
    const [schedules, setSchedules] = useState<any>([]);
    const router = useRouter();

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
                        timeZone='Asia/Seoul'
                        initialView='dayGridMonth'
                        // editable
                        // selectable
                        nowIndicator={true}
                        events={schedules}
                        // locale='ko'
                        // contentHeight={600}
                        // googleCalendarApiKey=""
                        headerToolbar={{
                            // left:'prevYear,prev,next,nextYear today',
                            left: 'prevYear,prev',
                            center:'title',
                            // right: 'dayGridMonth,dayGridWeek,dayGridDay'
                            right: 'registerButton next,nextYear'
                        }}
                        titleFormat={{
                            year: 'numeric',
                            month: 'long',
                        }}
                        // eventTimeFormat={{

                        // }}
                        displayEventTime={false}
                        weekNumbers={true}
                        dayHeaderFormat={{
                            weekday: 'short'
                        }}
                        customButtons={{
                            registerButton: {
                                text: '등록',
                                click: function() {
                                    router.push("/schedules/register/inspection")
                                }
                            }
                        }}
                />
            </div>
        </Container>
    )
}

export default ScheduleList;