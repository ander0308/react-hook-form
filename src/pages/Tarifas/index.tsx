import React from "react";
import { useForm, Controller } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { Button, TextField, Typography } from "@mui/material";

type TLimites = {
  tarifaPix: number;
  tarifaBoleto: number;
  tarifaCodBarras: number;
};

const defaultValues = {
  tarifaPix: 0,
  tarifaBoleto: 14,
  tarifaCodBarras: 16,
};

// function goToPage(page: string) {
//   window.location.href = page;
// }

const Tarifas = () => {
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

  const onSubmit = (values: TLimites) => {
    const objStorage = sessionStorage.getItem("form_limites");
    const dataStorage = objStorage ? JSON.parse(objStorage) : {};

    const newDataValues = {
      ...dataStorage,
      ...values,
    };

    sessionStorage.setItem("form_limites", JSON.stringify(newDataValues));
    console.log(newDataValues);
  };

  React.useEffect(() => {
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
              label="Limite Diário"
              placeholder="Limite Diário"
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
              label="Limite Diário"
              placeholder="Limite Diário"
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
              value: 10,
              message: "O Valor não pode ser maior do que 10",
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Limite Diário"
              placeholder="Limite Diário"
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
      {/* <pre>{data}</pre> */}
      {/* <DevTool control={control} placement="top-right" /> */}
    </div>
  );
};

export default Tarifas;
