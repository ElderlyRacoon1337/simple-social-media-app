import React from 'react';
import ContentLoader from 'react-content-loader';

const CreatePostSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={510}
    height={34}
    viewBox="0 0 510 34"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="26" cy="17" r="15" />
    <rect x="59" y="7" rx="10" ry="10" width="293" height="20" />
    <rect x="430" y="3" rx="11" ry="11" width="75" height="28" />
  </ContentLoader>
);

export default CreatePostSkeleton;
