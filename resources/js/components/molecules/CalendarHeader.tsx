import ArrowIcon from '@/components/atoms/ArrowIcon';
import Text from '@/components/atoms/Text';
import React from 'react';

interface CalendarHeaderProps {
    monthYear: string;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ monthYear, onPrevMonth, onNextMonth }) => {
    return (
        <div className="flex items-center justify-between border-b border-b-[#979797] p-2">
            <Text as="p" className="text-[11px] text-[#202224]">
                {monthYear}
            </Text>
            <div className="flex items-center space-x-2">
                <ArrowIcon direction="left" onClick={onPrevMonth} />
                <ArrowIcon direction="right" onClick={onNextMonth} />
            </div>
        </div>
    );
};

export default CalendarHeader;
