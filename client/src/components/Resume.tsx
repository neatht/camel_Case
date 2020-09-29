import React, { useState } from 'react';

import { Select, Space, Input, Tooltip } from 'antd';
import { CloseOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';

import Emoji from './Emoji';

import './Resume.css';
import ResumeEntry from './ResumeEntry';

const { Option } = Select;

type ResumeProps = {
    name: string,
    profile: string,
    student: string,
    location: string,
    work: boolean,
}

function Resume(props: ResumeProps) {

    const studentbadges = () => {

        if (props.student !== "") {
            return (
                <Tooltip title={props.student} placement="bottom"><li><Emoji symbol="🧑‍🎓" label="Student"/></li></Tooltip>
            )
        } else {
            return;
        }

        
    }
    
    const workbadges = () => {

        if (props.work) {
            return (
                <Tooltip title="Open to work opportunities" placement="bottom"><li><Emoji symbol="✅" label="Open to work opportunities"/></li></Tooltip>
            )
        } else {
            return;
        }
        
    }
    
    const locationbadges = () => {

        if (props.location !== "") {
            return (
                <Tooltip title={props.location} placement="bottom"><li><Emoji symbol="🌏" label="Location"/></li></Tooltip>
            )
        } else {
            return;
        }
        
    }

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
                {/* <Tooltip title="Hide" placement="bottom">
                    <div className="exit-button" onClick={() => setIsOpen(!isOpen)}></div>
                </Tooltip> */}

                    <div className="container-secondary resume-hero"></div>
                    <div className="container-secondary resume-picture">
                    <UserOutlined style={{ fontSize: '64px', color: '#fff' }} />
                    </div>
                    <div className="resume-name">
                    <h1><strong>{props.name}</strong></h1>

                    <div className="resume-badges">
                        <ul>
                            {studentbadges()}
                            {workbadges()}
                            {locationbadges()}
                        </ul>
                    </div>
                    
                    </div>
                    <div className="resume-profile">
                        {props.profile} 
                    </div>
                    <ResumeEntry title="Skills" display="inline" 
                        entries={[
                            {date: "", text: "HTML", subText: ""},
                            {date: "", text: "CSS", subText: ""},
                            {date: "", text: "JavaScript", subText: ""},
                            {date: "", text: "React.js", subText: ""},
                            {date: "", text: "Python", subText: ""},
                            {date: "", text: "C", subText: ""},
                            {date: "", text: "Java", subText: ""},
                            {date: "", text: "Graphic Design", subText: ""},
                            {date: "", text: "Photoshop", subText: ""},
                            {date: "", text: "Illustrator", subText: ""}
                        ]}
                    />
                    <ResumeEntry title="Experience" display="block"
                        entries={[
                            {date: "2020", text: "Internship at a Company", subText: "as a Full Stack Developer"},
                            {date: "2019", text: "Internship at a different Company", subText: "as a Front end Developer"},
                            {date: "2018-Current", text: "Part time job", subText: ""}
                        ]}
                    />

                    <ResumeEntry title="Achievements" display="inline"
                        entries={[
                            {date: "2020", text: "First Cass Honours", subText: ""},
                            {date: "2020", text: "First in Hackathon", subText: ""}
                        ]}
                    />

                    <ResumeEntry title="Education" display="block"
                        entries={[
                            {date: "2018-20", text: "The University of Melbourne", subText: "Bachelor of Science - Major in computing and software systems"},
                            {date: "2017", text: "School College", subText: "Completed International Baccalaureate Diploma"}
                        ]}
                    />

                    
                    
            
                    
                    

                {/* </div> */}

                

              

                

        </div>
    )
}

export default Resume;