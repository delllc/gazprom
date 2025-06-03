import Icon from '@/components/atoms/Icon';
import Text from '@/components/atoms/Text';
import React from 'react';

interface EventCardProps {
    title: string;
    dateTime: Date;
    location: string;
    organizerName?: string;
    participantsCount?: number;
    isAttending?: boolean;
}

const EventCard: React.FC = ({ title, start_date, location, isAttending = false }) => {
    const date = new Date(start_date); // Конвертируем из секунд в миллисекунды
    console.log(date);

    const formattedDate = date.toLocaleDateString('ru-RU'); // Например: "20.05.2025"
    const formattedTime = date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    }); // Например: "15:00"

    return (
        <div className="mb-4 rounded bg-white">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="mt-2 ml-2">
                        <Text as="h3" className="text-[14px] font-bold">
                            {title}
                        </Text>
                        <Text as="p" className="mt-2 mb-2 text-[12px] text-[#202224]">
                            {formattedDate} В {formattedTime}
                        </Text>
                        <Text as="p" className="text-[12px] text-[#202224]">
                            {location}
                        </Text>
                    </div>
                </div>
                <div>{isAttending && <Icon name="check-circle" className="text-blue-500" />}</div>
            </div>
        </div>
    );
};

export default EventCard;
