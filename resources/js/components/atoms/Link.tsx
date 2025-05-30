import { Link } from '@inertiajs/react';

interface LinkProps {
    to: string;
    children: React.ReactNode;
    className?: string;
}

const TextLink: React.FC<LinkProps> = ({ to, children, className }) => {
    return (
        <Link href={to} className={className}>
            {children}
        </Link>
    );
};

export default TextLink;
