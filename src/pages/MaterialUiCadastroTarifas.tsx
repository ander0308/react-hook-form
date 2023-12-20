import {
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { DevTool } from "@hookform/devtools";
import { useForm, Controller } from "react-hook-form";
import {
  TCadastroTarifasType,
  useFetchTarifas,
} from "../hooks/useFetchTarifas";

export type TCadastroTarifas = {
  permiteIbpj: boolean;
  permiteArquivo: boolean;
  respeitaSequenciaArquivo: boolean;
  tarifaAjusteAutomatico: boolean;
  numFloat: number;
  tarifaDiaDebito: number;
  tarifaTipoIndiceReajuste: string;

  // OS CAMOS ESTÃO SENDO RENDEDIRAZADOS DINAMICAMENTE.
  // tarifaContaCorrente: number;
  // tarifaContaOutrosBancos: number;
  // tarifaContaSalario: number;
};

// ESTOU DECLARANDO O VALOR DEFAULT DIRETO NO CONTROLLER
// const defaultValues: TCadastroTarifas = {
//   permiteIbpj: false,
//   permiteArquivo: false,
// };

const MaterialUiCadastroTarifas = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<TCadastroTarifas>({
    // defaultValues,
    mode: "onChange",
  });

  const [data, setData] = React.useState<TCadastroTarifasType>();

  const getDataFromAPI = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return await useFetchTarifas();
  };

  React.useEffect(() => {
    const loadData = async () => {
      const dataTarifas = await getDataFromAPI();
      setData(dataTarifas);
    };
    loadData();
  }, []);

  const handleOnSubimit = (values: TCadastroTarifas) => {
    console.log(values);
  };

  return (
    <>
      <Typography variant="h1" style={{ marginBottom: "24px" }}>
        Cadastro tarifa
      </Typography>
      <form onSubmit={handleSubmit(handleOnSubimit)}>
        <Controller
          control={control}
          name="permiteIbpj"
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch onChange={field.onChange} checked={field.value} />
              }
              label="Permite Internet Bank"
            />
          )}
        />

        <Controller
          control={control}
          name="permiteArquivo"
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch onChange={field.onChange} checked={field.value} />
              }
              label="Permite Arquivo"
            />
          )}
        />

        <Typography variant="h3" style={{ marginBottom: "24px" }}>
          Tarifas
        </Typography>
        {/* <Controller
          control={control}
          name="tarifaContaCorrente"
          rules={{
            required: "Campo Obrigatório",
          }}
          render={({ field, fieldState, formState }) => (
            <TextField
              {...field}
              id="outlined-basic"
              label="Conta corrente"
              placeholder="Conta corrente"
              variant="outlined"
              className="inputText"
              error={!!formState.errors.tarifaContaCorrente}
              helperText={fieldState.error?.message}
            />
          )}
        /> */}

        {data?.tarifas?.map((tarifa: any) => {
          const fieldName = `tarifas[${tarifa.codigo}].descricao`;
          return (
            <div key={tarifa.codigo} style={{ width: "100%" }}>
              <Controller
                control={control}
                name={fieldName}
                defaultValue=""
                rules={{
                  required: "Campo Obrigatório",
                  min: {
                    value: tarifa.valorMinimo,
                    message: `O Valor minimo ${tarifa.valorMinimo}`,
                  },
                  max: {
                    value: tarifa.valorMaximo,
                    message: `O Valor maximo ${tarifa.valorMaximo}`,
                  },
                }}
                render={({ field, fieldState, formState }) => (
                  <TextField
                    fullWidth
                    {...field}
                    id={`outlined-basic-${tarifa.codigo}`} // Use um ID único para cada campo
                    label={tarifa.descricao}
                    variant="outlined"
                    className="inputText"
                    value={field.value}
                    error={!!formState.errors[fieldName]}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </div>
          );
        })}
        <Button
          variant="contained"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          Avançar
        </Button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default MaterialUiCadastroTarifas;
