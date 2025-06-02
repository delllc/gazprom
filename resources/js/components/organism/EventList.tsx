import EventCard from '@/components/molecules/EventCard';
import React from 'react';

interface EventListProps {
    events: {
        title: string;
        dateTime: Date;
        location: string;
    }[];
}

export const EventList: React.FC<EventListProps> = ({ events }) => {
    return (
        <div className="space-y-4">
            {events.map((event, index) => (
                <EventCard key={index} title={event.title} dateTime={event.dateTime} location={event.location} />
            ))}
        </div>
    );
};
