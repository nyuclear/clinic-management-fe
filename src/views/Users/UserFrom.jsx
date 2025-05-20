import React, { useState } from "react";
import { Modal, Button } from "antd";
import axiosInstance from "../../context/AxiosInstance";

export default function UserFrom({isOpen, onClose, onSuccess, user}) {
    const FIELDS = ["name", "email", "phone", "role"];
    const [formErrors, setFormErrors] = useState({});
    const [form, setForm] = useState(() => {
        const u = user || {};
        return FIELDS.reduce((acc, key) => {
            acc[key] = u[key] ?? "";
            return acc;
        }, {});
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axiosInstance
        .put(`/users/${user.id}`, form)
            .then(res => {
                onClose();
                onSuccess();
            })
            .catch(err => {
                setFormErrors(err.response.data.errors);
            });
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    return (
        <>
        {/* {contextHolder} */}
        <Modal
            title="Edit User"
            open={isOpen}
            onCancel={onClose}
            footer={null}
        >
            <form className="Form" onSubmit={handleSubmit}>
                <div className="Form-item">
                    <label className="Form-label">Họ và tên</label>
                    <input className="Form-input" name="name" value={form.name} onChange={handleChange} />
                    {formErrors.name && 
                    <p className="Form-error">{formErrors.name[0]}</p>
                    }
                </div> 
                <div className="Form-item">
                    <label className="Form-label">Email</label>
                    <input className="Form-input" name="email" value={form.email} onChange={handleChange} />
                    {formErrors.email && 
                    <p className="Form-error">{formErrors.email[0]}</p>
                    }
                </div>
                <div className="Form-item">
                    <label className="Form-label">Vai trò</label>
                    <select className="Form-select" name="role" value={form.role} onChange={handleChange}>
                        <option value="doctor">Bác sĩ</option>
                        <option value="admin">Quản trị viên</option>
                    </select>
                    {formErrors.role && 
                    <p className="Form-error">{formErrors.role[0]}</p>
                    }
                </div>
                <div className="Form-item">
                    <label className="Form-label">Số điện thoại</label>
                    <input className="Form-input" name="phone" value={form.phone} onChange={handleChange} />
                    {formErrors.phone &&
                    <p className="Form-error">{formErrors.phone[0]}</p>
                    }
                </div>
                <div className="Form-item Form-button">
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                </div>
            </form>
        </Modal>
        </>
    )
}