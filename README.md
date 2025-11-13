#  project - Community Food Sharing Platform

###  Live Site:   https://shiny-capybara-90abf6.netlify.app/  
###  Server (API):
https://community-food-sharing-server-iota.vercel.app/

---

## 📖 Project Overview

**PlateShare** is a full-stack MERN (MongoDB, Express, React, Node) web application that connects communities through food sharing.  
Users can share surplus food to reduce waste, and others can browse and request these items easily.

This project focuses on **community engagement**, **real-time food availability**, and **user-friendly interaction** using secure Firebase authentication and a responsive UI.

---

##  Features

-  **Firebase Authentication**
  - Email/Password and Google login system.
  - Password validation and success/error toasts.

-  **Dynamic Food Management (CRUD)**
  - Add, Update, Delete, and View foods in real-time.
  - Uses MongoDB for storing all food and user data.

-  **Private Routes for Authenticated Users**
  - Secure access to Add Food, Manage My Foods, and My Requests pages.

-  **Food Request System**
  - Request available foods directly from the “Food Details” page.

-  **Dynamic & Responsive UI**
  - Built with Tailwind CSS and React Router.
  - Mobile-friendly, clean, and professional design.

-  **Loading & Error Handling**
  - Spinner while fetching data.
  - Custom 404 Error Page with animation and Back to Home button.

---

##  Pages & Routes

###  Public Routes
- `/` → **Home** (Banner, Featured Foods, How It Works, Mission)
- `/available-foods` → All available foods
- `/login` → User login page
- `/register` → New user registration

###  Private Routes
- `/add-food` → Add new food
- `/manage-foods` → Manage user’s own added foods
- `/update-food/:id` → Update food details
- `/my-requests` → View requested foods
- `/food/:id` → Food details and Request button

---






##  Environment Variables (.env)

Create a `.env` file in both client and server:

###  Server (.env)