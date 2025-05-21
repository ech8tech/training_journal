import React, { Suspense } from "react";

import { Spinner } from "@components/spinner/Spinner";

const StatisticsComponent = React.lazy(
  () => import(/* webpackChunkName: "Statistics" */ "./Statistics"),
);

export const Statistics = () => {
  return (
    <Suspense fallback={<Spinner isFullPage />}>
      <StatisticsComponent />
    </Suspense>
  );
};
