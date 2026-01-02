import { Veiculo } from "@prisma/client"; // Importe o tipo aqui!
import { IVeiculoCrudProtocol } from "../app/interfaces/IVeiculoCrudProtocol";

export class VeiculoService {
  constructor(private veiculoRepo: IVeiculoCrudProtocol) {}

  async listarTodos(): Promise<Veiculo[]> {
    return await this.veiculoRepo.findAll();
  }

  async cadastrar(dados: Omit<Veiculo, "id" | "createdAt">): Promise<Veiculo> {
    const existe = await this.veiculoRepo.findByPlaca(dados.placa);
    
    if (existe) {
      throw new Error("Já existe um veículo cadastrado com esta placa.");
    }

    const dadosFormatados = {
      ...dados,
      placa: dados.placa.toUpperCase()
    };

    return await this.veiculoRepo.create(dadosFormatados);
  }
}