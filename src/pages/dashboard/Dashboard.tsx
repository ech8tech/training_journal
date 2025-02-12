import { NavLink } from "react-router-dom";

import * as styles from "./Dashboard.scss";

export default function Dashboard() {
  return (
    <div className={styles.container}>
      <div>Dashboard</div>
      <NavLink to="/exercise">To Exercises</NavLink>
    </div>
  );
}
