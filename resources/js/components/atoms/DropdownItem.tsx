import React from 'react';

interface DropdownItemProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ children, onClick }) => {
    return (
        <button type="button" className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100" onClick={onClick}>
            {children}
        </button>
    );
};

export default DropdownItem;
