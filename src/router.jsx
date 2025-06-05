import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import UserList from "./views/Users/UserList";
import LandingPage from "./views/LandingPage";
import PatientsList from "./views/Patients/PatientsList";
import AppointmentList from "./views/Appointments/AppointmentsList";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
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
    },
    {
        path: "/patients",
        element: <PatientsList />,
    },
    {
        path: "/appointments",
        element: <AppointmentList/>
    }
])

export default router;