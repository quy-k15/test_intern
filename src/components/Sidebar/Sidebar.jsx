import React, { useState } from "react";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

import { TbReportAnalytics } from "react-icons/tb";
import { GiCryptEntrance, GiGlassCelebration } from "react-icons/gi";
import { FaRegListAlt } from "react-icons/fa";
import {
  MdOutlineMenuBook,
  MdOutlinePayment,
  MdOutlineAddToPhotos,
} from "react-icons/md";
import { BsCameraReels } from "react-icons/bs";
import { BiCog } from "react-icons/bi";

import "./sidebar.css";

import logo from "../../assets/geekupLogo.svg";
const sidebarNav = [
  {
    display: "Albums",
    path: "/albums",
  },
  {
    display: "Users",
    path: "/users",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div id="sidebar">
        <ProSidebar>
          <Menu iconShape="square">
            <MenuItem
              style={{ textAlign: "center" }}
              className="sidebar-header"
              component={<Link to={sidebarNav[7].path}></Link>}
            >
                <div className="logo_img">
                  <img src={logo} alt="logo.png" />
                </div>
            </MenuItem>
            <MenuItem
              active={pathname === sidebarNav[1].path}
              icon={<MdOutlinePayment />}
              component={<Link to={sidebarNav[6].path}></Link>}
            >
              Payment
            </MenuItem>
          </Menu>
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;
