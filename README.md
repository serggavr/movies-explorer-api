# Проект "movies-explorer" backend часть
---
### Создан в рамках обучения в [Яндекс Практикум](https://praktikum.yandex.ru/), курс Web-разработчик
---

#### Репозиторий с Frontend приложения "movies-explorer" - [movies-explorer-frontend](https://github.com/serggavr/movies-explorer-frontend)

Movies-explorer - Веб приложение позволяющее пользователю просматривать список фильмов из стороннего сервиса [beatfilm-movies](https://api.nomoreparties.co/beatfilm-movies) и сохранять понравившиеся фильмы в личном кабинете, в приложении. Реализован поиск фильмов по ключевым словам.

Фронтенд был сверстан по [Макету в Figma](https://disk.yandex.ru/d/rFmn7fjNt24-Fw )

Запуск: 
``` 
npm install
npm run start
```

-----
### Зависимости:
```
"dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.0",
    "celebrate": "^15.0.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.2",
    "express": "^4.18.1",
    "express-rate-limit": "^6.6.0",
    "express-winston": "^4.2.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.5.2",
    "validator": "^13.7.0",
    "winston": "^3.8.2"
  },
  "devDependencies": {
    "eslint": "^8.22.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.26.0",
    "nodemon": "^2.0.20"
  }
```

### Роуты
Метод | Роут | Описание
----- |------|---------
POST | `/signup` | Регистрация. Создает пользователя с переданными в `body` **email**, **password**, **name**
POST | `/signin` | Авторизация. Проверяет переданные в `body` **email** и **password** и возвращает **JWT**
POST | `/signout` | Выход. Удаляет **JWT** пользователя в ```local.storage```
GET | `/users/me` | Возвращает **email** и **имя**
PATCH | `/users/me` | Редактирование пользователя. Обновляет информацию о пользователе с переданными в `body` **email** и **имя**
GET | `/movies` | Возвращает все сохранённые пользователем фильмы
POST | `/movies` | Сохраняет фильм с переданными в `body` **country**, **director**, **duration**, **year**, **description**, **image**, **trailerLink**, **thumbnail**, **movieId**, **nameRU**, **nameEN**
DELETE | `/movies/movieId` | удаляет сохранённый фильм по **_id**
##### При создании приложения использовались технологии:
Backend:
- Node.js
- Express.js
- JS
- MongoDB
- JWT аутентификация


Frontend:
- HTML5
- CSS
- BEM
- JS
- React
- JWT аутентификация
- Хранение данных в LocalStorage
