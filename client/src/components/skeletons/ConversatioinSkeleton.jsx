import React from 'react';
import ContentLoader from 'react-content-loader';

const ConversatioinSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={500}
    height={80}
    viewBox="0 0 500 80"
    backgroundColor="var(--loader1)"
    foregroundColor="var(--loader2)"
    {...props}
  >
    <circle cx="20" cy="20" r="20" />
    <rect x="50" y="0" rx="5" ry="5" width="150" height="17" />
    <rect x="50" y="30" rx="5" ry="5" width="180" height="10" />
    <rect x="50" y="50" rx="5" ry="5" width="110" height="10" />
    {/* <rect x="50" y="70" rx="5" ry="5" width="230" height="10" /> */}
  </ContentLoader>
);

export default ConversatioinSkeleton;
