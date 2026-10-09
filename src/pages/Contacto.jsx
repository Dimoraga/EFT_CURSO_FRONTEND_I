function Contacto() {
  return (
    <main>
      <section className="page-intro">
        <span className="eyebrow">Hablemos</span>
        <h2>¿Tienes preguntas? Contáctanos</h2>
        <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos a través de cualquiera de estos canales.</p>
      </section>

      <section className="info-grid">
        <div className="row g-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <article className="feature-card h-100">
              <span className="icon" aria-hidden="true">✉️</span>
              <h3>Correo electrónico</h3>
              <p>info@williamwallace.com</p>
            </article>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <article className="feature-card h-100">
              <span className="icon" aria-hidden="true">🏢</span>
              <h3>Ventas a empresas</h3>
              <p>ventas@williamwallace.com</p>
            </article>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <article className="feature-card h-100">
              <span className="icon" aria-hidden="true">📞</span>
              <h3>Teléfono</h3>
              <p>+56 2 1234 5678</p>
            </article>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <article className="feature-card h-100">
              <span className="icon" aria-hidden="true">📍</span>
              <h3>Dirección</h3>
              <p>Alameda N°1328, Santiago Centro</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contacto
