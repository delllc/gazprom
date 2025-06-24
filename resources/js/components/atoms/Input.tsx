import Icon from '@/components/atoms/Icon';
import { cn } from '@/lib/utils';
import * as React from 'react';

function Input({ className, ...props }: React.ComponentProps<'input'>) {
    const inputClasses = cn('focus-outline-none h-[100%] w-[100%] pl-[44px]', className);

    return (
        <div className="relative h-[38px] w-[388px] border border-[#D5D5D5] bg-[#F5F6FA]">
            {props.isIcon && <Icon name="mdi:search" className="absolute top-[11px] left-[16px] opacity-50" width={15} height={15} />}
            <input className={inputClasses} {...props} />
        </div>
    );
}

export default Input;
