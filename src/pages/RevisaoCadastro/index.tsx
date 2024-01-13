import React from "react";

import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import StepsForm from "../../components/Steps";
import { useStorage } from "../../hooks/useStorage";
import { TPage, TValuesStorage } from "../../types/formTypes";
import { clearStorage } from "../../uteis/functions";
import { styleList, styleListItemTextRight } from "./styles";

const RevisaoCadastro = () => {
  const navigate = useNavigate();

  const [data, setData] = React.useState<TValuesStorage>();
  const { objStorage, dataStorage } = useStorage();

  function goToPage(page: TPage) {
    navigate(`./../${page}`);
  }

  React.useEffect(() => {
    if (objStorage) {
      setData(dataStorage);
    }
  }, []);

  const cnpjFormatted = data?.cnpjSolicitante.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );

  return (
    <>
      <Typography variant="h3" display="block" textAlign="center">
        REVISAO CADASTRO
      </Typography>
      <br />
      <StepsForm activeStep={3} />
      <List sx={styleList} aria-label="mailbox folders">
        <ListItem>
          <ListItemText secondary="CNPJ do solicitante" />
          <ListItemText primary={cnpjFormatted} sx={styleListItemTextRight} />
        </ListItem>
        <Divider component="li" light />
        <ListItem>
          <ListItemText secondary="Razão social do solicitante" />
          <ListItemText
            primary={data?.razaoSocial}
            sx={styleListItemTextRight}
          />
        </ListItem>
        <Divider component="li" light />
        <ListItem>
          <ListItemText secondary="E-mail do associado" />
          <ListItemText
            primary={data?.emailAssociado}
            sx={styleListItemTextRight}
          />
        </ListItem>
        <Divider component="li" light />
        <ListItem>
          <ListItemText secondary="E-mail integrador técnico" />
          <ListItemText
            primary={data?.emailTecnico}
            sx={styleListItemTextRight}
          />
        </ListItem>
        <Divider component="li" light />
        <Stack direction="row" spacing={2} width="100%" marginTop={2}>
          <Button variant="outlined" onClick={() => goToPage("integracao")}>
            Voltar
          </Button>
          <Button variant="outlined" onClick={() => clearStorage()}>
            Limpar
          </Button>
          <Button variant="contained" type="button">
            Cadastrar
          </Button>
        </Stack>
      </List>
    </>
  );
};

export default RevisaoCadastro;
