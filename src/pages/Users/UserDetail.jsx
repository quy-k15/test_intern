import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Spin, Table, Button } from "antd";
import { getAlbums, getUserById } from "../../services/api";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaRegListAlt } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import UserAvatar from "../../components/UserAvatar";
import "../Albums/AlbumDetail.css";

const { Title } = Typography;

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userRes = await getUserById(userId);
        const albumsRes = await getAlbums();
        const userAlbums = albumsRes.data.filter(
          (album) => album.userId === parseInt(userId) // Lọc ra những albums của user cần hiển thịthị
        );

        setUser(userRes.data);
        setAlbums(userAlbums);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const albumColumns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "70%",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button onClick={() => navigate(`/albums/${record.id}`)}>
          <FaEye />
          Show
        </Button>
      ),
    },
  ];

  if (loading || !user) {
    return (
      <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
    );
  }

  return (
    <div className="albumDetailDiv">
      <div className="albumLink">
        <FaRegListAlt className="albumIcon" />
        <Link to="/users" className="albumTitle">
          Users
        </Link>
        <p className="albumSubtitle">/ Detail</p>
      </div>

      <div className="albumBack">
        <Link to="/users">
          <IoMdArrowBack className="backIcon" />
        </Link>
        <h4>User Detail</h4>
      </div>

      <div className="albumDetail">
        <div className="DetailContent">
          <div className="userCard">
            <UserAvatar name={user.name} />
            <div className="userInfo">
              <span className="userText">{user.name}</span>
              <a href={`mailto:${user.email}`} className="user-link">
                {user.email}
              </a>
            </div>
          </div>

          <hr />

          <Title level={4}>Albums </Title>

          <Table
            columns={albumColumns}
            dataSource={albums}
            rowKey="id"
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
