# Dummy Order Food App

Демо простого приложения заказа еды

[Ссылка на сайт](https://dummy-order-food-app.netlify.app/)

<img width="800" alt="Screenshot dummy order food app" src="https://user-images.githubusercontent.com/69040854/165381497-d1471e3d-3d30-4729-aa6d-1105b9a35753.png">

Функционал
- отрисовка позиций блюд, полученных из firebase
- добавление/удаление позиций в корзину
- пересчет итоговой сумму заказа в зависимости от добавленных позиций
- форма оформления заказа
- отправка сформированного заказа на бэк

Стек
- приложение написано на функциональном React
- для хранения состояние компонента корзины используются хуки useReducer, useContext
- для отправки запросов на бэк используется кастомный хук useHttp
- для обработки и валидации значения инпута формы заказов используется кастомный хук useInput
- css modules

### Запуск приложения

- Клонировать репозиторий
    ```bash
    $ git clone https://github.com/romanlesnoy/dummy-order-food-app.git
    ```
- Перейти в директорию проекта и установить зависимости
    ```bash
    $ cd  dummy-order-food-app && npm install
    ```
- Запустить приложение
    ```bash
    npm start
    ```