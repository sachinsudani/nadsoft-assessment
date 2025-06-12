# 🎓 Nadsoft Full Stack Assessment

A full-stack **Student Management System** built with modern web technologies. This application allows managing students, subjects, and their marks through a clean, responsive interface and a scalable backend.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

---

## ✨ Features

- Full CRUD for Students, Subjects, and Marks
- RESTful API built with Express and Prisma
- Normalized PostgreSQL schema (3NF)
- Material UI-based responsive frontend
- Form validation and editable data tables
- Pre-populated seed data for testing
- Scalable and clean code structure

---

## 🧰 Tech Stack

**Backend:**
- Node.js + TypeScript
- Express.js
- Prisma ORM
- PostgreSQL

**Frontend:**
- React (Vite + TypeScript)
- Material UI

---

## ⚙️ Installation

### 🛠 Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit `.env` to include your PostgreSQL DATABASE_URL

# Run migrations and seed data
npx prisma migrate dev --name init
npx prisma db seed

# Start development server
npm run dev
```

### 🌐 Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm run dev
```

---

## 📬 API Documentation

- 🧪 Postman Collection: [`Student-Management.postman_collection.json`](./Student-Management.postman_collection.json)
- 📄 Api Sample Data: [`api-docs.json`](./api-docs.json)

---

## 📁 Project Structure

```
/
├── backend/
│   ├── src/
│   ├── prisma/
│   └── .env.example
├── frontend/
│   ├── src/
│   └── vite.config.ts
├── Student-Management.postman_collection.json
├── api-docs.json
└── README.md
```

---

## 🚀 Usage

1. Start both backend and frontend servers.
2. Open the app in your browser at `http://localhost:5173` (default Vite port).
3. Use the UI to manage students, subjects, and marks.
4. Use Postman or API docs to test the REST API.

---

## ⚙️ Configuration

Ensure you configure the following in your `.env` file (backend):

```
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
PORT=5000
NODE_ENV=development
```

---

## 🛠️ Troubleshooting

- **Database connection error**: Check your `DATABASE_URL` in `.env`
- **Migrations not applying**: Try running `npx prisma reset`
- **Frontend not loading**: Ensure backend is running and CORS is handled

---

## 🤝 Contributing

Contributions are welcome! Please fork the repo and open a pull request with your changes.

---

## 👨‍💻 Author

**Sachin Sudani**  
Node.js Developer | 3+ Years  
📧 Email: [sachin.sudani@protonmail.com](mailto:sachin.sudani@protonmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/sachin-sudani-402350196/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).