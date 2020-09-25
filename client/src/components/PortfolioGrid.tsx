import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

import PortfolioObject from './PortfolioObject';
import PortfolioGridHeader from './PortfolioGridHeader';
import Emoji from './Emoji';

import './PortfolioGrid.css';

type PortfolioGridProps = {
}

type PortfolioObjectMetaType = {
    key: string, 
    title: string, 
    type: string, 
    media: string,
    date: string, 
    author: string, 
    shortDescription: string, 
    views: string, 
    location: string
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
                "media": "www.link.com",
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
                "media": "www.link.com",
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
                "media": "www.link.com",
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
                "media": "www.link.com",
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
                "media": "www.link.com",
                "date": "2020-01",
                "author": "Author 5",
                "shortDescription": "This is a short description about the project",
                "views": "10",
                "location": "Melbourne, Australia"
            },
        ])};

    useEffect(() => {
        fetchPortfolioObjects();
    }, []);

    const [portfolioObjectOpen, setPortfolioObjectOpen] = useState(false);

    const openPortfolioObject = (open: boolean) => {
        setPortfolioObjectOpen(open);
    }
    
    return(
        <div className={`portfolioGrid ${portfolioObjectOpen ? "portfolioObjectOpen" : ""}`}>
            {/* <PortfolioGridHeader
              title={<><Emoji symbol="👀" /> Browse</>}
            /> */}
            
            <Row > {/* 180px (portfolio object height) + 30px padding*/}
                {portfolioObjects.map( (value, index, array) => {
                    return  <Col flex="0px"> {/* 240px (portfolio object) + 30px (padding) */} 
                                <PortfolioObject
                                    id = {value.key} 
                                    title = {value.title}  
                                    type = {value.type}  
                                    media = {value.media} 
                                    date = {value.date}  
                                    author = {value.author} 
                                    shortDescription = {value.shortDescription}  
                                    views = {value.views}  
                                    location = {value.location}
                                    portfolioObjectOpen = {openPortfolioObject} 
                                />
                            </Col>
                })}
            </Row>
        </div>
    );
}

export default PortfolioGrid;