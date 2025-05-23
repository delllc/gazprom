## 1. Аутентификация и управление пользователями
- [x] Вход/выход (JWT/OAuth2)

- [ ] Администратор выдает логины/пароли сотрудникам. (50%)

- [x] Управление сессиями.

- [x] Восстановление пароля

--- 
Роли пользователей (admin / employee)

Отдельные таблицы: users (для входа) + employees (профиль).

Либо единая таблица с полем role (не рекомендуется).

## Модели базы данных

--- 
Пользователи (id, username, password, name, role)

Сотрудники (id, first_name, last_name, position, department, email, phone)

События (id, title, description, date, participants[] (ID участников))

Задачи (id, user_id, title, description, completed, created_at, expires_after)

Документы (id, name, type (общие/нормативные/стили), file_path, uploaded_by)

Новости (id, title, content, image, date, short_desc)

Уведомления (id, user_id, message, is_read, created_at)

--- 

## Основные функции

--- 

- [x] Глобальный поиск

- [x] Поиск по документам, сотрудникам, новостям.

- [x] Система уведомлений

- [x] Рассылка от админа (изменения в документах, мероприятия).

- [x] Отображение количества непрочитанных в шапке.

- [x] Календарь и события

- [x] Показывает количество участников + кнопка "Показать все".

- [x] Задачи

- [x] Отметка выполнения → автоматическое удаление через 7 дней.

- [x] Список сотрудников

- [x] Фильтр по отделам, поиск по ФИО.

- [x] Управление документами

- [x] Загрузка/скачивание (общие, нормативные, фирменные стили).

- [x] Медиабиблиотека

- [x] Файлы в папках, загрузка через админа.

- [x] Новости и публикации

- [x] Пагинация (6 записей + "Загрузить еще").

## Примеры API-эндпоинтов

--- 
POST /auth/login

POST /auth/recover-password (отправляет запрос админу)

GET /events?date=YYYY-MM-DD (события в календаре)

POST /tasks (создание/завершение задач)

GET /employees?department=IT (фильтр по отделам)

GET /documents?type=normative

POST /notifications (рассылка уведомлений)


## Install and requirements
---

1. npm i && composer require
2. installed Herd 
3. edit .env.example in db connection in your data 
4. php artisan migrate
5. npm run dev
6. >> http://localhost
