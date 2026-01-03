import { prisma } from "@/lib/prisma";
import { IVeiculoCrudProtocol } from "../app/interfaces/IVeiculoCrudProtocol";
import { Veiculo } from "@prisma/client";


export class VeiculoRepositoryPrisma implements IVeiculoCrudProtocol {

  async update(id: string, data: Partial<Omit<Veiculo, "id">>): Promise<Veiculo> {
    return await prisma.veiculo.update({
      where: { id },
      data
    });
  }
  async delete(id: string): Promise<void> {
     await prisma.veiculo.delete({
      where: { id }
    });
  }

  async create(data: any) {
    return await prisma.veiculo.create({ data });
  }

  async findAll() {
    return await prisma.veiculo.findMany({
      orderBy: { createdAt: "desc" }
    });
  }

  async findByPlaca(placa: string) {
    return await prisma.veiculo.findUnique({ where: { placa } });
  }
}

export type { IVeiculoCrudProtocol };
