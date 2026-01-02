import { Veiculo } from "@prisma/client";

export interface IVeiculoCrudProtocol {
  create(data: Omit<Veiculo, "id" | "createdAt">): Promise<Veiculo>;
  findAll(): Promise<Veiculo[]>;
  findByPlaca(placa: string): Promise<Veiculo | null>;
  delete(id: string): Promise<Veiculo>;
}
