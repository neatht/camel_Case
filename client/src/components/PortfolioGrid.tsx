import React, { useState, useEffect } from 'react';

import PortfolioObject from './PortfolioObject';


import './PortfolioGrid.css';

type PortfolioGridProps = {
}

type PortfolioObjectMetaType = {
    key: string, 
    title: string, 
    type: string, 
    media: {type: string, url: string}[],
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
                "media":
                [
                    {type: "image", url: "https://i.ibb.co/BNZxQ2z/example0.jpg"},
                    {type: "image", url: "https://i.ibb.co/TYYyXDH/example1.png"},
                    {type: "image", url: "https://i.ibb.co/pZmXQb5/example2.png"},
                    {type: "image", url: "https://i.ibb.co/SwzRr9S/example3.png"},
                    {type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
                    {type: "video", url: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4"}
                ],
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
                "media":
                [
                    {type: "image", url: "https://i.ibb.co/TYYyXDH/example1.png"},
                    {type: "image", url: "https://i.ibb.co/BNZxQ2z/example0.jpg"},
                    {type: "image", url: "https://i.ibb.co/pZmXQb5/example2.png"},
                    {type: "image", url: "https://i.ibb.co/SwzRr9S/example3.png"},
                    {type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
                    {type: "video", url: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4"}
                ],
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
                "media":
                [
                    {type: "image", url: "https://i.ibb.co/pZmXQb5/example2.png"},
                    {type: "image", url: "https://i.ibb.co/BNZxQ2z/example0.jpg"},
                    {type: "image", url: "https://i.ibb.co/TYYyXDH/example1.png"},
                    {type: "image", url: "https://i.ibb.co/SwzRr9S/example3.png"},
                    {type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
                    {type: "video", url: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4"}
                ],
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
                "media": 
                [
                    {type: "image", url: "https://i.ibb.co/SwzRr9S/example3.png"},
                    {type: "image", url: "https://i.ibb.co/BNZxQ2z/example0.jpg"},
                    {type: "image", url: "https://i.ibb.co/TYYyXDH/example1.png"},
                    {type: "image", url: "https://i.ibb.co/pZmXQb5/example2.png"},
                    {type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
                    {type: "video", url: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4"}
                ],
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
                "media": 
                [
                    {type: "image", url: "https://i.ibb.co/CsNzYxy/example5.png"},
                    {type: "image", url: "https://i.ibb.co/BNZxQ2z/example0.jpg"},
                    {type: "image", url: "https://i.ibb.co/TYYyXDH/example1.png"},
                    {type: "image", url: "https://i.ibb.co/pZmXQb5/example2.png"},
                    {type: "image", url: "https://i.ibb.co/SwzRr9S/example3.png"},
                    {type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
                    {type: "video", url: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4"}
                ],
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
                "media": 
                [
                    {type: "image", url: "https://i.ibb.co/gWDkgdh/example6.jpg"},
                    {type: "image", url: "https://i.ibb.co/BNZxQ2z/example0.jpg"},
                    {type: "image", url: "https://i.ibb.co/TYYyXDH/example1.png"},
                    {type: "image", url: "https://i.ibb.co/pZmXQb5/example2.png"},
                    {type: "image", url: "https://i.ibb.co/SwzRr9S/example3.png"},
                    {type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
                    {type: "video", url: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4"}
                ],
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
                "media":
                [
                    {type: "image", url: "https://i.ibb.co/8j5MMLw/example7.jpg"},
                    {type: "image", url: "https://i.ibb.co/BNZxQ2z/example0.jpg"},
                    {type: "image", url: "https://i.ibb.co/TYYyXDH/example1.png"},
                    {type: "image", url: "https://i.ibb.co/pZmXQb5/example2.png"},
                    {type: "image", url: "https://i.ibb.co/SwzRr9S/example3.png"},
                    {type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
                    {type: "video", url: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4"}
                ],
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
                "media":
                [
                    {type: "image", url: "https://i.ibb.co/rybJT5c/example4.png"},
                    {type: "image", url: "https://i.ibb.co/BNZxQ2z/example0.jpg"},
                    {type: "image", url: "https://i.ibb.co/TYYyXDH/example1.png"},
                    {type: "image", url: "https://i.ibb.co/pZmXQb5/example2.png"},
                    {type: "image", url: "https://i.ibb.co/SwzRr9S/example3.png"},
                    {type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
                    {type: "video", url: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4"}
                ],
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
                "media":
                [
                    {type: "image", url: "https://i.ibb.co/SBWrhmP/example30.png"},
                    {type: "image", url: "https://i.ibb.co/BNZxQ2z/example0.jpg"},
                    {type: "image", url: "https://i.ibb.co/TYYyXDH/example1.png"},
                    {type: "image", url: "https://i.ibb.co/pZmXQb5/example2.png"},
                    {type: "image", url: "https://i.ibb.co/SwzRr9S/example3.png"},
                    {type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
                    {type: "video", url: "http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4"}
                ],
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

    const [portfolioObjectOpen, setPortfolioObjectOpen] = useState(false);

    const openPortfolioObject = (open: boolean) => {
        setPortfolioObjectOpen(open);
    }
    
    return(
        <div className={`${portfolioObjectOpen ? "portfolio-object-open" : ""}`}>
            {/* <PortfolioGridHeader
              title={<><Emoji symbol="👀" /> Browse</>}
            /> */}
            
            <div className="grid"> {/* 180px (portfolio object height) + 30px padding*/}
                {portfolioObjects.map( (value, index, array) => {
                    return (
                    // return  <Col flex="0px"> {/* 240px (portfolio object) + 30px (padding) */} 
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
                                    // picture={value.media}
                   
                                />
                    )
                            // </Col>
                })}
            </div>
        </div>
    );
}

export default PortfolioGrid;