import CalendarHeader from '@/components/molecules/CalendarHeader';
import EventCard from '@/components/molecules/EventCard';
import React from 'react';

interface CalendarProps {
    events: {
        title: string;
        dateTime: Date;
        location: string;
        organizerName: string;
    }[];
}

export const Calendar: React.FC<CalendarProps> = ({ events }) => {
    const today = new Date();
    const monthYear = today.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

    return (
        <div className="mb-6 rounded bg-white p-4 shadow">
            <CalendarHeader
                monthYear={monthYear}
                onPrevMonth={() => console.log('Предыдущий месяц')}
                onNextMonth={() => console.log('Следующий месяц')}
            />

            <div className="mt-4 space-y-4">
                {events.map((event, index) => (
                    <EventCard
                        key={index}
                        title={event.title}
                        dateTime={event.dateTime}
                        location={event.location}
                        organizerName={event.organizerName}
                    />
                ))}
            </div>
        </div>
    );
};
