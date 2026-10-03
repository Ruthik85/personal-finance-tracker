# Personal Finance & Expense Tracker

A full-stack personal finance and expense tracker built with Next.js, Node.js/Express, and MySQL using Prisma ORM. It features secure user authentication, a dynamic real-time dashboard, and complete transaction management capabilities.

## 🚀 Features

- **Secure Authentication:** User signup and login powered by JSON Web Tokens (JWT).
- **Interactive Dashboard:** Real-time summary cards tracking Net Balance, Total Income, and Total Expenses.
- **Transaction Management:** Add, view, and delete income/expense transactions instantly.
- **Robust Backend API:** Protected RESTful endpoints built with Express.js and Prisma ORM.
- **Modern Frontend:** Responsive UI built with Next.js and Tailwind CSS.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express.js, JWT Authentication
- **Database & ORM:** MySQL, Prisma ORM

---

## ⚙️ Getting Started

Follow these instructions to set up and run the project locally on your machine.

### Prerequisites
- Node.js (v18+ recommended)
- MySQL Server installed and running

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/personal-finance-tracker.git
cd personal-finance-tracker
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and configure your environment variables.
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and add your configuration:
```env
PORT=5000
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/your_database_name"
JWT_SECRET="your_super_secret_jwt_key"
```

Run Prisma migrations/push to set up your database schema:
```bash
npx prisma db push
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, and install dependencies.
```bash
cd frontend
npm install
```

Create a `.env.local` file inside the `frontend` folder if needed to point to your backend API:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the application.

---

## 📜 License
This project is open source and available under the [MIT License](LICENSE).
