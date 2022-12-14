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
import ScheduleModal from "./ScheduleModal";
import useModal from "../../hooks/useModal";
// import googleCalendarPlugin from "@fullcalendar/google-calendar";

const Container = styled.div`
    .registered-schedule-wrapper {
        justify-content: center;
        display: flex;

        .fc-header-toolbar {
            min-width: 80em;
            margin-top: 0 auto;
            margin-bottom: 0 auto;
        }

        .fc-daygrid {
            max-height: 80%;
            margin-top: 0 auto;
            margin-bottom: 0 auto;
        }

        .fc-day-sat a {
            color: blue;
            text-decoration: none;
        }
        
        .fc-day-sun a {
            color: red;
            text-decoration: none;
        }
    }
`;

// const data = [{ title: 'test', start: '2022-12-12', end: '2022-12-13'}]

interface IProps {
    closeModal: () => void;
    info: any[];
    start?: Date | null;
}

const ScheduleList: React.FC<IProps> = () => {
    const [schedules, setSchedules] = useState<any>([]);
    const [schedule, setSchedule] = useState<any>([]);
    const [start, setStart] = useState<Date | null>();
    const router = useRouter();
    const { openModal, closeModal, ModalPortal } = useModal();

    // const scheduleByid = <ScheduleModal />;

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
                        contentHeight={700}
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
                        // ???????????? ????????? ?????? ???????????? ??????
                        displayEventTime={false}
                        // ????????? ?????? ??????
                        weekNumbers={true}
                        // ????????? ??????
                        customButtons={{
                            registerButton: {
                                text: '+',
                                click: function() {
                                    router.push("/schedules/register/inspection")
                                }
                            }
                        }}
                        // ???????????? ?????????(background)
                        // dateClick={
                        //     function(info) {
                        //         alert('Clicked on: ' + info.dateStr)
                        //     }
                        // }
                        // ????????? ??????
                        eventClick={
                            function(info) {
                                // console.log(info.event.extendedProps)
                                // <ScheduleModal info={info.event.extendedProps} closeModal={closeModal}/>
                                setSchedule(info.event.extendedProps);
                                setStart(info.event.start);
                                // alert(schedule.event.extendedProps);
                                openModal();
                                // alert('extendedProps: '+info.event.extendedProps)
                            }
                        }
                />
            </div>
            <ModalPortal>
                <ScheduleModal info={schedule} start={start} closeModal={closeModal}/>
            </ModalPortal>
        </Container>
    )
}

export default ScheduleList;