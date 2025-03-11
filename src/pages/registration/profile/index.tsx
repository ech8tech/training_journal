import React, { Suspense } from "react";

import { Spinner } from "@components/spinner/Spinner";

const RegistrationProfileComponent = React.lazy(
  () =>
    import(
      /* webpackChunkName: "RegistrationProfile" */ "./RegistrationProfile"
    ),
);

export const RegistrationProfile = () => {
  return (
    <Suspense fallback={<Spinner isFullPage />}>
      <RegistrationProfileComponent />
    </Suspense>
  );
};
