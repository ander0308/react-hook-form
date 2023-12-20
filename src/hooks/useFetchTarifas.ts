import axios from "axios";

export type TCadastroTarifasType = {
  permiteIbpj: boolean;
  permiteArquivo: boolean;
  respeitaSequenciaArquivo: boolean;
  tarifaAjusteAutomatico: boolean;
  numFloat: {
    padrao: number;
    opcoes: number[];
  };
  tarifaDiaDebito: {
    padrao: number;
    valorMinimo: number;
    valorMaximo: number;
  };
  tarifaTipoIndiceReajuste: {
    padrao: string;
    opcoes: string[];
  };
  tarifas: {
    codigo: number;
    descricao: string;
    padrao: number;
    valorMinimo: number;
    valorMaximo: number;
  };
};

export const useFetchTarifas = async () => {
  try {
    const response = await axios.get<TCadastroTarifasType>(
      "http://localhost:4403/data-tarifas"
    );
    // console.log("hook", response.data);
    return response.data;
  } catch (error) {
    console.error("Houve um problema ao buscar os dados: ", error);
    throw error;
  }
};
