import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";

import { Button, Stack, TextField, Typography } from "@mui/material";
import { TTarifas } from "../../types/formTypes";
import { useStorage } from "../../hooks/useStorage";

const clearStorage = () => {
  sessionStorage.removeItem("form_limites");
};

const Tarifas = () => {
  const navigate = useNavigate();
  const { objStorage, dataStorage } = useStorage();

  const defaultValues = {
    tarifaPix: dataStorage.tarifaPix || 10,
    tarifaBoleto: dataStorage.tarifaBoleto || 14,
    tarifaCodBarras: dataStorage.tarifaCodBarras || 16,
  };

  const form = useForm({
    defaultValues,
    mode: "onChange", // modo de validação padrão, existe onChange, onBlur e etc...
  });
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = form;

  const goToPage = (page: string) => {
    navigate(`./../${page}`);
  };

  const onSubmit = (values: TTarifas) => {
    const postDataValues = {
      ...dataStorage,
      ...values,
    };

    sessionStorage.setItem("form_limites", JSON.stringify(postDataValues));
    console.log(postDataValues);
  };

  const loadDataStorage = () => {
    const pix = dataStorage.tarifaPix;
    const boleto = dataStorage.tarifaBoleto;
    const codBarras = dataStorage.tarifaCodBarras;

    if ((objStorage && pix) || boleto || codBarras) {
      setValue("tarifaPix", dataStorage.tarifaPix, { shouldValidate: true });
      setValue("tarifaBoleto", dataStorage.tarifaBoleto, {
        shouldValidate: true,
      });
      setValue("tarifaCodBarras", dataStorage.tarifaCodBarras, {
        shouldValidate: true,
      });
    }
  };

  React.useEffect(() => {
    loadDataStorage();
    trigger(["tarifaPix", "tarifaBoleto", "tarifaCodBarras"]);
  }, [trigger]);

  return (
    <div>
      <Typography variant="h3">CADASTRO DE TARIFAS</Typography>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="overline" fontWeight="bold">
          Pix
        </Typography>
        <Controller
          control={control}
          name="tarifaPix"
          rules={{
            min: {
              value: 1,
              message: "O Valor não pode ser maior do que 1",
            },
            max: {
              value: 20,
              message: "O Valor não pode ser maior do que 20",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Tarifa Pix"
              placeholder="Tarifa Pix"
              variant="outlined"
              className="inputText"
              onChange={({ target }) => {
                const numericValue = Number(target.value);
                setValue("tarifaPix", numericValue, {
                  shouldValidate: true,
                });
                field.onChange(numericValue);
              }}
              value={field.value}
              error={!!errors.tarifaPix}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Typography variant="overline" fontWeight="bold">
          Boletos
        </Typography>
        <Controller
          control={control}
          name="tarifaBoleto"
          rules={{
            min: {
              value: 1,
              message: "O Valor não pode ser maior do que 1",
            },
            max: {
              value: 20,
              message: "O Valor não pode ser maior do que 20",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Tarifa Boleto"
              placeholder="Tarifa Boleto"
              variant="outlined"
              className="inputText"
              onChange={({ target }) => {
                const numericValue = Number(target.value);
                setValue("tarifaBoleto", numericValue, {
                  shouldValidate: true,
                });
                field.onChange(numericValue);
              }}
              value={field.value}
              error={!!errors.tarifaBoleto}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Typography variant="overline" fontWeight="bold">
          Código de barras
        </Typography>
        <Controller
          control={control}
          name="tarifaCodBarras"
          rules={{
            min: {
              value: 1,
              message: "O Valor não pode ser maior do que 1",
            },
            max: {
              value: 20,
              message: "O Valor não pode ser maior do que 20",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Tarifa Código Barras Diário"
              placeholder="Tarifa Código Barras"
              variant="outlined"
              className="inputText"
              onChange={({ target }) => {
                const numericValue = Number(target.value);
                setValue("tarifaCodBarras", numericValue, {
                  shouldValidate: true,
                });
                field.onChange(numericValue);
              }}
              value={field.value}
              error={!!errors.tarifaCodBarras}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button
          variant="contained"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Enviar Cadastro
        </Button>
      </form>
      <footer style={{ marginTop: "16px" }}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => goToPage("limites")}
            disabled={!isValid || isSubmitting}
          >
            Voltar
          </Button>
          <Button variant="outlined" onClick={() => clearStorage()}>
            Limpar
          </Button>
        </Stack>
      </footer>
      <DevTool control={control} placement="top-right" />
    </div>
  );
};

export default Tarifas;
