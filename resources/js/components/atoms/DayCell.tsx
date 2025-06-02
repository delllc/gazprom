import clsx from 'clsx';
import React from 'react';

interface DayCellProps {
    day: number;
    isSelected?: boolean;
    onClick?: () => void;
}

const DayCell: React.FC<DayCellProps> = ({ day, isSelected = false, onClick }) => {
    const cellClasses = clsx('h-[30px] w-[30px] cursor-pointer text-center text-[11px]', {
        'bg-blue-500 text-white': isSelected,
    });

    return (
        <button type="button" className={cellClasses} onClick={onClick}>
            {day}
        </button>
    );
};

export default DayCell;
