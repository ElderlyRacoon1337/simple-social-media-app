import React from 'react';
import ContentLoader from 'react-content-loader';

const ProfileRightSkeleton = (props) => (
  <div>
    <ContentLoader
      speed={2}
      width={400}
      height={140}
      viewBox="0 0 400 140"
      backgroundColor="var(--loader1)"
      foregroundColor="var(--loader2)"
      {...props}
    >
      <rect x="243" y="63" rx="10" ry="10" width="150" height="32" />
    </ContentLoader>
  </div>
);

export default ProfileRightSkeleton;
