import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import CardSkeleton from '../components/CardSkeleton'
import ProductCard from '../components/ProductCard'
import Toast from '../components/Toast'
import useProductos from '../hooks/useProductos'

const merchandising = [
  'Figuras de acción de personajes de videojuegos',
  'Camisetas con diseños de videojuegos clásicos',
  'Pósters y arte conceptual de juegos populares',
]

function Productos() {
  const { productos, cargando, error, recargar } = useProductos()
  const [carrito, setCarrito] = useState([])
  const [toast, setToast] = useState('')
  const toastTimeout = useRef(null)
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const busqueda = (searchParams.get('busqueda') || '').trim().toLowerCase()

  useEffect(() => {
    if (!location.hash) return
    const objetivo = document.getElementById(location.hash.slice(1))
    if (objetivo) objetivo.scrollIntoView({ behavior: 'smooth' })
  }, [location.hash, productos])

  useEffect(() => () => clearTimeout(toastTimeout.current), [])

  const productosFiltrados = useMemo(() => {
    if (!busqueda) return productos
    return productos.filter((producto) => producto.nombre.toLowerCase().includes(busqueda))
  }, [productos, busqueda])

  const porCategoria = useMemo(() => {
    const grupos = { consolas: [], juegos: [], accesorios: [] }
    productosFiltrados.forEach((producto) => {
      if (grupos[producto.categoria]) grupos[producto.categoria].push(producto)
    })
    return grupos
  }, [productosFiltrados])

  const sinCoincidencias = busqueda.length > 0 && !cargando && productosFiltrados.length === 0

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
      {sinCoincidencias && (
        <p className="catalogo-estado" role="status" aria-live="polite">
          No encontramos productos que coincidan con tu búsqueda.
        </p>
      )}

      <div className="productos-layout">
        <div className="productos-contenido">
          {cargando && (
            <>
              <h3>Cargando catálogo…</h3>
              <div className="row g-4">
                <CardSkeleton cantidad={6} columnClass="col-12 col-sm-6 col-md-4 producto" />
              </div>
            </>
          )}

          {!cargando && error && (
            <div className="catalogo-error" role="alert">
              <p className="catalogo-estado">No pudimos cargar los productos. Intenta nuevamente más tarde.</p>
              <button type="button" className="button secondary" onClick={recargar}>Reintentar</button>
            </div>
          )}

          {!cargando && !error && (
            <>
              {/* Sección de Consolas Retro */}
              <h3 id="consolas-retro">Consolas Retro</h3>
              <div className="row g-4">
                {porCategoria.consolas.map((producto) => (
                  <ProductCard
                    key={producto.id}
                    producto={producto}
                    variant="catalogo"
                    onAgregar={agregarAlCarrito}
                    enCarrito={idsEnCarrito.has(producto.id)}
                  />
                ))}
              </div>

              {/* Sección de Venta de Videojuegos */}
              <h3 id="juegos">Juegos</h3>
              <div className="row g-4">
                {porCategoria.juegos.map((producto) => (
                  <ProductCard
                    key={producto.id}
                    producto={producto}
                    variant="catalogo"
                    onAgregar={agregarAlCarrito}
                    enCarrito={idsEnCarrito.has(producto.id)}
                  />
                ))}
              </div>

              {/* Sección de venta de accesorios */}
              <h3 id="accesorios">Accesorios</h3>
              <div className="row g-4">
                {porCategoria.accesorios.map((producto) => (
                  <ProductCard
                    key={producto.id}
                    producto={producto}
                    variant="catalogo"
                    onAgregar={agregarAlCarrito}
                    enCarrito={idsEnCarrito.has(producto.id)}
                  />
                ))}
              </div>
            </>
          )}

          {/* Sección de venta de merchandising */}
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
