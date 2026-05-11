# 🏗️ Architecture & Data Flow Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Dashboard)                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐          │
│  │  Holdings    │    │ Positions    │    │  WatchList   │          │
│  │  Component   │    │  Component   │    │  Component   │          │
│  └──────────────┘    └──────────────┘    └──────────────┘          │
│         ↑                   ↑                      ↑                 │
│         └───────────────────┼──────────────────────┘                │
│                             │                                        │
│                   ┌─────────▼────────┐                              │
│                   │  GeneralContext  │                              │
│                   │   (Global State) │                              │
│                   └─────────┬────────┘                              │
│                             │                                        │
│          ┌──────────────────┼──────────────────┐                   │
│          │                  │                  │                   │
│          ▼                  ▼                  ▼                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │
│  │Buy/Sell      │  │Orders Table  │  │Event System  │             │
│  │Modal Window  │  │  Component   │  │"orderPlaced" │             │
│  └──────────────┘  └──────────────┘  └──────────────┘             │
│         │                  │                  │                   │
│         └──────────────────┼──────────────────┘                    │
│                            │                                        │
│                    ┌────────▼─────────┐                            │
│                    │  axios (HTTP)    │                            │
│                    │  POST /newOrder  │                            │
│                    │  GET /allOrders  │                            │
│                    │  GET /allHoldings│                            │
│                    └────────┬─────────┘                            │
│                             │                                       │
└─────────────────────────────┼───────────────────────────────────────┘
                              │
                              │ HTTP/REST
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│                    BACKEND (Express.js)                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   Express App                                │  │
│  │  ┌────────────────────────────────────────────────────────┐ │  │
│  │  │ GET  /allHoldings      → HoldingsModel.find({})        │ │  │
│  │  │ GET  /allPositions     → PositionsModel.find({})       │ │  │
│  │  │ GET  /allWatchlist     → WatchlistModel.find({})       │ │  │
│  │  │ GET  /allOrders    ✨  → OrdersModel.find({})          │ │  │
│  │  │ POST /newOrder         → Save new order + timestamps   │ │  │
│  │  └────────────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                             │                                       │
│                    ┌────────▼────────┐                             │
│                    │   Mongoose ORM  │                             │
│                    │  (Data Layer)   │                             │
│                    └────────┬────────┘                             │
│                             │                                       │
│         ┌───────────────────┼───────────────────┐                 │
│         │                   │                   │                 │
│         ▼                   ▼                   ▼                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │ Holdings     │  │ Orders       │  │ Positions    │            │
│  │ Collection   │  │ Collection ✨│  │ Collection   │            │
│  │ (MongoDB)    │  │ (MongoDB)    │  │ (MongoDB)    │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              │ Query/Save
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│                    MongoDB Database                                  │
│  • Orders (new timestamps feature)                                   │
│  • Holdings                                                          │
│  • Positions                                                         │
│  • Watchlist                                                         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Data Refresh Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ User clicks BUY on Positions/Holdings/WatchList                 │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │ GeneralContext opens  │
         │ BuyActionWindow Modal │
         └───────────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │ User enters Qty & Price
         │ Clicks BUY/SELL button│
         └───────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────┐
    │ BuyActionWindow.handleBuyClick()
    │ • Validate price > 0           │
    │ • Convert types correctly       │
    │ • POST to /newOrder endpoint   │
    └────────────────────────────────┘
                     │
                     ▼ (HTTP Request)
    ┌────────────────────────────────┐
    │ Backend: POST /newOrder         │
    │ • Create OrdersModel           │
    │ • Save to database             │
    │ • Auto-add timestamps (✨ new) │
    │ • Return success response      │
    └────────────────────────────────┘
                     │
                     ▼ (HTTP Response)
    ┌────────────────────────────────────┐
    │ BuyActionWindow receives response  │
    │ in .then() callback:               │
    │                                    │
    │ 1. generalContext.closeBuyWindow() │
    │    → Hides the modal              │
    │                                    │
    │ 2. window.dispatchEvent()          │
    │    ("orderPlaced" event)           │
    │    → Notifies ALL components       │
    └────────────────────────────────────┘
                     │
      ┌──────────────┼──────────────┐
      │              │              │
      ▼              ▼              ▼
   Holdings      Positions      Orders
   Component     Component      Component
      │              │              │
      ▼              ▼              ▼
  fetchHoldings  fetchPositions  fetchOrders
      │              │              │
      └──────────────┼──────────────┘
                     │
                     ▼
         GET request to backend:
      • /allHoldings
      • /allPositions
      • /allOrders (✨ new)
      • /allWatchlist
                     │
                     ▼
        Backend returns fresh data
                     │
                     ▼
      ┌─────────────────────────────┐
      │ Update component state:     │
      │ setAllHoldings(data)        │
      │ setAllPositions(data)       │
      │ setAllOrders(data)          │
      └─────────────────────────────┘
                     │
                     ▼
      ┌─────────────────────────────┐
      │ React re-renders all        │
      │ components with new data    │
      │                             │
      │ User sees:                  │
      │ ✓ Updated Holdings          │
      │ ✓ Updated Positions         │
      │ ✓ New order in Orders list  │
      │ ✓ Updated WatchList         │
      └─────────────────────────────┘
```

---

## Component Communication Pattern

### Before (Broken) ❌
```
Holdings Component
    ↓ (isolated, no refresh)
User data changes in backend
    ↓ (Holdings doesn't know)
Orders Component
    ↓ (isolated, no sync)
No connection between components
```

### After (Fixed) ✨
```
Holdings Component
    ↓ (listens to event)
window.addEventListener("orderPlaced", fetch)
    ↓
Orders Component
    ↓ (listens to same event)
window.addEventListener("orderPlaced", fetch)
    ↓
WatchList Component
    ↓ (listens to same event)
window.addEventListener("orderPlaced", fetch)
    ↓
When ANY order is placed:
window.dispatchEvent(new Event("orderPlaced"))
    ↓
ALL listening components refresh simultaneously ✨
```

---

## State Management Flow

### GeneralContext - Controls Modal
```javascript
┌──────────────────────────────────────────┐
│        GeneralContext Values             │
├──────────────────────────────────────────┤
│ • isBuyWindowOpen: true/false            │
│ • selectedStockUID: "INFY"               │
│ • selectedMode: "BUY" or "SELL"          │
└──────────────────────────────────────────┘
         ↑                      ↑
    openBuyWindow()        closeBuyWindow()
         │                      │
    Called when:           Called when:
    • User clicks           • Modal submits
      Buy/Sell button       • User clicks Cancel
    • From any              • Order completes
      component
```

### Event System - Triggers Refresh
```javascript
┌────────────────────────────────────┐
│    window.dispatchEvent()          │
│  (Emit "orderPlaced" event)        │
└────────────────────────────────────┘
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
Holdings   Orders    WatchList
listener   listener   listener
    │         │         │
    └─────────┼─────────┘
              │
        ┌─────▼──────┐
        │ All fetch  │
        │ functions  │
        │   called   │
        └────────────┘
```

---

## Database Schema Structure

### OrdersModel (✨ UPDATED)
```javascript
{
  _id: ObjectId,
  name: String,           // "INFY", "TCS", etc.
  qty: Number,            // 5, 10, 50, etc.
  price: Number,          // 1555.45, 3194.8, etc.
  mode: String,           // "BUY" or "SELL"
  
  // ✨ NEW - Auto-managed by Mongoose
  createdAt: Date,        // When order was placed
  updatedAt: Date,        // Last modification time
}
```

### Example Order Document
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "INFY",
  "qty": 5,
  "price": 1555.45,
  "mode": "BUY",
  "createdAt": "2026-04-26T10:30:45.123Z",
  "updatedAt": "2026-04-26T10:30:45.123Z"
}
```

---

## Request/Response Examples

### Buy Order Request → Response

**Request:**
```http
POST http://localhost:3002/newOrder
Content-Type: application/json

{
  "name": "INFY",
  "qty": 5,
  "price": 1555.45,
  "mode": "BUY"
}
```

**Response (✨ NEW):**
```json
{
  "success": true,
  "message": "Order saved!",
  "order": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "INFY",
    "qty": 5,
    "price": 1555.45,
    "mode": "BUY",
    "createdAt": "2026-04-26T10:30:45.123Z",
    "updatedAt": "2026-04-26T10:30:45.123Z"
  }
}
```

### Get Orders Request → Response

**Request:**
```http
GET http://localhost:3002/allOrders
```

**Response (✨ NEW):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "INFY",
    "qty": 5,
    "price": 1555.45,
    "mode": "BUY",
    "createdAt": "2026-04-26T10:30:45.123Z",
    "updatedAt": "2026-04-26T10:30:45.123Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "TCS",
    "qty": 2,
    "price": 3194.8,
    "mode": "SELL",
    "createdAt": "2026-04-26T10:35:20.456Z",
    "updatedAt": "2026-04-26T10:35:20.456Z"
  }
]
```

---

## Memory & Performance Considerations

### Event Listener Cleanup
```javascript
useEffect(() => {
  window.addEventListener("orderPlaced", fetch);
  
  // ✅ IMPORTANT: Cleanup function
  return () => {
    window.removeEventListener("orderPlaced", fetch);
  };
  // Without cleanup:
  // • Old listeners remain in memory
  // • Each mount adds new listener
  // • Memory leak after many mount/unmount cycles
}, []);
```

### Efficient Re-rendering
```javascript
// ✅ Only re-render when data changes
const fetchOrders = () => {
  axios.get(...).then((res) => {
    setAllOrders(res.data); // Only updates if data changed
  });
};

// Instead of:
// ❌ Re-fetching every second (polling)
// setInterval(() => fetch(), 1000);
```

---

## Error Handling Flow

```
┌─────────────────────────────────┐
│ User enters invalid data        │
│ (e.g., price = 0)              │
└────────────────────┬────────────┘
                     │
                     ▼
        ┌──────────────────────┐
        │ Price validation:    │
        │ if (price === 0)     │
        │   return             │
        └──────────────────────┘
                     │
                     ▼
        ┌──────────────────────────┐
        │ alert("Please enter      │
        │  valid price")           │
        │ Modal stays open         │
        │ User can retry           │
        └──────────────────────────┘
```

### Network Error Handling
```javascript
axios.post(...)
  .then(() => { /* Success */ })
  .catch((err) => {
    alert("Error placing order: " + err.message);
    // Modal stays open for retry
  });
```

---

## Component Lifecycle with Events

```
Component Mount:
    ↓
useEffect runs:
  1. Call fetch() initially
  2. Add event listener
    ↓
Component Render with data
    ↓
User places order:
  1. Event fires "orderPlaced"
  2. fetch() called
  3. setState triggers re-render
    ↓
Component Re-render with new data
    ↓
Component Unmount:
  1. Cleanup function runs
  2. Event listener removed
  3. Memory freed
```

---

## Testing Checklist

- [ ] Click Buy on Holdings → Modal opens
- [ ] Enter qty and price → Click Buy
- [ ] Modal closes automatically → No hanging
- [ ] Orders tab shows new order
- [ ] Holdings/Positions data updates
- [ ] Click Sell on Positions → Works same way
- [ ] Click Buy on WatchList → Works same way
- [ ] Invalid price shows alert
- [ ] Empty orders shows message
- [ ] Multiple orders show in table
- [ ] Order dates display correctly
- [ ] BUY shows in green, SELL in red

---

Generated: 2026-04-26
Project: Zerodha Clone Architecture
Status: ✅ Fully Documented
