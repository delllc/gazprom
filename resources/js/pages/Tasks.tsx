import { Layout } from '@/components/templates/Layout';
import { useTaskStore } from '@/lib/useTaskStore';
import { useState } from 'react';

export default function Tasks() {
    const { tasks, addTask, toggleTask, deleteTask } = useTaskStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = () => {
        if (!title || !description) return;

        addTask(title, description);
        setTitle('');
        setDescription('');
        setIsModalOpen(false);
    };

    const activeTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    return (
        <Layout>
            <h1 className="mb-6 text-2xl font-bold">Задачи</h1>

            {/* Кнопка создания */}
            <button onClick={() => setIsModalOpen(true)} className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                + Новая задача
            </button>

            {/* Модальное окно */}
            {isModalOpen && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="w-[400px] rounded bg-white p-6 shadow-lg">
                        <h2 className="mb-4 text-xl font-semibold">Создать задачу</h2>
                        <input
                            type="text"
                            placeholder="Название задачи"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mb-4 w-full rounded border-gray-300 px-3 py-2"
                        />
                        <textarea
                            placeholder="Описание задачи"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mb-4 w-full rounded border-gray-300 px-3 py-2"
                            rows={3}
                        ></textarea>
                        <div className="flex justify-end gap-2">
                            <button onClick={handleAddTask} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                                Сохранить
                            </button>
                            <button onClick={() => setIsModalOpen(false)} className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400">
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Список задач */}
            <div className="mt-6 grid w-[800px] grid-cols-1 md:grid-cols-2">
                {/* Активные задачи */}
                <div>
                    <h2 className="mb-4 text-lg font-bold">Активные задачи</h2>
                    <div className="w-[350px] space-y-4">
                        {activeTasks.length === 0 ? (
                            <p className="text-gray-500">Нет активных задач</p>
                        ) : (
                            activeTasks.map((task) => (
                                <div key={task.id} className="relative rounded bg-white p-4 shadow-md">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-base font-semibold">{task.title}</h3>
                                            <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => toggleTask(task.id)} className="text-green-600 hover:text-green-800">
                                                ✓
                                            </button>
                                            <button onClick={() => deleteTask(task.id)} className="text-red-600 hover:text-red-800">
                                                &times;
                                            </button>
                                        </div>
                                    </div>
                                    <small className="mt-2 block text-xs text-gray-400">{new Date(task.createdAt).toLocaleString()}</small>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Завершённые задачи */}
                <div>
                    <h2 className="mb-4 text-lg font-bold">Завершённые задачи</h2>
                    <div className="w-[350px] space-y-4">
                        {completedTasks.length === 0 ? (
                            <p className="text-gray-500">Нет завершённых задач</p>
                        ) : (
                            completedTasks.map((task) => (
                                <div key={task.id} className="relative rounded bg-gray-100 p-4 shadow">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-base text-gray-400 line-through">{task.title}</h3>
                                            <p className="mt-1 text-sm text-gray-400 line-through">{task.description}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => toggleTask(task.id)} className="text-yellow-600 hover:text-yellow-800">
                                                ↺
                                            </button>
                                            <button onClick={() => deleteTask(task.id)} className="text-red-600 hover:text-red-800">
                                                &times;
                                            </button>
                                        </div>
                                    </div>
                                    <small className="mt-2 block text-xs text-gray-400">{new Date(task.createdAt).toLocaleString()}</small>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
