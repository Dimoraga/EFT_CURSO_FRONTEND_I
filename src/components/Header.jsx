import { useLocation } from 'react-router-dom'
import { titulos } from '../titles'
import Navbar from './Navbar'

function Header({ categoria, onCategoriaChange }) {
  const location = useLocation()

  return (
    <header className="header">
      <h1>{titulos[location.pathname] ?? titulos['/']}</h1>
      <Navbar categoria={categoria} onCategoriaChange={onCategoriaChange} />
    </header>
  )
}

export default Header
