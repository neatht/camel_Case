import React, { useState } from 'react';
import { NavLink, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PageHeader, Button, Avatar, Input, Menu, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './Header.css';

//const { Search } = Input;
//const { Title } = Typography;

// From antd spec
type MenuClickEvent = {
    item: string,
    key: string,
    keyPath: string, 
    domEvent: Event
}

type HeaderProps = {
    pageKey: string,
}

export function Header({ pageKey }: HeaderProps) {

    const [ currentPageSelection, setCurrentPageSelection ] = useState(pageKey);

    const handleMenuClick = (event: MenuClickEvent) => {
        setCurrentPageSelection(event.key);
    }

    return(
        <div>
            <header>
                <BrowserRouter>
                    <PageHeader
                      className="site-page-header"
                      title={<NavLink exact to="/" className="navTitle"> <span role="img" aria-hidden="true">📝</span> ePortfolio </NavLink>}
                      extra={[
                          <Avatar icon={<UserOutlined/>} />
                      ]} 
                      />
                </BrowserRouter>

                <Menu
                  onClick={() => handleMenuClick}
                  selectedKeys={[currentPageSelection]}
                  mode="horizontal"
                > 

                      <Menu.Item key="home" icon={"🏠 "}>
                        <NavLink exact to="/">Home</NavLink>
                      </Menu.Item>

                      <Menu.Item key="profile" icon={"👨‍💼 "}>
                        <NavLink exact to="/profile">Profile</NavLink> {/* TODO: Protected route once authentication is set up */}
                      </Menu.Item>

                </Menu>

            </header>
        </div>
    );
}

export default Header;