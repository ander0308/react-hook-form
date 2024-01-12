import React from "react";
import { useForm, Controller } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type TLimites = {
  limitePixDiario: number;
  limitePixTransacao: number;
  limiteBoletoDiario: number;
  limiteBoletoTransacao: number;
  limiteCodBarrasDiario: number;
  limiteCodBarrasTransacao: number;
};

// type TValuesStorage = {
//   limiteBoletoDiario: number;
//   limiteBoletoTransacao: number;
//   limiteCodBarrasDiario: number;
//   limiteCodBarrasTransacao: number;
//   limitePixDiario: number;
//   limitePixTransacao: number;
//   tarifaBoleto: number;
//   tarifaCodBarras: number;
//   tarifaPix: number;
// };

const defaultValues = {
  limitePixDiario: 10,
  limitePixTransacao: 11,
  limiteBoletoDiario: 12,
  limiteBoletoTransacao: 8,
  limiteCodBarrasDiario: 14,
  limiteCodBarrasTransacao: 15,
};

const Limites = () => {
  const navigate = useNavigate();

  function goToPage(page: string) {
    // window.location.href = page;
    navigate(page);
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
    console.log(values);
    sessionStorage.setItem("form_limites", JSON.stringify(values));
    goToPage("./../tarifas");
  };

  const watchLimitePixDiario = watch("limitePixDiario");
  const watchLimiteBoletoDiario = watch("limiteBoletoDiario");
  const watchLimiteCodBarrasDiario = watch("limiteCodBarrasDiario");

  React.useEffect(() => {
    trigger([
      "limitePixDiario",
      "limitePixTransacao",
      "limiteBoletoDiario",
      "limiteBoletoTransacao",
      "limiteCodBarrasDiario",
      "limiteCodBarrasTransacao",
    ]);
  }, [trigger]);

  // const objStorage = sessionStorage.getItem("form_limites");
  // React.useEffect(() => {
  //   const loadData = async () => {
  //     if (objStorage) {
  //       const dataStorage: TValuesStorage = objStorage
  //         ? JSON.parse(objStorage)
  //         : {};

  //       setValue("limitePixDiario", dataStorage.limitePixDiario, {
  //         shouldValidate: true,
  //       });
  //       setValue("limitePixTransacao", dataStorage.limitePixTransacao, {
  //         shouldValidate: true,
  //       });
  //       setValue("limiteBoletoDiario", dataStorage.limiteBoletoDiario, {
  //         shouldValidate: true,
  //       });
  //       setValue("limiteBoletoTransacao", dataStorage.limiteBoletoTransacao, {
  //         shouldValidate: true,
  //       });
  //       setValue("limiteCodBarrasDiario", dataStorage.limiteCodBarrasDiario, {
  //         shouldValidate: true,
  //       });
  //       setValue(
  //         "limiteCodBarrasTransacao",
  //         dataStorage.limiteCodBarrasTransacao,
  //         {
  //           shouldValidate: true,
  //         }
  //       );
  //     }
  //   };

  //   loadData();
  // }, [setValue, objStorage]);

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
          Enviar Cadastro
        </Button>
      </form>
      {/* <pre>{data}</pre> */}
      {/* <DevTool control={control} placement="top-right" /> */}
    </div>
  );
};

export default Limites;
