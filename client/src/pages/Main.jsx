import React from 'react';
import Content from '../components/Content';

import Navigation from '../components/Navigation';

const Main = () => {
  return (
    <div className="container">
      <div className="content">
        <Navigation />
        <Content />
      </div>
    </div>
  );
};

export default Main;
