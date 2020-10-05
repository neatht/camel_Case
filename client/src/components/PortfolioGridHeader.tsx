import React from 'react';
import { PageHeader } from 'antd';

type PortfolioGridHeaderProps = {
  title: React.ReactNode;
  socialLinks?: JSX.Element;
};

function PortfolioGridHeader(props: PortfolioGridHeaderProps) {
  return <PageHeader title={props.title} extra={props.socialLinks} />;
}

export default PortfolioGridHeader;
