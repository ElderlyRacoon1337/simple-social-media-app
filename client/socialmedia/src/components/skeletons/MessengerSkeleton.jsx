import React from 'react';
import ContentLoader from 'react-content-loader';

const MessengerSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={500}
    height={50}
    viewBox="0 0 500 50"
    backgroundColor="var(--loader1)"
    foregroundColor="var(--loader2)"
    {...props}
  >
    <circle cx="25" cy="25" r="25" />
    <rect x="70" y="7" rx="10" ry="10" width="120" height="15" />
    <rect x="70" y="30" rx="10" ry="10" width="300" height="15" />
  </ContentLoader>
);

export default MessengerSkeleton;
