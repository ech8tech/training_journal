import React, { Suspense } from "react";

import { Spinner } from "@components/spinner/Spinner";

const RegistrationUserComponent = React.lazy(
  () => import(/* webpackChunkName: "RegistrationUser" */ "./RegistrationUser"),
);

export const RegistrationUser = () => {
  return (
    <Suspense fallback={<Spinner isFullPage />}>
      <RegistrationUserComponent />
    </Suspense>
  );
};
