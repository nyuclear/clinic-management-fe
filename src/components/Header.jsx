import React from "react";
import "../assets/components/Header.css";
import { Dropdown } from 'antd';
import { useEffect, useState } from "react";

export default function Header() {
    const [userDropdown, setUserDropdown] = useState([]);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    useEffect(() => {
        setUserDropdown( [
            {
                key: "1",
                label: (
                    <label className="Header-user-dropdown-label">Thông tin</label>
                ),
            },
            {
                key: "3",
                label: "Logout",
                onClick: logout,
            }
        ]);
    }, []);
    return (
        <div className="Header">
            <div className="Header-user">   
                {/* <label className="Header-user-name">Xin chào, {user.name}</label> */}
                <Dropdown menu={{ items: userDropdown }}>
                    <a onClick={(e) => e.preventDefault()}>
                       <i className="Header-user-icon fa-solid fa-address-card"></i>
                    </a>
                </Dropdown>
            </div>
        </div>
    )
}   