# 🚀 Faculty Feedback System Frontend

This is the **Frontend** for the **Faculty Feedback Management System**, built using **React**, **Vite**, **TypeScript**, and **Tailwind CSS**.  
It provides portals for both **Users (Students)** and **Faculties** to manage registrations, logins, classes, subjects, and feedback submissions.

---

## ✨ Features

### 🔹 User (Student) Portal

- Register with basic information.
- Select Faculty and Class after login.
- Submit feedback for different Subjects.
- Securely login and access profile pages.

### 🔹 Faculty Portal

- Faculty registration and login functionality.
- Add new Classes under their Faculty.
- Add Subjects under each Class.
- View feedback received for different Subjects and Classes.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React (with Vite)
- **Styling:** Tailwind CSS
- **State Management:** React Context API (AuthContext)
- **Routing:** React Router DOM
- **Type Safety:** TypeScript
- **API Integration:** Axios

---

## 📦 Project Structure

- `/components`: Forms, Dashboard, Protected Routes
- `/context`: Authentication Context (AuthContext)
- `/pages`: Page components for User, Faculty, Dashboard, etc.
- `/routes`: App Routes (User, Faculty, Protected Routes)
- `/services`: API utilities for authentication and management
- `/types`: TypeScript interfaces for User, Faculty, Class, Subject, Feedback
- `/utils`: Validation utilities for form fields

---

## 📖 Major Updates (This Release)

- Implemented `RegisterForm` component with validation.
- Created `AuthContext` to manage login/logout state.
- Developed Home Page linking User and Faculty portals.
- Faculty Dashboard with routes for:
  - Managing Classes
  - Managing Subjects
  - Viewing Feedback
- User Login and Registration Pages added.
- Faculty Login and Registration Pages added.
- `SelectFacultyClass` page created for completing user profile after registration.
- `ProtectedRoute` component developed for securing pages based on user type.
- Utility functions for:
  - API handling (authentication, feedback submission, etc.)
  - Form validation
- Tailwind CSS configured for fast and responsive UI development.
- Vite configured with TypeScript for optimized development setup.

---

## ⚙️ How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/me-maddy/ShikshaVani-frontend.git
cd your-frontend-repo
```
