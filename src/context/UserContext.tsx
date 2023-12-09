import React, { ReactNode } from "react";
import { TFormValues } from "../pages/MaterialUiForm";
import { useFetch } from "../hooks/useFetch";

const userContextValues = {
  firstName: "",
  lastName: "",
  age: "",
  email: "",
  company: "",
  phone: "",
  tecnology: "",
};

export const UserContext = React.createContext<TFormValues>(userContextValues);

type TUserProvider = {
  children: ReactNode;
};
export const UserProvider = ({ children }: TUserProvider) => {
  const { data } = useFetch();

  // const dataStorage = sessionStorage.getItem(
  //   "form_zod_material_values_storage"
  // );
  // const objStorage = JSON.parse(dataStorage || "");

  const values: TFormValues = {
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    age: data?.age || "",
    email: data?.email || "",
    company: data?.company || "",
    phone: data?.phone || "",
    tecnology: data?.tecnology || "",
  };

  // const valuesStorage: TFormValues = {
  //   firstName: objStorage.firstName || data?.firstName,
  //   lastName: objStorage.lastName || data?.lastName,
  //   age: objStorage.age || data?.age,
  //   email: objStorage.email || data?.email,
  //   company: objStorage.company || data?.company,
  //   phone: objStorage.phone || data?.phone,
  //   tecnology: objStorage.tecnology || data?.tecnology,
  // };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
