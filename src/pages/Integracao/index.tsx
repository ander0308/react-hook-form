import { DevTool } from "@hookform/devtools";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import StepsForm from "../../components/Steps";
import { KEY_STORAGE_FORM_CADASTRO } from "../../constants";
import { useStorage } from "../../hooks/useStorage";
import { TIntegracao } from "../../types/formTypes";
import { clearStorage } from "../../uteis/functions";

const Integracao = () => {
  const navigate = useNavigate();
  const { objStorage, dataStorage } = useStorage();

  const defaultValues = {
    cnpjSolicitante: "",
    razaoSocial: "",
    emailAssociado: "",
    emailTecnico: "",
  };

  function goToPage(page: string) {
    navigate(`./../${page}`);
  }

  const form = useForm({
    defaultValues,
    mode: "all", // modo de validação padrão, existe onChange, onBlur e etc...
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = form;

  const onSubmit = (values: TIntegracao) => {
    const valuesStorage = {
      ...dataStorage,
      ...values,
    };
    sessionStorage.setItem(
      KEY_STORAGE_FORM_CADASTRO,
      JSON.stringify(valuesStorage)
    );
    goToPage("revisao-cadastro");

    console.log(valuesStorage);
  };

  const loadDataByStorage = () => {
    if (objStorage) {
      setValue("cnpjSolicitante", dataStorage.cnpjSolicitante, {
        // shouldValidate: true,
      });
      setValue("razaoSocial", dataStorage.razaoSocial, {
        // shouldValidate: true,
      });
      setValue("emailAssociado", dataStorage.emailAssociado, {
        // shouldValidate: true,
      });
      setValue("emailTecnico", dataStorage.emailTecnico, {
        // shouldValidate: true,
      });
    }
  };

  React.useEffect(() => {
    loadDataByStorage();
  }, []);

  const formatterCnpjToNumber = (value: string) => {
    return value.replace(/\D/g, "");
  };

  const formatterCnpjToString = (value: string) => {
    return value.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  };

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div>
      <Typography variant="h3">INTEGRAÇÃO</Typography>
      <br />
      <StepsForm activeStep={2} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="overline" fontWeight="bold">
          Dados da empresa para integração
        </Typography>

        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="cnpjSolicitante"
              rules={{
                required: "Campo obrigátório",
                maxLength: 18,
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  label="CNPJ da empresa solicitante"
                  placeholder="CNPJ da empresa solicitante"
                  variant="outlined"
                  className="inputText"
                  inputProps={{ maxLength: 18 }}
                  onChange={({ target }) => {
                    const cnpjFormatted = formatterCnpjToNumber(target.value);
                    setValue("cnpjSolicitante", cnpjFormatted, {
                      shouldValidate: true,
                    });
                    field.onChange(cnpjFormatted);
                  }}
                  value={formatterCnpjToString(field.value)}
                  error={!!errors.cnpjSolicitante}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="razaoSocial"
              rules={{
                required: "Campo obrigátório",
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  label="Razão social empresa solicitante "
                  placeholder="Razão social empresa solicitante "
                  variant="outlined"
                  className="inputText"
                  onChange={field.onChange}
                  value={field.value}
                  error={!!errors.razaoSocial}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="emailAssociado"
              rules={{
                required: "Campo obrigátório",
                pattern: {
                  value: regexEmail,
                  message: "E-mail inválido",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  label="Email do associado"
                  placeholder="Email do associado"
                  variant="outlined"
                  className="inputText"
                  onChange={field.onChange}
                  value={field.value}
                  error={!!errors.emailAssociado}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="emailTecnico"
              rules={{
                required: "Campo obrigátório",
                pattern: {
                  value: regexEmail,
                  message: "E-mail inválido",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  label="Email do integrador técnico"
                  placeholder="Email do integrador técnico"
                  variant="outlined"
                  className="inputText"
                  onChange={field.onChange}
                  value={field.value}
                  error={!!errors.emailTecnico}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2} width="100%">
          <Button
            variant="outlined"
            type="button"
            disabled={isSubmitting}
            fullWidth
            onClick={() => goToPage("tarifas")}
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
            fullWidth
          >
            Proximo
          </Button>
        </Stack>
      </form>
      <DevTool control={control} placement="top-right" />
    </div>
  );
};

export default Integracao;
