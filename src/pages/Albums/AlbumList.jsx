import React, { useEffect, useState } from 'react';
import { Table, Button, Spin, Typography } from 'antd';
import { getAlbums, getUsers } from '../../services/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserAvatar from '../../components/UserAvatar';
import "./AlbumList.css";
import { FaEye } from "react-icons/fa";

const { Title } = Typography;

const AlbumList = () => {
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
  users.forEach(user => {
    userMap[user.id] = user;
  });

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '10%',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: '50%',
    },
    {
      title: 'User',
      dataIndex: 'userId',
      render: (userId) => {
        const user = userMap[userId];
        if (!user) return null;
        return (
          <div
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <UserAvatar name={user.name} />
            <span>{user.name}</span>
          </div>
        );
      },
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Button onClick={() => navigate(`/albums/${record.id}`)}>
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
              pageSizeOptions: ['10', '20', '50', '100'], 
            }}
            onChange={handleTableChange}
          />
        )}
      </div>
    </div>
    
  );
};

export default AlbumList;
