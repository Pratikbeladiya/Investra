import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import apiClient from "../../services/api";
import {
  Menu as MuiMenu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  Typography,
  Box
} from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import '../../styles/navbar/DashboardHeader.css';

const DashboardHeader = () => {
  const location = useLocation();
  const [indices, setIndices] = useState({
    nifty: null,
    sensex: null,
    banknifty: null,
    finnifty: null
  });

  const [selectedMenu, setSelectedMenu] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("investra_dark_mode") === "true");
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const res = await apiClient.get("/stocks/indices");
        const data = res.data;
        setIndices({
          nifty: data.find(i => i.symbol === 'NIFTY 50'),
          sensex: data.find(i => i.symbol === 'SENSEX'),
          banknifty: data.find(i => i.symbol === 'BANKNIFTY'),
          finnifty: data.find(i => i.symbol === 'FINNIFTY')
        });
      } catch (err) {
        console.error("Error fetching indices:", err);
      }
    };
    fetchIndices();
    const interval = setInterval(fetchIndices, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get("/user/profile");
        setUser(res.data);
        setBalance(res.data.balance);
      } catch (err) {
        console.error("Error fetching profile in Menu:", err);
      }
    };
    fetchProfile();

    const handleOrderPlaced = () => fetchProfile();
    window.addEventListener("orderPlaced", handleOrderPlaced);
    return () => window.removeEventListener("orderPlaced", handleOrderPlaced);
  }, []);

  useEffect(() => {
    localStorage.setItem("investra_dark_mode", darkMode);
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    // Set selected menu based on current path
    const path = location.pathname;
    const menuMap = {
      "/dashboard": 0,
      "/dashboard/orders": 1,
      "/dashboard/holdings": 2,
      "/dashboard/positions": 3,
      "/dashboard/funds": 4,
      "/dashboard/apps": 6
    };
    if (menuMap[path] !== undefined) {
      setSelectedMenu(menuMap[path]);
    }
  }, [location.pathname]);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("trade_token");
    localStorage.removeItem("trade_user");
    localStorage.removeItem("zerodha_token");
    localStorage.removeItem("zerodha_user");
    window.location.href = "http://localhost:3000/login";
  };

  const IndexItem = ({ label, data }) => (
    <div className="index-item">
      <span className="index-label">{label}</span>
      <span className={`index-price ${(data?.percent < 0) ? 'negative' : 'positive'}`}>
        {data ? data.price.toLocaleString("en-IN") : "---"}
      </span>
      <span className={`index-percent ${(data?.percent < 0) ? 'negative' : 'positive'}`}>
        {data ? `${data.percent > 0 ? "+" : ""}${data.percent}%` : "0.00%"}
      </span>
    </div>
  );

  return (
    <div className="topbar-container">
      {/* Left: Indices */}
      <div className="indices-wrapper">
        <IndexItem label="NIFTY 50" data={indices.nifty} />
        <IndexItem label="SENSEX" data={indices.sensex} />
        <IndexItem label="BANKNIFTY" data={indices.banknifty} />
        <IndexItem label="FINNIFTY" data={indices.finnifty} />
      </div>

      {/* Right: Navigation & Profile */}
      <div className="menu-wrapper">
        <div className="menu-container">
          <div className="menus">
            <ul className="menus-list">
              {[
                { label: "Dashboard", path: "/dashboard", id: 0 },
                { label: "Orders", path: "/dashboard/orders", id: 1 },
                { label: "Holdings", path: "/dashboard/holdings", id: 2 },
                { label: "Positions", path: "/dashboard/positions", id: 3 },
                { label: "Funds", path: "/dashboard/funds", id: 4 },
                { label: "Apps", path: "/dashboard/apps", id: 6 }
              ].map((item) => (
                <li key={item.id}>
                  <Link
                    className="menu-item-link"
                    to={item.path}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    <span className={`menu-item-text ${selectedMenu === item.id ? 'active' : ''}`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="menu-divider"></div>
            <div className="profile-btn" onClick={handleProfileClick}>
              <div className="profile-avatar">
                {user ? (user.username || "U").charAt(0).toUpperCase() : "U"}
              </div>
              <span className="profile-name">
                {user ? user.username : "User"}
              </span>
            </div>

            <MuiMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              PaperProps={{
                elevation: 3,
                style: {
                  marginTop: '8px',
                  minWidth: 260,
                  borderRadius: '16px',
                  overflow: 'visible',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ px: 3, py: 2 }}>
                <Typography variant="subtitle1" fontWeight="700" sx={{ color: "var(--text-primary)", fontSize: '1rem' }}>
                  {user ? (user.username || user.name) : "USERID"}
                </Typography>
                <Typography variant="body2" sx={{ color: "var(--text-secondary)", fontSize: '0.85rem' }}>
                  {user ? user.email : "trader@example.com"}
                </Typography>
              </Box>
              <Divider sx={{ mb: 1, borderColor: 'var(--border-color)' }} />

              <MenuItem
                component={Link}
                to="/dashboard/funds"
                onClick={handleClose}
                sx={{ py: 1.5, px: 3 }}
              >
                <ListItemIcon><AccountBalanceWalletIcon fontSize="small" sx={{ color: "var(--accent-color)" }} /></ListItemIcon>
                <ListItemText
                  primary="Available Margin"
                  secondary={`₹ ${balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-secondary)' }}
                  secondaryTypographyProps={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent-color)', mt: 0.5 }}
                />
              </MenuItem>

              <Divider sx={{ my: 1, borderColor: 'var(--border-color)' }} />

              <MenuItem component={Link} to="/dashboard/profile" onClick={handleClose} sx={{ py: 1.2, px: 3 }}>
                <ListItemIcon><PersonIcon fontSize="small" sx={{ color: "var(--text-secondary)" }} /></ListItemIcon>
                <ListItemText primary="My Profile" primaryTypographyProps={{ fontSize: '0.9rem', color: 'var(--text-primary)' }} />
              </MenuItem>
              <MenuItem component={Link} to="/dashboard/statements" onClick={handleClose} sx={{ py: 1.2, px: 3 }}>
                <ListItemIcon><DescriptionIcon fontSize="small" sx={{ color: "var(--text-secondary)" }} /></ListItemIcon>
                <ListItemText primary="Statements" primaryTypographyProps={{ fontSize: '0.9rem', color: 'var(--text-primary)' }} />
              </MenuItem>
              <MenuItem component={Link} to="/dashboard/settings" onClick={handleClose} sx={{ py: 1.2, px: 3 }}>
                <ListItemIcon><SettingsIcon fontSize="small" sx={{ color: "var(--text-secondary)" }} /></ListItemIcon>
                <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: '0.9rem', color: 'var(--text-primary)' }} />
              </MenuItem>

              <Divider sx={{ my: 1, borderColor: 'var(--border-color)' }} />

              <MenuItem sx={{ py: 1, px: 3 }}>
                <ListItemIcon><DarkModeIcon fontSize="small" sx={{ color: "var(--text-secondary)" }} /></ListItemIcon>
                <ListItemText primary="Dark Mode" primaryTypographyProps={{ fontSize: '0.9rem', color: 'var(--text-primary)' }} />
                <Switch
                  size="small"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  color="primary"
                />
              </MenuItem>

              <Divider sx={{ my: 1, borderColor: 'var(--border-color)' }} />

              <MenuItem onClick={handleLogout} sx={{ py: 1.5, px: 3, '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } }}>
                <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: "#ef4444" }} /></ListItemIcon>
                <ListItemText primary="Logout" primaryTypographyProps={{ color: '#ef4444', fontWeight: 600, fontSize: '0.9rem' }} />
              </MenuItem>
            </MuiMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

