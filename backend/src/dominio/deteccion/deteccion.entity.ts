export class Deteccion {
  constructor(
    public readonly id: string,
    public readonly usuarioId: string,
    public readonly gestoId: string,
    public readonly confianza: number,
    public readonly timestamp: Date
  ) {
    if (confianza < 0 || confianza > 1) {
      throw new Error('La confianza debe ser un valor entre 0 y 1.');
    }
  }
}
