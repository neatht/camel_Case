import React from 'react';
import {useState} from 'react';

import SocialLinks from './SocialLinks';

import './PortfolioHero.css';
import Emoji from './Emoji';
import AuthorBadge from './AuthorBadge';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useAuth0 } from '@auth0/auth0-react';

type PortfolioObjectProps = {
    id: string, 
    title: string, 
    type: string, 
    media: string,
    date: string, 
    author: string, 
    shortDescription: string, 
    views: string, 
    location: string,
    picture: string,
    portfolioObjectOpen: any

}

function PortfolioHero() {

    const [slide, setSlide] = useState(0);

    return(
        <div className="container-secondary portfolio-hero portfolio-hero-eit">
            <div className="portfolio-hero-botton display-left container-secondary" onClick={
                () => setSlide(slide-1)
            }>&#8249;</div>
            <div className="portfolio-hero-botton display-right container-secondary" onClick={
                () => setSlide(slide+1)
            }>&#8250;</div>
            <div className={`portfolio-hero-media container-secondary ${slide===0 ? "portfolio-hero-media-max" : ""}`} style={{backgroundImage: 'url(https://i.ibb.co/BNZxQ2z/example0.jpg)'}}>0</div>
            <div className={`portfolio-hero-media container-secondary ${slide===1 ? "portfolio-hero-media-max" : ""}`} style={{backgroundImage: 'url(https://i.ibb.co/TYYyXDH/example1.png)'}}>1</div>
            <div className={`portfolio-hero-media container-secondary ${slide===2 ? "portfolio-hero-media-max" : ""}`} style={{backgroundImage: 'url(https://i.ibb.co/pZmXQb5/example2.png)'}}>2</div>
            <div className={`portfolio-hero-media container-secondary ${slide===3 ? "portfolio-hero-media-max" : ""}`} style={{backgroundImage: 'url(https://i.ibb.co/SwzRr9S/example3.png)'}}></div>
            {/* <div className={`portfolio-hero-media container-secondary ${slide===4 ? "portfolio-hero-media-max" : ""}`} ><embed src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" width="100%" height="100%" /></div> */}
            {/* <div className={`portfolio-hero-media container-secondary ${slide===5 ? "portfolio-hero-media-max" : ""}`} ><embed src="http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4" width="100%" height="100%" /></div> */}

        </div>

    );
}

export default PortfolioHero; 