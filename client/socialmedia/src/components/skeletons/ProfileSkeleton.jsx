import React from 'react';
import ContentLoader from 'react-content-loader';

const ProfileSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={150}
    viewBox="0 0 400 150"
    backgroundColor="var(--loader1)"
    foregroundColor="var(--loader2)"
    {...props}
  >
    <circle cx="75" cy="75" r="75" />
    <rect x="180" y="40" rx="10" ry="10" width="150" height="27" />
    <rect x="180" y="80" rx="10" ry="10" width="121" height="19" />
    <rect x="180" y="110" rx="10" ry="10" width="55" height="19" />
    <rect x="255" y="110" rx="10" ry="10" width="55" height="19" />
  </ContentLoader>
);

export default ProfileSkeleton;
