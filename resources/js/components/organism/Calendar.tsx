import CalendarHeader from '@/components/molecules/CalendarHeader';
import React from 'react';
import DayCell from '../atoms/DayCell';
import { getDaysInMonth, getFirstDayOfWeek } from './utils/calendarUtils';

interface CalendarProps {
    date: Date;
    selectedDate?: Date;
    onSelectDate: (date: Date) => void;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

export const Calendar: React.FC<CalendarProps> = ({ date, selectedDate, onSelectDate, onPrevMonth, onNextMonth }) => {
    const daysInMonth = getDaysInMonth(date);
    const firstDayOfWeek = getFirstDayOfWeek(date);

    // Получаем номер текущего дня
    const currentDay = selectedDate?.getDate() || 1;

    return (
        <div className="bg-white p-4 shadow-md">
            {/* Заголовок */}
            <CalendarHeader
                monthYear={date.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}
                onPrevMonth={onPrevMonth}
                onNextMonth={onNextMonth}
            />

            {/* Названия дней недели */}
            <div className="mt-2 mb-2 flex justify-between pr-[6px] pl-[11px] text-[11px]">
                <span>В</span>
                <span>П</span>
                <span>В</span>
                <span>С</span>
                <span>Ч</span>
                <span>П</span>
                <span>С</span>
            </div>

            {/* Сетка дней */}
            <div className="grid grid-cols-7 gap-1">
                {/* Пустые ячейки перед первым днем месяца */}
                {[...Array(firstDayOfWeek)].map((_, index) => (
                    <div key={index} className="h-[30px] w-[30px]"></div>
                ))}

                {/* Дни месяца */}
                {daysInMonth.map((day) => (
                    <DayCell
                        key={day}
                        day={day}
                        isSelected={day === currentDay}
                        onClick={() => onSelectDate(new Date(date.getFullYear(), date.getMonth(), day))}
                    />
                ))}
            </div>
        </div>
    );
};
