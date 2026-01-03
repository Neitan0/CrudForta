import { Manutencao } from "@prisma/client";

export interface IManutencaoProtocol {
  create(data: Omit<Manutencao, "id">): Promise<Manutencao>;
  findByVeiculo(veiculoId: string): Promise<Manutencao[]>;
  delete(id: string): Promise<void>;
  findMany(): Promise<Manutencao[]>;
  update(id: string, data: Partial<Omit<Manutencao, 'id'>>): Promise<Manutencao>;
}
