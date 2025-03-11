import React, { Suspense } from "react";

import { Spinner } from "@components/spinner/Spinner";

const DashboardComponent = React.lazy(
  () => import(/* webpackChunkName: "Dashboard" */ "./Dashboard"),
);

export const Dashboard = () => {
  return (
    <Suspense fallback={<Spinner isFullPage />}>
      <DashboardComponent />
    </Suspense>
  );
};
