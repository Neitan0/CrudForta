import { Manutencao } from "@prisma/client";

export interface IManutencaoProtocol {
  create(data: Omit<Manutencao, "id">): Promise<Manutencao>;
  findByVeiculo(veiculoId: string): Promise<Manutencao[]>;
}
