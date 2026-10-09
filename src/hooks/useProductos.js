import { useCallback, useEffect, useState } from 'react'

// Conforme a las instrucciones de la actividad se implementa una carga
// dinámica del catálogo de productos desde un archivo JSON local usando Fetch API.
function useProductos() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    let activo = true

    async function cargarCatalogo() {
      try {
        // Se simula la latencia de una fuente de datos externa antes de
        // resolver la carga del catálogo.
        await new Promise((resolve) => setTimeout(resolve, 700))

        const respuesta = await fetch('/data/productos.json')
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)

        const datos = await respuesta.json()
        if (activo) setProductos(datos)
      } catch (err) {
        console.error('No se pudo cargar el catálogo dinámico:', err)
        if (activo) setError(err)
      } finally {
        if (activo) setCargando(false)
      }
    }

    cargarCatalogo()
    return () => {
      activo = false
    }
  }, [intento])

  const recargar = useCallback(() => {
    setCargando(true)
    setError(null)
    setIntento((actual) => actual + 1)
  }, [])

  return { productos, cargando, error, recargar }
}

export default useProductos
