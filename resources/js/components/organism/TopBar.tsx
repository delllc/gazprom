import NotificationBell from '@/components/atoms/NotificationBell';
import Text from '@/components/atoms/Text';
import { SharedData, type User } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import React from 'react';
import { SearchDropdown } from '../molecules/SearchDropdown';
import Dropdown from './Dropdown';

interface TopBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit: () => void;
    notificationsCount?: number;
    User?: User;
}

export const TopBar: React.FC<TopBarProps> = ({ searchValue, onSearchChange, onSearchSubmit, notificationsCount = 0 }) => {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const handleLogout = async () => {
        try {
            await axios.post('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    // Получаем CSRF-токен из мета-тега (если ты не используешь Sanctum)
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                credentials: 'same-origin', // важно для отправки сессионных кук
            });

            // Перенаправляем на страницу логина после выхода
            window.location.reload();
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };
    return (
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
            {/* Поиск */}
            <div>
                <SearchDropdown />
            </div>

            {/* Иконки справа */}
            <div className="z-20 flex items-center space-x-4">
                <NotificationBell />
                <Text as="p" className="text-gray-500">
                    {auth.user.username}
                </Text>
                <Dropdown triggerIcon="mdi:chevron-down" items={[{ label: 'Выйти', onClick: () => handleLogout() }]} />
            </div>
        </header>
    );
};
