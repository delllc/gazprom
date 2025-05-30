import { cn } from '@/lib/utils';

interface TextProps {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    className?: string;
    children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ as = 'p', className, children }) => {
    const Component = as;
    return <Component className={cn('text-gtoray-700', className)}>{children}</Component>;
};

export default Text;
