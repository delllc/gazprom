import DropdownTrigger from '@/components/atoms/DropdownTrigger';
import DropdownMenu from '@/components/molecules/DropdownMenu';
import React, { useState } from 'react';

interface DropdownProps {
    triggerIcon?: string;
    items: {
        label: string;
        onClick?: () => void;
    }[];
}

const Dropdown: React.FC<DropdownProps> = ({ triggerIcon, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <DropdownTrigger icon={triggerIcon} onClick={toggleDropdown} />

            {isOpen && <DropdownMenu items={items} />}
        </div>
    );
};

export default Dropdown;
