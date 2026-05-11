import React from 'react';
import DashboardHeader from '../../components/navbar/DashboardHeader';
import '../../styles/dashboard/Dashboard.css';

const DashboardLayout = ({ children }) => {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
};

export default DashboardLayout;

