import React, { useEffect, useState, useCallback } from "react";
import CommonLayout from "../../components/CommonLayout";
import Card from "../../components/Card";
import { Button } from 'antd';
import axiosInstance from "../../context/AxiosInstance";

export default function AppointmentsList () {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = useCallback (() => {
        axiosInstance.get('/appointments')
        .then((response) => {
            setAppointments(response.data)
        })
    }, [])

    useEffect (() => {
        fetchAppointments();
    },[])

    return (
        <CommonLayout>
            <Card 
                title={
                    <div className="Card-header">
                        <div className="Card-title">Danh sách bệnh nhân</div>
                        <Button type="primary" >
                            <i className="Button-icon fa-solid fa-plus"></i>Thêm mới
                        </Button>
                    </div>
                }
                
                content={
                    <div>
                        <table className="Table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Patient</th>
                                    <th>Doctor</th>
                                    <th>Ngay hen</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    appointments.map((appointment) => {
                                        return (
                                            <tr key={appointment.id}>
                                                <td>{appointment.id}</td>
                                                <td>{appointment.patient_id}</td>
                                                <td>{appointment.doctor_id}</td>
                                                <td>{appointment.appointment_date}</td>
                                                <td>Action</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
                />
        </CommonLayout>
    );
}