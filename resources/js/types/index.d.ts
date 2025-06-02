import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    username: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

// types/models.ts

// Пользователь
// User
export interface User {
    id: number;
    username: string;
    departamnet: string;
    position: string;
    role: 'admin' | 'employee';
    email: string;
    phone?: string;
}

// Event
interface Event {
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date?: string;
    participants_count?: number;
    is_participating?: boolean;
}

// Task
interface Task {
    id: number;
    user_id: number;
    title: string;
    description?: string;
    completed: boolean;
    completed_at?: string;
    created_at: string;
}

// Document
interface Document {
    id: number;
    name: string;
    type: 'general' | 'normative' | 'styles';
    file_path: string;
    uploaded_by: number;
    created_at: string;
}

// Notification
interface Notification {
    id: number;
    user_id: number;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

// Media
interface MediaFolder {
    id: number;
    name: string;
    parent_id?: number;
}

interface Media {
    id: number;
    name: string;
    description?: string;
    file_path: string;
    type: string;
    folder_id?: number;
    uploaded_by: number;
    created_at: string;
}

// News
interface News {
    id: number;
    title: string;
    content: string;
    image?: string;
    published_at: string;
    short_description: string;
    author_id: number;
    author?: User;
}
