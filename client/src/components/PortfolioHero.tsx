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
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


type PortfolioHeroProps = {
    isOpen: boolean,
    isMyProfile: boolean,
    media: {type: string, url: string}[]

}

function PortfolioHero(props: PortfolioHeroProps) {

    const [editing, setEditing] = useState(false);
    const [editingState, setEditingState] = useState(false);
    const [slide, setSlide] = useState(0);
    const [media, setMedia] = useState(props.media);

    // props.isOpen ?
    if (props.isOpen){
        return(
            <div className={`portfolio-hero  ${editing ? "portfolio-hero-edit container-scroll" : ""}`}>
                <div onMouseDown={() => {
                    setEditingState(!editingState);
                }} onMouseUp={() => {
                    setEditing(!editing);
                }} className="display-top-right container-secondary"><EditOutlined /></div>
                <div className="portfolio-hero-button display-left container-secondary" onClick={
                    () => slide > 0 ? setSlide(slide-1) : setSlide(media.length-1)
                }>&#8249;</div>
                <div className="portfolio-hero-button display-right container-secondary" onClick={
                    () => slide < media.length - 1 ? setSlide(slide+1) : setSlide(0)
                }>&#8250;</div>
                {editingState ?
                    <DragDropContext
                        onDragEnd={({ destination, source }) => {
                            if (!destination) return;
                            if (
                                destination.droppableId === source.droppableId &&
                                destination.index === source.index
                            ) return;

                            const newMedia = [...media];
                            const movedMedia = newMedia[source.index]; 
                            newMedia.splice(source.index, 1);
                            newMedia.splice(destination.index, 0, movedMedia);
                            setMedia(newMedia);
                            //PUSH UPDATE
                        }}
                    >
                        <div style={{height: "100%"}}>
                        <Droppable
                            droppableId={"0"}
                            type={"CARD"}
                            direction="horizontal"
                            isCombineEnabled={false}
                        >
                            {dropProvided => (
                                <div style={{height: "100%"}} {...dropProvided.droppableProps}>
                                    <div style={{height: "100%" ,overflowX: "scroll", overflowY: "hidden", display: "flex", position: "relative", top: "-7px" }} ref={dropProvided.innerRef}>
                                        {media.map( (value, index, array) => {
                                            if (value.type === 'image') {
                                                return (
                                                    <Draggable key={value.url} draggableId={value.url} index={index}>
                                                        {dragProvided => (
                                                            <div
                                                                {...dragProvided.dragHandleProps}
                                                                {...dragProvided.draggableProps}
                                                                ref={dragProvided.innerRef}
                                                               
                                                            >
                                                                <div className={`portfolio-hero-media container-secondary ${slide===index ? "portfolio-hero-media-max" : ""}`} style={{backgroundImage: `url(${value.url})`}}></div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                        
                                            } else {
                                                return (
                                                    <Draggable key={value.url} draggableId={value.url} index={index}>
                                                        {dragProvided => (
                                                            <div
                                                                {...dragProvided.dragHandleProps}
                                                                {...dragProvided.draggableProps}
                                                                ref={dragProvided.innerRef}
                                                               
                                                            >
                                                                <div className={`portfolio-hero-media container-secondary ${slide===index ? "portfolio-hero-media-max" : ""}`} >{index === 0?<div><br />Warning,<br />{value.type} can not be<br />a thumbnail.</div>:<div><br /><br />Embedded Media:<br /><strong>[{value.type}]</strong></div>}</div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                                            }
                                    
                                        })}
                                        {dropProvided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                        </div>
                    </DragDropContext>
                :
                    <div style={{height: "100%", display: "flex" }}>
                        {media.map( (value, index, array) => {
                            if (value.type === 'image') {
                                return (
                                    <div className={`portfolio-hero-media container-secondary ${slide===index ? "portfolio-hero-media-max" : ""}`} style={{backgroundImage: `url(${value.url})`}}></div>   
                                );
                            } else if (value.type === 'video') {
                                return (<div className={`portfolio-hero-media container-secondary ${slide===index ? "portfolio-hero-media-max" : ""}`} ><video width="100%" height="100%" controls><source src={`${value.url}`} /></video></div>)
                            } else {
                                return (<div className={`portfolio-hero-media container-secondary ${slide===index ? "portfolio-hero-media-max" : ""}`} ><embed src= {`${value.url}`} width="100%" height="100%" /></div>)
                            } 
                        })}
                        
                    </div>      
                }
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