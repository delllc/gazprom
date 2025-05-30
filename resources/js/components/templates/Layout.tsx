import { Sidebar } from '@/components/organism/Sidebar';
import { TopBar } from '@/components/organism/TopBar';
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
    sidebarMenu: {
        label: string;
        icon: string;
        to?: string;
        onClick?: () => void;
    }[];
}

export const Layout: React.FC<LayoutProps> = ({ children, sidebarMenu }) => {
    return (
        <div className="flex h-screen">
            {/* Боковая панель */}
            <Sidebar menuItems={sidebarMenu} />

            {/* Основной контент */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Верхняя панель */}
                <TopBar
                    searchValue="5"
                    onSearchSubmit={() => {}}
                    onSearchChange={(value) => {
                        console.log(value);
                    }}
                    notificationsCount={5}
                />

                {/* Основное содержимое страницы */}
                <main className="overflow-auto bg-gray-100 p-6">{children}</main>
            </div>
        </div>
    );
};
