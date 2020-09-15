import React from 'react';

import Header from '../components/Header';

function Home() {
    return(
        <div className="App">
            <Header pageKey="home" />
            <h1><span role="img" aria-hidden="true">🐪</span> camel_Case</h1>
        </div>
    );
}

export default Home;