import { Icon as LucideIcon } from '@iconify-icon/react';

interface IconProps {
    name: string;
    className?: string;
    width?: number;
    height?: number;
    onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ name, className, width = 24, height = 24, onClick }) => {
    return <LucideIcon icon={name} className={className} width={width} height={height} onClick={onClick} />;
};

export default Icon;
