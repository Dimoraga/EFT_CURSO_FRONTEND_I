import { useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { categorias } from '../categorias'

// Barra de navegación. Las opciones del menú "Productos" cambian la categoría
// del filtro (estado que vive en App) y llevan a la página de productos.
function Navbar({ categoria, onCategoriaChange }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const enProductos = location.pathname === '/productos'
  const inputBusquedaRef = useRef(null)

  const manejarSubmit = (evento) => {
    evento.preventDefault()
    const texto = inputBusquedaRef.current.value.trim()
    // Una búsqueda nueva se hace sobre todo el catálogo
    onCategoriaChange('todos')
    navigate(`/productos?busqueda=${encodeURIComponent(texto)}`)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <NavLink className="navbar-brand" to="/">
        <img src="/images/logo_william_wallace.png" width="140" alt="Logo de la tienda" />
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" end>
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/nosotros">
              Nosotros
            </NavLink>
          </li>
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle"
              to="/productos"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Productos
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {categorias.map(({ valor, label }) => (
                <Link
                  key={valor}
                  className={`dropdown-item${enProductos && !location.hash && categoria === valor ? ' active' : ''}`}
                  to="/productos"
                  onClick={() => onCategoriaChange(valor)}
                >
                  {label}
                </Link>
              ))}
              <div className="dropdown-divider"></div>
              <Link
                className={`dropdown-item${enProductos && location.hash === '#merchandising' ? ' active' : ''}`}
                to="/productos#merchandising"
                onClick={() => onCategoriaChange('todos')}
              >
                Merchandising
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contacto">
              Contacto
            </NavLink>
          </li>
        </ul>
        <form className="d-flex my-2 my-lg-0" onSubmit={manejarSubmit}>
          <input
            ref={inputBusquedaRef}
            key={location.key}
            className="form-control me-sm-2"
            type="search"
            placeholder="Buscar producto"
            aria-label="Buscar producto"
            defaultValue={searchParams.get('busqueda') || ''}
          />
          <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Buscar</button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
