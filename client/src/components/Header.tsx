import React, { useState } from 'react';
import { NavLink, BrowserRouter } from 'react-router-dom';

import { PageHeader, Button, Avatar, Input, Menu, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

//const { Search } = Input;
//const { Title } = Typography;

// From antd spec
type MenuClickEvent = {
    item: string,
    key: string,
    keyPath: string, 
    domEvent: Event
}

function Header() {

    const [ currentPageSelection, setCurrentPageSelection ] = useState('home');

    const handleMenuClick = (event: MenuClickEvent) => {
        setCurrentPageSelection(event.key);
    }

    return(
        <div>
            <header>
                <BrowserRouter>
                    <PageHeader
                      className="site-page-header"
                      title={<NavLink exact to="/" className="NavTitle"> <span role="img" aria-hidden="true">📝</span> ePortfolio </NavLink>}
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