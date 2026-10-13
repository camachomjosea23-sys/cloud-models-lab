# Cloud Models Lab

Este es mi Laboratorio práctico de aprendizaje sobre modelos de servicios en la nube: **IaaS, PaaS y SaaS**, como complemento al curso *Introduction to Cloud Computing* de IBM en Coursera.

# Mi objetivo

Construir y ejecutar un pequeño servidor HTTP, probar sus respuestas, resolver un conflicto de puertos y posteriormente desplegarlo en la nube.

El propósito es comprender qué responsabilidades asume el desarrollador y cuáles administra el proveedor en cada modelo.

## Cual es el estado actual?

**Etapa local completada. Despliegue cloud pendiente.**

Hasta ahora, el laboratorio incluye:

- Servidor HTTP desarrollado con JavaScript y Node.js.
- Ruta de información general de la aplicación.
- Ruta de consulta del estado del servicio.
- Respuestas HTTP `200` y `404`.
- Registro de peticiones en la terminal.
- Configuración del puerto mediante una variable de entorno.
- Ejecución de dos procesos en puertos diferentes.

## Las tecnologias que usé fueron:

- JavaScript.
- Node.js y su módulo integrado `node:http`.
- npm.
- Git.
- Visual Studio Code.
- PowerShell.


## Archivos del proyecto

| Archivo | Función |
|---|---|
| `server.js` | Implementa el servidor y sus rutas. |
| `package.json` | Contiene la configuración del proyecto y el comando de inicio. |
| `.gitignore` | Indica archivos y carpetas que Git debe ignorar. |
| `README.md` | Documenta el laboratorio y sus resultados. |

## Ejecución local

Es necesario tener Node.js y npm instalados.

Desde una terminal ubicada en la carpeta del proyecto, ejecutar:

```bash
npm start
```

Si no se ha definido la variable de entorno `PORT`, el servidor utiliza el puerto `3000`.

Abrir en el navegador:

```text
http://localhost:3000/
```

Para detener el servidor, presionar `Ctrl + C` en su terminal.

El comando de inicio no recarga automáticamente los cambios del código. Después de editar `server.js`, es necesario guardar el archivo y reiniciar el proceso.

## Rutas disponibles

| Ruta | Código HTTP | Respuesta |
|---|---|---|
| `/` | `200 OK` | Nombre de la aplicación, ambiente y versión. |
| `/health` | `200 OK` | Estado del servicio y segundos de ejecución del proceso. |
| Ruta no definida | `404 Not Found` | Mensaje de ruta no encontrada. |

Ejemplo de respuesta de `/health`:

```json
{
  "status": "ok",
  "uptimeSeconds": 42
}
```

El valor de `uptimeSeconds` cambia con el tiempo y se reinicia al iniciar un nuevo proceso.

## Mis pruebas realizadas 

| Prueba | Resultado observado |
|---|---|
| Consultar `/health` | Respondió con estado `ok` y código HTTP `200`. |
| Recargar `/health` | Aumentó el tiempo de ejecución y se registró otra petición `GET`. |
| Consultar `/no-existe` | Respondió con código HTTP `404`. |
| Iniciar un segundo servidor en el puerto ocupado | Se produjo el error `EADDRINUSE`. |
| Ejecutar el segundo servidor en el puerto `4000` | Ambos servidores respondieron de manera independiente. |

Los códigos HTTP se comprobaron en las herramientas de desarrollador del navegador, dentro de **Network → Headers → General**.

## Incidencia: puerto ocupado

Al ejecutar `npm start` en una segunda terminal mientras el primer servidor seguía funcionando, apareció el error:

```text
EADDRINUSE
```

La causa fue que el segundo proceso intentó escuchar en la misma dirección y puerto que el primero.

Para resolverlo, configuré otro puerto en la segunda terminal de PowerShell:

```powershell
$env:PORT="4000"
npm start
```

El código obtiene el puerto mediante:

```javascript
const port = Number(process.env.PORT || 3000);
```

Esto permitió ejecutar el mismo código en dos procesos independientes:

- `http://localhost:3000/health`
- `http://localhost:4000/health`

La variable quedó configurada en esa sesión de PowerShell. Para eliminarla y volver al puerto predeterminado, después de detener el segundo servidor:

```powershell
Remove-Item Env:PORT
```

## Y con tod esto, aqui mis aprendizajes:

- Cada recarga del navegador genera una nueva petición al servidor.
- Los logs permiten observar el método HTTP y la ruta solicitada.
- Un código `404` indica que el servidor respondió, pero no encontró la ruta.
- Las variables de entorno permiten cambiar la configuración sin editar el código.
- Dos procesos pueden ejecutar la misma aplicación en puertos diferentes.
- Guardar un archivo no actualiza por sí solo un proceso de Node.js que ya está ejecutándose.

## Que relacion tiene con cloud?

| Modelo | Relación con el laboratorio |
|---|---|
| IaaS | La ejecución local permite practicar procesos, puertos y configuración, que también serían parte del trabajo en una máquina virtual. No constituye un despliegue IaaS real. |
| PaaS | La siguiente etapa consiste en desplegar la aplicación en Render y observar qué administra la plataforma. |
| SaaS | Se utilizará GitHub Issues para documentar la incidencia y su solución mediante una aplicación administrada por un proveedor. |

## Limitaciones

- La aplicación se ha probado localmente; todavía no está desplegada en la nube.
- No utiliza base de datos ni almacenamiento persistente.
- No implementa autenticación.
- `/health` comprueba que el proceso responde, pero no verifica servicios externos.
- Es un ejercicio educativo, no una aplicación preparada para producción.

