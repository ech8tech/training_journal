import { Spinner } from "@components/spinner/Spinner";
import React, { Suspense } from "react";

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
