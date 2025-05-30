import NotificationBell from '@/components/atoms/NotificationBell';
import Text from '@/components/atoms/Text';
import SearchBar from '@/components/molecules/SearchBar';
import React from 'react';
import Dropdown from './Dropdown';

interface TopBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit: () => void;
    notificationsCount?: number;
}

export const TopBar: React.FC<TopBarProps> = ({ searchValue, onSearchChange, onSearchSubmit, notificationsCount = 0 }) => {
    return (
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
            {/* Поиск */}
            <div>
                <SearchBar value={searchValue} onChange={onSearchChange} onSearch={onSearchSubmit} />
            </div>

            {/* Иконки справа */}
            <div className="flex items-center space-x-4">
                <NotificationBell notificationsCount={notificationsCount} />
                <Text as="p" className="text-gray-500">
                    Константин В.Л.
                </Text>
                <Dropdown triggerIcon="mdi:chevron-down" items={[{ label: 'Профиль', onClick: () => alert('Profile') }]} />
            </div>
        </header>
    );
};
