import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import Header from '../components/Header';
import SocialLinks from '../components/SocialLinks';
import PortfolioGrid from '../components/PortfolioGrid';
import FilterAndSort from '../components/FilterAndSort';



function Profile() {
    const { user, isAuthenticated } = useAuth0();
    
    return(
        <div className="App">
            <Header pageKey="profile" />
            <h1><span role="img" aria-hidden="true">👨</span> Profile</h1>
        

        <div className="browse">

              <div className="floatingBox">
                <FilterAndSort />
              </div>

              <div className="mainContent">
                <PortfolioGrid />
              </div>

            </div>
          
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

export default Profile;