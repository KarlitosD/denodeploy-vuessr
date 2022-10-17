import { createSSRApp } from "https://esm.sh/vue@3.2.41";
import App from "./App.jsx"

export function createApp() {
  return createSSRApp(App);
}
