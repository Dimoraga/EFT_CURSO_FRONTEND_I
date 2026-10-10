import { useState } from 'react';

export default function ContactForm() {
    
  const [datos, setDatos] = useState({ nombre: "", email: "", mensaje: "" });
  const [estado, setEstado] = useState("idle"); // idle | enviando | ok | error

  const handleChange = (e) =>
    setDatos({ ...datos, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que la página se recargue
    setEstado("enviando");
    try {
      // Envío simulado: no hay servidor, solo se espera un momento como si se enviara
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Mensaje de contacto (simulado):", datos);
      setEstado("ok");
      setDatos({ nombre: "", email: "", mensaje: "" });
    } catch {
      setEstado("error");
    }
  };

  return (
    <form className="contact-form-campos" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label htmlFor="nombre" className="contact-label">Nombre</label>
          <input id="nombre" name="nombre" className="contact-input"
                 placeholder="Tu nombre" autoComplete="name"
                 value={datos.nombre} onChange={handleChange} required />
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="email" className="contact-label">Correo</label>
          <input id="email" name="email" type="email" className="contact-input"
                 placeholder="tucorreo@ejemplo.com" autoComplete="email"
                 value={datos.email} onChange={handleChange} required />
        </div>

        <div className="col-12">
          <label htmlFor="mensaje" className="contact-label">Mensaje</label>
          <textarea id="mensaje" name="mensaje" className="contact-input" rows={5}
                    placeholder="¿En qué te podemos ayudar?"
                    value={datos.mensaje} onChange={handleChange} required />
        </div>

        <div className="col-12 contact-acciones">
          <small className="contact-nota">Todos los campos son obligatorios.</small>
          <button type="submit" className="contact-enviar" disabled={estado === "enviando"}>
            {estado === "enviando" ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>
      </div>

      <div aria-live="polite">
        {estado === "ok" && <p className="contact-aviso ok">✅ ¡Mensaje enviado! Gracias por escribirnos. Pronto lo contactaremos.</p>}
        {estado === "error" && <p className="contact-aviso error">⚠️ Ups!!! Parece que hubo un problema. Intenta nuevamente.</p>}
      </div>
    </form>
  );
}