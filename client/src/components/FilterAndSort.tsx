import React, { useEffect, useState } from 'react';

import { Select, Space, Input, Tooltip, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import './FilterAndSort.css';

const { Option } = Select;

type FilterAndSortProps = {
  /** Function to be called when filter is applied */
  filterCallback: (filter: FilterCallbackObject) => void;
  /** Comparison function used to sort the projects */
  sortCallback: (
    cmp: (a: PortfolioObjectSearchData, b: PortfolioObjectSearchData) => number
  ) => void;
  /** Function to be called when clear is pressed */
  clearCallBack: Function;
  openCallBack: Function;
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

  useEffect(() => {
    props.openCallBack(isOpen);
    // eslint-disable-next-line
  }, [isOpen]);

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
    // return ();
  }

  return (
    <div
      className={`${
        isOpen ? '' : 'filter-min'
      } container-primary filter-and-sort`}
    >
      <Tooltip
        title="Browse Options"
        placement="left"
        trigger={window.innerWidth <= 800 ? 'click' : 'hover'}
      >
        <div className="floating-hamburger" onClick={() => setIsOpen(!isOpen)}>
          <MenuOutlined />
        </div>
      </Tooltip>
      <div className="filter-content">
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
    </div>
  );
}

export default FilterAndSort;
