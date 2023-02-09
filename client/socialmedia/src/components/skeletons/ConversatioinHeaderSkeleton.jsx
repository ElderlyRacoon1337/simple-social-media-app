import React from 'react';
import ContentLoader from 'react-content-loader';

const ConversatioinHeaderSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={523}
    height={30}
    viewBox="0 0 523 30"
    backgroundColor="var(--loader1)"
    foregroundColor="var(--loader2)"
    {...props}
  >
    <circle cx="508" cy="15" r="15" />
    <rect x="190" y="0" rx="10" ry="10" width="150" height="25" />
  </ContentLoader>
);

export default ConversatioinHeaderSkeleton;
