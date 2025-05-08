import React, { Suspense } from "react";

import { Spinner } from "@components/spinner/Spinner";

const SignUpComponent = React.lazy(
  () => import(/* webpackChunkName: "SignUp" */ "./SignUp"),
);

export const SignUp = () => {
  return (
    <Suspense fallback={<Spinner isFullPage />}>
      <SignUpComponent />
    </Suspense>
  );
};
