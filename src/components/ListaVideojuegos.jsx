import { categorias } from '../categorias'
import CardSkeleton from './CardSkeleton'
import ProductCard from './ProductCard'

// Muestra los productos que recibe por props, agrupados por categoría.
// Las secciones sin productos (por el filtro o la búsqueda) no se muestran.
function ListaVideojuegos({ productos, cargando, error, onReintentar, onAgregar, idsEnCarrito }) {
  if (cargando) {
    return (
      <>
        <h3>Cargando catálogo…</h3>
        <div className="row g-4">
          <CardSkeleton cantidad={6} columnClass="col-12 col-sm-6 col-md-4 producto" />
        </div>
      </>
    )
  }

  if (error) {
    return (
      <div className="catalogo-error" role="alert">
        <p className="catalogo-estado">No pudimos cargar los productos. Intenta nuevamente más tarde.</p>
        <button type="button" className="button secondary" onClick={onReintentar}>Reintentar</button>
      </div>
    )
  }

  const secciones = categorias
    .filter(({ valor }) => valor !== 'todos')
    .map((seccion) => ({
      ...seccion,
      productos: productos.filter((producto) => producto.categoria === seccion.valor),
    }))
    .filter((seccion) => seccion.productos.length > 0)

  return (
    <>
      {secciones.map((seccion) => (
        <section key={seccion.valor}>
          <h3 id={seccion.ancla}>{seccion.label}</h3>
          <div className="row g-4">
            {seccion.productos.map((producto) => (
              <ProductCard
                key={producto.id}
                producto={producto}
                variant="catalogo"
                onAgregar={onAgregar}
                enCarrito={idsEnCarrito.has(producto.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  )
}

export default ListaVideojuegos
