import React, { ComponentType } from "react";

import MaterialUiCadastro from "../pages/MaterialUiCadastro";
import MaterialUiRevisao from "../pages/MaterialUiRevisao";
import Home from "../pages/Home";
import { UserProvider } from "../context/UserContext";
import MaterialUiCadastroTarifas from "../pages/MaterialUiCadastroTarifas";
import Limites from "../pages/Limites";
import Tarifas from "../pages/Tarifas";
import Integracao from "../pages/Integracao";
import RevisaoCadastro from "../pages/RevisaoCadastro";

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
    {
      path: "/app2/cadastro-tarifas",
      element: withProvider(MaterialUiCadastroTarifas),
    },
    {
      path: "/app2/limites",
      element: withProvider(Limites),
    },
    {
      path: "/app2/tarifas",
      element: withProvider(Tarifas),
    },
    {
      path: "/app2/integracao",
      element: withProvider(Integracao),
    },
    {
      path: "/app2/revisao-cadastro",
      element: withProvider(RevisaoCadastro),
    },
  ];
};

export default routesPaths;
