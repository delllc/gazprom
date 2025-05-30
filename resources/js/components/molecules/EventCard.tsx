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

const EventCard: React.FC<EventCardProps> = ({ title, dateTime, location, organizerName, participantsCount = 0, isAttending = false }) => {
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="mb-4 rounded bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="ml-2">
                        <Text as="h3" className="text-lg font-bold">
                            {title}
                        </Text>
                        <Text as="p" className="text-sm text-gray-500">
                            {formattedDate} {formattedTime}
                        </Text>
                        <Text as="p" className="text-sm text-gray-500">
                            {location}
                        </Text>
                    </div>
                </div>
                <div>{isAttending && <Icon name="check-circle" className="text-blue-500" />}</div>
            </div>
            <div className="mt-2 flex space-x-2">
                {/* {/* Участники  */}
                {/* {[...Array(participantsCount)].map((_, index) => ( */}
                {/*     <Avatar key={index} src={`https://example.com/avatar${index + 1}.jpg`} size="small" /> */}
                {/* ))} */}
            </div>
        </div>
    );
};

export default EventCard;
