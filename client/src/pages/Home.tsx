import React from 'react';

import Header from '../components/Header';

function Home() {
    return(
        <div className="App">
            <Header pageKey="home" />
            <h1>🐪 camel_Case</h1>
        </div>
    );
}

export default Home;