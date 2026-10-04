# Contexto Técnico del Proyecto GestoWeb

## 1. Propósito del Sistema
GestoWeb es una plataforma web interactiva diseñada para reconocer 7 gestos de la mano en tiempo real utilizando MediaPipe directamente en el navegador del cliente. Permite la navegación, control y registro de acciones basadas en la interacción gestual del usuario.

## 2. Arquitectura Hexagonal (Ports & Adapters)
El proyecto mantiene una separación estricta de capas para garantizar la testabilidad, mantenibilidad y desacoplamiento tecnológico:
- **Dominio:** Contiene las entidades de negocio puras, objetos de valor y reglas de negocio invariables (ej. entidades de usuario, gesto, acción, detección).
- **Aplicación:** Contiene los casos de uso del sistema y los puertos de entrada (interfaces de controladores/servicios) y salida (interfaces de persistencia o repositorios).
- **Infraestructura:** Contiene los adaptadores externos concretos (frameworks web como Express, conexión a PostgreSQL, librerías de cliente como MediaPipe, adaptadores HTTP, seguridad).

## 3. Base de Datos (PostgreSQL)
El esquema relacional consta de 8 tablas principales optimizadas para la gestión y analítica del sistema:
1. `roles`: Roles de usuario en el sistema.
2. `usuarios`: Información de usuarios autenticados.
3. `acciones`: Acciones del sistema ejecutables por gestos.
4. `gestos`: Definición de los 7 gestos reconocidos.
5. `asignaciones`: Relación entre gestos y acciones configuradas por usuario o sistema.
6. `sesiones_reconocimiento`: Registro temporal o persistente de sesiones de uso del sistema de gestos.
7. `detecciones`: Historial detallado de gestos detectados en tiempo real.
8. `bitacora`: Registro de auditoría y eventos del sistema.

## 4. Regla de Oro Arquitectónica
> **El núcleo del sistema (Dominio y Aplicación) NUNCA depende de Express, PostgreSQL ni MediaPipe.** 
> 
> Todo framework o librería externa (Express, pg, MediaPipe, etc.) se considera un detalle de infraestructura y se conecta exclusivamente a través de Puertos y Adaptadores.
