import { TValuesStorage } from "../types/formTypes";

export const useStorage = () => {
  const objStorage = sessionStorage.getItem("form_limites");
  const dataStorage: TValuesStorage = objStorage ? JSON.parse(objStorage) : {};

  return { objStorage, dataStorage };
};
