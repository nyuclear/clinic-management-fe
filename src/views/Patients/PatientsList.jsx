import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "antd";
import Card from "../../components/Card";
import axiosInstance from "../../context/AxiosInstance";
import CommonLayout from "../../components/CommonLayout";


export default function PatientsList() {
    const [patients, setPatients] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    const fetchPatients = useCallback(() => {
        axiosInstance.get('/patients')
            .then(response => {
                setPatients(response.data);
                
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    return (
        <div>
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
                                    <th>Họ và tên</th>
                                    <th>Năm sinh</th>
                                    <th>Số điện thoại</th>
                                    <th>CMND/CCCD</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    patients.map((patient) => {
                                        return (
                                            <tr key={patient.id}>
                                                <td>{patient.id}</td>
                                                <td>{patient.full_name}</td>
                                                <td>{patient.date_of_birth}</td>
                                                <td>{patient.phone}</td>
                                                <td>Số cmnd</td>
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
        </div>
    );
}