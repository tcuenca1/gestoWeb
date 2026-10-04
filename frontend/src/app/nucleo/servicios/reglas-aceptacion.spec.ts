import { ReglasAceptacionService } from './reglas-aceptacion.service';

describe('Reglas de Aceptación - Frontend (MediaPipe / Interacción)', () => {
  let servicio: ReglasAceptacionService;

  beforeEach(() => {
    // Instanciar con valores estándar: 70% confianza, 500ms estabilidad, 1000ms pausa
    servicio = new ReglasAceptacionService(0.7, 500, 1000);
  });

  it('debe rechazar un gesto si su confianza es menor al umbral del 70%', () => {
    const resultado = servicio.evaluarGesto('Pulgar Arriba', 0.65, 1000);
    expect(resultado.aceptado).toBe(false);
    expect(resultado.razon).toContain('Confianza menor al umbral');
  });

  it('debe rechazar un gesto si no ha estado estable durante al menos 0.5 segundos', () => {
    // T = 1000ms: Primer frame del gesto (se inicia la estabilidad)
    const res1 = servicio.evaluarGesto('Pulgar Arriba', 0.85, 1000);
    expect(res1.aceptado).toBe(false);

    // T = 1300ms (300ms transcurridos, menor a 500ms)
    const res2 = servicio.evaluarGesto('Pulgar Arriba', 0.85, 1300);
    expect(res2.aceptado).toBe(false);
    expect(res2.razon).toContain('Estabilidad menor a 0.5 segundos');
  });

  it('debe aceptar el gesto si supera la confianza y se mantiene estable por 500ms o más', () => {
    // T = 1000ms: Inicio de estabilidad
    servicio.evaluarGesto('Pulgar Arriba', 0.90, 1000);

    // T = 1600ms (600ms transcurridos, mayor a 500ms)
    const resultado = servicio.evaluarGesto('Pulgar Arriba', 0.90, 1600);
    expect(resultado.aceptado).toBe(true);
  });

  it('debe exigir una pausa obligatoria de 1 segundo entre acciones ejecutadas', () => {
    // Primera ejecución exitosa en T = 1000ms -> se estabiliza hasta 1500ms
    servicio.evaluarGesto('Pulgar Arriba', 0.90, 1000);
    const ejecucion1 = servicio.evaluarGesto('Pulgar Arriba', 0.90, 1600);
    expect(ejecucion1.aceptado).toBe(true);

    // Intentar realizar otra acción en T = 2000ms (sólo 400ms después de la última acción, menor a la pausa de 1000ms)
    servicio.evaluarGesto('Mano Abierta', 0.95, 2000);
    const intentoRapido = servicio.evaluarGesto('Mano Abierta', 0.95, 2400);
    expect(intentoRapido.aceptado).toBe(false);
    expect(intentoRapido.razon).toContain('Pausa obligatoria entre acciones');

    // Esperar a que pase la pausa (T = 2600ms, 1000ms después de la acción en 1600ms)
    // Primero inicia estabilización en 2600ms y se confirma en 3200ms
    servicio.evaluarGesto('Mano Abierta', 0.95, 2600);
    const ejecucion2 = servicio.evaluarGesto('Mano Abierta', 0.95, 3200);
    expect(ejecucion2.aceptado).toBe(true);
  });
});
