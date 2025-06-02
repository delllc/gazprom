import Icon from '@/components/atoms/Icon';
import React from 'react';

interface ArrowIconProps {
    direction: 'left' | 'right';
    onClick: () => void;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ direction, onClick }) => {
    const icon = direction === 'left' ? 'mdi:chevron-left' : 'mdi:chevron-right';
    return (
        <button type="button" className="h-[24px] w-[24px] cursor-pointer rounded bg-gray-200" onClick={onClick}>
            <Icon name={icon} />
        </button>
    );
};

export default ArrowIcon;
