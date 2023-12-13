import { Box, Button, Typography } from "@mui/material";
import { UserContext } from "../context/UserContext";
import React from "react";
import { useNavigate } from "react-router-dom";

const MaterialUiFormRevisao = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState("");

  const dataCtx = React.useContext(UserContext);

  React.useEffect(() => {
    const dataStorage = sessionStorage.getItem("form_values_storage");

    if (dataStorage) {
      setData(dataStorage);
    } else {
      setData(JSON.stringify(dataCtx, null, 2));
    }
  }, []);

  return (
    <>
      <Typography variant="h2">Revisão</Typography>
      <br />
      <Box>
        <pre>{data}</pre>
      </Box>
      <Button variant="outlined" onClick={() => navigate("/app2/form")}>
        Voltar
      </Button>
    </>
  );
};

export default MaterialUiFormRevisao;
