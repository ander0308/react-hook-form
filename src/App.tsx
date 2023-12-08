// import "./App.css";
import "./AppMaterial.css";
import { MaterialUiForm } from "./components/MaterialUiForm";
import { UserContext } from "./context/UserContext";
// import { YoutubeForm } from "./components/YoutubeForm";
// import { YupYoutubeForm } from "./components/YupYoutubeForm";
// import { ZodYoutubeForm } from "./components/ZodYoutubeForm";

function App() {


  const values = {
    firstName: "Anderson",
    lastName: "Santana",
    email: "ander@gmail.com",
    company: "Sicredi",
    phone: "11989878999",
    age: 10,
  }

  return (
    <UserContext.Provider value={values}>
      {/* <YoutubeForm />
      <br />
      <br />
      <br />
      <YupYoutubeForm />
      <br />
      <br />
      <br /> */}
      {/* <ZodYoutubeForm /> */}
      <MaterialUiForm />
    </UserContext.Provider>
  );
}

export default App;
