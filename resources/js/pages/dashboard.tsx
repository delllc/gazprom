import { Calendar } from '@/components/organism/Calendar';
import { EventList } from '@/components/organism/EventList';
import { Layout } from '@/components/templates/Layout';

const events = [
    {
        title: 'Event 1',
        dateTime: new Date(),
        location: 'Moscow',
        organizerName: 'Organizer 1',
    },
];

const sidebarMenu = [
    {
        label: 'Список сотрудников',
        to: '/',
    },
    {
        label: 'Общие документы',
        to: '/',
    },
    {
        label: 'Нормативные документы',
        to: '/',
    },
    {
        label: 'Фирменные стили',
        to: '/',
    },

    {
        label: 'Мультимедийная библиотека',
        to: '/',
    },
];

export default function Dashboard() {
    // return (
    //     <AppLayout breadcrumbs={breadcrumbs}>
    //         <Head title="Dashboard" />
    //         <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
    //             <div className="grid auto-rows-min gap-4 md:grid-cols-3">
    //                 <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
    //                     <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
    //                 </div>
    //                 <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
    //                     <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
    //                 </div>
    //                 <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
    //                     <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
    //                 </div>
    //             </div>
    //             <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
    //                 <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
    //             </div>
    //         </div>
    //     </AppLayout>
    // );
    return (
        <Layout sidebarMenu={sidebarMenu}>
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

                {/* Правый блок с календарем и событиями */}
                <div className="col-span-1 space-y-6">
                    <Calendar events={events} />
                    <EventList events={events} />
                </div>
            </div>
        </Layout>
    );
}
