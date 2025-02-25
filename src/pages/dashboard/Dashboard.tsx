import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <div>Dashboard</div>
      <Link to="/components">Компоненты</Link>
      <Link to="/registration">Регистрация</Link>
    </div>
  );
}
