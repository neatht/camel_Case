import { useAuth0 } from '@auth0/auth0-react';
import { Spin, Tooltip } from 'antd';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import CompanyAutoComplete from './CompanyAutoComplete';

import './ResumeEntry.css';
import TextInput from './TextInput';

type ResumeEntryProps = {
  type: 'skills' | 'achievements' | 'experience' | 'education';
  display: 'block' | 'inline';
  isMyProfile: boolean;
  userID?: string;
};

type Skill = string;
type Achievement = string;

type InlineData = Achievement[] | Skill[]; // For achievements or skills

type Experience = {
  organisation: string;
  jobTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  experienceID?: number;
};

type Education = {
  institution: string;
  qualification: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  educationID?: number;
};

type BlockData = Experience[] | Education[];

type DataType = Experience | Education | Skill | Achievement;

const API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'https://localhost:5000/api/';

function ResumeEntry(props: ResumeEntryProps) {
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<DataType[]>();

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  async function fetchCompanyDetails(query: string): Promise<any> {
    const res = await fetch(
      'https://autocomplete.clearbit.com/v1/companies/suggest?query=' + query
    );
    return res.json();
  }

  async function fetchData(): Promise<void> {
    //setIsLoading(true);

    /** Name given to the data in the response */
    let resDataName: string = props.type;
    if (props.type === 'experience') {
      resDataName = 'experiences';
    }

    // If there is no userID, fetch own profile
    let route =
      props.type === 'achievements' || props.type === 'skills'
        ? props.isMyProfile
          ? props.type
          : `${props.type}/${props.userID}`
        : props.isMyProfile
        ? `${props.type}/getOwn${resDataName}`
        : `${props.type}/${props.userID}`;

    // Call API
    try {
      const token = isAuthenticated ? await getAccessTokenSilently() : '';
      const res = await fetch(API_URL + route, {
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
      console.log({ resBody });
      const resData =
        'data' in resBody && resDataName in resBody['data']
          ? resBody['data'][resDataName]
          : {};

      console.log('setting data from fetch...', { resData });
      setData(resData);

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

  async function createData(value: DataType): Promise<void> {
    // Education or experience
    if (props.type === 'education' || props.type === 'experience') {

      // If there is no userID, fetch own profile
      const route = props.type;

      let JSONbody: { data: any } = { data: {} };
      JSONbody.data = value;

      // Call API
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(API_URL + route, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(JSONbody),
        });

        // Check response is okay
        if (!res.ok) {
          console.error('Invalid response code', res.status, res.statusText);
          return;
        }

        fetchData();

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

    // Skill or achievement
    if (props.type === 'skills' || props.type === 'achievements') {
      //setIsLoading(true);

      // If there is no userID, fetch own profile
      const route = props.isMyProfile
        ? props.type
        : `${props.type}/${props.userID}`;

      let JSONbody: { data: any } = { data: {} };
      JSONbody.data[props.type.slice(0, -1)] = value;

      // Call API
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(API_URL + route, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(JSONbody),
        });

        // Check response is okay
        if (!res.ok) {
          console.error('Invalid response code', res.status, res.statusText);
          return;
        }

        fetchData();

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
      }
    }
  }

  async function updateData(
    updatedData: string,
    field: string,
    id?: number
  ): Promise<void> {
    console.log('calling updateData');
    if (props.type === 'education' || props.type === 'experience') {
      // set field value
      // do put update

      // If there is no userID, fetch own profile
      const route = `${props.type}`;
      const idName = `${props.type}ID`;

      let JSONbody: { data: { [key: string]: any } } = { data: {} };
      JSONbody.data[field] = updatedData;
      JSONbody['data'][idName] = id;

      // Call API
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(API_URL + route, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(JSONbody),
        });

        // Check response is okay
        if (!res.ok) {
          console.error('Invalid response code', res.status, res.statusText);
          return;
        }

        // Update domain into location field
        if (field === 'organisation' || field === 'institution') {
          const orgDetails = await fetchCompanyDetails(updatedData);
          console.log({ orgDetails });

          let domainUpdateBody: { data: { [key: string]: any } } = { data: {} };
          if ('domain' in orgDetails[0]) {
            domainUpdateBody.data['location'] = orgDetails[0].domain;
            domainUpdateBody['data'][idName] = id;
          }

          // send update
          const domainRes = await fetch(API_URL + route, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(domainUpdateBody),
          });

          // Check response is okay
          if (!domainRes.ok) {
            console.error('Invalid response code', res.status, res.statusText);
            return;
          }
        }

        fetchData();

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

    if (props.type === 'skills' || props.type === 'achievements') {
      // delete old
      await deleteData(updatedData);
      // create new
      await createData(updatedData);
    }
  }

  async function deleteData(
    toBeRemovedData?: DataType,
    id?: number
  ): Promise<void> {
    if (props.type === 'education' || props.type === 'experience') {
      // do delete req update

      // If there is no userID, fetch own profile
      const route = `${props.type}`;
      const idName = `${props.type}ID`;

      let JSONbody: { data: { [key: string]: any } } = { data: {} };
      JSONbody['data'][idName] = id;

      // Call API
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(API_URL + route, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(JSONbody),
        });

        // Check response is okay
        if (!res.ok) {
          console.error('Invalid response code', res.status, res.statusText);
          return;
        }

        fetchData();

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

    if (props.type === 'skills' || props.type === 'achievements') {
      // delete old
      //setIsLoading(true);

      // If there is no userID, fetch own profile
      const route = props.isMyProfile
        ? props.type
        : `${props.type}/${props.userID}`;

      let JSONbody: { data: any } = { data: {} };
      JSONbody.data[props.type.slice(0, -1)] = toBeRemovedData;

      // Call API
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(API_URL + route, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(JSONbody),
        });

        // Check response is okay
        if (!res.ok) {
          console.error('Invalid response code', res.status, res.statusText);
          return;
        }

        fetchData();

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
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Set the main and subtext
  let mainTextProperty = '';
  let subTextProperty = '';
  if (props.display === 'block') {
    switch (props.type) {
      case 'education':
        mainTextProperty = 'qualification';
        subTextProperty = 'institution';
        break;
      case 'experience':
        mainTextProperty = 'jobTitle';
        subTextProperty = 'organisation';
    }
  }

  // useEffect(() => {
  //   console.log('data changed', data);
  //   if (props.type === 'education' || props.type === 'experience') {
  //     fetchCompanyDetails();
  //   }
  // }, [data]);

  if (isLoading) {
    return (
      <div className="resume-entry">
        <Spin size={'large'} />
      </div>
    );
  } else {
    return (
      <div
        className={`resume-entry ${
          props.display === 'inline'
            ? 'resume-entry-inline'
            : 'resume-entry-block'
        }`}
      >
        {props.isMyProfile || data ? (
          <h2>
            <strong>{props.type[0].toUpperCase() + props.type.slice(1)}</strong>
          </h2>
        ) : null}
        <ul>
          {data &&
            data.map((value: any, index: number) => {
              if (props.display === 'inline') {
                return (
                  <li key={`${value}${index}`}>
                    {props.isMyProfile ? (
                      <Tooltip title="Remove" placement="top">
                        <div
                          className="exit-button exit-button-resume-entry"
                          onClick={() => {
                            deleteData(value, undefined);
                          }}
                        ></div>
                      </Tooltip>
                    ) : (
                      <></>
                    )}
                    <div>
                      <TextInput
                        editable={props.isMyProfile}
                        onChange={(newString: string) => {
                          updateData(newString, 'title');
                          deleteData(value, undefined);
                        }}
                        padding="5px"
                        radius="50px"
                        text={value}
                        placeholder={props.type.replace(/[sS]$/, '')}
                      />
                    </div>
                    {console.log(
                      `${props.type} trying to render value: ${value}`
                    )}
                  </li>
                );
              } else {
                return (
                  <li key={value[`${props.type}ID`]}>
                    {props.isMyProfile ? (
                      <Tooltip title="Remove" placement="top">
                        <div
                          className="exit-button exit-button-resume-entry"
                          onClick={() => {
                            deleteData(value, value[`${props.type}ID`]);
                          }}
                        ></div>
                      </Tooltip>
                    ) : (
                      <></>
                    )}
                    <div
                      className="resume-entry-grid"
                      key={value[`${props.type}ID`]}
                    >
                      <div className="resume-entry-date">
                        {/** Add picture here... */}
                        {value.location ? (
                          <span>
                            <img
                              src={`//logo.clearbit.com/${value.location}`}
                              style={{ width: 75, height: 75 }}
                              alt="logo"
                            />
                          </span>
                        ) : (
                          <span>
                            <img
                              src={`//logo.clearbit.com/${value.location}`}
                              style={{ width: 75, height: 75 }}
                              alt="logo"
                            />
                          </span>
                        )}
                      </div>

                      <div>
                        <TextInput
                          editable={props.isMyProfile}
                          onChange={(newString: string) => {
                            updateData(
                              newString,
                              mainTextProperty,
                              value[`${props.type}ID`]
                            );
                          }}
                          padding="2px"
                          text={value[mainTextProperty]}
                          placeholder="Job Title"
                        />

                        <TextInput
                          editable={props.isMyProfile}
                          onChange={(newString: string) => {
                            updateData(
                              newString,
                              'description',
                              value[`${props.type}ID`]
                            );
                          }}
                          padding="2px"
                          text={value.description}
                          placeholder="Date"
                        />

                        <div className="resume-sub-text">
                          {props.isMyProfile ? (
                            <CompanyAutoComplete
                              placeholder="Organisation"
                              initialValue={value[subTextProperty]}
                              onSelect={(newString: string) => {
                                updateData(
                                  newString,
                                  subTextProperty,
                                  value[`${props.type}ID`]
                                );
                              }}
                            />
                          ) : (
                            <TextInput
                              text={value[subTextProperty]}
                              editable={false}
                              onChange={() => {}}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }
            })}
        </ul>
        {props.isMyProfile ? (
          <Tooltip
            title={'Add ' + props.type.replace(/[sS]$/, '')}
            placement="bottom"
          >
            <div
              className="resume-entry-add "
              onClick={() => {
                let newItem: DataType = '';

                // Ensure each has the required fields
                switch (props.type) {
                  case 'skills':
                    newItem = 'New skill';
                    break;
                  case 'achievements':
                    newItem = 'New achievement';
                    break;
                  case 'education':
                    newItem = {
                      institution: 'Institution',
                      qualification: 'Qualification',
                      description: 'Date',
                      location: 'Location',
                      startDate: '2020-01-01',
                      endDate: '2020-01-02',
                    };
                    break;
                  case 'experience':
                    newItem = {
                      organisation: 'Organisation',
                      jobTitle: 'Job Title',
                      description: 'Date',
                      startDate: '2020-01-01',
                      endDate: '2020-01-02',
                      location: 'Location',
                    };
                }

                createData(newItem);
              }}
            >
              +
            </div>
          </Tooltip>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default ResumeEntry;
