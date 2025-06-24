import { Calendar } from '@/components/organism/Calendar';
import { EventList } from '@/components/organism/EventList';
import React, { useState } from 'react';
import { AddEventModal } from '../molecules/ModalEventCreate';

interface Event {
    title: string;
    dateTime: Date;
    location: string;
    participants: string[];
}

export const RightSidebar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date()); // текущий месяц/год
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
    };

    const handlePrevMonth = () => {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <aside className="w-72 p-4">
            {/* Календарь */}
            <Calendar
                date={currentDate}
                selectedDate={selectedDate || undefined}
                onSelectDate={handleSelectDate}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
            />
            <div className="mt-4 rounded bg-white p-4 shadow-sm">
                {/* Кнопка "Добавить мероприятие" */}
                {/* Список событий */}
                <div className="mt-4">
                    <h3 className="border-b-black text-lg font-bold">Вы собираетесь на:</h3>
                    <EventList />
                </div>
            </div>
            <AddEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </aside>
    );
};
