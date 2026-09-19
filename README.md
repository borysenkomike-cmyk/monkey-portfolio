# 🐒 Monkey Portfolio

Спільний навчальний Full-Stack проєкт для демонстрації роботи команди (Frontend + Backend + Integration).

## 🛠 Технологічний стек

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express, TypeScript
* **Integration & Git Flow:** Feature branch workflow (Monorepo)

## 📁 Структура проєкту

monkey-portfolio/
├── frontend/    # React додаток (UI, компоненти, Tailwind)
├── backend/     # Node.js / Express API
└── README.md    # Документація проєкту


🔌 API Контракт
1. Отримання списку проєктів
URL: GET /api/projects

Формат відповіді: JSON

Приклад відповіді:

JSON
[
  {
    "id": 1,
    "title": "Banana Finder 3000",
    "description": "Застосунок для пошуку найкращих бананчиків у джунглях.",
    "technologies": ["React", "Node.js"],
    "link": "[https://github.com](https://github.com)"
  }
]

2. Форма зворотного зв'язку

URL: POST /api/contact

Тіло запиту (JSON):

JSON
{
  "name": "Джунглі Джим",
  "email": "jim@jungle.com",
  "message": "Привіт! Хочу замовити сайт."
}