import { KEY_STORAGE_FORM_CADASTRO } from "../constants";
import { TValuesStorage } from "../types/formTypes";

export const useStorage = () => {
  const objStorage = sessionStorage.getItem(KEY_STORAGE_FORM_CADASTRO);
  const dataStorage: TValuesStorage = objStorage ? JSON.parse(objStorage) : {};

  return { objStorage, dataStorage };
};
