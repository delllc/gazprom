import { usePage } from '@inertiajs/react';

interface SearchResult {
    users: Array<{ id: number; name: string; email: string }>;
    documents: Array<{ id: number; name: string; type: string }>;
    news: Array<{ id: number; title: string }>;
}

export default function SearchResults() {
    const { results, query } = usePage().props as {
        results: SearchResult;
        query: string;
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-2xl font-bold">Результаты поиска: "{query}"</h1>

            {/* Сотрудники */}
            {results.users.length > 0 && (
                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold">Сотрудники</h2>
                    <ul>
                        {results.users.map((user) => (
                            <li key={`user-${user.id}`}>
                                <a href={`/employees/${user.id}`} className="text-blue-600 hover:underline">
                                    {user.name} — {user.email}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Документы */}
            {results.documents?.length > 0 && (
                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold">Документы</h2>
                    <ul>
                        {results.documents.map((doc) => (
                            <li key={`doc-${doc.id}`}>
                                <a href={`/documents/${doc.id}`} className="text-blue-600 hover:underline">
                                    {doc.name} — {doc.type}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Новости */}
            {results.news?.length > 0 && (
                <section className="mb-8">
                    <h2 className="mb-4 text-xl font-semibold">Новости</h2>
                    <ul>
                        {results.news.map((item) => (
                            <li key={`news-${item.id}`}>
                                <a href={`/news/${item.id}`} className="text-blue-600 hover:underline">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Если ничего не найдено */}
            {!results.users.length && !results.documents?.length && !results.news?.length && <p>Ничего не найдено по вашему запросу.</p>}
        </div>
    );
}
