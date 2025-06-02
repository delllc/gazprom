import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';

interface SearchResult {
    results: {
        users: Array<{ id: number; username: string; email: string }>;
        documents: Array<{ id: number; title: string; type: string }>;
        news: Array<{ id: number; title: string; short_description?: string }>;
    };
}

export const SearchDropdown: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult['results']>({
        users: [],
        documents: [],
        news: [],
    });
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Дебаунс для поиска
    useEffect(() => {
        if (query.length < 2) {
            setResults({ users: [], documents: [], news: [] });
            setIsOpen(false);
            return;
        }

        setLoading(true);
        const timer = setTimeout(() => {
            axios
                .get(`/search?query=${encodeURIComponent(query)}`)
                .then((res) => {
                    console.log('Ответ от API:', res.data); // 👈 Посмотри здесь
                    setResults(res.data.results);
                    setIsOpen(true);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Ошибка поиска:', err);

                    setLoading(false);
                });
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="relative">
            {/* <input */}
            {/*     type="text" */}
            {/*     placeholder="Поиск..." */}
            {/*     value={query} */}
            {/*     onChange={(e) => setQuery(e.target.value)} */}
            {/*     className="w-full rounded border p-2" */}
            {/* /> */}
            <SearchBar type="text" placeholder="Поиск" value={query} onChange={(e) => setQuery(e.target.value)} />

            {/* Индикатор загрузки */}
            {loading && <div className="absolute top-2 right-2 text-gray-400">Загрузка...</div>}

            {/* Выпадающий список */}
            {isOpen && query.length >= 2 && (
                <div className="absolute z-10 mt-2 max-h-96 w-full overflow-y-auto rounded border border-gray-200 bg-white shadow-md">
                    {/* Сотрудники */}
                    {results.users.length > 0 && (
                        <div className="p-4">
                            <h3 className="mb-2 text-sm font-semibold">Сотрудники</h3>
                            <ul>
                                {results.users.map((user) => (
                                    <li key={`user-${user.id}`} className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
                                        <a href={`/employees/${user.id}`}>
                                            {user.name} — {user.email}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Документы */}
                    {results.documents.length > 0 && (
                        <div className="border-t border-b border-gray-200 p-4">
                            <h3 className="mb-2 text-sm font-semibold">Документы</h3>
                            <ul>
                                {results.documents.map((doc) => (
                                    <li key={`doc-${doc.id}`} className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
                                        <a href={`/documents/${doc.id}`}>
                                            {doc.name} ({doc.type})
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Новости */}
                    {results.news.length > 0 && (
                        <div className="p-4">
                            <h3 className="mb-2 text-sm font-semibold">Новости</h3>
                            <ul>
                                {results.news.map((item) => (
                                    <li key={`news-${item.id}`} className="cursor-pointer rounded px-2 py-1 hover:bg-gray-100">
                                        <a href={`/news/${item.id}`}>{item.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Если ничего не найдено */}
                    {!results.users.length && !results.documents.length && !results.news.length && (
                        <div className="p-4 text-sm text-gray-500">Ничего не найдено</div>
                    )}
                </div>
            )}
        </div>
    );
};
