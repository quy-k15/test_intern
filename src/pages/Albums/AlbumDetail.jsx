import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Spin, Row, Col, Pagination } from "antd";
import {
  getAlbumById,
  getPhotosByAlbum,
  getUserById,
} from "../../services/api";
import { useParams, useNavigate, Link } from "react-router-dom";

import { FaRegListAlt } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import "./AlbumDetail.css";

const { Title, Text } = Typography;

const AlbumDetail = () => {
  const { albumId } = useParams();
  const [album, setAlbum] = useState(null);
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    const fetchDate = async () => {
      setLoading(true);
      const albumRes = await getAlbumById(albumId);
      const userRes = await getUserById(albumRes.data.userId);
      const photosRes = await getPhotosByAlbum(albumId);
      setAlbum(albumRes.data);
      setUser(userRes.data);
      setPhotos(photosRes.data);
      setLoading(false);
    };
    fetchDate();
  }, [albumId]);

  if (loading || !album || !user) {
    return (
      <Spin size="large" style={{ display: "block", margin: "100px auto" }} />
    );
  }
  // Tính ảnh hiển thị trên trang hiện tại
  const paginatedPhotos = photos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div className="albumDetailDiv">
      <div className="albumLink">
        <FaRegListAlt className="albumIcon" />

        <Link to="/albums" className="albumTitle">
          Albums
        </Link>
        <p className="albumSubtitle">/ Show</p>
      </div>
      <div className="albumBack">
        <Link to="/albums">
          <IoMdArrowBack className="backIcon" />
        </Link>
        <h4> Show Album</h4>
      </div>
      <div className="albumDetail">
        <div className="DetailContent">
          <Card className="user-card">
            <Card.Meta
              avatar={<Avatar size={40}>{user.name.charAt(0)}</Avatar>}
              title={<span>{user.name}</span>}
              description={
                <a href={`mailto:${user.email}`} className="user-link">
                  {user.email}
                </a>
              }
            />
          </Card>
          <hr></hr>
          <Typography.Title level={4}>{album.title}</Typography.Title>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {paginatedPhotos.map((photo) => (
              <Col xs={12} sm={8} md={6} lg={4} key={photo.id}>
                <a
                  href={`https://dummyjson.com/image/${photo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`https://dummyjson.com/image/${photo.id}`}
                    alt={photo.title}
                    className="photo-thumb"
                  />
                </a>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <div className="AlbumDetailPage">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={photos.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};
export default AlbumDetail;
