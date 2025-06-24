import SidebarItem from '@/components/molecules/SidebarItem';
import React from 'react';

interface SidebarProps {
    menuItems: {
        label: string;
        to?: string;
        onClick?: () => void;
    }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
    return (
        <aside className="flex h-full w-64 flex-col text-[#202224]">
            <img src="check.png" alt="logo" className="mt-6 ml-[35px] h-6 w-20" />
            <nav className="mt-[50px] flex-1 pl-[35px]">
                {menuItems.map((item, index) => (
                    <SidebarItem key={index} label={item.label} to={item.to} onClick={item.onClick} className="pb-[20px]" />
                ))}
            </nav>
        </aside>
    );
};
