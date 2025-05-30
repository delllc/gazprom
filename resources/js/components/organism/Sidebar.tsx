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
            <nav className="mt-[85px] flex-1 pl-[35px]">
                {menuItems.map((item, index) => (
                    <SidebarItem key={index} label={item.label} to={item.to} onClick={item.onClick} className="pb-[20px]" />
                ))}
            </nav>
        </aside>
    );
};
