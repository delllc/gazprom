import { Layout } from '@/components/templates/Layout';

export default function Dashboard() {
    return (
        <Layout>
            {/* Заголовок страницы */}
            <h1 className="mb-6 text-2xl font-bold">Новости / Публикации</h1>

            {/* Основной контент */}
            <div className="grid grid-cols-3 gap-6">
                {/* Левый блок с новостями */}
                <div className="col-span-2 space-y-6">
                    {/* Пример карточки новости */}
                    <div className="rounded bg-white p-4 shadow">
                        <h2 className="text-lg font-semibold">Важные обновления системы</h2>
                        <p className="mt-2 text-gray-700">Мы внедрили новые функции безопасности и улучшили производительность.</p>
                    </div>

                    {/* Еще одна новость */}
                    <div className="rounded bg-white p-4 shadow">
                        <h2 className="text-lg font-semibold">Изменения в графике отпусков</h2>
                        <p className="mt-2 text-gray-700">Новые правила распределения отпусков будут действовать с 1 июня.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
