import React, { Suspense } from "react";

import { Spinner } from "@components/spinner/Spinner";

const ProfileComponent = React.lazy(
  () => import(/* webpackChunkName: "Profile" */ "./Profile"),
);

export const Profile = ({ onSetProfile }: any) => {
  return (
    <Suspense fallback={<Spinner isFullPage />}>
      <ProfileComponent onSetProfile={onSetProfile} />
    </Suspense>
  );
};
