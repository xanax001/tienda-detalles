import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';
import { useCarrito } from '../context/CarritoContext';
import { useSiteConfig } from '../context/SiteConfigContext';

function precioAntesConDescuento(precio, porcentaje) {
  if (!porcentaje || porcentaje <= 0 || porcentaje >= 100) return null;
  return Math.round(precio / (1 - porcentaje / 100));
}

function useProductoById(id) {
  const { rosas, maquillaje } = useProductos();
  const todos = [...(rosas || []), ...(maquillaje || [])];
  return todos.find((p) => p.id === id) || null;
}

export default function ProductoDetalle() {
  const { id } = useParams();
  const producto = useProductoById(id);
  const { agregar } = useCarrito();
  const { descuentoOferta } = useSiteConfig();
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const enOferta = descuentoOferta && descuentoOferta > 0;
  const precioAntes = enOferta ? precioAntesConDescuento(producto?.precio, descuentoOferta) : null;

  if (!producto) {
    return <Navigate to="/" replace />;
  }

  const imagenes = producto.imagenes && producto.imagenes.length > 0
    ? producto.imagenes.map((f) => '/productos/' + (f || '').trim()).filter(Boolean)
    : producto.imagen && producto.imagen.trim()
      ? ['/productos/' + producto.imagen.trim()]
      : [];

  const handleAgregar = () => {
    agregar({ ...producto }, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  const volverA = producto.categoria === 'maquillaje' ? '/maquillaje' : '/rosas-eternas';

  return (
    <section className="pagina-producto-detalle">
      <div className="container">
        <Link to={volverA} className="producto-detalle-volver">
          ← Volver
        </Link>

        <div className="producto-detalle-layout">
          <div className="producto-detalle-imagen-wrap">
            {imagenes.length > 0 ? (
              <img
                src={imagenes[0]}
                alt={producto.nombre}
                className="producto-detalle-imagen"
              />
            ) : (
              <div className={`producto-detalle-sin-imagen producto-detalle-sin-imagen--${producto.categoria}`}>
                <span className="producto-icon producto-icon--detalle" aria-hidden />
                <p>Sin imagen</p>
              </div>
            )}
          </div>

          <div className="producto-detalle-info">
            {enOferta && (
              <span className="producto-detalle-badge-oferta">{descuentoOferta}% OFF</span>
            )}
            <h1 className="producto-detalle-titulo">{producto.nombre}</h1>
            <p className="producto-detalle-desc">{producto.descripcion}</p>
            <p className="producto-detalle-precio">
              {precioAntes != null && (
                <span className="producto-detalle-precio-antes">S/ {precioAntes}</span>
              )}
              <span>S/ {producto.precio}</span>
            </p>
            <div className="producto-detalle-actions">
              <label className="producto-detalle-cantidad">
                <span>Cantidad:</span>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value) || 1)}
                />
              </label>
              <button
                type="button"
                className={`btn btn-primario btn-grande ${agregado ? 'agregado' : ''}`}
                onClick={handleAgregar}
              >
                {agregado ? '✓ Agregado al carrito' : 'Añadir al carrito'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
