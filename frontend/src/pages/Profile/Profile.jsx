import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Grid,
  Paper,
  Button,
  TextField,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DescriptionIcon from '@mui/icons-material/Description';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import apiClient from '../../services/api';
import { useNavigate, useLocation } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiClient.get("/user/profile");
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };

    // Determine tab based on current path
    const path = location.pathname;
    if (path.includes('/statements')) setTabValue(1);
    else if (path.includes('/settings')) setTabValue(2);
    else setTabValue(0);

    fetchProfile();
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const paths = ['/dashboard/profile', '/dashboard/statements', '/dashboard/settings'];
    navigate(paths[newValue]);
  };

  if (loading) return <Box sx={{ p: 4, textAlign: 'center' }}>Loading Account Details...</Box>;

  return (
    <Box sx={{
      p: 2,
      maxWidth: 780,
      margin: '0 auto',
      transition: 'all 0.3s ease'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
        <Avatar
          sx={{
            width: 64,
            height: 64,
            bgcolor: 'var(--accent-color)',
            fontSize: '1.6rem',
            fontWeight: 'bold',
            color: '#000'
          }}
        >
          {user?.username?.charAt(0).toUpperCase() || 'U'}
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight="800" color="var(--text-primary)">
            {user?.username || 'Trader'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <VerifiedUserIcon sx={{ color: '#10b981', fontSize: '1.2rem' }} />
            <Typography variant="body2" color="var(--text-secondary)">
              KYC Verified • {user?.email}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'var(--border-color)', mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.94rem',
              minWidth: 100,
              color: 'var(--text-secondary)',
              '&.Mui-selected': { color: 'var(--accent-color)' }
            },
            '& .MuiTabs-indicator': { backgroundColor: 'var(--accent-color)' }
          }}
        >
          <Tab label="Profile" />
          <Tab label="Statements" />
          <Tab label="Settings" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Box sx={{ maxWidth: 620 }}>
          <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid var(--border-color)', background: 'var(--card-bg)', mb: 3, overflow: 'hidden' }}>
            <Box sx={{ px: 2.5, pt: 2.5, pb: 1 }}>
              <Typography variant="subtitle1" fontWeight="800" color="var(--text-primary)">Personal Details</Typography>
            </Box>

            {/* FULL NAME */}
            <Box sx={{ px: 2.5, py: 1.8, borderTop: '1px solid var(--border-color)' }}>
              <Typography variant="caption" color="var(--text-secondary)" sx={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Full Name</Typography>
              <Typography fontWeight="600" color="var(--text-primary)" sx={{ fontSize: '0.95rem', mt: 0.3 }}>{user?.username}</Typography>
            </Box>

            {/* PAN */}
            <Box sx={{ px: 2.5, py: 1.8, borderTop: '1px solid var(--border-color)' }}>
              <Typography variant="caption" color="var(--text-secondary)" sx={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>PAN</Typography>
              <Typography fontWeight="600" color="var(--text-primary)" sx={{ fontSize: '0.95rem', mt: 0.3 }}>ABCDE1234F</Typography>
            </Box>

            {/* EMAIL */}
            <Box sx={{ px: 2.5, py: 1.8, borderTop: '1px solid var(--border-color)' }}>
              <Typography variant="caption" color="var(--text-secondary)" sx={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Email</Typography>
              <Typography fontWeight="600" color="var(--text-primary)" sx={{ fontSize: '0.95rem', mt: 0.3 }}>{user?.email}</Typography>
            </Box>

            {/* MOBILE */}
            <Box sx={{ px: 2.5, py: 1.8, borderTop: '1px solid var(--border-color)' }}>
              <Typography variant="caption" color="var(--text-secondary)" sx={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Mobile</Typography>
              <Typography fontWeight="600" color="var(--text-primary)" sx={{ fontSize: '0.95rem', mt: 0.3 }}>+91 9876543210</Typography>
            </Box>
          </Paper>

          {/* Bank Accounts */}
          <Paper elevation={0} sx={{ borderRadius: 4, border: '1px solid var(--border-color)', background: 'var(--card-bg)', overflow: 'hidden' }}>
            <Box sx={{ px: 2.5, pt: 2.5, pb: 1 }}>
              <Typography variant="subtitle1" fontWeight="800" color="var(--text-primary)">Bank Accounts</Typography>
            </Box>
            <Box sx={{ px: 2.5, py: 1.8, borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 2 }}>
              <AccountBalanceIcon sx={{ color: 'var(--accent-color)', fontSize: '1.4rem' }} />
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight="600" color="var(--text-primary)" sx={{ fontSize: '0.92rem' }}>HDFC Bank •••• 4582</Typography>
                <Typography variant="body2" color="var(--text-secondary)" sx={{ fontSize: '0.78rem' }}>Primary Account</Typography>
              </Box>
              <Typography variant="caption" sx={{ bgcolor: 'rgba(0,208,156,0.1)', color: 'var(--accent-color)', px: 1.2, py: 0.5, borderRadius: 1, fontWeight: 700, fontSize: '0.7rem' }}>VERIFIED</Typography>
            </Box>
          </Paper>
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          <Typography variant="h6" fontWeight="700" mb={3} color="var(--text-primary)">Recent Statements</Typography>
          <List sx={{ bgcolor: 'var(--card-bg)', borderRadius: 4, border: '1px solid var(--border-color)' }}>
            {[
              { title: 'Tax P&L Report - FY 2023-24', date: 'May 01, 2024', size: '2.4 MB' },
              { title: 'Contract Note - NSE Equity', date: 'Apr 28, 2024', size: '1.1 MB' },
              { title: 'Monthly Holding Statement', date: 'Apr 01, 2024', size: '3.5 MB' },
              { title: 'Ledger Report - Q4 FY24', date: 'Mar 31, 2024', size: '4.2 MB' },
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                <ListItem sx={{ py: 1.5 }}>
                  <ListItemIcon><DescriptionIcon sx={{ color: 'var(--accent-color)', fontSize: '1.15rem' }} /></ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    secondary={`${item.date} • ${item.size}`}
                    primaryTypographyProps={{ fontWeight: 600, color: 'var(--text-primary)' }}
                    secondaryTypographyProps={{ color: 'var(--text-secondary)' }}
                  />
                  <Button variant="outlined" size="small" sx={{ borderRadius: 2, color: 'var(--accent-color)', borderColor: 'var(--accent-color)' }}>Download</Button>
                </ListItem>
                {idx < 3 && <Divider sx={{ borderColor: 'var(--border-color)' }} />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}

      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 4, border: '1px solid var(--border-color)', background: 'var(--card-bg)' }}>
              <Typography variant="h6" fontWeight="700" mb={3} color="var(--text-primary)">Account Settings</Typography>
              <List>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon><NotificationsIcon sx={{ color: 'var(--text-secondary)' }} /></ListItemIcon>
                  <ListItemText primary="Order Notifications" secondary="Receive alerts for executed orders" primaryTypographyProps={{ color: 'var(--text-primary)' }} secondaryTypographyProps={{ color: 'var(--text-secondary)' }} />
                  <Switch defaultChecked />
                </ListItem>
                <Divider sx={{ my: 1, borderColor: 'var(--border-color)' }} />
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon><SecurityIcon sx={{ color: 'var(--text-secondary)' }} /></ListItemIcon>
                  <ListItemText primary="Two-Factor Authentication" secondary="Additional security layer for login" primaryTypographyProps={{ color: 'var(--text-primary)' }} secondaryTypographyProps={{ color: 'var(--text-secondary)' }} />
                  <Switch defaultChecked color="success" />
                </ListItem>
                <Divider sx={{ my: 1, borderColor: 'var(--border-color)' }} />
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon><PersonIcon sx={{ color: 'var(--text-secondary)' }} /></ListItemIcon>
                  <ListItemText primary="Market Updates" secondary="Daily newsletter and market insights" primaryTypographyProps={{ color: 'var(--text-primary)' }} secondaryTypographyProps={{ color: 'var(--text-secondary)' }} />
                  <Switch />
                </ListItem>
              </List>

              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle2" fontWeight="700" mb={2} color="var(--text-primary)">Change Password</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField fullWidth type="password" label="Current Password" variant="outlined" size="small" sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)', '& fieldset': { borderColor: 'var(--border-color)' } }, '& .MuiInputLabel-root': { color: 'var(--text-secondary)' } }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth type="password" label="New Password" variant="outlined" size="small" sx={{ '& .MuiOutlinedInput-root': { color: 'var(--text-primary)', '& fieldset': { borderColor: 'var(--border-color)' } }, '& .MuiInputLabel-root': { color: 'var(--text-secondary)' } }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" sx={{ borderRadius: 2, fontWeight: 700, bgcolor: 'var(--accent-color)', color: '#000', '&:hover': { bgcolor: 'rgba(0,208,156,0.8)' } }}>Update Password</Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Account;

