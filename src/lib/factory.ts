import { VeiculoRepositoryPrisma } from "@/repositories/veiculo-repository";
import { ManutencaoRepositoryPrisma } from "@/repositories/ManutencaoRepository";
import { VeiculoService } from "@/services/veiculo-service";
import { ManutencaoService } from "@/services/ManutencaoService";

export class ServiceFactory {
  static getVeiculoService() {
    const repo = new VeiculoRepositoryPrisma()
    return new VeiculoService(repo);
  }

  static getManutencaoService() {
    const repo = new ManutencaoRepositoryPrisma();
    return new ManutencaoService(repo);
  }
}