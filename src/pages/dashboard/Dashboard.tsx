import { Link } from "react-router-dom";

import { InputText } from "@components/inputs";

export default function Dashboard() {
  return (
    <div>
      <div>Dashboard</div>
      <InputText name={"name"} placeholder={"test"} onChange={() => {}} />
      <Link to="/components">Компоненты</Link>
      <Link to="/registration">Регистрация</Link>
    </div>
  );
}
