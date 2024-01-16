import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";

import { Button, Stack, TextField, Typography } from "@mui/material";
import { TTarifas } from "../../types/formTypes";
import { useStorage } from "../../hooks/useStorage";
import { KEY_STORAGE_FORM_CADASTRO } from "../../constants";
import { clearStorage, convertForNumber } from "../../uteis/functions";
import StepsForm from "../../components/Steps";

const Tarifas = () => {
  const navigate = useNavigate();
  const { objStorage, dataStorage } = useStorage();
  // const [data, setData] = React.useState("");

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
    // setData(JSON.stringify(postDataValues, null, 2));
    sessionStorage.setItem(
      KEY_STORAGE_FORM_CADASTRO,
      JSON.stringify(postDataValues)
    );
    goToPage("integracao");
    console.log(postDataValues);
  };

  const loadDataStorage = () => {
    const pix = dataStorage.tarifaPix;
    const boleto = dataStorage.tarifaBoleto;
    const codBarras = dataStorage.tarifaCodBarras;

    if (objStorage && (pix || boleto || codBarras)) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return (
    <div>
      <Typography variant="h3">CADASTRO DE TARIFAS</Typography>
      <br />
      <StepsForm activeStep={1} />
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
                const numericValue = Number(convertForNumber(target.value));
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
                const numericValue = Number(convertForNumber(target.value));
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
                const numericValue = Number(convertForNumber(target.value));
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
        <Stack direction="row" spacing={2} width="100%">
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
          <Button
            variant="contained"
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            Proximo
          </Button>
        </Stack>
      </form>
      <footer style={{ marginTop: "16px" }}></footer>
      {/* <pre>{data}</pre> */}
      <DevTool control={control} placement="top-right" />
    </div>
  );
};

export default Tarifas;
