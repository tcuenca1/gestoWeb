export class Usuario {
  constructor(
    public readonly id: string,
    public readonly nombre: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly rolId: string
  ) {
    if (!id || !nombre || !email || !passwordHash || !rolId) {
      throw new Error('Todos los atributos del Usuario son obligatorios.');
    }
  }
}
