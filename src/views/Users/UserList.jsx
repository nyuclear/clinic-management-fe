import React, { useEffect, useState } from "react";
import CommonLayout from "../../components/CommonLayout";
import Card from "../../components/Card";
import { Button, Pagination, message, Modal } from 'antd';
import UserCreateForm from "./UserCreateForm";
import UserFrom from "./UserFrom";
import axiosInstance from "../../context/AxiosInstance";
import { ROLES } from "../../constants/constants";
import Confirm from "../../components/Confirm";

export default function UserList() {
    const [messageAlert, contextHolder] = message.useMessage();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserFormOpen, setIsUserFormOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        perPage: 10,
        totalUsers: 0,
    });

    const handleShowForm = () => {
        setIsModalOpen(true);
    }

    const handlePageChange = (page, pageSize) => {
        setPagination({
            currentPage: page,
            perPage: pageSize,
        });
    };

    const fetchUsers = () => {
        axiosInstance
        .get(`/users?current_page=${pagination.currentPage}&per_page=${pagination.perPage} `)
        .then((response) => {
            let result = response.data;
            setUsers(result.data);
            // setPagination({
            //     currentPage: result.meta.current_page,
            //     perPage: result.meta.per_page,
            //     totalUsers: result.meta.total,
            // });
        })
        .catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        console.log(1233);
        fetchUsers(); // gọi fetchUsers khi component mount (load lần đầu)
      }, [pagination.currentPage, pagination.perPage]);

    const openUserForm = (user) => {
        setIsUserFormOpen(true);
        setSelectedUser(user);
    }

    const handleOnSuccess = () => {
        fetchUsers();
        console.log("succeess");
        messageAlert.success("Cập nhật thành công");
    }

    const handleDeleteUser = (userId) => {
        axiosInstance.delete(`/users/${userId}`)
            .then(() => {
              messageAlert.success('User deleted successfully');
              fetchUsers(); // Refresh list
            })
            .catch((error) => {
              console.error(error);
              message.error('Failed to delete user');
            });
        setIsConfirmOpen(false);
        fetchUsers();
    };

    const handleConfirmDelete = (userId) => {
        setIsConfirmOpen(true);
        setSelectedUser(userId);
    }
      
    const handleActiveUser = (userId) => {
        axiosInstance.post(`/users/${userId}/active`)
            .then(() => {
                messageAlert.success('User active successfully');
                fetchUsers();
            });
    }

  return (
    <div>
        {contextHolder}
      <CommonLayout>
        <Card 
        title={
            <div className="Card-header">
                <div className="Card-title">Danh sách người dùng</div>
                <Button type="primary" onClick={handleShowForm}>
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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{ROLES[user.role]}</td>
                                        <td>
                                            {user.status ? 
                                            <div className="Span-inactive">InActive</div> : 
                                            <div className="Span-active">Active</div>}
                                        </td>
                                        <td className="Column-action">
                                            <div title="Edit" onClick={() => openUserForm(user)}>
                                               <i className="fa-solid fa-pen-to-square"></i>
                                            </div>
                                            {user.status ? 
                                            <div title="Active" onClick={() => handleActiveUser(user.id)}>
                                                <i class="fa-solid fa-unlock"></i>
                                            </div> : 
                                            <div title="InActive" onClick={() => handleConfirmDelete(user.id)}>
                                                <i className="fa-solid fa-xmark"></i>
                                            </div>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                {/* PAGINATION */}
                <div className="Pagination">
                    <Pagination
                        current={pagination.currentPage}
                        total={pagination.totalUsers}
                        pageSize={pagination.perPage}
                        onChange={handlePageChange}
                    />
                </div>
                
            </div>
        }>
        </Card>

        {isModalOpen && (
            <UserCreateForm isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSuccess={handleOnSuccess} />
        )}

        {isUserFormOpen && (
            <UserFrom 
                isOpen={isUserFormOpen}
                onClose={() => setIsUserFormOpen(false)}
                onSuccess={handleOnSuccess} 
                user={selectedUser}
                />
        )}

        {isConfirmOpen && (
            <Confirm 
                isOpen={isConfirmOpen}
                title="Are you sure you want to delete this user?"
                content=""
                onOk={() => handleDeleteUser(selectedUser)}
                onCancel={() => setIsConfirmOpen(false)}
                />
        )}
      </CommonLayout>
    </div>
  );
}
