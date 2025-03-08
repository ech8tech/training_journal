import { InputText } from "@components/inputs";
import { Link } from "react-router-dom";

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
