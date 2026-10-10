import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Nosotros from './pages/Nosotros'
import Productos from './pages/Productos'
import Contacto from './pages/Contacto'
import { titulos } from './titles'

function App() {
  const location = useLocation()
  // Estado del filtro del catálogo. Vive en App porque lo usan dos componentes
  // hermanos: la barra de navegación (Header) y la página de Productos.
  const [categoria, setCategoria] = useState('todos')
  const [genero, setGenero] = useState('todos')

  const cambiarCategoria = (nuevaCategoria) => {
    setCategoria(nuevaCategoria)
    setGenero('todos')
  }

  useEffect(() => {
    document.title = titulos[location.pathname] ?? titulos['/']
  }, [location.pathname])

  return (
    <>
      <Header categoria={categoria} onCategoriaChange={cambiarCategoria} />
      {/* La key reinicia la animación de entrada cada vez que cambia de página
          (no se activa con cambios de query/hash dentro de la misma ruta). */}
      <div className="page-transition" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route
            path="/productos"
            element={
              <Productos
                categoria={categoria}
                genero={genero}
                onCategoriaChange={cambiarCategoria}
                onGeneroChange={setGenero}
              />
            }
          />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
