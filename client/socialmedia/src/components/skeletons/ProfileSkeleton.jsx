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
    <rect x="180" y="32" rx="10" ry="10" width="175" height="30" />
    <rect x="180" y="72" rx="5" ry="10" width="121" height="15" />
    <rect x="180" y="95" rx="5" ry="10" width="57" height="17" />
    <rect x="245" y="95" rx="5" ry="10" width="57" height="17" />
  </ContentLoader>
);

export default ProfileSkeleton;
