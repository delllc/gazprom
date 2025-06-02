import { addMonths, endOfMonth, startOfMonth, subMonths } from 'date-fns';

/**
 * Получить количество дней в текущем месяце.
 * @param date - Дата для определения количества дней.
 * @returns Количество дней в месяце.
 */
export function getDaysInMonth(date: Date): number[] {
    const firstDay = startOfMonth(date);
    const lastDay = endOfMonth(date);
    const days: number[] = [];

    let currentDate = firstDay;
    while (currentDate <= lastDay) {
        days.push(currentDate.getDate());
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }

    return days;
}

/**
 * Получить номер первого дня недели в месяце.
 * @param date - Дата для определения первого дня недели.
 * @returns Номер первого дня недели (0 — воскресенье, 6 — суббота).
 */
export function getFirstDayOfWeek(date: Date): number {
    return startOfMonth(date).getDay();
}

/**
 * Перейти к предыдущему месяцу.
 * @param date - Текущая дата.
 * @returns Дата начала предыдущего месяца.
 */
export function prevMonth(date: Date): Date {
    return subMonths(date, 1);
}

/**
 * Перейти к следующему месяцу.
 * @param date - Текущая дата.
 * @returns Дата начала следующего месяца.
 */
export function nextMonth(date: Date): Date {
    return addMonths(date, 1);
}
