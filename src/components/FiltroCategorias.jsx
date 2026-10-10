import { categorias } from '../categorias'

// Componente controlado: no guarda estado propio, recibe la categoría y el
// género seleccionados por props y avisa los cambios al componente padre.
function FiltroCategorias({ categoria, genero, generos, cantidad, cargando, onCategoriaChange, onGeneroChange }) {
  return (
    <section className="filtro" aria-label="Filtrar productos">
      <div className="filtro-botones" role="group" aria-label="Categoría">
        {categorias.map(({ valor, label, icono }) => (
          <button
            key={valor}
            type="button"
            className={`filtro-boton${categoria === valor ? ' activo' : ''}`}
            aria-pressed={categoria === valor}
            onClick={() => onCategoriaChange(valor)}
          >
            <span aria-hidden="true">{icono}</span> {label}
          </button>
        ))}
      </div>

      {categoria === 'juegos' && generos.length > 0 && (
        <div className="filtro-genero">
          <label htmlFor="filtro-genero">Género</label>
          <select
            id="filtro-genero"
            className="form-select"
            value={genero}
            onChange={(evento) => onGeneroChange(evento.target.value)}
          >
            <option value="todos">Todos los géneros</option>
            {generos.map((nombre) => (
              <option key={nombre} value={nombre}>{nombre}</option>
            ))}
          </select>
        </div>
      )}

      {!cargando && (
        <p className="filtro-resultado" aria-live="polite">
          Mostrando {cantidad} {cantidad === 1 ? 'producto' : 'productos'}
        </p>
      )}
    </section>
  )
}

export default FiltroCategorias
