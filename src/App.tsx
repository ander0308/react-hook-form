import { Toaster } from "sonner";
import "./AppMaterial.css";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;
