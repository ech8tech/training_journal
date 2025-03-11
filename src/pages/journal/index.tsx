import React, { Suspense } from "react";

import { Spinner } from "@components/spinner/Spinner";

const JournalComponent = React.lazy(
  () => import(/* webpackChunkName: "Journal" */ "./Journal"),
);

export const Journal = () => {
  return (
    <Suspense fallback={<Spinner isFullPage />}>
      <JournalComponent />
    </Suspense>
  );
};
