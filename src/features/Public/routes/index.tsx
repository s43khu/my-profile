import { Route, Routes } from "react-router-dom";
import { lazyImport } from "@/lib/lazyImport";

//lazy imported landing
const { Landing } = lazyImport(() => import('./Landing'), 'Landing');

export const PublicRoutes = () => {
  return (
    <Routes>
        <Route path="" element={<Landing />} />
    </Routes>
  );
};
