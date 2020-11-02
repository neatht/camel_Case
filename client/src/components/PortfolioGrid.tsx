import React, { useState, useEffect } from 'react';

import PortfolioObject from './PortfolioObject';

import './PortfolioGrid.css';
import { Tooltip } from 'antd';
import Loading from './Loading';
import { useAuth0 } from '@auth0/auth0-react';

type PortfolioGridProps = {
  userID?: string;
};

type PortfolioObjectData = {
  projectID?: string;
  tags?: string[];
  views?: number;
  datePosted?: string;
  location?: string;
  projectName?: string;
  link?: string;
  userID?: string;
  projectType?: string;
};

function PortfolioGrid(props: PortfolioGridProps) {
  const { getAccessTokenSilently } = useAuth0();
  const [portfolioGridData, setPortfolioGridData] = useState<
    Array<PortfolioObjectData>
  >([]);

  const isMyProfile = !props.userID ? true : false;

  const [isLoading, setIsLoading] = useState(true);

  const [newEntry, setNewEntry] = useState(false);

  async function fetchData(): Promise<void> {
    // setIsLoading(true);

    // If there is no userID, fetch own profile
    const route = isMyProfile
      ? 'project/getOwnProjects'
      : `project/${props.userID}`;

    try {
      const token = await getAccessTokenSilently();
      const res = await fetch('/api/' + route, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check response is okay
      if (!res.ok) {
        console.error('Invalid response code', res.status, res.statusText);
        return;
      }

      // Check if response has profile data
      const resBody = await res.json();
      const data = 'data' in resBody ? resBody['data'] : {};

      // Set profile data (empty object if invalid)
      // TODO: Could add warning?
      console.log('setting PortfolioGridData...', { data });

      data.sort((a: PortfolioObjectData, b: PortfolioObjectData) => {
        if (a.projectID && b.projectID) {
          if (a.projectID > b.projectID) return 1;
          else return -1;
        } else return 1;
      });

      setPortfolioGridData(data);
      setIsLoading(false);
    } catch (e) {
      if (setIsLoading) {
        setIsLoading(false);
      }
      const res = {
        status: 'error',
        message: [
          'Exception from fetch on client side (not API) - check if the API stopped running',
          e,
        ],
      };
      console.error(res, e);
      //return res;
    }
  }

  async function saveData(
    action: string,
    updatePortfolioGridData: PortfolioObjectData
  ): Promise<void> {
    //setIsLoading(true);

    // If there is no userID, fetch own profile
    const route = 'project';

    console.log(updatePortfolioGridData);

    // Call API
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch('/api/' + route, {
        method: action,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: updatePortfolioGridData }),
      });

      // Check response is okay
      if (!res.ok) {
        console.error('Invalid response code', res.status, res.statusText);
        return;
      }
      console.log('updated successfully?', res.ok, res.statusText);
      // fetchData();
      // setIsLoading(false);
    } catch (e) {
      if (setIsLoading) {
        setIsLoading(false);
      }
      const res = {
        status: 'error',
        message: [
          'Exception from fetch on client side (not API) - check if the API stopped running',
          e,
        ],
      };
      console.error(res, e);
      //return res;
    }
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [portfolioObjectOpen, setPortfolioObjectOpen] = useState(false);

  const openPortfolioObject = (open: boolean) => {
    setPortfolioObjectOpen(open);
    setNewEntry(false);
  };
  if (isLoading) {
    return (
      <div>
        <Loading messages={['Getting portfolio']} />
      </div>
    );
  } else {
    return (
      <div className={`${portfolioObjectOpen ? 'portfolio-object-open' : ''}`}>
        {isMyProfile ? (
          <Tooltip title="Add New Portfolio Entry" placement="left">
            <div
              className="portfolio-grid-add"
              onClick={() => {
                var date = new Date();
                const newData = {} as PortfolioObjectData;
                newData.projectName = 'New Project';
                newData.projectType = 'website';
                newData.datePosted = `${date.getDate()}/${
                  date.getMonth() + 1
                }/${date.getFullYear()}`;
                newData.userID = ' ';
                const newPortfolioGridData = [...portfolioGridData];
                newPortfolioGridData.push(newData);
                saveData('POST', newData);
                // setPortfolioGridData(newPortfolioGridData);
                setNewEntry(true);
              }}
            >
              +
            </div>
          </Tooltip>
        ) : (
          <></>
        )}
        <div className="grid">
          {portfolioGridData.map((value, index) => {
            return (
              <PortfolioObject
                data={value}
                new={
                  newEntry && index + 1 === portfolioGridData.length
                    ? true
                    : false
                }
                isMyProfile={isMyProfile}
                setData={(d: PortfolioObjectData) => {
                  const newData = [...portfolioGridData];
                  newData[index] = d;
                  saveData('PUT', d);
                  setPortfolioGridData(newData);
                }}
                delData={(d: PortfolioObjectData) => {
                  const newData = [...portfolioGridData];
                  newData.splice(index, 1);
                  saveData('DELETE', d);
                  setPortfolioGridData(newData);
                }}
                portfolioObjectOpen={openPortfolioObject}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default PortfolioGrid;
