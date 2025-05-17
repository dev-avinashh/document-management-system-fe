# 📁 Document Management System (Frontend)

A document management system built with **React**, **Mantine UI**, and **React Query**. It includes OTP-based login, persistent authentication, and features to upload and download documents.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:dev-avinashh/document-management-system-fe.git
cd document-management-system-fe
```

### 2. Install dependencies

Make sure you have **Node.js** and **npm** (or **yarn**) installed.

```bash
npm install
```

or

```bash
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project and add the following:

```env
VITE_API_URL = https://apis.allsoft.co/api/documentManagement
```

> ⚠️ Replace the URL above with your actual backend API URL if different.

### 4. Start the development server

```bash
npm run dev
```

or

```bash
yarn dev
```

The app will be running at [https://localhost:5175](https://localhost:5175)

---

## 🔐 Features

### ✅ OTP-based Login
- Login using phone or email
- OTP verification flow without passwords

### 🔁 Persistent Authentication
- Auth state is saved using local storage
- Auto-login for returning users

---

## 📄 Application Sections

### 📤 Upload Document
- Upload PDFs, images, or other supported file types
- Show progress and metadata input
- Supports error handling and file validations

### 📥 Download Document
- List of uploaded documents
- Download files securely
- Filter and search functionality

---

## 🛠️ Tech Stack

| Tech         | Purpose                          |
|--------------|----------------------------------|
| React        | Frontend framework               |
| Mantine UI   | Modern UI components             |
| React Query  | Data fetching and caching        |
| React Router | Routing                          |
| Axios        | API communication                |
| Vite         | Fast development/build tooling   |



---
