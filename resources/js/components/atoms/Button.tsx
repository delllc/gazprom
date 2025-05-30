import { cn } from '@/lib/utils';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary', size = 'medium', disabled = false }) => {
    const buttonClasses = cn(
        'transition-color rounded px-4 py-2 font-bold',
        {
            'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
            'bg-gray-300 text-gray-800 hover:bg-gray-400': variant === 'secondary',
        },
        {
            'text-sm': size === 'small',
            'text-base': size === 'medium',
            'text-lg': size === 'large',
        },
        { 'cursosr-not-allowed opacity-50': disabled },
    );

    return (
        <button type="button" className={buttonClasses} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;
