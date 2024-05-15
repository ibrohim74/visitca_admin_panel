import React, { useEffect, useState } from 'react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import './bookingCalendar.css';

const BookingCalendar = ({ bookingData }) => {
    const [formattedEvents, setFormattedEvents] = useState([]);

    // Hodisa ustiga bosinganda amalni qo'yish uchun funksiya
    const handleEventClick = (selected) => {
        // Hodisa ustiga bosinganda amalni qo'yish uchun funksiya
    };

    // useEffect funktsiyasi
    useEffect(() => {
        // `bookingData` mavjud bo'lsa va `start_day` va `end_day` qiymatlari ham mavjud bo'lsa
        if (bookingData && bookingData.start_day && bookingData.end_day) {
            const start = new Date(bookingData.start_day); // Tarix formatini ISO8601 ga o'tkazamiz
            const end = new Date(bookingData.end_day); // Tarix formatini ISO8601 ga o'tkazamiz
            setFormattedEvents([{
                id: bookingData.id,
                start: start,
                end: end,
                backgroundColor: "#292D32",
                color: "white"
            }]);
        }
    }, [bookingData]);

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
                left: "prev",
                center: "title",
                right: "next",
            }}
            initialView="dayGridMonth"
            initialDate={formattedEvents.length > 0 ? formattedEvents[0].start : new Date()} // formattedEvents ning birinchi elementi start qiymati yoki hozirgi sana
            editable={true}
            selectable={true}
            selectMirror={true}
            locale={'ru'}
            dayMaxEvents={false}
            weekends={true}
            events={formattedEvents}
            eventClick={handleEventClick}
        />
    );
};

export default BookingCalendar;
