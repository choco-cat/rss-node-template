#PostgreSQL & Typeorm
## Выполнялось без использования Docker. Необходимо:
* запущенный postgresql сервер с БД, в которой не должно быть таблиц (таблицы создает запуск миграции)
* для доступа к БД используется .env в корне проекта с необходимыми параметрами (создать). Пример содержимого файла:
```
NODE_ENV=development
PORT=4000
DB_PORT=5432
DB_HOST=localhost
DB_USER=postgres
DB_NAME=gamedb
AUTH_MODE=false
DB_PASS=1234
JWT_SECRET_KEY=secret-key
MONGO_CONNECTION_STRING=your-mongo-db-connection-string
```
## Порядок проверки:
* `npm install`
* Для запуска миграции выполнить команду `npm run typeorm migration:run`
* `npm start`
* `npm test`
