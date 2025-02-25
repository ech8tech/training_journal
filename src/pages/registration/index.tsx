import { Spinner } from "@components/spinner/Spinner";
import React, { Suspense } from "react";

export const RegistrationComponent = React.lazy(() => import("./Registration"));

export const Registration = () => {
  return (
    <Suspense fallback={<Spinner isFullPage />}>
      <RegistrationComponent />
    </Suspense>
  );
};
