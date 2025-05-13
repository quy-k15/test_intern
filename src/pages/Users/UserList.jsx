import React, { useEffect, useState } from "react";
import { Table, Button, Spin, Typography } from "antd";
import { getAlbums, getUsers } from "../../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserAvatar from "../../components/UserAvatar";
import "../Albums/AlbumList.css";
import { FaEye } from "react-icons/fa";

const { Title } = Typography;

const UserList = () => {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [pageSize, setPageSize] = useState(20); // ✔️ quản lý pageSize bằng state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [albumRes, userRes] = await Promise.all([getAlbums(), getUsers()]);
      setAlbums(albumRes.data);
      setUsers(userRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const userMap = {};
  users.forEach((user) => {
    userMap[user.id] = user;
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "7%",
    },
    {
      title: "Avatar",
      dataIndex: "userId",
      render: (userId) => {
        const user = userMap[userId];
        if (!user) return null;
        return <UserAvatar name={user.name} />;
      },
      width: "7%",
    },
    {
      title: "Name",
      dataIndex: "userId",
      render: (userId) => {
        const user = userMap[userId];
        if (!user) return null;
        return <span>{user.name}</span>;
      },
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "userId",
      render: (userId) => {
        const email = userMap[userId].email;
        if (!email) return null;
        return (
          <a href={`mailto:${email}`} className="user-link">
            {email}
          </a>
        );
      },
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "userId",
      render: (userId) => {
        const phone = userMap[userId].phone;
        if (!phone) return null;
       return (
          <a href={`tel:${phone}`} className="user-link">
            {phone}
          </a>
        );
      },
      width: "20%",
    },
    {
      title: "Website",
      dataIndex: "userId",
      render: (userId) => {
        const website  = userMap[userId].website;
        if (!website) return null;
        return (
          <a
            href={`http://${website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="user-link"
          >
            {website}
          </a>
        );
      },
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

  // ✔️ xử lý phân trang
  const paginatedData = albums.slice((page - 1) * pageSize, page * pageSize);

  const handleTableChange = (pagination) => {
    setSearchParams({ page: pagination.current }); // giữ page trong URL
    setPageSize(pagination.pageSize); //
  };

  return (
    <div className="albumListDiv">
      <h2>Users</h2>
      <div className="albumList">
        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            columns={columns}
            dataSource={paginatedData}
            rowKey="id"
            pagination={{
              current: page,
              pageSize,
              total: albums.length,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50", "100"],
            }}
            onChange={handleTableChange}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
