# Core Workflow: The Life of a Trade

Understanding how a trade moves from a button click to a database entry is the most important part of mastering this project.

## 1. Trigger: The UI (Dashboard)
- The user finds a stock in the **Watchlist**.
- They click "Buy". This opens the **TransactionModal**.
- The modal collects the **Quantity** and sends an Axios POST request to the Backend.

## 2. Gatekeeper: Auth Middleware
- The Backend receives the request.
- The `authMiddleware` checks the JWT token in the header.
- It finds the User ID from the token and adds it to the request object (`req.user`).

## 3. The Math: Order Service (`orderService.js`)
The `placeOrder` function is the most critical code block:
```javascript
// Pseudocode of the logic
1. Find Stock in DB -> get current Price
2. Find User in DB -> get current Balance
3. Calculate Total = Price * Qty
4. IF Balance < Total -> Reject trade
5. Update User Balance -> User.balance -= Total
6. Find existing Holding for User + Stock
   - IF exists: Calculate New Average Price, Add Qty
   - ELSE: Create new Holding record
7. Create Order record (for history)
8. Create Transaction record (for funds statement)
9. Save everything to MongoDB
```

## 4. Updates: The UI Refresh
- After the Backend responds with `Success`, the Frontend Dashboard:
  - Updates the **Funds** state (to show new lower balance).
  - Navigates the user to the **Orders** page (to see the new entry).
  - Or refreshes the **Holdings** view to show the new stock.

## 5. Summary of Sequential Workflow
1. `WatchlistItem` (Click) -> `TransactionModal` (Submit)
2. `apiClient` (POST) -> `Backend/app.js` (Route Match)
3. `authMiddleware` (Verify) -> `orderController` (Process)
4. `orderService` (Logic/DB) -> `MongoDB` (Commit)
5. `Response` (JSON) -> `UI` (State Update)

---
*Created by Antigravity - Senior Developer Mentor*
