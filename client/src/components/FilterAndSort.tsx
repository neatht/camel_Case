import React, { useState } from 'react';

import { Select, Space, Input, Tooltip } from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

import Emoji from './Emoji';

import './FilterAndSort.css';

const { Option } = Select;

function FilterAndSort() {

    const [isOpen, setIsOpen] = useState(false);

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
        <div className="container-primary floating-box">
            <Space direction="vertical" style={{ width: 'calc(100%)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4><strong>Filter</strong></h4>
                    <Tooltip title="Hide" placement="bottom">
                    <div className="exit-button" onClick={() => setIsOpen(!isOpen)}></div>
                </Tooltip>

                </div>

                <Select
                    mode="multiple"
                    placeholder="Project type"
                    style={{ width: '100%' }}
                >
                    <Option value="app"><Emoji symbol="📱" /> App</Option>
                    <Option value="website"><Emoji symbol="🖥" /> Website</Option>
                </Select>

                <Input
                    placeholder="Name"
                />

                <Select
                    mode="multiple"
                    placeholder="Tag"
                    style={{ width: '100%' }}
                >
                    <Option value="tag1">Tag 1</Option>
                    <Option value="tag2">Tag 2</Option>
                </Select>

            </Space>

            <Space direction="vertical" style={{ width: 'calc(100%)' }}>

                <br />

                <h4><strong>Sort</strong></h4>

                <Select
                    defaultValue="mostPopular"
                    style={{ width: '100%' }}
                >
                    <Option value="mostPopular">Most Popular</Option>
                    <Option value="alphabetical">Alphabetical</Option>
                </Select>

            </Space>

        </div>
    )
}

export default FilterAndSort;