// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/components/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <h2 className="Sidebar-title">Clinic Management</h2>
      <nav className="Sidebar-nav">
        <ul>
          <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Trang chủ</NavLink></li>
          <li><NavLink to="/users" className={({ isActive }) => isActive ? 'active' : ''} >Nhân viên</NavLink></li>
          <li><NavLink to="/patients" className={({ isActive }) => isActive ? 'active' : ''}>Bệnh nhân</NavLink></li>
          <li><NavLink to="/appointments" className={({ isActive }) => isActive ? 'active' : ''}>Lịch hẹn</NavLink></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
