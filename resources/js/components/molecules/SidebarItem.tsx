import { cn } from '@/lib/utils';
import Text from '../atoms/Text';

interface SidebarItem {
    label: string;
    to?: string;
    onClick?: () => void;
    className?: string;
}

const SidebarItem: React.FC<SidebarItem> = ({ label, to, className, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className={(cn('flex cursor-pointer items-center p-2 hover:bg-gray-200'), className)} onClick={handleClick}>
            <Text as="span" className="text-[13px]">
                {label}
            </Text>
        </div>
    );
};

export default SidebarItem;
