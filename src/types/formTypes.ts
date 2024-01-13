export type TLimites = {
  limitePixDiario: number;
  limitePixTransacao: number;
  limiteBoletoDiario: number;
  limiteBoletoTransacao: number;
  limiteCodBarrasDiario: number;
  limiteCodBarrasTransacao: number;
};

export type TTarifas = {
  tarifaPix: number;
  tarifaBoleto: number;
  tarifaCodBarras: number;
};

export type TIntegracao = {
  cnpjSolicitante: string;
  razaoSocial: string;
  emailAssociado: string;
  emailTecnico: string;
};

export type TPage = "limites" | "tarifas" | "integracao" | "cadastro-revisao";

export type TValuesStorage = {
  limiteBoletoDiario: number;
  limiteBoletoTransacao: number;
  limiteCodBarrasDiario: number;
  limiteCodBarrasTransacao: number;
  limitePixDiario: number;
  limitePixTransacao: number;
  tarifaBoleto: number;
  tarifaCodBarras: number;
  tarifaPix: number;
  cnpjSolicitante: string;
  razaoSocial: string;
  emailAssociado: string;
  emailTecnico: string;
};
