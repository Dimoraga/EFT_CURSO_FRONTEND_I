function Toast({ mensaje }) {
  if (!mensaje) return null

  return (
    <div className="toast-carrito" role="status" aria-live="polite">
      {mensaje}
    </div>
  )
}

export default Toast
