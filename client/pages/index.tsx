import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef } from 'react';

const Home: NextPage = () => {
  const calenderRef = useRef(null);
  return (
    // <FullCalendar 
    //   // innerRef={calenderRef}
    //   plugins={[timeGridPlugin, interactionPlugin]}
    //   editable
    //   selectable
    // />
    <div>Hello</div>
  )
}

export default Home
