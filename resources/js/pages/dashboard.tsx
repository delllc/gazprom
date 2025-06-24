import { Layout } from '@/components/templates/Layout';
import { useEffect, useState } from 'react';

interface News {
    id: number;
    title: string;
    short_description: string;
    image: string;
    user: {
        username: string;
    };
}

export default function Dashboard() {
    const [news, setNews] = useState<News[]>([]);
    const [selectedNews, setSelectedNews] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/news')
            .then((res) => res.json())
            .then((data) => {
                setNews(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Ошибка загрузки новостей:', err);
                setError('Не удалось загрузить новости');
                setLoading(false);
            });
    }, []);

    console.log(news);
    return (
        <Layout>
            {/* Заголовок страницы */}
            <h1 className="mb-6 text-2xl font-bold">Новости / Публикации</h1>

            <div className="grid w-[75%] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {news.map((item) => (
                    <a
                        onClick={() => setSelectedNews(item)}
                        key={item.id}
                        className="block flex flex-col overflow-hidden rounded bg-white shadow transition-shadow hover:shadow-md"
                    >
                        <div className="flex flex-grow flex-col justify-between space-y-2 p-4">
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <p className="text-gray-600">{item.short_description}</p>
                            <div className="text-sm text-gray-500">Автор: {item.user?.username || 'Аноним'}</div>
                        </div>
                    </a>
                ))}
                {selectedNews && (
                    <div className="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedNews(null)}>
                        <div
                            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
                                onClick={() => setSelectedNews(null)}
                            >
                                &times;
                            </button>

                            <div className="p-6">
                                <h2 className="mb-4 text-2xl font-bold">{selectedNews.title}</h2>
                                <p className="mb-4 text-gray-700">{selectedNews.content}</p>
                                <p className="text-sm text-gray-500">
                                    Автор: <span className="font-medium">{selectedNews.user?.username || 'Аноним'}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
