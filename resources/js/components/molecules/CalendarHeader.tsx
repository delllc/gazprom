import Icon from '@/components/atoms/Icon';
import Text from '@/components/atoms/Text';
import React from 'react';

interface CalendarHeaderProps {
    monthYear: string;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ monthYear, onPrevMonth, onNextMonth }) => {
    return (
        <div className="flex items-center justify-between rounded bg-gray-100 p-2">
            <Text as="h3" className="text-lg font-bold">
                {monthYear}
            </Text>
            <div className="flex items-center space-x-2">
                <Icon name="chevron-left" className="cursor-pointer" />
                <Icon name="chevron-right" className="cursor-pointer" />
            </div>
        </div>
    );
};

export default CalendarHeader;
