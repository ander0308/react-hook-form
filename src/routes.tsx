import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MaterialUiForm } from "./pages/MaterialUiForm";
import { MaterialUiFormRevisao } from "./pages/MaterialUiRevisao";
import { NotFound } from "./pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MaterialUiForm />} />
        <Route path="/revisao" element={<MaterialUiFormRevisao />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
