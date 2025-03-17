import { Link } from "react-router-dom";

import { routes } from "@app/routesConfig";
import { Input } from "@components/input";

export default function Dashboard() {
  return (
    <div>
      <div>Dashboard</div>
      <Input name={"name"} placeholder={"test"} onChange={() => {}} />
      <Link to={routes.COMPONENTS.path}>Компоненты</Link>
      <Link to={routes.AUTHENTICATION.SIGN_IN.path}>Авторизация</Link>
      <Link to={routes.AUTHENTICATION.SIGN_UP.path}>Регистрация</Link>
    </div>
  );
}
