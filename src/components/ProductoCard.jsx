import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useSiteConfig } from '../context/SiteConfigContext';

function precioAntesConDescuento(precio, porcentaje) {
  if (!porcentaje || porcentaje <= 0 || porcentaje >= 100) return null;
  return Math.round(precio / (1 - porcentaje / 100));
}

export default function ProductoCard({ producto, compacto = false }) {
  const { agregar } = useCarrito();
  const { descuentoOferta } = useSiteConfig();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = (e) => {
    e.preventDefault();
    agregar({ ...producto }, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  const tieneImagen = producto.imagen && producto.imagen.trim() !== '';
  const srcImagen = tieneImagen ? '/productos/' + producto.imagen.trim() : null;
  const enOferta = descuentoOferta && descuentoOferta > 0;
  const precioAntes = enOferta ? precioAntesConDescuento(producto.precio, descuentoOferta) : null;

  return (
    <article className={`producto-card ${compacto ? 'producto-card--compacto' : ''} ${enOferta ? 'producto-card--oferta' : ''}`}>
      <Link to={`/producto/${producto.id}`} className={`producto-card-imagen producto-card-imagen--${producto.categoria}`} aria-label={`Ver ${producto.nombre}`}>
        {srcImagen ? (
          <img src={srcImagen} alt={producto.nombre} className="producto-card-img" />
        ) : (
          <span className="producto-icon" aria-hidden />
        )}
        {enOferta && (
          <span className="producto-card-badge-oferta">{descuentoOferta}% OFF</span>
        )}
      </Link>
      <div className="producto-card-body">
        <h3 className="producto-card-titulo">
          <Link to={`/producto/${producto.id}`}>{producto.nombre}</Link>
        </h3>
        {!compacto && <p className="producto-card-desc">{producto.descripcion}</p>}
        <p className="producto-card-precio">
          {precioAntes != null && (
            <span className="producto-card-precio-antes">S/ {precioAntes}</span>
          )}
          <span>S/ {producto.precio}</span>
        </p>
        <div className="producto-card-actions">
          {!compacto && (
            <label className="cantidad-label">
              Cantidad:
              <input
                type="number"
                min="1"
                max="99"
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value) || 1)}
                className="cantidad-input"
              />
            </label>
          )}
          <button
            type="button"
            className={`btn btn-primario ${compacto ? 'btn-block' : ''} ${agregado ? 'agregado' : ''}`}
            onClick={handleAgregar}
          >
            {agregado ? '✓ Agregado' : 'Añadir al carrito'}
          </button>
        </div>
      </div>
    </article>
  );
}
