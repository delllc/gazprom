// src/components/atoms/DropdownTrigger.tsx
import Icon from '@/components/atoms/Icon';
import React from 'react';

interface DropdownTriggerProps {
    onClick?: () => void;
    icon?: string;
}

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ onClick, icon }) => {
    return (
        <button type="button" className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none" onClick={onClick}>
            {icon && <Icon name={icon} className="ml-2" />}
        </button>
    );
};

export default DropdownTrigger;
