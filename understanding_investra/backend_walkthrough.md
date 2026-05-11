# Backend Deep Dive: Architecture & Logic

The Backend is an Express.js server built with a robust **Controller-Service Architecture**.

## 1. Folder Structure
- `config/`: Database and environment setup (`db.js`, `env.js`).
- `models/`: Mongoose schemas (The "blueprints" for MongoDB).
- `routes/`: Express routers that define API endpoints.
- `controllers/`: Handles request validation and response formatting.
- `services/`: Contains the actual **Business Logic** (the "brain").
- `middleware/`: Auth guards and error handlers.

## 2. API Design Patterns
The API follows RESTful principles:
- `GET /api/stocks`: Fetches the watchlist.
- `POST /api/trade/place-order`: Executes a buy/sell operation.
- `GET /api/trade/holdings`: Returns the user's portfolio.

## 3. Core Logic: The Service Layer
Unlike basic tutorials, this project moves complex logic out of controllers and into **Services** (e.g., `services/orderService.js`).
- **Why?**: To keep code DRY (Don't Repeat Yourself) and easier to test. 
- **Example**: `placeOrder` service handles stock lookup, balance checks, average price calculation, and three different database updates in one logical flow.

## 4. Authentication Middleware
The `middleware/authMiddleware.js` (or similar) intercepts protected routes.
- It extracts the `Bearer` token from headers.
- It verifies the token using `jsonwebtoken`.
- It attaches the `user` object to the `req` object so controllers know who is making the request.

---
*Created by Antigravity - Senior Developer Mentor*
