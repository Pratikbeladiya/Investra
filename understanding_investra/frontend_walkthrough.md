# Frontend Deep Dive: Landing Page & Dashboard

The frontend is split into two distinct React projects. This allows for better separation of concerns and independent scaling.

## 1. Landing Page (`frontend/`)
**Purpose**: Marketing, SEO, and Authentication entry points.

### Key Folders
- `src/landing_page/`: Contains all sub-pages (Home, About, Pricing, Signup, Login).
- `src/components/`: Reusable UI elements like Navbar and Footer.
- `src/services/`: Axios configurations for communicating with the backend.

### Authentication Flow
The `Login.js` and `Signup.js` files are critical here. 
- **Path**: `src/landing_page/login/Login.js`
- **Action**: Sends credentials to `/api/auth/login`. On success, it redirects to the Dashboard URL with the token.

## 2. Trading Dashboard (`dashboards/`)
**Purpose**: High-intensity data management for active trading.

### Key Folders
- `src/pages/Dashboard/`: The core layout. `Home.jsx` is the "Token Capture" component that reads the URL and sets up the session.
- `src/components/watchlist/`: Handles searching and listing available stocks. It uses `Watchlist.jsx` to fetch data from the API.
- `src/components/holdings/` & `src/components/orders/`: Specialized views for current investments and trade history.
- `src/context/`: Uses React Context API (`GeneralContext.js`) to manage global states like the "Buy/Sell Modal" visibility.

### Component Communication
The Dashboard uses a **Prop Drilling and Context** combination:
- **Watchlist** passes the "selected stock" to the **Dashboard** parent.
- **Dashboard** parent then triggers the **TransactionModal** via state.
- **TransactionModal** uses `apiClient` to talk to the Backend.

---
*Created by Antigravity - Senior Developer Mentor*
