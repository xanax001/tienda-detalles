import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { SECCIONES_RAMOS } from '../data/seccionesRamos';

export default function TiendaSidebar({
  categorias = null,
  precioMin = '',
  precioMax = '',
  onPrecioMinChange,
  onPrecioMaxChange,
  onFiltrarPrecio,
  esMaquillaje = false,
}) {
  const { seccionId } = useParams();

  return (
    <aside className="tienda-sidebar">
      {categorias && !esMaquillaje && (
        <div className="tienda-sidebar-block">
          <h3 className="tienda-sidebar-titulo">Categorías</h3>
          <ul className="tienda-sidebar-list">
            <li>
              <Link
                to="/rosas-eternas"
                className={`tienda-sidebar-link ${!seccionId ? 'active' : ''}`}
              >
                Todas
              </Link>
            </li>
            {SECCIONES_RAMOS.map((s) => (
              <li key={s.id}>
                <Link
                  to={`/rosas-eternas/${s.id}`}
                  className={`tienda-sidebar-link ${seccionId === s.id ? 'active' : ''}`}
                >
                  {s.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="tienda-sidebar-block">
        <h3 className="tienda-sidebar-titulo">Filtrar por precio</h3>
        <div className="tienda-sidebar-precio">
          <input
            type="number"
            min="0"
            placeholder="Mín"
            value={precioMin}
            onChange={(e) => onPrecioMinChange(e.target.value)}
            className="tienda-sidebar-input"
            aria-label="Precio mínimo"
          />
          <input
            type="number"
            min="0"
            placeholder="Máx"
            value={precioMax}
            onChange={(e) => onPrecioMaxChange(e.target.value)}
            className="tienda-sidebar-input"
            aria-label="Precio máximo"
          />
          <button type="button" className="btn btn-secundario btn-sm tienda-sidebar-btn" onClick={onFiltrarPrecio}>
            Filtrar
          </button>
        </div>
      </div>
    </aside>
  );
}
