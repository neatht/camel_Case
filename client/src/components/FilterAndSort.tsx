import React from 'react';

import { Select, Space, Input } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';

import Emoji from './Emoji';

const { Option } = Select;

function FilterAndSort() {

    return (
        <div className="content">
            <Space direction="vertical" style={{ width: 'calc(100% - 30px)' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4><strong>Filter</strong></h4>
                    <MenuFoldOutlined />
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

            <Space direction="vertical" style={{ width: 'calc(100% - 30px)' }}>

                <br/> 

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