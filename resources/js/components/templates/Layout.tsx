import { RightSidebar } from '@/components/organism/RightSidebar';
import { Sidebar } from '@/components/organism/Sidebar';
import { TopBar } from '@/components/organism/TopBar';
import React from 'react';

const sidebarMenu = [
    {
        label: 'Список сотрудников',
        to: '/employees',
    },
    {
        label: 'Общие документы',
        to: '/document',
    },
    {
        label: 'Нормативные документы',
        to: '/document?type=normative',
    },
    {
        label: 'Фирменные стили',
        to: '/document?type=firm',
    },

    {
        label: 'Мультимедийная библиотека',
        to: '/',
    },
];

export const Layout: React.FC = ({ children }) => {
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
                <main className="h-full overflow-auto bg-gray-100 p-6">{children}</main>
                <div className="fixed top-[59px] right-0 h-full w-72 overflow-y-auto">
                    <RightSidebar />
                </div>
            </div>
        </div>
    );
};
