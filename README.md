# Приложение CRUD на Nuxt 4

Архитектура FSD • Vuetify 3 • Pinia • Tailwind CSS • TypeScript

- Nuxt
- Vue
- Лицензия

Современное масштабируемое приложение CRUD, построенное с использованием архитектуры проектирования на основе функциональных срезов (Feature-Sliced Design, FSD), фреймворков Vuetify 3, Pinia и стиля Tailwind CSS.

## Особенности

- Создание, чтение, обновление и удаление пользователей
- Валидация форм с использованием библиотеки Yup
- Поиск в режиме реального времени, сортировка, постраничная навигация
- Адаптивный интерфейс с использованием Vuetify 3 и Tailwind
- Всплывающие уведомления (успех/ошибка)
- Типизация компонентов с использованием TypeScript и архитектура FSD
- Отсутствие ошибок во время выполнения программы

## Технологический стек

| Уровень     | Технология          | Фреймворк |
|-------------|---------------------|-----------|
| Backend     |                     |           |
| Frontend    |                     |           |
| Framework   | Nuxt 4              |           |
| UI          | Vuetify 3           |           |
| State       | Pinia               |           |
| Styling     | Tailwind CSS        |           |
| Validation  | Yup                 |           |
| Иконки      | Material Design Icon|           |
| Язык        | TypeScript          |           |

## Структура проекта (архитектура FSD)
.├── app.vue
 ├── pages/
 │  ├── index.vue
 │  ├── create.vue
 │  └── edit/[id].vue
 ├── entities/user/
 │   ├── model/types.ts
 │   ├── model/schema.ts
 │   └── ui/UserForm.vue
 ├── features/user-list/ui/UserTable.vue
 ├── shared/composables/useToast.ts
 ├── stores/userStore.ts
 └── plugins/vuetify.ts

## Начало работы
### Клонируйте проект и установите зависимости

git clone https://github.com/JackHummer943/nuxt-test.git

cd nuxt-test

npm install

### Запустите сервер разработки

bashnpm run devОткройте http://localhost:3000## Скрипты сборки
| Команда              | Описание                  |
|----------------------|---------------------------|
| npm run dev          | Запуск сервера разработки |
| npm run build        | Сборка для продакшена     |
| npm run preview      | Просмотр сборочной версии |
| npm run lint         | Запустить проверку ESLint |

## Развертывание
Разверните проект с помощью Vercel либо используйте альтернативные сервисы типа Netlify, Cloudflare Pages и др.

## Лицензия
Проект распространяется под лицензией MIT — свободно распространяемый, открытый исходный код.

## Автор
Jack github.com/JackHummer943