import React from 'react';
import { Layout } from 'antd';
import './Header.css';
import Logo from "../../assets/geekupLogo.svg"


const Header = () => {
  return (
    <div className="app-header">
      <div className="logo_img">
         <img src={Logo} alt="logo.png" />
      </div>
    </div>
  );
};

export default Header;
