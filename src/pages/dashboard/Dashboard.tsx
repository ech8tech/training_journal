import Components from "@pages/components/Components";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <div>Dashboard</div>
      <NavLink to="/exercise">To Exercises</NavLink>

      <Components />
    </div>
  );
}
