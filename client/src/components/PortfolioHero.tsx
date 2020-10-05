import React from 'react';
import {useState} from 'react';

import SocialLinks from './SocialLinks';

import './PortfolioHero.css';
import Emoji from './Emoji';
import AuthorBadge from './AuthorBadge';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useAuth0 } from '@auth0/auth0-react';
import { EditOutlined } from '@ant-design/icons';
import placeholderFolioImage from '../placeholder-folio-image.png';


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

    // props.isOpen ?
    if (props.isOpen){
        return(
            <div className={`container-secondary portfolio-hero ${editing ? "portfolio-hero-edit container-scroll" : ""}`}>
                <div onClick={() => {
                setEditing(!editing);
                // setSlide(0);
                }} style={{cursor: "pointer"}} className="display-top-right container-secondary"><EditOutlined /></div>
                <div className="portfolio-hero-button display-left container-secondary" onClick={
                    () => slide > 0 ? setSlide(slide-1) : setSlide(media.length-1)
                }>&#8249;</div>
                <div className="portfolio-hero-button display-right container-secondary" onClick={
                    () => slide < media.length - 1 ? setSlide(slide+1) : setSlide(0)
                }>&#8250;</div>
                
                {media.map( (value, index, array) => {
                    return addMedia(value.type, value.url, index);
                })}
            </div>
        );
    } else {
        return(
            <div className={`container-secondary portfolio-hero`} >
                <div className={`portfolio-hero-media container-secondary portfolio-hero-media-max`} style={{backgroundImage: `url(${media[0].type==="image" ? media[0].url : placeholderFolioImage})`}}></div>
            </div>
        );
    }
}

export default PortfolioHero; 