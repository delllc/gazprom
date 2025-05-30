import DropdownItem from '@/components/atoms/DropdownItem';
import React from 'react';

interface DropdownMenuProps {
    items: {
        label: string;
        onClick?: () => void;
    }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ items }) => {
    return (
        <div className="absolute right-0 mt-2 w-48 rounded bg-white py-2 shadow">
            {items.map((item, index) => (
                <DropdownItem key={index} onClick={item.onClick}>
                    {item.label}
                </DropdownItem>
            ))}
        </div>
    );
};

export default DropdownMenu;
