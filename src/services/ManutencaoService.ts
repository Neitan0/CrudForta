// src/services/ManutencaoService.ts
import { Manutencao } from "@prisma/client";
import { IManutencaoProtocol } from "../app/interfaces/IManutencaoProtocol";

export class ManutencaoService {
  constructor(private repo: IManutencaoProtocol) {}

  // Tipamos a entrada (as datas vêm como string do JSON)
  async registrar(dados: Omit<Manutencao, "id"> & { dataInicial: string, dataFinal?: string | null }) {
    let tipoProcessado = dados.tipo;

    if (dados.valor > 5000) {
      tipoProcessado = `${dados.tipo} - custo elevado`;
    }

    // Agora passamos para o repo exatamente o que o Omit<Manutencao, "id"> espera
    return await this.repo.create({
      ...dados,
      tipo: tipoProcessado,
      dataInicial: new Date(dados.dataInicial),
      dataFinal: dados.dataFinal ? new Date(dados.dataFinal) : null,
    });
  }
}