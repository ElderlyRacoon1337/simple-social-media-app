import React from 'react';
import ContentLoader from 'react-content-loader';

const ProfileRightSkeleton = (props) => (
  <div>
    <ContentLoader
      speed={2}
      width={400}
      height={150}
      viewBox="0 0 400 150"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="237" y="59" rx="10" ry="10" width="150" height="32" />
    </ContentLoader>
  </div>
);

export default ProfileRightSkeleton;
