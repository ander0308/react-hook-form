import React from "react";

import MaterialUiForm from "../pages/MaterialUiForm";
import MaterialUiFormRevisao from "../pages/MaterialUiRevisao";
import Home from "../pages/Home";

export type TRoutePaths = {
  path: string;
  element: React.ReactNode;
};

const routesPaths = (): TRoutePaths[] => {
  return [
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/form",
      element: <MaterialUiForm />,
    },
    {
      path: "/revisao",
      element: <MaterialUiFormRevisao />,
    },
  ];
};

export default routesPaths;
