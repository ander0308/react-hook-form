import React from "react";

const userContextValues = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  phone: "",
  age: 0,
};

export const UserContext = React.createContext(userContextValues);
