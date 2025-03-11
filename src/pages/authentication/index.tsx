import React, { Suspense } from "react";

import { Spinner } from "@components/spinner/Spinner";

const AuthenticationComponent = React.lazy(
  () => import(/* webpackChunkName: "Authentication" */ "./Authentication"),
);

export const Authentication = () => {
  return (
    <Suspense fallback={<Spinner isFullPage />}>
      <AuthenticationComponent />
    </Suspense>
  );
};
