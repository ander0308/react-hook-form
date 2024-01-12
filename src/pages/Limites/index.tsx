import React from "react";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Button, TextField, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { TLimites } from "../../types/formTypes";
import { useStorage } from "../../hooks/useStorage";

const Limites = () => {
  const navigate = useNavigate();
  const { objStorage, dataStorage } = useStorage();

  const defaultValues = {
    limitePixDiario: dataStorage.limitePixDiario || 16,
    limitePixTransacao: dataStorage.limitePixTransacao || 9,
    limiteBoletoDiario: dataStorage.limiteBoletoDiario || 10,
    limiteBoletoTransacao: dataStorage.limiteBoletoTransacao || 8,
    limiteCodBarrasDiario: dataStorage.limiteCodBarrasDiario || 11,
    limiteCodBarrasTransacao: dataStorage.limiteCodBarrasTransacao || 12,
  };

  function goToPage(page: string) {
    navigate(`./../${page}`);
  }

  const form = useForm({
    defaultValues,
    mode: "onChange", // modo de validação padrão, existe onChange, onBlur e etc...
  });
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid, isSubmitting },
  } = form;

  const onSubmit = (values: TLimites) => {
    const valuesStorage = {
      ...dataStorage,
      ...values,
    };
    sessionStorage.setItem("form_limites", JSON.stringify(valuesStorage));
    goToPage("tarifas");

    console.log(valuesStorage);
  };

  const watchLimitePixDiario = watch("limitePixDiario");
  const watchLimiteBoletoDiario = watch("limiteBoletoDiario");
  const watchLimiteCodBarrasDiario = watch("limiteCodBarrasDiario");

  const loadDataByStorage = () => {
    if (objStorage) {
      setValue("limitePixDiario", dataStorage.limitePixDiario, {
        shouldValidate: true,
      });
      setValue("limitePixTransacao", dataStorage.limitePixTransacao, {
        shouldValidate: true,
      });
      setValue("limiteBoletoDiario", dataStorage.limiteBoletoDiario, {
        shouldValidate: true,
      });
      setValue("limiteBoletoTransacao", dataStorage.limiteBoletoTransacao, {
        shouldValidate: true,
      });
      setValue("limiteCodBarrasDiario", dataStorage.limiteCodBarrasDiario, {
        shouldValidate: true,
      });
      setValue(
        "limiteCodBarrasTransacao",
        dataStorage.limiteCodBarrasTransacao,
        {
          shouldValidate: true,
        }
      );
    }
  };

  React.useEffect(() => {
    loadDataByStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    trigger([
      "limitePixDiario",
      "limitePixTransacao",
      "limiteBoletoDiario",
      "limiteBoletoTransacao",
      "limiteCodBarrasDiario",
      "limiteCodBarrasTransacao",
    ]);
  }, [trigger]);

  return (
    <div>
      <Typography variant="h3">CADASTRO DE LIMITES</Typography>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="overline" fontWeight="bold">
          Pix
        </Typography>
        <Controller
          control={control}
          name="limitePixDiario"
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
                setValue("limitePixDiario", numericValue, {
                  shouldValidate: true,
                });
                field.onChange(numericValue);
              }}
              value={field.value}
              error={!!errors.limitePixDiario}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="limitePixTransacao"
          rules={{
            required: "Campo obrigatório",
            validate: (value) => {
              return (
                value <= watchLimitePixDiario ||
                "Valor não pode ser maior que o limite diário"
              );
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Limite por transação"
              placeholder="Limite por transação"
              variant="outlined"
              className="inputText"
              onChange={({ target }) => {
                const numericValue = Number(target.value);
                setValue("limitePixTransacao", numericValue, {
                  shouldValidate: true,
                });
                field.onChange(numericValue);
              }}
              value={field.value}
              error={!!errors.limitePixTransacao}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Typography variant="overline" fontWeight="bold">
          Boletos
        </Typography>
        <Controller
          control={control}
          name="limiteBoletoDiario"
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
                setValue("limiteBoletoDiario", numericValue, {
                  shouldValidate: true,
                });
                field.onChange(numericValue);
              }}
              value={field.value}
              error={!!errors.limiteBoletoDiario}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="limiteBoletoTransacao"
          rules={{
            required: "Campo obrigatório",
            validate: (value) => {
              return (
                value <= watchLimiteBoletoDiario ||
                "Valor não pode ser maior que o limite diário"
              );
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Limite por transação"
              placeholder="Limite por transação"
              variant="outlined"
              className="inputText"
              onChange={({ target }) => {
                const numericValue = Number(target.value);
                setValue("limiteBoletoTransacao", numericValue, {
                  shouldValidate: true,
                });
                field.onChange(numericValue);
              }}
              value={field.value}
              error={!!errors.limiteBoletoTransacao}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Typography variant="overline" fontWeight="bold">
          Código de barras
        </Typography>
        <Controller
          control={control}
          name="limiteCodBarrasDiario"
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
                setValue("limiteCodBarrasDiario", numericValue, {
                  shouldValidate: true,
                });
                field.onChange(numericValue);
              }}
              value={field.value}
              error={!!errors.limiteCodBarrasDiario}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="limiteCodBarrasTransacao"
          rules={{
            required: "Campo obrigatório",
            validate: (value) => {
              return (
                value <= watchLimiteCodBarrasDiario ||
                "Valor não pode ser maior que o limite diário"
              );
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Limite por transação"
              placeholder="Limite por transação"
              variant="outlined"
              className="inputText"
              onChange={({ target }) => {
                const numericValue = Number(target.value);
                setValue("limiteCodBarrasTransacao", numericValue, {
                  shouldValidate: true,
                });
                field.onChange(numericValue);
              }}
              value={field.value}
              error={!!errors.limiteCodBarrasTransacao}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button
          variant="contained"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Proximo
        </Button>
      </form>
      <DevTool control={control} placement="top-right" />
    </div>
  );
};

export default Limites;
