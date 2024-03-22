# Проект Home Library Service


## Установка и запуск

1. Склонируйте репозиторий:

    ```
    git clone https://github.com/username/xyz.git
    ```

2. Перейдите в каталог проекта:

    ```
    cd xyz
    ```

3. Запустите Docker-контейнер:

    ```
    docker-compose up -d
    ```

## Настройка

- Переменная окружения `XYZ_API_KEY` используется для настройки API-ключа.

## Использование

Для получения списка пользователей, выполните следующую команду:

```
docker-compose up --build -d
```
```
npm run prisma:migrate
```
```
npm run prisma:seed
```
```
docker exec home-library-service-app-1 npx prisma migrate dev --name init
```