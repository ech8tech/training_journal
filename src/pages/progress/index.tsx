import React, { Suspense } from "react";

import { Spinner } from "@components/spinner/Spinner";

const ProgressComponent = React.lazy(
  () => import(/* webpackChunkName: "Progress" */ "./Progress"),
);

export const Progress = () => {
  return (
    <Suspense fallback={<Spinner isFullPage />}>
      <ProgressComponent />
    </Suspense>
  );
};
