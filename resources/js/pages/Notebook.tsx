import { Layout } from '@/components/templates/Layout';
import { useNoteStore } from '@/lib/useNoteStore';
import React from 'react';

export default function Notebook() {
    const { notes, addNote, deleteNote } = useNoteStore();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const handleAddNote = () => {
        if (!title.trim() || !content.trim()) return;

        addNote(title, content);
        setTitle('');
        setContent('');
    };

    return (
        <Layout>
            <h1 className="mb-6 text-2xl font-bold">Блокнот</h1>

            {/* Форма добавления */}
            <div className="mb-6 rounded bg-white p-4 shadow" style={{ width: '75%' }}>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-2 w-full rounded border-gray-300 px-3 py-2"
                />
                <textarea
                    placeholder="Содержание заметки..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mb-4 w-full rounded border-gray-300 px-3 py-2"
                    rows={4}
                ></textarea>
                <button onClick={handleAddNote} className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                    Добавить запись
                </button>
            </div>

            {/* Список заметок */}
            <div className="space-y-4">
                {notes.length === 0 ? (
                    <p className="text-gray-500">Нет записей. Начни делать заметки!</p>
                ) : (
                    notes.map((note) => (
                        <div key={note.id} className="relative w-[75%] rounded bg-white p-4 shadow-md">
                            <button onClick={() => deleteNote(note.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                                &times;
                            </button>

                            <h2 className="text-lg font-semibold">{note.title}</h2>
                            <p className="mt-2 text-gray-700">{note.content}</p>
                            <small className="mt-2 block text-gray-400">{note.createdAt.toLocaleString()}</small>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
}
