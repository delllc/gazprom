import EventCard from '@/components/molecules/EventCard';
import React, { useEffect, useState } from 'react';

export const EventList: React.FC = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('/events')
            .then((res) => res.json())
            .then((data) => {
                setEvents(data.events || []);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className="space-y-4">
            {events.map((event) => (
                <EventCard title={event.title} start_date={event.start_date} location={event.location} />
            ))}
        </div>
    );
};
