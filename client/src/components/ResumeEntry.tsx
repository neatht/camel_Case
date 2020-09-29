import React, { useState } from 'react';

import { Select, Space, Input, Tooltip } from 'antd';
// import { CloseOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';

// import Emoji from './Emoji';

import './ResumeEntry.css';

type  ResumeEntryProps = {
    title: string,
    display: string,
    entries: {date?: string, text: string, subText?: string}[]
}

function ResumeEntry(props: ResumeEntryProps) {

    return (
        <div className={`resume-entry ${props.display == "inline" ? "resume-entry-inline" : "resume-entry-block"}`} >
            <h2><strong>{props.title}</strong></h2>
            <ul>
            {props.entries.map( (value, index, array) => {
                    return (
                    // return  <Col flex="0px"> {/* 240px (portfolio object) + 30px (padding) */} 
                    <li><div className="resume-entry-date">{value.date}</div><div>{value.text}<div className="resume-sub-text">{value.subText}</div></div></li>
                    )
                })}
            </ul>
        </div>
            
    )
}

export default ResumeEntry;