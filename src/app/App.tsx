import "./App.scss";

import { Authentication } from "@pages/authentication";
import { Registration } from "@pages/registration";
import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Dashboard = lazy(
  () =>
    import(/* webpackChunkName: "Dashboard" */ "@pages/dashboard/Dashboard"),
);
const Exercise = lazy(
  () => import(/* webpackChunkName: "Exercise" */ "@pages/exercise/Exercise"),
);
const Components = lazy(
  () =>
    import(/* webpackChunkName: "Components" */ "@pages/components/Components"),
);

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/components" element={<Components />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/authentication" element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  );
}
