import { KEY_STORAGE_FORM_CADASTRO } from "../constants";

export const clearStorage = () => {
  sessionStorage.removeItem(KEY_STORAGE_FORM_CADASTRO);
};
