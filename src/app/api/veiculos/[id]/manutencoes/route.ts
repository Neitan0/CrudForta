import { NextResponse } from "next/server";
import { ServiceFactory } from "@/lib/factory";


const service = ServiceFactory.getManutencaoService();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const manutencoes = await service.findByVeiculo(id);
    return NextResponse.json(manutencoes);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar manutenções" }, { status: 400 });
  }
}