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
  const [data, setData] = useState<Array<PortfolioObjectData>>([]);
  //const [fetchError, setFetchError] = useState(false);
  const [portfolioGridData, setPortfolioGridData] = useState<
    Array<PortfolioObjectData>
  >([]);
  const [updatePortfolioGridData, setUpdatePortfolioGridData] = useState<
    PortfolioObjectData
  >();

  const isMyProfile = !props.userID ? true : false;

  const [isLoading, setIsLoading] = useState(true);

  // EDIT ME
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

  // Update API when profile data change
  useEffect(() => {
    console.log('checking to update profile...');
    async function saveData(): Promise<void> {
      //setIsLoading(true);

      // If there is no userID, fetch own profile
      const route = 'project';

      console.log(updatePortfolioGridData);

      // Call API
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch('/api/' + route, {
          method: 'PUT',
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
    }
    if (updatePortfolioGridData !== portfolioGridData) {
      console.log('updating PortfolioGrid');
      saveData();
    }
  }, [updatePortfolioGridData]);

  useEffect(() => {
    fetchData();
  }, []);

  const [portfolioObjectOpen, setPortfolioObjectOpen] = useState(false);

  const openPortfolioObject = (open: boolean) => {
    setPortfolioObjectOpen(open);
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
                const newData = {} as PortfolioObjectData;
                newData.projectName = 'New Project';
                newData.projectType = 'website';
                newData.userID = ' ';
                setUpdatePortfolioGridData(newData);
                // console.log(newData);
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
                isMyProfile={isMyProfile}
                // EDIT ME
                setData={(d: PortfolioObjectData) => {
                  // if (data.length >= index && data[index].id === d.id) {
                  const newData = [...portfolioGridData];
                  newData[index] = d;
                  setUpdatePortfolioGridData(d);
                  setPortfolioGridData(newData);
                  //   saveData();
                  // } else {
                  //   console.error('PortfolioObject ID Mismatch');
                  // }
                }}
                delData={(id: string) => {
                  // if (data.length >= index && data[index].id === id) {
                  //   const newData = [...data];
                  //   newData.splice(index, 1);
                  //   setData(newData);
                  //   //POST
                  // } else {
                  //   console.error('PortfolioObject ID Mismatch');
                  // }
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
