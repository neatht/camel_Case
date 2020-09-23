import React from 'react';
import Header from '../components/Header';

function Profile() {
    return(
        <div className="App">
            <Header pageKey="profile" />
            <h1><span role="img" aria-hidden="true">👨</span> Profile</h1>
        </div>
    );
}

export default Profile;