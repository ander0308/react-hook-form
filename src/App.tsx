import "./AppMaterial.css";
import AppRoutes from "./routes/routes";

import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
