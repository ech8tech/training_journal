import "./App.scss";
import Cookies from "js-cookie";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { SignIn, SignUp } from "@pages/authenticate";
import { Components } from "@pages/components";
import { Dashboard } from "@pages/dashboard";
import { Journal } from "@pages/journal";
import { Profile } from "@pages/profile";
import { Progress } from "@pages/progress";
import { Statistics } from "@pages/statistics";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routes } from "./routesConfig";

const queryClient = new QueryClient();

export function App() {
  const isLogged = Cookies.get("Authentication");

  let RoutesComponent;

  if (isLogged) {
    RoutesComponent = (
      <Routes>
        <Route path={routes.DASHBOARD.path} element={<Dashboard />} />
        <Route path={routes.JOURNAL.path} element={<Journal />} />
        <Route path={routes.COMPONENTS.path} element={<Components />} />

        <Route path={routes.PROGRESS.path} element={<Progress />} />

        <Route path={routes.STATISTICS.path} element={<Statistics />} />

        <Route path={routes.PROFILE.path} element={<Profile />} />

        <Route
          path="*"
          element={<Navigate to={routes.DASHBOARD.path} replace />}
        />
      </Routes>
    );
  } else {
    RoutesComponent = (
      <Routes>
        <Route path={routes.AUTHENTICATION.SIGN_IN.path} element={<SignIn />} />
        <Route path={routes.AUTHENTICATION.SIGN_UP.path} element={<SignUp />} />
        <Route
          path="*"
          element={<Navigate to={routes.AUTHENTICATION.SIGN_IN.path} replace />}
        />
      </Routes>
    );
  }

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {RoutesComponent}
      </QueryClientProvider>
    </BrowserRouter>
  );
}
