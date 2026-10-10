# Tienda de Videojuegos "William Wallace"

Proyecto de EFT del curso Frontend I: El proyecto corresponde al desarrollo de una página web de una  tienda ficticia de videojuegos retro llamada "William Wallace", desarrollada con React y Vite. Continúa el trabajo de la Actividad Sumativa 3 (semana 8), "Mejorando funcionalidades clave en el eCommerce con React", e incorpora el filtrado del catálogo por categoría, la división de la aplicación en componentes que se comunican mediante props y un formulario de contacto.


## Características principales

- Catálogo de productos (consolas retro, juegos, accesorios y merchandising) cargado dinámicamente desde un archivo JSON local mediante la Fetch API y guardado en el estado de React.
- Filtro del catálogo por categoría (Todos, Consolas Retro, Juegos, Accesorios) mediante botones y, dentro de Juegos, por género mediante un menú desplegable.
- Menú desplegable "Productos" del navbar conectado al filtro: al elegir una categoría se abre el catálogo ya filtrado.
- Carrito de compras funcional: agregar, quitar y vaciar productos, con cálculo de total en pesos chilenos.
- Buscador de productos integrado en el navbar, con filtrado en tiempo real y deep-linking vía query params (`?busqueda=`).
- Formulario de contacto con validación de campos obligatorios y envío simulado.
- Estados de carga (skeleton), error (con reintento) y sin resultados (con botón "Quitar filtros") manejados con renderizado condicional.
- Diseño responsive: grilla de Bootstrap, filtro y formulario adaptados a celular, y panel de carrito fijo (`sticky`) en pantallas grandes.
- Integración de Bootstrap 5 (navbar, dropdown, carrusel) como dependencia de npm, sin depender de un CDN externo.

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| [React 19](https://react.dev/) | Librería principal de UI (componentes, hooks, props y estado) |
| [Vite 8](https://vite.dev/) | Bundler y servidor de desarrollo |
| [React Router 7](https://reactrouter.com/) | Enrutamiento de la SPA (`/`, `/nosotros`, `/productos`, `/contacto`) |
| [Bootstrap 5](https://getbootstrap.com/) | Sistema de grillas y componentes de UI (navbar, dropdown, carrusel) |
| [ESLint 10](https://eslint.org/) | Linting con reglas de React Hooks y React Refresh |
| CSS plano | Estilos propios de la tienda (`src/styles.css`), sin preprocesadores |

## Estructura del proyecto

```
EFT/
├── public/
│   ├── data/productos.json      # Catálogo de productos (fuente de datos simulada)
│   └── images/                  # Imágenes de productos y logo de la tienda
├── src/
│   ├── components/              # Componentes reutilizables
│   │   ├── CardSkeleton.jsx     # Placeholder animado mientras carga el catálogo
│   │   ├── ContactForm.jsx      # Formulario de contacto (envío simulado)
│   │   ├── FiltroCategorias.jsx # Botones de categoría y menú de género
│   │   ├── Footer.jsx
│   │   ├── Header.jsx           # Título de la página + Navbar
│   │   ├── ListaVideojuegos.jsx # Lista de productos agrupada por categoría
│   │   ├── Navbar.jsx           # Barra de navegación + buscador + dropdown de categorías
│   │   ├── ProductCard.jsx      # Tarjeta de producto (vista "home" y "catálogo")
│   │   └── Toast.jsx            # Aviso flotante al agregar un producto
│   ├── hooks/
│   │   └── useProductos.js      # Hook de carga del catálogo (fetch + estados)
│   ├── pages/                   # Una página por ruta
│   │   ├── Inicio.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Productos.jsx
│   │   └── Contacto.jsx
│   ├── App.jsx                  # Layout raíz, rutas y estado del filtro
│   ├── categorias.js            # Categorías del catálogo (compartidas por navbar, filtro y lista)
│   ├── main.jsx                 # Punto de entrada (ReactDOM + BrowserRouter + Bootstrap)
│   ├── styles.css               # Estilos globales de la tienda
│   ├── index.css                # Reset mínimo
│   └── titles.js                # Mapa de títulos por ruta (<title> y <h1>)
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## Requisitos previos

- [Node.js](https://nodejs.org/) 20.19 o superior (o 22.12 o superior), requerido por Vite 8 y ESLint 10
- npm 10 o superior (incluido con Node.js)

## Instalación

```bash
# 1. Clonar o descargar el proyecto y entrar a la carpeta
cd EFT

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
| `/productos` | Productos | Catálogo con filtro por categoría y género, búsqueda y carrito de compras |
| `/contacto` | Contacto | Formulario de contacto y canales de atención |

## Funcionalidades clave

**Carga del catálogo (`useProductos`)**: hace `fetch` a `public/data/productos.json`, simulando una fuente de datos externa, guarda los productos con `useState` y expone `productos`, `cargando`, `error` y `recargar()` para manejar los tres estados posibles de la UI (cargando, error, listo). Cada producto tiene una `categoria` (`consolas`, `juegos` o `accesorios`) y los juegos tienen además un `genero` (Acción, Aventura, RPG, etc.).

**Filtro por categoría y comunicación por props**: el estado del filtro (`categoria` y `genero`) vive en `App.jsx`, porque lo usan dos componentes hermanos: la barra de navegación y la página de productos. El flujo es el siguiente:

```
App (estado: categoria, genero)
├── Header → Navbar          recibe categoria + onCategoriaChange
└── Productos                recibe categoria, genero + onCategoriaChange, onGeneroChange
    ├── FiltroCategorias     recibe la selección actual y avisa los cambios
    └── ListaVideojuegos     recibe la lista ya filtrada y la muestra
```

Al pulsar un botón de `FiltroCategorias` o una opción del dropdown de `Navbar`, se llama a `onCategoriaChange`, se actualiza el estado en `App` y React vuelve a renderizar `ListaVideojuegos` con los productos filtrados. Al cambiar de categoría, el género vuelve a "Todos los géneros". La sección de merchandising no forma parte del JSON, por lo que solo se muestra con la categoría "Todos".

**Búsqueda**: el formulario del navbar redirige a `/productos?busqueda=texto` desde cualquier página y deja el filtro en "Todos", para que la búsqueda recorra todo el catálogo. En `/productos` la búsqueda se combina con el filtro de categoría y el filtrado ocurre en el cliente sobre el catálogo ya cargado.

**Carrito de compras (`Productos.jsx`)**: estado local (`useState`) con los productos agregados; cada `ProductCard` recibe si su producto ya está en el carrito (`enCarrito`) para alternar entre los botones **"Agregar al carrito"** y **"En el carrito ✓"**.

**Formulario de contacto (`ContactForm.jsx`)**: componente controlado con nombre, correo y mensaje, todos obligatorios. El envío es simulado: espera un momento, muestra los datos en la consola del navegador, presenta un mensaje de confirmación y limpia el formulario. Para conectarlo a un servicio real basta con reemplazar la simulación por una llamada `fetch`.
