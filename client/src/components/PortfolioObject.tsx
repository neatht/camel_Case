import React from 'react';

import './PortfolioObject.css';

type PortfolioObjectProps = {
    id: string, 
    title: string, 
    author: string,
    picture: string,
}

function PortfolioObject(props: PortfolioObjectProps) {

    return(
        <div className="portfolioObject" style={{ backgroundImage: `url(${props.picture})` , backgroundSize: '240px 180px' }}>
            <div className="portfolioObjectOverlay">
                <div className="portfolioMeta">
                    <h4><strong>{props.title}</strong></h4>
                    <h5>{props.author}</h5>
                </div>
            </div>
        </div>
    );
}

export default PortfolioObject; 