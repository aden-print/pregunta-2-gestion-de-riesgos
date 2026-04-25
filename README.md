# Servidor de Phishing Educativo

**DISCLAIMER:** Este proyecto es estrictamente para fines educativos y de concientización sobre seguridad informática. **NO** debe ser utilizado para actividades maliciosas o ilegales. El autor no se hace responsable del mal uso de este código.

## ¿Qué es este proyecto?

Este proyecto es una demostración simple de cómo funciona un ataque de phishing. Consiste en un servidor web básico creado con Node.js y Express que simula una página de inicio de sesión falsa para capturar credenciales (email y contraseña).

Cuando un usuario introduce sus datos en el formulario, estos son enviados al servidor, guardados en una base de datos SQLite y el usuario es redirigido a un sitio web real (en este caso, google.com).

## Propósito

El objetivo es entender la mecánica de un ataque de phishing para poder:
- Identificar posibles ataques.
- Comprender la importancia de la seguridad en el desarrollo de aplicaciones.
- Aprender a protegerse contra este tipo de amenazas.

## ¿Cómo funciona?

El proyecto se divide en dos partes principales:

### 1. Backend (`servidor.js`)

- Utiliza **Express** para crear un servidor web.
- Sirve los archivos estáticos (HTML, CSS) de la carpeta `public`.
- Define un endpoint `POST /api/login-falso` que:
    - Recibe el `email` y `password` del formulario.
    - Registra la dirección IP de la víctima.
    - Guarda toda la información en una base de datos **SQLite** (`registros_robados.db`).
    - Devuelve una respuesta JSON al frontend para indicarle a dónde redirigir al usuario.
- Muestra en la consola del servidor los datos capturados en tiempo real.

### 2. Frontend (`public/index.html` y `public/style.css`)

- Un archivo HTML simple que imita una página de inicio de sesión.
- Contiene un formulario que captura el email y la contraseña.
- Un poco de CSS para dar un estilo básico a la página.
- **(Funcionalidad JavaScript a añadir)**: Un script que intercepta el envío del formulario, envía los datos al endpoint `/api/login-falso` mediante `fetch`, y luego redirige al usuario a la URL que el servidor indique.

## Estructura del Proyecto

```
/
|-- servidor.js             # El servidor principal de Node.js y Express
|-- package.json            # Dependencias y configuración del proyecto
|-- registros_robados.db    # Base de datos donde se guardan las credenciales
|-- public/
|   |-- index.html          # La página de login falsa
|   |-- style.css           # Estilos para la página de login
|-- README.md               # Este archivo
```

## Cómo usar este proyecto

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```
2.  **Iniciar el servidor:**
    ```bash
    node servidor.js
    ```
3.  Abre tu navegador y ve a `http://localhost:3000`.
4.  Introduce cualquier dato en el formulario y haz clic en "Login".
5.  Serás redirigido a Google, y en la terminal donde iniciaste el servidor, verás las credenciales que introdujiste.
6.  Los datos también quedarán guardados en el archivo `registros_robados.db`. Puedes inspeccionarlo con cualquier visor de SQLite.

