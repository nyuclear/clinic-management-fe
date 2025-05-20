import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const CommonLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null: chưa xác định, true/false: xác định rồi

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated === null) {
    // 👇 Không render gì hết (có thể return loader)
    return null;
  }

  return (
    <div className="Layout-common">
      <Sidebar />
      <div className="Layout-main">
        <Header />
        <div className="Layout-page">{children}</div>
      </div>
    </div>
  );
};

export default CommonLayout;
