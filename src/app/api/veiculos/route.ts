import { NextResponse } from "next/server";
import { VeiculoRepositoryPrisma } from "@/repositories/veiculo-repository";
import { VeiculoService } from "@/services/veiculo-service";

const veiculoRepo = new VeiculoRepositoryPrisma();
const veiculoService = new VeiculoService(veiculoRepo);

export async function GET() {
  try {
    const dados = await veiculoService.listarTodos();
    return NextResponse.json(dados);
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const novoVeiculo = await veiculoService.cadastrar(body);
    return NextResponse.json(novoVeiculo, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}