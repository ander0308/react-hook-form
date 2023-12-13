import { BrowserRouter, Route, Routes } from "react-router-dom";

import { NotFound } from "../pages/NotFound";
import routesPaths, { TRoutePaths } from ".";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routesPaths().map((component: TRoutePaths) => (
          <Route
            key={component.path}
            path={component.path}
            element={component.element}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
