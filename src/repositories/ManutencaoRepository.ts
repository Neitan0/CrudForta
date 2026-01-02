import { prisma } from "@/lib/prisma";
import { Manutencao } from "@prisma/client";
import { IManutencaoProtocol } from "../app/interfaces/IManutencaoProtocol";

export class ManutencaoRepositoryPrisma implements IManutencaoProtocol {
  async create(data: Omit<Manutencao, "id">): Promise<Manutencao> {
    return await prisma.manutencao.create({
      data: data
    });
  }

  async findByVeiculo(veiculoId: string): Promise<Manutencao[]> {
    return await prisma.manutencao.findMany({
      where: { veiculoId }
    });
  }
}