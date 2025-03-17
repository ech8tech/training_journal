import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { SignIn, SignUp } from "@pages/authenticate";
import { Components } from "@pages/components";
import { Dashboard } from "@pages/dashboard";
import { Journal } from "@pages/journal";
import { Profile } from "@pages/profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routes } from "./routesConfig";

const queryClient = new QueryClient();

export function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path={routes.DASHBOARD.path} element={<Dashboard />} />
          <Route path={routes.JOURNAL.path} element={<Journal />} />
          <Route path={routes.COMPONENTS.path} element={<Components />} />

          <Route
            path={routes.AUTHENTICATION.SIGN_UP.path}
            element={<SignUp />}
          />
          <Route
            path={routes.AUTHENTICATION.SIGN_IN.path}
            element={<SignIn />}
          />

          <Route path={routes.PROFILE.path} element={<Profile />} />

          <Route
            path="*"
            element={<Navigate to={routes.DASHBOARD.path} replace />}
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
