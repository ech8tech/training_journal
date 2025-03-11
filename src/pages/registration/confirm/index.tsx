import React, { Suspense } from "react";

import { Spinner } from "@components/spinner/Spinner";

const RegistrationConfirmComponent = React.lazy(
  () =>
    import(
      /* webpackChunkName: "RegistrationConfirm" */ "./RegistrationConfirm"
    ),
);

export const RegistrationConfirm = () => {
  return (
    <Suspense fallback={<Spinner isFullPage />}>
      <RegistrationConfirmComponent />
    </Suspense>
  );
};
