import React, { useState } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';

import { PageHeader, Menu, Input, Space, Tooltip } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import './Header.css';
import LoginButton from './LoginButton';
import Emoji from './Emoji';

import '../css/theme.css';
import '../css/base.css';
import '../css/layout.css';

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

  const history = useHistory();

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
              {' '}
              <div style={{ fontSize: '1.2em' }} className="gradient">
                <Emoji symbol="🛰️" resize={false} /> <strong>Glowbal</strong>
              </div>
            </Link>
          }
        />

        <Menu
          onClick={() => handleMenuClick}
          selectedKeys={[currentPageSelection]}
          mode="horizontal"
          style={{ textAlign: 'center' }}
        >
          <Menu.Item
            key="home"
            icon={
              <span role="img" aria-hidden="true">
                <HomeOutlined />
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
                <UserOutlined />
              </span>
            }
          >
            <NavLink exact to="/profile">
              Profile
            </NavLink>{' '}
          </Menu.Item>
        </Menu>

        <Space style={{ marginLeft: 'auto', marginRight: '20px' }}>
          <Tooltip title="Toggle Dark Mode">
            <div
              className="toggle-dark-mode gradient"
              onClick={() => {
                if (
                  document.documentElement.getAttribute('data-theme') === 'dark'
                )
                  document.documentElement.setAttribute('data-theme', 'light');
                else
                  document.documentElement.setAttribute('data-theme', 'dark');
              }}
            ></div>
          </Tooltip>
          {'  '}
          <Search
            style={{ width: 300 }}
            enterButton
            onSearch={(value) => {
              history.push(`/search/${value}`);
            }}
          />
          <LoginButton />
        </Space>
      </header>
    </div>
  );
}

export default Header;
