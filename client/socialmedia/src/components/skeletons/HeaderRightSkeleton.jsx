import React from 'react';
import ContentLoader from 'react-content-loader';

const HeaderRightSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={230}
    height={34}
    viewBox="0 0 230 34"
    backgroundColor="var(--loader1)"
    foregroundColor="var(--loader2)"
    {...props}
  >
    <circle cx="210" cy="17" r="15" />
    <rect x="80" y="7" rx="10" ry="10" width="100" height="20" />
  </ContentLoader>
);

export default HeaderRightSkeleton;
