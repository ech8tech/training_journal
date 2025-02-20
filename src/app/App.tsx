import "./App.scss";

import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("@pages/dashboard/Dashboard"));
const Exercise = lazy(() => import("@pages/exercise/Exercise"));
const Components = lazy(() => import("@pages/components/Components"));

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/components" element={<Components />} />
      </Routes>
    </BrowserRouter>
  );
}
