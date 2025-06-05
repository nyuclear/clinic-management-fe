import React from "react";
import "../assets/css/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header className="header">
        <h1 className="title">Welcome to Our Clinic</h1>
        <p className="subtitle">Doctor : Nguyen Thi Cam An</p>
      </header>

      <main className="main">
        <p className="description">
          Phòng khám nội tổng hợp, chuyên nghiệp, uy tín, chất lượng.
        </p>
        <button className="get-started-button">
          Đặt lịch khám
        </button>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Nyuclear. All rights reserved.
      </footer>
    </div>
  );
}