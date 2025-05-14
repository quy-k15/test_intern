import React, { useEffect, useState } from "react";
import { Table, Button, Spin, Typography } from "antd";
import { getUsers } from "../../services/api";
import { useNavigate } from "react-router-dom";
import UserAvatar from "../../components/UserAvatar";
import "../Albums/AlbumList.css";
import { FaEye } from "react-icons/fa";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userRes = await getUsers();
      setUsers(userRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "7%",
    },
    {
      title: "Avatar",
      dataIndex: "name",
      render: (name) => <UserAvatar name={name} />,
      width: "7%",
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email) => (
        <a href={`mailto:${email}`} className="user-link">
          {email}
        </a>
      ),
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (phone) => (
        <a href={`tel:${phone}`} className="user-link">
          {phone}
        </a>
      ),
      width: "20%",
    },
    {
      title: "Website",
      dataIndex: "website",
      render: (website) => (
        <a
          href={`http://${website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="user-link"
        >
          {website}
        </a>
      ),
      width: "13%",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button onClick={() => navigate(`/users/${record.id}`)}>
          <FaEye />
          Show
        </Button>
      ),
    },
  ];

  return (
    <div className="albumListDiv">
      <h2>Users</h2>
      <div className="albumList">
        {loading ? (
          <Spin size="large" />
        ) : (
          <div className="table-responsive">
            <Table
              columns={columns}
              dataSource={users}
              rowKey="id"
              pagination={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
