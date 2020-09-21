import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Spin } from 'antd';

import Header from '../components/Header';
import SocialLinks from '../components/SocialLinks';

function Home() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <Spin size="large"/>
    }

    return(
        <div className="App">
            <Header pageKey="home" />
            <h1><span role="img" aria-hidden="true">🐪</span> camel_Case</h1>
            {isAuthenticated
            ? <div>
                <h2> User: {user.name} </h2>
                <p> Email: {user.email} </p>   
              </div>
            : <div>
                <h2> Not logged in </h2>
              </div>
            }

            <SocialLinks />

        </div>
    );
}

export default Home;