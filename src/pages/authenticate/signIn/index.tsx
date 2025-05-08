import React, { Suspense } from "react";

import { Spinner } from "@components/spinner/Spinner";

const SignInComponent = React.lazy(
  () => import(/* webpackChunkName: "SignIn" */ "./SignIn"),
);

export const SignIn = () => {
  return (
    <Suspense fallback={<Spinner isFullPage />}>
      <SignInComponent />
    </Suspense>
  );
};
