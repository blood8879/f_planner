import type { NextPage } from 'next';
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useRef } from 'react';
import ScheduleList from '../components/schedules/ScheduleList';

const Home: NextPage = () => {
  const calenderRef = useRef(null);
  return (
    <>
      <ScheduleList />
    </>
  )
}

export default Home
