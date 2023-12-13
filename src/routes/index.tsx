import React, { ComponentType } from "react";

import MaterialUiCadastro from "../pages/MaterialUiCadastro";
import MaterialUiRevisao from "../pages/MaterialUiRevisao";
import Home from "../pages/Home";
import { UserProvider } from "../context/UserContext";

export type TRoutePaths = {
  path: string;
  element: React.ReactNode;
};

const withProvider = (Component: ComponentType) => (
  <UserProvider>
    <Component />
  </UserProvider>
);

const routesPaths = (): TRoutePaths[] => {
  return [
    {
      path: "/app2/home",
      element: withProvider(Home),
    },
    {
      path: "/app2/form",
      element: withProvider(MaterialUiCadastro),
    },
    {
      path: "/app2/revisao",
      element: withProvider(MaterialUiRevisao),
    },
  ];
};

export default routesPaths;
