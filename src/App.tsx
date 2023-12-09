// import "./App.css";
import "./AppMaterial.css";
import { MaterialUiForm } from "./components/MaterialUiForm";
import { UserProvider } from "./context/UserContext";
// import { YoutubeForm } from "./components/YoutubeForm";
// import { YupYoutubeForm } from "./components/YupYoutubeForm";
// import { ZodYoutubeForm } from "./components/ZodYoutubeForm";

function App() {
  return (
    <UserProvider>
      <MaterialUiForm />
    </UserProvider>
  );
}

export default App;
