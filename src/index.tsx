import "dayjs/locale/ru";
import "@rc-component/trigger/assets/index.css";
import dayjs from "dayjs";
import { createRoot } from "react-dom/client";

import { App } from "@app/App";

dayjs.locale("ru");

// document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
