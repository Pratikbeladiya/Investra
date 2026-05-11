# 🚀 Complete Setup & Run Guide

## 📋 Prerequisites

Make sure you have installed:
- ✅ Node.js (v14+)
- ✅ MongoDB (Local or Atlas)
- ✅ npm or yarn

---

## 🔧 Step 1: Environment Variables Setup

### Backend/.env
Create file at `Backend/.env` with:

```env
PORT=3002
MONGO_URI=mongodb://localhost:27017/zerodha
```

**If using MongoDB Atlas (Cloud):**
```env
PORT=3002
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/zerodha?retryWrites=true&w=majority
```

> Replace USERNAME, PASSWORD, and cluster details with your Atlas credentials

---

## ✅ Step 2: Install Dependencies

### Terminal 1 - Backend Setup
```bash
cd Backend
npm install
```

### Terminal 2 - Dashboard Setup
```bash
cd dashboards
npm install
```

### Terminal 3 - Frontend Setup (Optional)
```bash
cd frontend
npm install
```

---

## 🎯 Step 3: Start the Application

### Step 3a: Start MongoDB (if local)
```bash
mongod
```
Keep this running in the background.

### Step 3b: Start Backend Server
```bash
cd Backend
npm start
```

**Expected Output:**
```
✅ MongoDB Connected
🌱 Seeding Holdings...
✅ Holdings seeded!
🌱 Seeding Positions...
✅ Positions seeded!
🌱 Seeding Watchlist...
✅ Watchlist seeded!
🚀 Server started on port 3002
📱 Dashboard: http://localhost:3000
🔌 Backend API: http://localhost:3002
```

> ✨ **NEW!** Backend now auto-seeds database on startup!

### Step 3c: Start Dashboard (Frontend)
In a new terminal:
```bash
cd dashboards
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view dashboards in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

---

## 🌐 Step 4: Open in Browser

Visit: **http://localhost:3000**

You should see:
- ✅ Holdings section with data
- ✅ Positions section with data
- ✅ WatchList section with data
- ✅ Orders section (empty initially)

---

## 🧪 Step 5: Test Buy/Sell Functionality

### Test Buy Order:
1. Go to **Positions** tab
2. Click **"Buy"** button on any stock
3. Enter:
   - Quantity: `5`
   - Price: `1500`
4. Click **"Buy"** button
5. Modal should close immediately ✨
6. Go to **Orders** tab
7. New order should appear ✨

### Test Sell Order:
Same as above, but click **"Sell"** button

---

## 🔍 Debugging Guide

### Issue 1: No data showing in Holdings/Positions/WatchList

**Check 1: Backend is running?**
```bash
# Try accessing API directly
curl http://localhost:3002/allHoldings
```
Should return JSON array with stocks

**Check 2: MongoDB is connected?**
Look for these lines in backend terminal:
```
✅ MongoDB Connected
🌱 Seeding Holdings...
✅ Holdings seeded!
```

**Check 3: Browser console for errors**
Press `F12` in browser → Console tab
Look for error messages like:
```
❌ Error fetching holdings: Failed to connect
```

**Check 4: .env file is correct?**
Backend will fail to start if MONGO_URI is wrong

---

### Issue 2: MongoDB connection error

**Solution 1: Local MongoDB not running?**
```bash
# Start MongoDB service
mongod
```

**Solution 2: MongoDB Atlas wrong credentials?**
- Check username and password in MONGO_URI
- Check database name is correct
- Check IP whitelist in Atlas

**Solution 3: MONGO_URI format wrong?**
```
❌ Wrong: mongodb://localhost/zerodha
✅ Correct: mongodb://localhost:27017/zerodha
```

---

### Issue 3: Buy/Sell button doesn't work

**Check 1: Modal opens but doesn't close?**
```
❌ GeneralContext not working
```
Check browser DevTools → Console for errors

**Check 2: Order not saved?**
Check backend terminal for:
```
Error saving order: ...
```

**Check 3: Backend returns error?**
```bash
curl -X POST http://localhost:3002/newOrder \
  -H "Content-Type: application/json" \
  -d '{"name":"INFY","qty":5,"price":1555.45,"mode":"BUY"}'
```

---

## 🎛️ Console Logs Explained

### Backend Logs (Terminal where backend runs)
```
✅ MongoDB Connected           → DB connection successful
🌱 Seeding Holdings...         → Adding initial data
✅ Holdings seeded!            → Data added successfully
📊 Fetching Holdings: 13       → API called, returned 13 records
🚀 Server started on port 3002 → Server ready
❌ MongoDB connection error    → DB connection failed
```

### Browser Console Logs (DevTools F12)
```
🚀 Holdings component mounted  → Component loaded
📡 Order placed event received → Order notification received
✅ Holdings fetched: [...]     → Data successfully fetched
❌ Error fetching holdings: ... → API request failed
📊 Fetching Holdings: 13       → Backend returned 13 records
```

---

## 📱 Component Loading States

When you refresh the page, you'll see:

| State | Display |
|-------|---------|
| Loading | ⏳ Loading holdings data... |
| No Data | 📭 No holdings found. Try placing a buy order! |
| Error | ⚠️ Failed to fetch holdings... |
| Success | Table with data |

---

## 🔄 Complete Data Flow Diagram

```
Browser (http://localhost:3000)
         ↓
Dashboard Components
  ├─ Holdings.js → GET /allHoldings
  ├─ Positions.js → GET /allPositions  
  ├─ WatchList.js → GET /allWatchlist
  ├─ Orders.js → GET /allOrders
  └─ BuyActionWindow.js → POST /newOrder
         ↓
Backend (http://localhost:3002)
  ├─ GET /allHoldings → HoldingsModel.find()
  ├─ GET /allPositions → PositionsModel.find()
  ├─ GET /allWatchlist → WatchlistModel.find()
  ├─ GET /allOrders → OrdersModel.find()
  └─ POST /newOrder → OrdersModel.save()
         ↓
MongoDB (local or Atlas)
  ├─ holdings collection
  ├─ positions collection
  ├─ watchlist collection
  └─ orders collection
```

---

## 🔐 Environment Variables Reference

### Backend/.env Options

```env
# Server Port (default: 3002)
PORT=3002

# MongoDB Local
MONGO_URI=mongodb://localhost:27017/zerodha

# MongoDB Atlas
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/zerodha

# MongoDB Atlas with options
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/zerodha?retryWrites=true&w=majority
```

### Dashboard/.env (if needed)
Usually not needed, but can add:
```env
REACT_APP_API_URL=http://localhost:3002
```

---

## 🚨 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Port 3002 already in use | Another app using port | `lsof -i :3002` and kill process |
| MongoDB connection refused | MongoDB not running | Start MongoDB with `mongod` |
| "Cannot find module" | Dependencies not installed | Run `npm install` |
| CORS error | Backend/Frontend port mismatch | Verify ports in axios calls |
| "MONGO_URI not defined" | .env file missing/empty | Create Backend/.env with URI |
| Data still not showing | Database empty | Restart backend (auto-seeds now) |
| Modal doesn't close | Context not working | Check browser console errors |

---

## ✨ New Features (Auto-Seeding)

**Before:** Had to manually call `/addHolding`, `/addPosition`, `/addWatchlist`

**Now:** Database auto-seeds on startup if empty!

When backend starts:
```
🌱 Seeding Holdings...
✅ Holdings seeded! (13 stocks added)
🌱 Seeding Positions...
✅ Positions seeded! (2 positions added)
🌱 Seeding Watchlist...
✅ Watchlist seeded! (9 items added)
```

---

## 📝 Verification Checklist

After starting the app, verify:

- [ ] Backend terminal shows "✅ MongoDB Connected"
- [ ] Backend terminal shows all seeding messages
- [ ] Dashboard loads at http://localhost:3000
- [ ] Holdings section shows stocks (not empty)
- [ ] Positions section shows positions (not empty)
- [ ] WatchList section shows stocks (not empty)
- [ ] Can click Buy/Sell buttons
- [ ] Modal opens for Buy/Sell
- [ ] Can enter quantity and price
- [ ] Modal closes after placing order
- [ ] Orders tab shows new order
- [ ] Browser console has ✅ logs (no ❌ errors)

---

## 🎯 Quick Start (TL;DR)

```bash
# Terminal 1: MongoDB
mongod

# Terminal 2: Backend
cd Backend
# Create Backend/.env with MONGO_URI
npm install
npm start

# Terminal 3: Dashboard
cd dashboards
npm install
npm start

# Open browser
# http://localhost:3000
```

---

## 🆘 Still Not Working?

1. **Check all 3 terminals** are running
2. **Check Backend terminal** for MongoDB errors
3. **Press F12** in browser and check Console tab for errors
4. **Verify Backend/.env** has correct MONGO_URI
5. **Restart everything** (stop all terminals, start fresh)
6. **Check port conflicts** (ports 3000, 3002 must be free)

---

## 📞 Support Info

**API Base URL:** `http://localhost:3002`
**Dashboard URL:** `http://localhost:3000`
**MongoDB Port:** `27017` (default local)

---

Generated: 2026-04-26
Status: ✅ Ready for Production
Last Updated: Complete Setup Guide
