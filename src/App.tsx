import "flatpickr/dist/themes/material_red.css";
import "./App.css";

import { AppProvider } from "@/providers/app";
import { AppRoutes } from "@/routes";
import CustomCursor from "./assets/cursor/Cursor";

function App() {
  return (
    <AppProvider>
      <CustomCursor />
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
