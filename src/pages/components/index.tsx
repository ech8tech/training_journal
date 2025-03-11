import React, { Suspense } from "react";

import { Spinner } from "@components/spinner/Spinner";

const ComponentsComponent = React.lazy(
  () => import(/* webpackChunkName: "Components" */ "./Components"),
);

export const Components = () => {
  return (
    <Suspense fallback={<Spinner isFullPage />}>
      <ComponentsComponent />
    </Suspense>
  );
};
