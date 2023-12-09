import React, { ReactNode } from "react";
import { TFormValues } from "../components/MaterialUiForm";
import { useFetch } from "../hooks/useFetch";

const userContextValues = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  age: 0,
};

export const UserContext = React.createContext<TFormValues>(userContextValues);

type TUserProvider = {
  children: ReactNode;
};
export const UserProvider = ({ children }: TUserProvider) => {
  const { data } = useFetch();

  const values = {
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    email: data?.email || "",
    company: data?.company || "",
    phone: data?.phone || "",
    age: data?.age || 20,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
