import React, { ReactNode } from "react";
import { TFormValues } from "../pages/MaterialUiForm";
import { useFetch } from "../hooks/useFetch";

const KEY_SESSION_STORAGE = "form_values_storage";

type TUserContext = {
  setDataStorage: (values: TFormValues) => void,
  userDataContext: TFormValues
}

const userContextValues = {
  setDataStorage: () => { },
  userDataContext: {
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    company: "",
    phone: "",
    tecnology: "",
  }
};

function getDataStorage() {
  return sessionStorage.getItem(
    KEY_SESSION_STORAGE
  );
}

function setDataStorage(values: TFormValues) {
  sessionStorage.setItem(
    KEY_SESSION_STORAGE,
    JSON.stringify(values)
  );
}

export const UserContext = React.createContext<TUserContext>(userContextValues);

type TUserProvider = {
  children: ReactNode;
};

export const UserProvider = ({ children }: TUserProvider) => {

  const [values, setValues] = React.useState<TFormValues>(userContextValues.userDataContext);

  const getDataFromAPI = async () => {
    return await useFetch();
  }

  React.useEffect(() => {
    const loadData = async () => {
      const dataStorage = getDataStorage();

      if (dataStorage) {
        const objStorage = dataStorage ? JSON.parse(dataStorage) : {};
        setValues({
          firstName: objStorage?.firstName || "",
          lastName: objStorage?.lastName || "",
          age: objStorage?.age || "",
          email: objStorage?.email || "",
          company: objStorage?.company || "",
          phone: objStorage?.phone || "",
          tecnology: objStorage?.tecnology || "",
        });
      }
      else {
        const data = await getDataFromAPI()
        setValues({
          firstName: data?.firstName || "",
          lastName: data?.lastName || "",
          age: data?.age || "",
          email: data?.email || "",
          company: data?.company || "",
          phone: data?.phone || "",
          tecnology: data?.tecnology || "",
        });
      }
    }
    loadData();
  }, []);

  return <UserContext.Provider value={{userDataContext: values, setDataStorage}}>{children}</UserContext.Provider>;
};
