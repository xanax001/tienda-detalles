import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { WHATSAPP_NUMERO } from '../constants';

function buildMensajeWhatsApp(items, ocasion, direccionEntrega, notas, nombreCliente, contactoCliente) {
  const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  const lineas = [
    '*GEYDABLOOMS*',
    'Detalles y arreglos de flores eternas',
    '',
    '================================',
    '*  N U E V O   P E D I D O  *',
    '================================',
    ''
  ];
  if (nombreCliente || contactoCliente) {
    if (nombreCliente) lineas.push('*Nombre:* ' + nombreCliente, '');
    if (contactoCliente) lineas.push('*Correo / WhatsApp:* ' + contactoCliente, '');
    lineas.push('');
  }
  if (direccionEntrega) {
    lineas.push('*Donde entregar:*', direccionEntrega, '');
  }
  if (ocasion) {
    lineas.push('*Ocasion:* ' + ocasion, '');
  }
  lineas.push('--------------------------------', '*Productos:*', '');
  items.forEach((i) => {
    lineas.push('  - ' + i.nombre + ' x' + i.cantidad + '  S/ ' + (i.precio * i.cantidad));
  });
  lineas.push('', '================================', '*TOTAL  S/ ' + total + '*', '================================', '');
  if (notas) {
    lineas.push('*Notas:* ' + notas, '');
  }
  lineas.push('Gracias, quiero confirmar mi pedido.');
  return encodeURIComponent(lineas.join('\n'));
}

export default function Carrito() {
  const { items, ocasion, setOcasion, direccionEntrega, setDireccionEntrega, notas, setNotas, nombreCliente, setNombreCliente, contactoCliente, setContactoCliente, cambiarCantidad, quitar, OCASIONES } = useCarrito();
  const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);

  if (items.length === 0) {
    return (
      <section className="carrito-vacio">
        <div className="container">
          <h1 className="pagina-titulo">Tu carrito está vacío</h1>
          <p className="pagina-desc">Agrega rosas eternas o maquillaje para armar tu detalle.</p>
          <div className="hero-ctas">
            <Link to="/rosas-eternas" className="btn btn-primario">Ver rosas eternas</Link>
            <Link to="/maquillaje" className="btn btn-secundario">Ver maquillaje</Link>
          </div>
        </div>
      </section>
    );
  }

  const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${buildMensajeWhatsApp(items, ocasion, direccionEntrega, notas, nombreCliente, contactoCliente)}`;

  return (
    <section className="carrito-pagina">
      <div className="container">
        <header className="carrito-header">
          <span className="carrito-header-pretitulo">Tu pedido</span>
          <h1 className="pagina-titulo">Resumen</h1>
        </header>

        <div className="carrito-layout">
          <div className="carrito-lista">
            <p className="carrito-lista-titulo">Productos en tu detalle</p>
            {items.map((item) => (
              <div key={`${item.id}-${item.nombre}`} className={`carrito-item carrito-item--${item.categoria}`}>
                <span className="carrito-item-icon" aria-hidden />
                <div className="carrito-item-info">
                  <strong>{item.nombre}</strong>
                  <span className="carrito-item-precio">S/ {item.precio} c/u</span>
                </div>
                <div className="carrito-item-cantidad">
                  <button type="button" onClick={() => cambiarCantidad(item.id, item.nombre, -1)} aria-label="Menos">−</button>
                  <span>{item.cantidad}</span>
                  <button type="button" onClick={() => cambiarCantidad(item.id, item.nombre, 1)} aria-label="Más">+</button>
                </div>
                <span className="carrito-item-total">S/ {item.precio * item.cantidad}</span>
                <button type="button" className="carrito-item-quitar" onClick={() => quitar(item.id, item.nombre)} aria-label="Quitar">×</button>
              </div>
            ))}
          </div>

          <div className="carrito-resumen">
            <div className="resumen-recorte" aria-hidden />
            <div className="resumen-inner">
              <div className="resumen-header">
                <span className="resumen-header-num">GEYDABLOOMS</span>
                <span className="resumen-header-sub">Hoja de pedido</span>
              </div>

              <div className="resumen-campos">
                <div className="resumen-campo">
                  <label className="resumen-label">Tu nombre</label>
                  <input type="text" value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} className="resumen-input" placeholder="Nombre completo" />
                </div>
                <div className="resumen-campo">
                  <label className="resumen-label">Correo o WhatsApp</label>
                  <input type="text" value={contactoCliente} onChange={(e) => setContactoCliente(e.target.value)} className="resumen-input" placeholder="Correo o número para contactarte" />
                </div>
                <div className="resumen-campo">
                  <label className="resumen-label">Donde entregar</label>
                  <textarea value={direccionEntrega} onChange={(e) => setDireccionEntrega(e.target.value)} className="resumen-input" placeholder="Direccion, distrito, referencia..." rows={2} />
                </div>
                <div className="resumen-campo">
                  <label className="resumen-label">Ocasion</label>
                  <select value={ocasion} onChange={(e) => setOcasion(e.target.value)} className="resumen-select">
                    <option value="">Elegir...</option>
                    {OCASIONES.map((o) => (
                      <option key={o.id} value={o.nombre}>{o.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="resumen-campo">
                  <label className="resumen-label">Notas (opcional)</label>
                  <textarea value={notas} onChange={(e) => setNotas(e.target.value)} className="resumen-input" placeholder="Dedicatoria, fecha..." rows={2} />
                </div>
              </div>

              <div className="resumen-total-block">
                <span className="resumen-total-label">Total</span>
                <span className="resumen-total-valor">S/ {total}</span>
              </div>

              <a href={urlWhatsApp} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-grande resumen-btn">
                Enviar por WhatsApp
              </a>
              <p className="resumen-ayuda">Se abre WhatsApp con el pedido listo. Envia el mensaje para confirmar.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
