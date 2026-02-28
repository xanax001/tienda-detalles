import React from 'react';

const OPCIONES_ORDEN = [
  { value: 'default', label: 'Ordenar por' },
  { value: 'precio-asc', label: 'Precio: bajo a alto' },
  { value: 'precio-desc', label: 'Precio: alto a bajo' },
  { value: 'nombre', label: 'Nombre A-Z' },
];

export default function TiendaToolbar({ total, desde, hasta, orden, onOrdenChange }) {
  const textoMostrando =
    total <= 0
      ? 'No hay resultados'
      : total === 1
        ? 'Mostrando 1 resultado'
        : `Mostrando ${desde}–${hasta} de ${total} resultados`;

  return (
    <div className="tienda-toolbar">
      <span className="tienda-toolbar-mostrando">{textoMostrando}</span>
      <div className="tienda-toolbar-orden">
        <label htmlFor="tienda-orden" className="tienda-toolbar-label">
          Ordenar por
        </label>
        <select
          id="tienda-orden"
          value={orden}
          onChange={(e) => onOrdenChange(e.target.value)}
          className="tienda-toolbar-select"
          aria-label="Ordenar resultados"
        >
          {OPCIONES_ORDEN.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
