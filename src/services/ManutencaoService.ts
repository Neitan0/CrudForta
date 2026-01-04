// src/services/ManutencaoService.ts
import { Manutencao } from "@prisma/client";
import { IManutencaoProtocol } from "../app/interfaces/IManutencaoProtocol";

export class ManutencaoService {
  constructor(private repo: IManutencaoProtocol) {}

  async registrar(dados: Omit<Manutencao, "id"> & { dataInicial: string, dataFinal?: string | null }) {
    let tipoProcessado = dados.tipo;

    if (dados.valor > 5000) {
      tipoProcessado = `${dados.tipo} - custo elevado`;
    }

    return await this.repo.create({
      ...dados,
      tipo: tipoProcessado,
      dataInicial: new Date(dados.dataInicial),
      dataFinal: dados.dataFinal ? new Date(dados.dataFinal) : null,
    });
  }

  async findByVeiculo(veiculoId: string) {
    if (!veiculoId) throw new Error("ID do veículo é obrigatório");
    return await this.repo.findByVeiculo(veiculoId);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findMany(): Promise<Manutencao[]> {
    return await this.repo.findMany();
  }

async update(id: string, data: Partial<Omit<Manutencao, 'id'>>): Promise<Manutencao> {
  
  const tipoBase = data.tipo?.replace(' - custo elevado', '') || '';

  let tipoAtualizado = tipoBase;
  if (data.valor && data.valor > 5000) {
    tipoAtualizado = `${tipoBase} - custo elevado`;
  } else {
    tipoAtualizado = tipoBase;
  }
  const updated = await this.repo.update(id, { 
    ...data, 
    tipo: tipoAtualizado 
  });
  
  return updated;
}
}