import { useEffect, useRef } from 'react'
import { Carousel } from 'bootstrap'
import { Link } from 'react-router-dom'
import CardSkeleton from '../components/CardSkeleton'
import ProductCard from '../components/ProductCard'
import useProductos from '../hooks/useProductos'

function Inicio() {
  const { productos, cargando, error, recargar } = useProductos()
  const carouselRef = useRef(null)

  // Se inicializa el carrusel de forma imperativa (en vez de confiar en el
  // auto-init de Bootstrap en el evento "load" de la ventana) porque React
  // Router desmonta y vuelve a montar este nodo cada vez que se navega
  // fuera y de vuelta a Inicio, y ese evento solo se dispara una vez.
  useEffect(() => {
    if (!carouselRef.current) return
    const instancia = new Carousel(carouselRef.current, { interval: 3000, ride: true })
    return () => instancia.dispose()
  }, [])

  return (
    <>
      <div id="carouselExampleInterval" className="carousel slide" ref={carouselRef}>
        {/* Conforme a las instrucciones de la tarea se agregan intervalos de 3 segundos */}
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img src="/images/AOE2.jpg" className="d-block w-100" alt="Age of Empires II" />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src="/images/zelda.jpg" className="d-block w-100" alt="The Legend of Zelda: Ocarina of Time" />
          </div>
          <div className="carousel-item" data-bs-interval="3000">
            <img src="/images/super-mario.jpg" className="d-block w-100" alt="Super Mario Bros" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <main className="content">
        <section className="hero" id="hero-principal">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7 hero-text">
              <span className="eyebrow">Desde 1993</span>
              <h2>Retro gaming para quienes aman la historia de los videojuegos.</h2>
              <p>
                En nuestra tienda encontrarás consolas, accesorios y clásicos que marcaron una época. Un espacio
                pensado para fanáticos del gaming retro y los juegos que nunca pasan de moda. Ven a revivir la magia
                de los juegos clásicos de tu juventud.
              </p>
              <div className="hero-actions">
                <Link className="button primary" to="/productos">Ver productos</Link>
                <Link className="button secondary" to="/nosotros">Nuestra historia</Link>
              </div>
            </div>
            <div className="col-12 col-lg-5 hero-panel">
              <div className="panel-card">
                <span>Más vendidos</span>
                <strong>Game Boy Advance</strong>
              </div>
              <div className="panel-card accent">
                <span>Clásicos</span>
                <strong>PlayStation 2</strong>
              </div>
              <div className="panel-card">
                <span>Icono retro</span>
                <strong>Nintendo DS</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <article className="feature-card">
                <h3>+30 años</h3>
                <p>Historia y experiencia en videojuegos clásicos.</p>
              </article>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <article className="feature-card">
                <h3>Catálogo retro</h3>
                <p>Productos únicos para coleccionistas y amantes del gaming.</p>
              </article>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <article className="feature-card">
                <h3>Atención real</h3>
                <p>Te ayudamos a encontrar la consola o juego ideal.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="catalogo" id="catalogo">
          <h2>Catálogo de productos</h2>
          {cargando && (
            <p className="catalogo-estado visually-hidden" role="status">Cargando productos…</p>
          )}
          {!cargando && error && (
            <div className="catalogo-error" role="alert">
              <p className="catalogo-estado">No pudimos cargar los productos. Intenta nuevamente más tarde.</p>
              <button type="button" className="button secondary" onClick={recargar}>Reintentar</button>
            </div>
          )}
          <div className="row g-4">
            {cargando && <CardSkeleton cantidad={6} />}
            {!cargando && productos.map((producto) => (
              <ProductCard key={producto.id} producto={producto} variant="home" />
            ))}
          </div>
        </section>

        <div className="box">
          <h2>Productos destacados</h2>
          <ul className="lista-juegos row g-3 list-unstyled">
            <li className="col-6 col-md-4">
              <Link className="button primary" to="/productos?busqueda=Game%20Boy%20Advance">Game Boy Advance</Link>
            </li>
            <li className="col-6 col-md-4">
              <Link className="button primary" to="/productos?busqueda=Nintendo%20DS">Nintendo DS</Link>
            </li>
            <li className="col-6 col-md-4">
              <Link className="button primary" to="/productos?busqueda=PlayStation%202">PlayStation 2</Link>
            </li>
          </ul>
        </div>
      </main>
    </>
  )
}

export default Inicio
