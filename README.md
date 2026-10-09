# Tienda de Videojuegos "William Wallace" — Actividad Sumativa 3

Actividad Sumativa 3 de la semana 8, "Mejorando funcionalidades clave en el eCommerce con React", del curso Frontend I. Corresponde a la implementación de React, mediante Vite, en el proyecto de desarrollo de página web para la tienda de videojuegos, con la cual venimos trabajando desde el comienzo del bimestre. 


## Características principales

- Catálogo de productos (consolas retro, juegos, accesorios y merchandising) cargado dinámicamente desde un archivo JSON local mediante la Fetch API.
- Carrito de compras funcional: agregar, quitar y vaciar productos, con cálculo de total en pesos chilenos.
- Buscador de productos integrado en el navbar, con filtrado en tiempo real y deep-linking vía query params (`?busqueda=`).
- Navegación por anclas a las distintas categorías del catálogo desde el menú desplegable "Productos".
- Estados de carga (skeleton), error (con reintento) y vacío manejados con renderizado condicional.
- Diseño responsive heredado del sitio original, con un panel de carrito fijo (`sticky`) en pantallas grandes.
- Integración de Bootstrap 5 (navbar, dropdown, carrusel) como dependencia de npm, sin depender de un CDN externo.

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| [React 19](https://react.dev/) | Librería principal de UI (componentes, hooks) |
| [Vite 8](https://vite.dev/) | Bundler y servidor de desarrollo |
| [React Router 7](https://reactrouter.com/) | Enrutamiento de la SPA (`/`, `/nosotros`, `/productos`, `/contacto`) |
| [Bootstrap 5](https://getbootstrap.com/) | Sistema de grillas y componentes de UI (navbar, dropdown, carrusel) |
| [ESLint 10](https://eslint.org/) | Linting con reglas de React Hooks y React Refresh |
| CSS plano | Estilos propios de la tienda (`src/styles.css`), sin preprocesadores |

## Estructura del proyecto

```
semana_8/
├── public/
│   ├── data/productos.json     # Catálogo de productos (fuente de datos simulada)
│   └── images/                  # Imágenes de productos y logo de la tienda
├── src/
│   ├── components/              # Componentes reutilizables
│   │   ├── CardSkeleton.jsx     # Placeholder animado mientras carga el catálogo
│   │   ├── Footer.jsx
│   │   ├── Header.jsx           # Navbar + buscador + dropdown de categorías
│   │   ├── ProductCard.jsx      # Tarjeta de producto (vista "home" y "catálogo")
│   │   └── Toast.jsx            # Aviso flotante al agregar un producto
│   ├── hooks/
│   │   └── useProductos.js      # Hook de carga del catálogo (fetch + estados)
│   ├── pages/                   # Una página por ruta
│   │   ├── Inicio.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Productos.jsx
│   │   └── Contacto.jsx
│   ├── App.jsx                  # Layout raíz + definición de rutas
│   ├── main.jsx                 # Punto de entrada (ReactDOM + BrowserRouter)
│   ├── styles.css                # Estilos globales de la tienda
│   ├── index.css                 # Reset mínimo
│   └── titles.js                 # Mapa de títulos por ruta (<title> y <h1>)
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- npm 9 o superior (incluido con Node.js)

## Instalación

```bash
# 1. Clonar o descargar el proyecto y entrar a la carpeta
cd semana_8

# 2. Instalar dependencias
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

Por defecto, Vite expone la aplicación en `http://localhost:5173/` (o el siguiente puerto libre si ese ya está en uso).

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Genera el build de producción en `dist/` |
| `npm run preview` | Sirve localmente el build de producción para verificarlo |
| `npm run lint` | Ejecuta ESLint sobre todo el proyecto |

## Rutas de la aplicación

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Inicio | Carrusel, presentación de la tienda y catálogo destacado |
| `/nosotros` | Nosotros | Historia de la tienda |
| `/productos` | Productos | Catálogo completo por categoría, búsqueda y carrito de compras |
| `/contacto` | Contacto | Canales de contacto |

## Funcionalidades clave

**Carga del catálogo (`useProductos`)**: hace `fetch` a `public/data/productos.json`, simulando una fuente de datos externa, y expone `productos`, `cargando`, `error` y `recargar()` para manejar los tres estados posibles de la UI (cargando, error, listo).

**Carrito de compras (`Productos.jsx`)**: estado local (`useState`) con los productos agregados; cada `ProductCard` recibe si su producto ya está en el carrito (`enCarrito`) para alternar entre los botones **"Agregar al carrito"** y **"En el carrito ✓"**.

**Búsqueda**: el formulario del navbar redirige a `/productos?busqueda=texto` desde cualquier página; en `/productos` el filtrado ocurre en el cliente sobre el catálogo ya cargado.


