import Icon from '../atoms/Icon';
import Input from '../atoms/Input';

interface SearchBarProps {
    onSearch: () => void;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder, ...props }) => {
    return (
        <div className="flex items-center rounded">
            <Icon name="search" className="mr-2 text-gray-500" />
            <Input value={value} onChange={onChange} placeholder={placeholder || 'Поиск'} {...props} />
        </div>
    );
};

export default SearchBar;
