import { toast } from "sonner";
import { KEY_STORAGE_FORM_CADASTRO } from "../constants";

export const clearStorage = () => {
  sessionStorage.removeItem(KEY_STORAGE_FORM_CADASTRO);
  toast.info("Storage foi limpo!", {
    style: {
      color: "#228be6"
    }
  });
};

export const convertForNumber = (value: string) => {
  const numberConvertted = value.replace(/\D/g, "");
  return numberConvertted;
};
