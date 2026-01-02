import { NextResponse } from "next/server";
import { ManutencaoRepositoryPrisma } from "@/repositories/ManutencaoRepository";
import { ManutencaoService } from "@/services/ManutencaoService";

const repo = new ManutencaoRepositoryPrisma();
const service = new ManutencaoService(repo);

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Usando o método que você já definiu no repositório!
    const manutencoes = await repo.findByVeiculo(params.id);
    return NextResponse.json(manutencoes);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar manutenções" }, { status: 400 });
  }
}