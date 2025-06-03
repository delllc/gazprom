import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Icon from './Icon';

interface Notification {
    id: number;
    message: string;
    is_read: boolean;
    created_at: string;
}

const NotificationBell: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [notificationsCount, setNotificationsCount] = useState(0);

    // Загружаем список уведомлений при открытии меню
    useEffect(() => {
        if (isOpen) {
            axios.get('/notifications').then((res) => {
                setNotifications(res.data || []);
            });
        }
    }, [isOpen]);
    // Автоматически загружаем количество непрочитанных уведомлений

    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const res = await axios.get('/notifications/unread-count');
                setNotificationsCount(res.data.count || 0);
            } catch (err) {
                console.error('Ошибка загрузки количества уведомлений', err);
            }
        };

        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000); // Обновление каждые 30 секунд

        return () => clearInterval(interval);
    }, []);

    // Пометить как прочитанное
    const handleNotificationClick = async (id: number) => {
        try {
            await axios.patch(`/notifications/${id}/read`);
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
            setNotificationsCount((prev) => Math.max(0, prev - 1));
        } catch (err) {
            console.error('Ошибка при пометке как прочитанное:', err);
        }
    };

    return (
        <div className="relative">
            <Icon
                name="mdi-bell"
                className="h-6 w-6 cursor-pointer text-gray-700 transition hover:text-blue-600"
                onClick={() => setIsOpen(!isOpen)}
            />

            {notificationsCount > 0 && (
                <span className="absolute top-[-5px] right-[-5px] rounded-full bg-gray-700 px-1 text-xs text-white">{notificationsCount}</span>
            )}

            {/* Выпадающее меню */}
            {isOpen && (
                <div className="absolute right-0 z-50 mt-2 max-h-96 w-80 overflow-y-auto rounded border bg-white p-4 shadow-lg">
                    <h3 className="mb-2 font-bold">Уведомления</h3>

                    {notifications.length === 0 ? (
                        <p className="text-sm text-gray-500">Нет новых уведомлений</p>
                    ) : (
                        <ul className="space-y-2">
                            {notifications.map((notif) => (
                                <li
                                    key={notif.id}
                                    className={`cursor-pointer ${notif.is_read ? 'text-gray-500' : 'font-semibold text-blue-600'}`}
                                    onClick={() => handleNotificationClick(notif.id)}
                                >
                                    <p className="text-sm">{notif.message}</p>
                                    <small className="text-xs">{new Date(notif.created_at).toLocaleString()}</small>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="mt-4 text-right">
                        <a href="/notifications" className="text-sm text-blue-600 hover:underline">
                            Все уведомления
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
