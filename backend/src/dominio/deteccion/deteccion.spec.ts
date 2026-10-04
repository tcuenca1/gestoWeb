import { Deteccion } from './deteccion.entity';
import { Usuario } from '../usuario/usuario.entity';
import { Gesto } from '../gesto/gesto.entity';

describe('Dominio - Entidades y Reglas de Negocio', () => {
  describe('Deteccion', () => {
    it('debe crearse correctamente cuando la confianza está entre 0 y 1', () => {
      const deteccion = new Deteccion('1', 'user-1', 'gesto-1', 0.85, new Date());
      expect(deteccion.confianza).toBe(0.85);
    });

    it('debe lanzar un error si la confianza es menor a 0', () => {
      expect(() => {
        new Deteccion('1', 'user-1', 'gesto-1', -0.1, new Date());
      }).toThrow('La confianza debe ser un valor entre 0 y 1.');
    });

    it('debe lanzar un error si la confianza es mayor a 1', () => {
      expect(() => {
        new Deteccion('1', 'user-1', 'gesto-1', 1.05, new Date());
      }).toThrow('La confianza debe ser un valor entre 0 y 1.');
    });
  });

  describe('Usuario', () => {
    it('debe crearse correctamente con todos los atributos obligatorios', () => {
      const usuario = new Usuario('u-1', 'Juan Pérez', 'juan@test.com', 'hash123', 'rol-1');
      expect(usuario.nombre).toBe('Juan Pérez');
    });

    it('debe lanzar error si falta algún atributo obligatorio', () => {
      expect(() => {
        new Usuario('', 'Juan Pérez', 'juan@test.com', 'hash123', 'rol-1');
      }).toThrow('Todos los atributos del Usuario son obligatorios.');
    });
  });

  describe('Gesto', () => {
    it('debe crearse correctamente con id y nombre', () => {
      const gesto = new Gesto('g-1', 'Pulgar Arriba', 'Gesto de aprobación');
      expect(gesto.nombre).toBe('Pulgar Arriba');
    });

    it('debe lanzar error si falta id o nombre', () => {
      expect(() => {
        new Gesto('', 'Pulgar Arriba', 'Gesto de aprobación');
      }).toThrow('El ID y el nombre del Gesto son obligatorios.');
    });
  });
});
