import { TFormValues } from "../pages/MaterialUiCadastro";

export const useFetch = async (): Promise<TFormValues> => {
  const data = await fetch("http://localhost:4403/user");

  return data.json();
};
