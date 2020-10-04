import React from 'react';
import {useState} from 'react';

import SocialLinks from './SocialLinks';

import './PortfolioHero.css';
import Emoji from './Emoji';
import AuthorBadge from './AuthorBadge';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useAuth0 } from '@auth0/auth0-react';
import { EditOutlined } from '@ant-design/icons';

type PortfolioHeroProps = {
    isOpen: boolean,
    isMyProfile: boolean,
    media: {type: string, url: string}[]

}

function PortfolioHero(props: PortfolioHeroProps) {

    const [editing, setEditing] = useState(false);
    const [slide, setSlide] = useState(0);
    const [media, setMedia] = useState(props.media);
    const addMedia = (type: string, url: string, index: number) => {
        if (type === 'image') {
            return (<div className={`portfolio-hero-media container-secondary ${slide===index ? "portfolio-hero-media-max" : ""}`} style={{backgroundImage: `url(${url})`}}></div>)
        } else if (type === 'video') {
            return (<div className={`portfolio-hero-media container-secondary ${slide===index ? "portfolio-hero-media-max" : ""}`} ><video width="100%" height="100%" controls><source src={`${url}`} /></video></div>)
        } else {
            return (<div className={`portfolio-hero-media container-secondary ${slide===index ? "portfolio-hero-media-max" : ""}`} ><embed src= {`${url}`} width="100%" height="100%" /></div>)
        }

    }

    return(
        <div className={`container-secondary portfolio-hero ${editing ? "portfolio-hero-edit container-scroll" : ""}`}>
            <div onClick={() => {
                setEditing(!editing);
                setSlide(0);
            }} className="display-top-right container-secondary"><EditOutlined /></div>
            <div className="portfolio-hero-button display-left container-secondary" onClick={
                () => slide > 0 ? setSlide(slide-1) : setSlide(slide)
            }>&#8249;</div>
            <div className="portfolio-hero-button display-right container-secondary" onClick={
                () => slide < media.length - 1 ? setSlide(slide+1) : setSlide(slide)
            }>&#8250;</div>
            {props.isOpen
            ?
                <div style={{height: "100%"}}>
                    
                    {media.map( (value, index, array) => {
                        return addMedia(value.type, value.url, index);
                    })}
                </div>
            
            :
                <div className={`portfolio-hero-media container-secondary ${slide===0 ? "portfolio-hero-media-max" : ""}`} style={{backgroundImage: 'url(https://i.ibb.co/BNZxQ2z/example0.jpg)'}}>0</div>
            }
            
        </div>

    );
}

export default PortfolioHero; 