import { Layout } from '@/components/templates/Layout';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Employee {
    id: number;
    username: string;
    email: string;
    role: string;
    department: string;
    phone: string;
    position: string;
}
const allDepartaments = ['HR', 'IT', 'Sales'];

const Employees: React.FC = () => {
    const { employees } = usePage().props;
    const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
    const [showMenu, setShowMenu] = useState(false);

    // Функция для выбора департамента
    const handleSelectDepartment = (department: string) => {
        if (department === selectedDepartment) {
            setSelectedDepartment(null); // Сброс при повторном клике
        } else {
            setSelectedDepartment(department);
        }
        setShowMenu(false);
    };

    // Фильтруем сотрудников: выбранный департамент вверху
    const sortedEmployees = [...employees].sort((a, b) => {
        const aMatch = a.departament === selectedDepartment ? -1 : 1;
        const bMatch = b.departament === selectedDepartment ? -1 : 1;

        return aMatch - bMatch; // Сначала совпадения, потом остальные
    });

    return (
        <Layout>
            <h1 className="mb-6 text-2xl font-bold">Список сотрудников</h1>

            {/* Таблица */}
            <div className="relative w-[75%] overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                        <tr>
                            <th scope="col" className="bg-gray-50 px-6 py-3 dark:bg-gray-800">
                                ФИО
                            </th>
                            <th scope="col" className="relative cursor-pointer px-6 py-3" onClick={() => setShowMenu(!showMenu)}>
                                <div className="flex items-center justify-between">
                                    Департамент
                                    <svg className="ms-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>

                                {/* Выпадающее меню */}
                                {showMenu && (
                                    <div className="absolute top-full left-0 z-10 mt-1 max-h-40 w-40 overflow-y-auto rounded border bg-white p-2 shadow dark:border-gray-600 dark:bg-gray-700">
                                        <ul className="space-y-1">
                                            <li>
                                                <button
                                                    onClick={() => setSelectedDepartment(null)}
                                                    className="block w-full rounded px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                                                >
                                                    Все департаменты
                                                </button>
                                            </li>
                                            {allDepartaments.map((department) => (
                                                <li key={department}>
                                                    <button
                                                        onClick={() => handleSelectDepartment(department)}
                                                        className="block w-full rounded px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                                                    >
                                                        {department}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </th>
                            <th scope="col" className="bg-gray-50 px-6 py-3 dark:bg-gray-800">
                                Позиция
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="bg-gray-50 px-6 py-3">
                                Телефон
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEmployees.map((employee) => (
                            <tr key={employee.id} className="border-b border-gray-200 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="bg-gray-50 px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:bg-gray-800 dark:text-white"
                                >
                                    {employee.username}
                                </th>
                                <td className="px-6 py-4">{employee.departament}</td>
                                <td className="bg-gray-50 px-6 py-4 dark:bg-gray-800">{employee.position}</td>
                                <td className="px-6 py-4">{employee.email}</td>
                                <td className="bg-gray-50 px-6 py-4">{employee.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Employees;
