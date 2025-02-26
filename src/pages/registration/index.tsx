import { Spinner } from "@components/spinner/Spinner";
import React, { Suspense } from "react";

export const RegistrationComponent = React.lazy(
  () => import(/* webpackChunkName: "Registration" */ "./Registration"),
);

export const Registration = () => {
  return (
    <Suspense fallback={<Spinner isFullPage />}>
      <RegistrationComponent />
    </Suspense>
  );
};
