import React, { useState } from 'react';

import PortfolioObjectSearch from './PortfolioObjectSearch';

import './PortfolioGrid.css';

type PortfolioGridSearchProps = {
  data: Array<PortfolioObjectSearchData>;
};

type PortfolioObjectSearchData = {
  // routes set in snake_case
  project_id: string;
  project_name: string;
  author_first_name: string;
  author_last_name: string;
  user_id: string;
};

function PortfolioGridSearch(props: PortfolioGridSearchProps) {
  const [portfolioObjectOpen, setPortfolioObjectOpen] = useState(false);

  const openPortfolioObject = (open: boolean) => {
    setPortfolioObjectOpen(open);
  };

  console.log(props.data);

  if (Object.keys(props.data).length === 0) {
    return <></>;
  } else {
    return (
      <div className={`${portfolioObjectOpen ? 'portfolio-object-open' : ''}`}>
        <div className="grid">
          {props.data.map((portfolioData, index) => {
            return (
              <PortfolioObjectSearch
                key={portfolioData.project_id}
                data={portfolioData}
                portfolioObjectOpen={openPortfolioObject}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default PortfolioGridSearch;
