// import "./App.css";
import "./AppMaterial.css";
// import { MaterialUiForm } from "./components/MaterialUiForm";
import { UserProvider } from "./context/UserContext";
import { AppRoutes } from "./routes";
// import { YoutubeForm } from "./components/YoutubeForm";
// import { YupYoutubeForm } from "./components/YupYoutubeForm";
// import { ZodYoutubeForm } from "./components/ZodYoutubeForm";

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;
