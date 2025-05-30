import Icon from '@/components/atoms/Icon';
import { cn } from '@/lib/utils';

interface NotificationBellProps {
    notificationsCount?: number;
    onClick?: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ notificationsCount = 0, onClick }) => {
    const bellClasess = cn('cursor-pointer', {
        'text-gray-600': notificationsCount > 0,
    });

    return (
        <div onClick={onClick} className="relative">
            <Icon name="mdi-bell" className={bellClasess} />
            {notificationsCount > 0 && (
                <span className="absolute top-[-5px] right-[-5px] rounded-full bg-gray-700 px-1 text-xs text-white">{notificationsCount}</span>
            )}
        </div>
    );
};

export default NotificationBell;
