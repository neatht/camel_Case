import React, { useState } from 'react';

import { Select, Space, Input, Tooltip, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import Emoji from './Emoji';

import './FilterAndSort.css';

const { Option } = Select;

type FilterAndSortProps = {
  filterCallback: (filter: FilterCallbackObject) => void;
  sortCallback: (
    cmp: (a: PortfolioObjectSearchData, b: PortfolioObjectSearchData) => number
  ) => void;
  clearCallBack: Function;
};

type FilterCallbackObject = {
  projectName?: string;
  authorName?: string;
};

type PortfolioObjectSearchData = {
  // routes set in snake_case
  project_id: string;
  project_name: string;
  author_first_name: string;
  author_last_name: string;
  user_id: string;
};

function FilterAndSort(props: FilterAndSortProps) {
  const [isOpen, setIsOpen] = useState(false);

  function getCmp(
    option: 'mostPopular' | 'projectName' | 'authorName'
  ): (a: PortfolioObjectSearchData, b: PortfolioObjectSearchData) => number {
    switch (option) {
      case 'mostPopular':
        return (a: PortfolioObjectSearchData, b: PortfolioObjectSearchData) => {
          if (parseInt(a.project_id) > parseInt(b.project_id)) {
            return 1;
          } else {
            return -1;
          }
        };

      case 'projectName':
        return (a: PortfolioObjectSearchData, b: PortfolioObjectSearchData) => {
          if (a.project_name > b.project_name) {
            return 1;
          } else {
            return -1;
          }
        };

      case 'authorName':
        return (a: PortfolioObjectSearchData, b: PortfolioObjectSearchData) => {
          if (a.author_first_name > b.author_first_name) {
            return 1;
          } else {
            return -1;
          }
        };
    }
  }

  function getFilter(
    option: 'projectName' | 'authorName',
    e: React.ChangeEvent<HTMLInputElement>
  ): FilterCallbackObject {
    switch (option) {
      case 'projectName':
        return {
          projectName: e.target.value,
        };

      case 'authorName':
        return {
          authorName: e.target.value,
        };
    }
  }

  if (!isOpen) {
    return (
      <Tooltip
        title="Browse Options"
        placement="left"
        trigger={window.innerWidth <= 800 ? 'click' : 'hover'}
      >
        <div className="floating-hamburger" onClick={() => setIsOpen(!isOpen)}>
          <MenuOutlined />
        </div>
      </Tooltip>
    );
  }

  return (
    <div className="container-primary filter-and-sort">
      <Space direction="vertical" style={{ width: 'calc(100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h4>
            <strong>Filter</strong>
          </h4>
          <Tooltip title="Hide" placement="bottom">
            <div
              className="exit-button"
              onClick={() => setIsOpen(!isOpen)}
            ></div>
          </Tooltip>
        </div>

        {/*<Select
          mode="multiple"
          placeholder="Project type"
          style={{ width: '100%' }}
        >
          <Option value="app">
            <Emoji symbol="📱" /> App
          </Option>
          <Option value="website">
            <Emoji symbol="🖥" /> Website
          </Option>
        </Select>*/}

        <Input
          placeholder="Project name"
          onChange={(e) => {
            props.filterCallback(getFilter('projectName', e));
          }}
        />

        <Input
          placeholder="Author name"
          onChange={(e) => {
            props.filterCallback(getFilter('authorName', e));
          }}
        />

        {/*<Select mode="multiple" placeholder="Tag" style={{ width: '100%' }}>
          <Option value="tag1">Tag 1</Option>
          <Option value="tag2">Tag 2</Option>
        </Select>*/}
      </Space>

      <Space direction="vertical" style={{ width: 'calc(100%)' }}>
        <br />

        <h4>
          <strong>Sort</strong>
        </h4>

        <Select
          defaultValue="mostPopular"
          style={{ width: '100%' }}
          onSelect={(option) => {
            return props.sortCallback(getCmp(option));
          }}
        >
          <Option value="mostPopular">Most Popular</Option>
          <Option value="projectName">Project Name</Option>
          <Option value="authorName">Author Name</Option>
        </Select>
      </Space>

      <div className="filter-and-sort-buttons" style={{ paddingTop: 30 }}>
        <Space direction="horizontal">
          <Button onClick={() => {}}>Apply</Button>
          <Button
            onClick={() => {
              setIsOpen(false);
              props.clearCallBack();
            }}
          >
            Clear
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default FilterAndSort;
