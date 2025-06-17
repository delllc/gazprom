import { create } from 'zustand';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}

interface TaskStore {
    tasks: Task[];
    addTask: (title: string, description: string) => void;
    toggleTask: (id: number) => void;
    deleteTask: (id: number) => void;
}

const loadTasks = (): Task[] => {
    const saved = localStorage.getItem('tasks');
    if (!saved) return [];

    try {
        return JSON.parse(saved).map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
        }));
    } catch {
        return [];
    }
};

const saveTasks = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const useTaskStore = create<TaskStore>((set) => ({
    tasks: loadTasks(),
    addTask: (title, description) =>
        set((state) => {
            const newTask = {
                id: Date.now(),
                title,
                description,
                completed: false,
                createdAt: new Date(),
            };

            const updatedTasks = [...state.tasks, newTask];
            saveTasks(updatedTasks);

            return { tasks: updatedTasks };
        }),
    toggleTask: (id) =>
        set((state) => {
            const updatedTasks = state.tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task));

            saveTasks(updatedTasks);
            return { tasks: updatedTasks };
        }),
    deleteTask: (id) =>
        set((state) => {
            const updatedTasks = state.tasks.filter((task) => task.id !== id);
            saveTasks(updatedTasks);
            return { tasks: updatedTasks };
        }),
}));
