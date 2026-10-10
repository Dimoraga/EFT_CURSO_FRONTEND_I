import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import FiltroCategorias from '../components/FiltroCategorias'
import ListaVideojuegos from '../components/ListaVideojuegos'
import Toast from '../components/Toast'
import useProductos from '../hooks/useProductos'

const merchandising = [
  'Figuras de acción de personajes de videojuegos',
  'Camisetas con diseños de videojuegos clásicos',
  'Pósters y arte conceptual de juegos populares',
]

function Productos({ categoria, genero, onCategoriaChange, onGeneroChange }) {
  const { productos, cargando, error, recargar } = useProductos()
  const [carrito, setCarrito] = useState([])
  const [toast, setToast] = useState('')
  const toastTimeout = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const busqueda = (searchParams.get('busqueda') || '').trim().toLowerCase()

  useEffect(() => {
    if (!location.hash) return
    const objetivo = document.getElementById(location.hash.slice(1))
    if (objetivo) objetivo.scrollIntoView({ behavior: 'smooth' })
  }, [location.hash, productos])

  useEffect(() => () => clearTimeout(toastTimeout.current), [])

  // Géneros disponibles, obtenidos de los mismos juegos del catálogo
  const generos = useMemo(() => {
    const unicos = new Set(productos.map((producto) => producto.genero).filter(Boolean))
    return [...unicos].sort((a, b) => a.localeCompare(b, 'es'))
  }, [productos])

  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) => {
      if (busqueda && !producto.nombre.toLowerCase().includes(busqueda)) return false
      if (categoria !== 'todos' && producto.categoria !== categoria) return false
      if (categoria === 'juegos' && genero !== 'todos' && producto.genero !== genero) return false
      return true
    })
  }, [productos, busqueda, categoria, genero])

  const sinCoincidencias = !cargando && !error && productos.length > 0 && productosFiltrados.length === 0

  const quitarFiltros = () => {
    onCategoriaChange('todos')
    setSearchParams({})
  }

  const idsEnCarrito = useMemo(() => new Set(carrito.map((item) => item.id)), [carrito])

  const agregarAlCarrito = (producto) => {
    setCarrito((actual) => [...actual, { id: producto.id, nombre: producto.nombre, precio: producto.precio }])

    clearTimeout(toastTimeout.current)
    setToast(`${producto.nombre} agregado al carrito`)
    toastTimeout.current = setTimeout(() => setToast(''), 2000)
  }

  const quitarDelCarrito = (indice) => {
    setCarrito((actual) => actual.filter((_, i) => i !== indice))
  }

  const vaciarCarrito = () => setCarrito([])

  const total = carrito.reduce((suma, item) => suma + item.precio, 0)

  return (
    <main>
      <h2>Lista de Productos</h2>
      <FiltroCategorias
        categoria={categoria}
        genero={genero}
        generos={generos}
        cantidad={productosFiltrados.length}
        cargando={cargando}
        onCategoriaChange={onCategoriaChange}
        onGeneroChange={onGeneroChange}
      />

      {sinCoincidencias && (
        <div className="catalogo-error" role="status" aria-live="polite">
          <p className="catalogo-estado">No encontramos productos que coincidan con tu búsqueda o filtro.</p>
          <button type="button" className="button secondary" onClick={quitarFiltros}>Quitar filtros</button>
        </div>
      )}

      <div className="productos-layout">
        <div className="productos-contenido">
          <ListaVideojuegos
            productos={productosFiltrados}
            cargando={cargando}
            error={error}
            onReintentar={recargar}
            onAgregar={agregarAlCarrito}
            idsEnCarrito={idsEnCarrito}
          />

          {/* Sección de venta de merchandising (no es parte del catálogo JSON,
              por eso solo se muestra cuando no hay una categoría seleccionada) */}
          {categoria === 'todos' && (
            <>
              <h3 id="merchandising">Merchandising</h3>
              <div className="row g-4">
                {merchandising.map((texto) => (
                  <div className="col-12 col-sm-6 col-md-4" key={texto}>
                    <div className="card h-100">
                      <div className="card-body">
                        <p className="card-text">{texto}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Se implementa el carrito de compras de la tienda */}
        <aside className="carrito-aside">
          <section className="carrito" aria-labelledby="titulo-carrito">
            <div className="carrito-cabecera">
              <h2 id="titulo-carrito">&#128722; Carrito</h2>
              <span className="carrito-badge" aria-label="Productos en el carrito">
                <span>{carrito.length}</span>
              </span>
            </div>
            {carrito.length === 0 && (
              <p className="carrito-vacio">Tu carrito está vacío. ¡Agrega algún clásico!</p>
            )}
            <ul className="carrito-lista">
              {carrito.map((item, indice) => (
                <li key={`${item.nombre}-${indice}`}>
                  <span className="carrito-item-nombre">{item.nombre}</span>
                  <span className="carrito-item-precio">${item.precio.toLocaleString('es-CL')}</span>
                  <button
                    type="button"
                    className="carrito-quitar"
                    aria-label={`Quitar ${item.nombre}`}
                    onClick={() => quitarDelCarrito(indice)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div className="carrito-pie">
              <p className="carrito-total">Total: ${total.toLocaleString('es-CL')}</p>
              <button type="button" className="carrito-vaciar" disabled={carrito.length === 0} onClick={vaciarCarrito}>
                Vaciar carrito
              </button>
            </div>
          </section>
        </aside>
      </div>

      <Toast mensaje={toast} />
    </main>
  )
}

export default Productos
