import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Header from '../components/Header';
import SocialLinks from '../components/SocialLinks';
import PortfolioGrid from '../components/PortfolioGrid';
import FilterAndSort from '../components/FilterAndSort';

import './Home.css';
import HomeHero from '../components/HomeHero';
import Loading from '../components/Loading';
import PortfolioGridSearch from '../components/PortfolioGridSearch';

const API_URL = process.env.API_URL
  ? process.env.API_URL
  : 'https://localhost:5000/api/';

type PortfolioObjectSearchData = {
  // routes set in snake_case
  project_id: string;
  project_name: string;
  author_first_name: string;
  author_last_name: string;
  user_id: string;
};

type FilterCallbackObject = {
  projectName?: string;
  authorName?: string;
};

function Home() {
  const [isFetching, setIsFetching] = useState(false);

  const [searchData, setSearchData] = useState<
    Array<PortfolioObjectSearchData>
  >();

  function sortSearchData(
    cmp: (a: PortfolioObjectSearchData, b: PortfolioObjectSearchData) => number
  ) {
    console.log('sorting search data');
    if (searchData) {
      console.log('before', { searchData });
      console.log('after', searchData.sort(cmp));
      const sortedData = searchData.sort(cmp);
      setSearchData(sortedData);
    }
  }

  function filterSearchData(filter: FilterCallbackObject) {
    console.log('sorting search data');

    if (!filter.authorName && !filter.projectName) {
      return;
    }

    if (searchData) {
      console.log('before', { searchData });
      console.log('filter', filter);

      const sortedData: Array<PortfolioObjectSearchData> = searchData.filter(
        (o) => {
          let key = filter.authorName ? 'author_name' : 'project_name';
          let val = filter.authorName ? filter.authorName : filter.projectName;

          switch (key) {
            case 'author_name':
              return `${o.author_first_name} ${o.author_last_name}`
                .toLowerCase()
                .includes(val!.toLowerCase());
              break;
            case 'project_name':
              return `${o.project_name}`
                .toLowerCase()
                .includes(val!.toLowerCase());
              break;
          }

          return true;
        }
      );

      console.log('after', sortedData);

      setSearchData(sortedData);
    }
  }

  async function fetchData(): Promise<void> {
    setIsFetching(true);

    const route = 'search/project/%20';

    try {
      const res = await fetch(API_URL + route);

      // Check response is okay
      if (!res.ok) {
        console.error('Invalid response code', res.status, res.statusText);
        return;
      }

      // Check if response has data
      const resBody = await res.json();
      // Can't check because of route
      const data = resBody;

      // Set search data (empty object if invalid)
      console.log('setting searchData...', { data });

      data.sort(
        (a: PortfolioObjectSearchData, b: PortfolioObjectSearchData) => {
          if (parseInt(a.project_id) > parseInt(b.project_id)) {
            return 1;
          } else {
            return -1;
          }
        }
      );

      setSearchData(data);
      setIsFetching(false);
    } catch (e) {
      if (setIsFetching) {
        setIsFetching(false);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header pageKey="home" />

      <HomeHero />

      <div className="grid-main-layout-primary">
        <FilterAndSort
          sortCallback={(cmp) => {
            sortSearchData(cmp);
          }}
          filterCallback={(filter) => {
            filterSearchData(filter);
          }}
          clearCallBack={() => fetchData()}
        />
        {isFetching || !searchData ? (
          <Loading />
        ) : (
          <PortfolioGridSearch data={searchData} />
        )}
      </div>
    </div>
  );
}

export default Home;
