import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { PageHeader, Menu, Input, Space } from "antd";
//import { UserOutlined } from '@ant-design/icons';

import "./Header.css";
import LoginButton from "./LoginButton";

const { Search } = Input;

// From antd spec
type MenuClickEvent = {
  item: string;
  key: string;
  keyPath: string;
  domEvent: Event;
};

type HeaderProps = {
  pageKey: string;
};

export function Header({ pageKey }: HeaderProps) {
  const [currentPageSelection, setCurrentPageSelection] = useState(pageKey);

  const handleMenuClick = (event: MenuClickEvent) => {
    setCurrentPageSelection(event.key);
  };

  return (
    <div>
      <header>
        <PageHeader
          className="site-page-header"
          title={
            <Link to="/" className="navTitle">
              {" "}
              <span role="img" aria-hidden="true">
                📝
              </span>{" "}
              Glowbal{" "}
            </Link>
          }
        />

        <Menu
          onClick={() => handleMenuClick}
          selectedKeys={[currentPageSelection]}
          mode="horizontal"
          style={{ textAlign: "center" }}
        >
          <Menu.Item
            key="home"
            icon={
              <span role="img" aria-hidden="true">
                🏠{" "}
              </span>
            }
          >
            <NavLink exact to="/">
              Home
            </NavLink>
          </Menu.Item>

          <Menu.Item
            key="profile"
            icon={
              <span role="img" aria-hidden="true">
                👨‍💼{" "}
              </span>
            }
          >
            <NavLink exact to="/profile">
              Profile
            </NavLink>{" "}
            {/* TODO: Protected route once authentication is set up */}
          </Menu.Item>
        </Menu>

        <Space style={{ marginLeft: "auto", marginRight: "20px" }}>
          <Search style={{ width: 300 }} enterButton />
          {/*<Avatar icon={<UserOutlined/>} />*/}
          <LoginButton />
        </Space>
      </header>
    </div>
  );
}

export default Header;
