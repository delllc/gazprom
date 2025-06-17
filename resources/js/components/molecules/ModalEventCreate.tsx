import axios from 'axios';
import React, { useState } from 'react';

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.post('/events', {
                title,
                location,
                start_date: startDate,
            });

            window.location.reload(); // или обнови список событий через useEffect
        } catch (err: any) {
            console.error('Ошибка:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Не удалось создать мероприятие');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="w-[400px] rounded bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-xl font-bold">Добавить мероприятие</h2>

                {error && <p className="mb-4 text-red-500">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Название"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mb-4 w-full rounded border-gray-300 px-3 py-2"
                    />

                    <input
                        type="text"
                        placeholder="Место проведения"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="mb-4 w-full rounded border-gray-300 px-3 py-2"
                    />

                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mb-4 w-full rounded border-gray-300 px-3 py-2"
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 ${loading ? 'cursor-not-allowed opacity-60' : ''}`}
                        >
                            {loading ? 'Загрузка...' : 'Создать'}
                        </button>
                        <button type="button" onClick={onClose} className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300">
                            Закрыть
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
