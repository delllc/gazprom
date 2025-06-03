import { create } from 'zustand';

interface Note {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
}

interface NoteStore {
    notes: Note[];
    addNote: (title: string, content: string) => void;
    deleteNote: (id: number) => void;
}

// Вспомогательные функции для работы с localStorage
const loadNotes = (): Note[] => {
    const saved = localStorage.getItem('notes');
    if (!saved) return [];

    try {
        return JSON.parse(saved).map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt),
        }));
    } catch (e) {
        console.error('Ошибка парсинга localStorage', e);
        return [];
    }
};

const saveNotes = (notes: Note[]) => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

export const useNoteStore = create<NoteStore>((set) => ({
    notes: loadNotes(),
    addNote: (title, content) =>
        set((state) => {
            const newNote = {
                id: Date.now(),
                title,
                content,
                createdAt: new Date(),
            };

            const updatedNotes = [newNote, ...state.notes];
            saveNotes(updatedNotes);

            return { notes: updatedNotes };
        }),
    deleteNote: (id) =>
        set((state) => {
            const updatedNotes = state.notes.filter((note) => note.id !== id);
            saveNotes(updatedNotes);
            return { notes: updatedNotes };
        }),
}));
