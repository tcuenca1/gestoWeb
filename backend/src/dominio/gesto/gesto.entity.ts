export class Gesto {
  constructor(
    public readonly id: string,
    public readonly nombre: string,
    public readonly descripcion: string
  ) {
    if (!id || !nombre) {
      throw new Error('El ID y el nombre del Gesto son obligatorios.');
    }
  }
}
