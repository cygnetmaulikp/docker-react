/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const withSuspense = (WrappedComponent, FallbackComponent = null) => {
  return function Component(props) {
    const fallback = <div data-aid="loading">{FallbackComponent || 'Loading...'}</div>;
    return (
      <React.Suspense fallback={fallback}>
        <div data-aid="children">
          <WrappedComponent {...props} />
        </div>
      </React.Suspense>
    );
  };
};

export default withSuspense;
