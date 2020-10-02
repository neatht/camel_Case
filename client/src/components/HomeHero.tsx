import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

import { Button, Tooltip } from 'antd';

import Emoji from './Emoji';

import './HomeHero.css';


function HomeHero() {

    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const [ isOpen, setIsOpen ] = useState(true);

    return(
        <>
            { isOpen
                ? <div className="home-hero">

                    {/* <div className="toggle-home-hero" onClick={() => setIsOpen(!isOpen)}> */}
                    <Tooltip title="Hide" placement="bottom">
                    <div className="toggle-home-hero exit-button" onClick={() => setIsOpen(!isOpen)}></div>
                    </Tooltip>
                    {/* </div> */}

                    <div className="home-CTA" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 250}}>
                        <h1><Emoji symbol="📝" /> <strong>Glowbal</strong></h1> 
    
                        <p> Showcase your best work by creating a profile and...</p>
                        
                        { 
                            !isAuthenticated
                            ? <Button type="primary" onClick={() => loginWithRedirect()}> <span style={{paddingRight: 5}}><Emoji symbol="🚀" /></span> <strong>Get Discovered</strong></Button>
                            : null
                        }
                        </div>

                </div>
                : null

            }
        </>
    )
}

export default HomeHero;