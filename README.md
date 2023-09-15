# Hotel Booking

## Description

Project description goes here

## Version v.0.2

> Сервер:

Реализованы следующие функции:

- **Создание**, **Редактирование**, **Отображение**, **Удаление** для таблицы "Room"
  - Проверка на существование комнаты с таким же номером
- **Создание**, **Редактирование**, **Отображение**, **Удаление** для таблицы "Status room"
  - Проверка на существование статуса с таким же названием
- **Создание**, **Редактирование**, **Отображение**, **Удаление** для таблицы "Type room" - Проверка на существование типа с таким же названием - **Создание**, **Редактирование**, **Отображение**, **Удаление** для таблицы "Facility room" - Проверка на существование услуги с таким же названием - Автоматическое **Создание**, и **Удаление** записей связующей таблицы "Facility connection"
  > Клиент:

Добавлено:

&emsp;&emsp;Создана **Главная страница**, а так же такие страницы как: **Обзор**, **Оформление**, **Гости**, **Комнаты**, **Акции**, **Расценки**, **Дополнительно**.

&emsp;&emsp;Страница **Комнаты** наполнена контентом, в частности кнопки сортировки (нет функционала), таблица (фиктивные, статичные данные), кнопка создания **Новой комнаты**.
Страница создания **Новой комнаты** заполнена полями ввода

&emsp;&emsp;На странице **Дополнительно** добавлена таблица **Статус комнаты** (фиктивные, статичные данные).

Реализованы следующие функции:

- Функция раскрывания и закрытия меню, по нажатию на кнопку
- Смена тем **Светлая** и **Темная**
- Функция навигации между страницами
- Пагинация таблиц
- Переход на страницу **Добавить комнату** и обратно
- Поля выбора с раскрывающимися данными (фиктивные, статичные данные)
- Создание новой комнаты
- Отображение всплывающих окон
- Прелоудер для запросов на сервер
  > Проблемы (исправить):
- Отображением всплывающих окон при повторном переходе на страницу **Добавить комнату** (2 раза отображает сообщение об ошибке)
