# Для начала ❗

## Клонировать репо 💎

```
git clone https://github.com/da-b1rmuda/HotelBooking.git
```

# Гайд по развёртыванию в Docker 🐳

## Если деплой для локальной среды 🔨

### Загружаем дамп БД 📀

- переходим в директорию /hotel-booking-postgres/data-set
- кладём туда дамп БД (.sql)
- следуем дальнейшим указаниям по установке

### Запуск контейнеров 🟩

```
docker compose -f docker-compose.dev.yml -p super_duper up -d
```

### Остановка контейнеров 🟥

```
docker compose -p super_duper down
```

## Если деплой для прода 💢💢💢

ещё нет прода, обойдёмся без него😐

# Гайд по развёртыванию через PM2 💻

## Установка зависимостей ⛓

С помощью npm:

```
npm i -g pm2
```

С помощью yarn:

```
yarn add pm2 --global
```

## Запуск 🟢

```
pm2 start ecosystem.config.js
```

## Перезагрузка 🟡

```
pm2 restart ecosystem.config.js
```

## Остановка 🔴

```
pm2 kill
```
