import React from "react";
import { TFormValues } from "../pages/MaterialUiForm";

export const useFetch = () => {
  const [data, setData] = React.useState<TFormValues>();

  React.useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      });
  }, []);

  return { data };
};
