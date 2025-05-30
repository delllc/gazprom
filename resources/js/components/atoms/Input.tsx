import Icon from '@/components/atoms/Icon';
import { cn } from '@/lib/utils';

interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: 'text' | 'number' | 'email' | 'password';
    required?: boolean;
    error?: string;
}

const Input: React.FC<InputProps> = ({ value, onChange, placeholder, type = 'text', required = false, error }) => {
    const inputClasses = cn('focus-outline-none h-[100%] w-[100%] pl-[44px]', { 'border-red-500': error });

    return (
        <div className="relative h-[38px] w-[388px] border border-[#D5D5D5] bg-[#F5F6FA]">
            <Icon name="mdi:search" className="absolute top-[11px] left-[16px] opacity-50" width={15} height={15} />
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={inputClasses}
                required={required}
            />
            {error && <p className="absolute bottom-[-10px] left-2 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
