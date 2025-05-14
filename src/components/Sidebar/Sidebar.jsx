import React, { useState, useEffect } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { FaRegListAlt, FaBars } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { HiOutlineIdentification } from "react-icons/hi2";
import "./Sidebar.css";
import logo from "../../assets/geekupLogo.svg";

const sidebarNav = [
  { display: "Albums", path: "/albums" },
  { display: "Users", path: "/users" },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [visible, setVisible] = useState(window.innerWidth > 1024); // ban đầu chỉ hiện nếu không phải mobile

  const [isClick, setIsClick] = useState(false); // Tạo biến lưu hành động mở rộng/ ẩn bớt sidebar

  const toggleSidebar = () => {
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      setVisible(!mobile); // nếu mobile thì ẩn sidebar
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFullSidebar = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      {isMobile && (
        <div className="toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </div>
      )}

      {visible && (
        <div className="sidebarDiv">
           <div id="sidebar" className={isClick ? "collapsed" : ""}>
            <ProSidebar>
              <div className="sidebarContent">
                <div className="sidebarContentInner">
                  <Menu iconShape="square">
                    <MenuItem
                      active={pathname.startsWith("/albums")}
                      icon={<FaRegListAlt />}
                      component={<Link to={sidebarNav[0].path} />}
                    >
                      {!isClick && "Albums"}
                    </MenuItem>

                    <MenuItem
                      active={pathname.startsWith("/users")}
                      icon={<HiOutlineIdentification />}
                      component={<Link to={sidebarNav[1].path} />}
                    >
                      {!isClick && "Users"}
                    </MenuItem>
                  </Menu>

                  <div className="SidebarBot" onClick={handleFullSidebar}>
                    <IoChevronBackOutline />
                  </div>
                </div>
              </div>
            </ProSidebar>
          </div>
          {isMobile && (
            <div className="sidebarRight" onClick={toggleSidebar}></div>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
