import { Modal, Button, message } from 'antd';
import { useState } from 'react';
import axios from 'axios';

export default function UserCreateForm({isOpen, onClose, onSuccess}) {
    const [messageAlert, contextHolder] = message.useMessage();
    const [createForm, setCreateForm] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'admin',
    });
    const [createFormErrors, setCreateFormErrors] = useState({});

    
    const handleChange = (e) => {
        setCreateForm({ ...createForm, [e.target.name]: e.target.value });
    }
    
    const handleCloseForm = () => {
      onClose();
      setCreateForm({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'admin',
      });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(
            "http://localhost:8000/api/users",
            {
                name: createForm.name,
                email: createForm.email,
                password: createForm.password,
                phone: createForm.phone,
                role: createForm.role,
            },
            {
                headers: {
                    Authorization: `Bearer 3|pPD77iikq5ekbaHDvpoSpMm32ZZp2A6xD0uTWpan58bff06c`,
                },
            }
        )
        .then((response) => {
            handleCloseForm();
            messageAlert.success("Tạo người dùng thành công!");
            onSuccess();
        })
        .catch((error) => {
            if (error.response && error.response.status === 422) {
                setCreateFormErrors(error.response.data.errors);
            } else {
                console.error("POST error:", error);
            }
        });
    }
    return (
        <div>
            {contextHolder}
            <Modal
            title={
                <div className="Modal-title">Thêm mới người dùng</div>
            }
            closable={true}
            open={isOpen}
            onCancel={handleCloseForm}
            footer={null}
            >
            <form className="Form" onSubmit={handleSubmit}>
                <div className="Form-item">
                    <label className="Form-label">Họ và tên</label>
                    <input className="Form-input" name="name" value={createForm.name} onChange={handleChange} />
                    {createFormErrors.name && 
                    <p className="Form-error">{createFormErrors.name[0]}</p>
                    }
                </div> 
                <div className="Form-item">
                    <label className="Form-label">Email</label>
                    <input className="Form-input" name="email" value={createForm.email} onChange={handleChange} />
                    {createFormErrors.email && 
                    <p className="Form-error">{createFormErrors.email[0]}</p>
                    }
                </div>
                <div className="Form-item">
                    <label className="Form-label">Mật khẩu</label>
                    <input className="Form-input" name="password" type="password" value={createForm.password} onChange={handleChange} />
                    {createFormErrors.password && 
                    <p className="Form-error">{createFormErrors.password[0]}</p>
                    }
                </div>
                <div className="Form-item">
                    <label className="Form-label">Vai trò</label>
                    <select className="Form-select" name="role" value={createForm.role} onChange={handleChange}>
                        
                    <option value="doctor">Bác sĩ</option>
                        <option value="admin">Quản trị viên</option>
                    </select>
                    {createFormErrors.role && 
                    <p className="Form-error">{createFormErrors.role[0]}</p>
                    }
                </div>
                <div className="Form-item">
                    <label className="Form-label">Số điện thoại</label>
                    <input className="Form-input" name="phone" value={createForm.phone} onChange={handleChange} />
                    {createFormErrors.phone &&
                    <p className="Form-error">{createFormErrors.phone[0]}</p>
                    }
                </div>
                <div className="Form-item Form-button">
                    <Button type="primary" htmlType="submit">
                        Thêm mới
                    </Button>
                </div>
            </form>
          </Modal>
        </div>
    );
}