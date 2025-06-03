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

    return (
        <Layout>
            {/* Заголовок страницы */}
            <h1 className="mb-6 text-2xl font-bold">Новости / Публикации</h1>

            <div className="grid w-[75%] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {news.map((item) => (
                    <a
                        href={`/news/${item.id}`}
                        key={item.id}
                        className="block overflow-hidden rounded bg-white shadow transition-shadow hover:shadow-md"
                    >
                        <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-bold">{item.title}</h3>
                            <p className="mt-2 text-gray-600">{item.short_description}</p>
                            <div className="mt-4 text-sm text-gray-500">Автор: {item.user?.username || 'Аноним'}</div>
                        </div>
                    </a>
                ))}
            </div>
        </Layout>
    );
}
