import { prisma } from "@/lib/prisma";
import { Manutencao } from "@prisma/client";
import { IManutencaoProtocol } from "../app/interfaces/IManutencaoProtocol";

export class ManutencaoRepositoryPrisma implements IManutencaoProtocol {
  async findMany(): Promise<Manutencao[]> {
    return await prisma.manutencao.findMany({
      include: {
        veiculo: true
      },
      orderBy: {
        dataInicial: 'desc'
      }
    });
  }
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

  async delete(id: string): Promise<void> {
    await prisma.manutencao.delete({
      where: { id }
    });
  }

  async update(id: string, data: any): Promise<Manutencao> {
    const updateData: any = {};

    if (data.descricao) updateData.descricao = data.descricao;
    if (data.valor) updateData.valor = Number(data.valor);
    if (data.tipo) updateData.tipo = data.tipo;
    if (data.dataInicial) updateData.dataInicial = new Date(data.dataInicial);

    return await prisma.manutencao.update({
      where: { id },
      data: updateData
    });
  }
}