import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import PortfolioObject from './PortfolioObject';
import PortfolioGridHeader from './PortfolioGridHeader';
import Emoji from './Emoji';

import './PortfolioGrid.css';

type PortfolioGridProps = {
}

type PortfolioObjectMetaType = {
    "key": string, 
    "title": string, 
    "type": string, 
    "media": string,
    "date": string, 
    "author": string, 
    "shortDescription": string, 
    "views": string, 
    "location": string,
}

function PortfolioGrid(props: PortfolioGridProps) {

    const [portfolioObjects, setPortfolioObjects] = useState<Array<PortfolioObjectMetaType>>([]);
    //const [fetchError, setFetchError] = useState(false);

    async function fetchPortfolioObjects(): Promise<void> {
        
        //TODO: update with route once implemented on backend
        //const res = await fetch ('/api/v/1/...')
        //res
        //  .json()
        //  .then(res => setPortfolioObjects(res.data))
        //  .catch(err => setFetchError(err));

        // Dummy for now
        setPortfolioObjects([
            {
                "key": "1", 
                "title": "Project 1",
                "type": "website",
                "media": "https://i.ibb.co/BNZxQ2z/example0.jpg",
                "date": "2020-01",
                "author": "Author 1",
                "shortDescription": "This is a short description about the project",
                "views": "10",
                "location": "Melbourne, Australia"
            },
            {
                "key": "2", 
                "title": "Project 2",
                "type": "website",
                "media": "https://i.ibb.co/TYYyXDH/example1.png",
                "date": "2020-01",
                "author": "Author 2",
                "shortDescription": "This is a short description about the project",
                "views": "10",
                "location": "Melbourne, Australia"
            },
            {
                "key": "3", 
                "title": "Project 3",
                "type": "website",
                "media": "https://i.ibb.co/pZmXQb5/example2.png",
                "date": "2020-01",
                "author": "Author 3",
                "shortDescription": "This is a short description about the project",
                "views": "10",
                "location": "Melbourne, Australia"
            },
            {
                "key": "4", 
                "title": "Project 4",
                "type": "website",
                "media": "https://i.ibb.co/SwzRr9S/example3.png",
                "date": "2020-01",
                "author": "Author 4",
                "shortDescription": "This is a short description about the project",
                "views": "10",
                "location": "Melbourne, Australia"
            },
            {
                "key": "5", 
                "title": "Project 5",
                "type": "website",
                "media": "https://i.ibb.co/CsNzYxy/example5.png",
                "date": "2020-01",
                "author": "Author 5",
                "shortDescription": "This is a short description about the project",
                "views": "10",
                "location": "Melbourne, Australia"
            },
            {
                "key": "6", 
                "title": "Project 6",
                "type": "website",
                "media": "https://i.ibb.co/gWDkgdh/example6.jpg",
                "date": "2020-01",
                "author": "Author 6",
                "shortDescription": "This is a short description about the project",
                "views": "10",
                "location": "Melbourne, Australia"
            },
            {
                "key": "7", 
                "title": "Project 7",
                "type": "website",
                "media": "https://i.ibb.co/8j5MMLw/example7.jpg",
                "date": "2020-01",
                "author": "Author 7",
                "shortDescription": "This is a short description about the project",
                "views": "10",
                "location": "Melbourne, Australia"
            },
            {
                "key": "8", 
                "title": "Project 8",
                "type": "website",
                "media": "https://i.ibb.co/rybJT5c/example4.png",
                "date": "2020-01",
                "author": "Author 8",
                "shortDescription": "This is a short description about the project",
                "views": "10",
                "location": "Melbourne, Australia"
            },
            {
                "key": "9", 
                "title": "Project 9",
                "type": "website",
                "media": "https://i.ibb.co/SBWrhmP/example30.png",
                "date": "2020-01",
                "author": "Author 9",
                "shortDescription": "This is a short description about the project",
                "views": "10",
                "location": "Melbourne, Australia"
            },
        ])};

    useEffect(() => {
        fetchPortfolioObjects();
    }, []);

    return(
        <div className="portfolioGrid">
            <PortfolioGridHeader
              title={<><Emoji symbol="👀" /> Browse</>}
            />
            
            <Row gutter={[30, 30]}> {/* 180px (portfolio object height) + 30px padding*/}
                {portfolioObjects.map( (value, index, array) => {
                    return  <Col flex="270px"> {/* 240px (portfolio object) + 30px (padding) */} 
                                <PortfolioObject
                                    id={value.key}
                                    title={value.title}
                                    author={value.author}
                                    picture={value.media}
                                />
                            </Col>
                })}
            </Row>
        </div>
    );
}

export default PortfolioGrid;