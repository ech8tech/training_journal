import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Authentication } from "@pages/authentication";
import { Components } from "@pages/components";
import { Dashboard } from "@pages/dashboard";
import { Journal } from "@pages/journal";
import { RegistrationConfirm } from "@pages/registration/confirm";
import { RegistrationProfile } from "@pages/registration/profile";
import { RegistrationUser } from "@pages/registration/user";

import { routes } from "./routesConfig";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.DASHBOARD.path} element={<Dashboard />} />
        <Route path={routes.JOURNAL.path} element={<Journal />} />
        <Route path={routes.COMPONENTS.path} element={<Components />} />

        <Route
          path={routes.REGISTRATION.USER.path}
          element={<RegistrationUser />}
        />
        <Route
          path={routes.REGISTRATION.CONFIRMATION.path}
          element={<RegistrationConfirm />}
        />
        <Route
          path={routes.REGISTRATION.PROFILE.path}
          element={<RegistrationProfile />}
        />

        <Route path={routes.AUTHENTICATION.path} element={<Authentication />} />

        <Route
          path="*"
          element={<Navigate to={routes.DASHBOARD.path} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
