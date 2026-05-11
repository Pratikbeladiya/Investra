# Investra: System Architecture Overview

Investra is built using a **Modular Distributed Architecture**. Instead of a single monolithic application, it is divided into three specialized environments that communicate over HTTP/REST.

## 1. The Big Picture
The project follows the **MERN** (MongoDB, Express, React, Node) stack but with a unique "Split-Frontend" strategy.

### Component Breakdown
- **Landing Page (Port 3000)**: Built with React. This is the entry point for SEO, marketing, and user onboarding (Signup/Login).
- **Trading Dashboard (Port 3001)**: A separate React application optimized for real-time data, complex state management, and trading operations.
- **Backend API (Port 3002)**: The central Node.js/Express server that serves both frontends. It acts as the gatekeeper for the database and handles all financial calculations.

## 2. Communication Pattern
Communication is strictly **Asynchronous and Stateless** using JSON over HTTP.

1. **Authentication**: Uses **JWT (JSON Web Tokens)**. When a user logs in via the Landing Page, the Backend generates a token.
2. **The "Handover"**: The Landing Page redirects the user to the Dashboard URL with the token as a query parameter (`?token=...`).
3. **Authorization**: The Dashboard saves this token in `localStorage`. Every subsequent request to the Backend (Buy, Sell, View Holdings) includes this token in the `Authorization` header.

## 3. Tech Stack Deep Dive
- **Frontend**: React (Functional Components, Hooks), Bootstrap (for layout), Axios (for API calls).
- **Backend**: Node.js, Express.js (REST API).
- **Database**: MongoDB (NoSQL) with Mongoose (ODM).
- **Security**: Bcrypt.js (Password hashing), JWT (Session management).

---
*Created by Antigravity - Senior Developer Mentor*
