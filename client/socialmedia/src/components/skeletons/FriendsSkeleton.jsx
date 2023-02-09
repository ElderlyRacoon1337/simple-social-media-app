import React from 'react';
import ContentLoader from 'react-content-loader';

const FriendsSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={520}
    height={104}
    viewBox="0 0 520 104"
    backgroundColor="var(--loader1)"
    foregroundColor="var(--loader2)"
    {...props}
  >
    <circle cx="50" cy="50" r="50" />
    <rect x="120" y="20" rx="10" ry="10" width="165" height="20" />
    <rect x="120" y="46.5" rx="7" ry="7" width="136" height="17" />
    <rect x="120" y="70" rx="7" ry="7" width="160" height="15" />
    <rect x="495" y="10" rx="7" ry="7" width="25" height="10" />

    {/* <circle cx="50" cy="185" r="50" />
    <rect x="120" y="155" rx="10" ry="10" width="165" height="20" />
    <rect x="120" y="185" rx="7" ry="7" width="136" height="17" />
    <rect x="120" y="210" rx="7" ry="7" width="160" height="15" />
    <rect x="470" y="150" rx="7" ry="7" width="40" height="15" />

    <circle cx="50" cy="320" r="50" />
    <rect x="120" y="290" rx="10" ry="10" width="165" height="20" />
    <rect x="120" y="320" rx="7" ry="7" width="136" height="17" />
    <rect x="120" y="345" rx="7" ry="7" width="160" height="15" />
    <rect x="470" y="285" rx="7" ry="7" width="40" height="15" />

    <circle cx="50" cy="455" r="50" />
    <rect x="120" y="425" rx="10" ry="10" width="165" height="20" />
    <rect x="120" y="455" rx="7" ry="7" width="136" height="17" />
    <rect x="120" y="480" rx="7" ry="7" width="160" height="15" />
    <rect x="470" y="420" rx="7" ry="7" width="40" height="15" />

    <circle cx="50" cy="590" r="50" />
    <rect x="120" y="560" rx="10" ry="10" width="165" height="20" />
    <rect x="120" y="590" rx="7" ry="7" width="136" height="17" />
    <rect x="120" y="615" rx="7" ry="7" width="160" height="15" />
    <rect x="470" y="555" rx="7" ry="7" width="40" height="15" /> */}
  </ContentLoader>
);

export default FriendsSkeleton;
