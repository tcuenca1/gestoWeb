export class ReglasAceptacionService {
  private umbralConfianza: number = 0.7; // 70%
  private tiempoEstabilidadMs: number = 500; // 0.5 segundos
  private pausaEntreAccionesMs: number = 1000; // 1 segundo

  private gestoActual: string | null = null;
  private inicioEstabilidad: number = 0;
  private ultimaAccionEjecutada: number = 0;

  constructor(umbral?: number, estabilidad?: number, pausa?: number) {
    if (umbral !== undefined) this.umbralConfianza = umbral;
    if (estabilidad !== undefined) this.tiempoEstabilidadMs = estabilidad;
    if (pausa !== undefined) this.pausaEntreAccionesMs = pausa;
  }

  public evaluarGesto(
    gesto: string,
    confianza: number,
    tiempoActualMs: number
  ): { aceptado: boolean; razon?: string } {
    // 1. Validar confianza mínima (70%)
    if (confianza < this.umbralConfianza) {
      this.reiniciarEstabilidad();
      return { aceptado: false, razon: 'Confianza menor al umbral del 70%' };
    }

    // 2. Validar pausa obligatoria entre acciones (1 segundo)
    if (tiempoActualMs - this.ultimaAccionEjecutada < this.pausaEntreAccionesMs) {
      return { aceptado: false, razon: 'Pausa obligatoria entre acciones no cumplida' };
    }

    // 3. Validar estabilidad temporal del gesto (0.5 segundos)
    if (this.gestoActual !== gesto) {
      this.gestoActual = gesto;
      this.inicioEstabilidad = tiempoActualMs;
      return { aceptado: false, razon: 'Gesto en proceso de estabilización' };
    }

    const tiempoTranscurrido = tiempoActualMs - this.inicioEstabilidad;
    if (tiempoTranscurrido < this.tiempoEstabilidadMs) {
      return { aceptado: false, razon: 'Estabilidad menor a 0.5 segundos' };
    }

    // ¡Gesto aceptado! Actualizar última ejecución
    this.ultimaAccionEjecutada = tiempoActualMs;
    this.reiniciarEstabilidad();
    return { aceptado: true };
  }

  private reiniciarEstabilidad() {
    this.gestoActual = null;
    this.inicioEstabilidad = 0;
  }
}
