import { Layout } from '@/components/templates/Layout';
import { usePage } from '@inertiajs/react';
import React from 'react';

interface Document {
    id: number;
    title: string;
    category: string;
    content: string;
}

export const Documents: React.FC = () => {
    const { documents } = usePage().props;
    console.log(documents);
    return (
        <Layout>
            <h1 className="mb-6 text-2xl font-bold">Документы</h1>

            <div className="relative w-[75%] overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Название
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Тип
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Пользователь
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Действие
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((doc) => (
                            <tr className="bg-white dark:bg-gray-800">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                    {doc.title}
                                </th>
                                <td className="px-6 py-4">{doc.type}</td>
                                <td className="px-6 py-4">{doc.user?.username || 'Пусто'}</td>
                                <td className="px-6 py-4">
                                    <a download href={doc.file_path} className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                                        Скачать
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Documents;
