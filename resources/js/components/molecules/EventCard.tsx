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

const EventCard: React.FC<EventCardProps> = ({ title, dateTime, location, isAttending = false }) => {
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="mb-4 rounded bg-white">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="mt-2 ml-2">
                        <Text as="h3" className="text-[14px] font-bold">
                            {title}
                        </Text>
                        <Text as="p" className="mt-2 mb-2 text-[12px] text-[#202224]">
                            {formattedDate} {formattedTime}
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
