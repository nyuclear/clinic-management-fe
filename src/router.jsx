import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import UserList from "./views/Users/UserList";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/users",
        element: <UserList />,
    }
])

export default router;