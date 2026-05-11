# Database & Data Flow: MongoDB Schema

Investra uses **MongoDB** as a NoSQL document database. We use **Mongoose** to enforce structure and types.

## 1. Collections Overview

### `users`
- Stores user credentials and current wallet balance.
- **Fields**: `username`, `email`, `password` (hashed), `balance` (default ₹1,00,000).

### `watchlists` (or `stocks`)
- Master list of available stocks.
- **Fields**: `symbol`, `companyName`, `price`, `change`, `percent`.

### `holdings`
- Current stocks owned by users.
- **Key Feature**: Unique compound index on `userId` + `stockSymbol`.
- **Fields**: `qty`, `avgPrice`, `latestPrice`.

### `orders`
- Historical record of every trade.
- **Fields**: `side` (BUY/SELL), `qty`, `price`, `total`, `status` (EXECUTED).

### `funds` (or `transactions`)
- Ledger of every financial movement (Buy, Sell, Add Funds).
- **Purpose**: Used for generating Statements.

## 2. The Buy/Sell Data Flow
When a user clicks "Buy":
1. **Frontend**: Sends `{ symbol, qty, side: 'BUY' }` to `/place-order`.
2. **Backend (OrderService)**:
   - Fetches the stock price from `stocks`.
   - Checks user's `balance` in `users`.
   - Subtracts `totalCost` from `balance`.
   - **If first time buying**: Creates a new doc in `holdings`.
   - **If already owns stock**: Updates `holdings` with new `qty` and recalculated `avgPrice`.
   - Creates a record in `orders`.
   - Creates a record in `funds`.
3. **Database**: Atomically updates multiple collections.

---
*Created by Antigravity - Senior Developer Mentor*
