import React, { useState } from 'react';

import { Select, Space, Input, Tooltip } from 'antd';
import { CloseOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';

import Emoji from './Emoji';

import './Resume.css';

const { Option } = Select;

function Resume() {

    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) {
        return (
            <Tooltip title="Browse Options" placement="right" trigger={window.innerWidth <= 800 ? 'click' : 'hover'}>
                <div className="floatingHamburger" onClick={() => setIsOpen(!isOpen)}>
                    <MenuOutlined />
                </div>
            </Tooltip>
        )
    }

    return (
        <div className="container-primary floating-box resume">
            
                {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
                <Tooltip title="Hide" placement="bottom">
                    <div className="exit-button" onClick={() => setIsOpen(!isOpen)}></div>
                </Tooltip>

                    <div className="container-secondary resume-hero"></div>
                    <div className="container-secondary resume-picture">
                    <UserOutlined style={{ fontSize: '64px', color: '#fff' }} />
                    </div>
                    <div className="resume-name">
                    <h1><strong>Jane Doe</strong></h1>
                    <div className="resume-profile"> 
                    I am a capable and creative computer science student with a flair for problem solving. I have strong technical, interpersonal and communication skills and am aiming to pursue a career in software engineering & design. 
                    </div>
            </div>
                    
                    

                {/* </div> */}

                

              

                

        </div>
    )
}

export default Resume;