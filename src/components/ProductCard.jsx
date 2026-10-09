const formatoPrecio = (precio) => `$${precio.toLocaleString('es-CL')}.-`

function ProductCard({ producto, variant = 'home', onAgregar, enCarrito = false }) {
  const esCatalogo = variant === 'catalogo'
  const esJuego = producto.categoria === 'juegos'

  const columna = esCatalogo
    ? `col-12 col-sm-6 ${esJuego ? 'col-lg-4' : 'col-md-4'} producto`
    : 'col-12 col-sm-6 col-lg-4'

  const imagenClase = esCatalogo
    ? `card-img-top${esJuego ? ' card-img-juego' : ''}`
    : 'card-img-top card-img-juego'

  return (
    <div className={columna}>
      <div className="card h-100">
        <img src={producto.imagen} className={imagenClase} alt={producto.alt} loading="lazy" />
        <div className="card-body">
          <p className="card-text">{producto.nombre}</p>
          <p>{producto.descripcion}</p>
          <p>{formatoPrecio(producto.precio)}</p>
          {esCatalogo && (
            <button
              type="button"
              className={`btn-agregar${enCarrito ? ' en-carrito' : ''}`}
              onClick={() => onAgregar(producto)}
              disabled={enCarrito}
            >
              {enCarrito ? 'En el carrito ✓' : 'Agregar al carrito'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
