import React from 'react';
import ContentLoader from 'react-content-loader';

const PostSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={510}
    height={180}
    viewBox="0 0 510 180"
    backgroundColor="var(--loader1)"
    foregroundColor="var(--loader2)"
    {...props}
  >
    <circle cx="26" cy="17" r="15" />
    <rect x="59" y="7" rx="10" ry="10" width="293" height="20" />
    <rect x="480" y="3" rx="11" ry="11" width="30" height="30" />

    <rect x="13" y="60" rx="4" ry="4" width="480" height="8" />
    <rect x="13" y="80" rx="4" ry="4" width="480" height="8" />
    <rect x="13" y="100" rx="4" ry="4" width="480" height="8" />
    <rect x="13" y="120" rx="4" ry="4" width="480" height="8" />

    <rect x="13" y="150" rx="11" ry="11" width="75" height="28" />
    <rect x="100" y="150" rx="11" ry="11" width="75" height="28" />
  </ContentLoader>
);

export default PostSkeleton;
