import { prisma } from "@/lib/prisma";
import { IVeiculoCrudProtocol } from "../app/interfaces/IVeiculoCrudProtocol";
import { Veiculo } from "@prisma/client";


export class VeiculoRepositoryPrisma implements IVeiculoCrudProtocol {
  delete(id: string): Promise<Veiculo> {
      throw new Error("Method not implemented.");
  }
  async create(data: any) {
    return await prisma.veiculo.create({ data });
  }

  async findAll() {
    return await prisma.veiculo.findMany();
  }

  async findByPlaca(placa: string) {
    return await prisma.veiculo.findUnique({ where: { placa } });
  }
}

export type { IVeiculoCrudProtocol };
