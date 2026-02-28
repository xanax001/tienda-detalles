import React, { useMemo, useState, useCallback } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';
import ProductoCard from '../components/ProductoCard';
import AnimateInView from '../components/AnimateInView';
import TiendaSidebar from '../components/TiendaSidebar';
import TiendaToolbar from '../components/TiendaToolbar';
import { SECCIONES_RAMOS } from '../data/seccionesRamos';

function filtrarYOrdenar(productos, precioMin, precioMax, orden) {
  let list = [...(productos || [])];
  const min = precioMin !== '' ? Number(precioMin) : null;
  const max = precioMax !== '' ? Number(precioMax) : null;
  if (min != null && !Number.isNaN(min)) list = list.filter((p) => p.precio >= min);
  if (max != null && !Number.isNaN(max)) list = list.filter((p) => p.precio <= max);
  if (orden === 'precio-asc') list.sort((a, b) => a.precio - b.precio);
  else if (orden === 'precio-desc') list.sort((a, b) => b.precio - a.precio);
  else if (orden === 'nombre') list.sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
  return list;
}

export default function SeccionFlores() {
  const { seccionId } = useParams();
  const { rosas, loading } = useProductos();
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [orden, setOrden] = useState('default');

  const seccion = SECCIONES_RAMOS.find((s) => s.id === seccionId);
  const baseProductos = useMemo(
    () => (rosas || []).filter((p) => (p.seccion || 'rosas') === seccionId),
    [rosas, seccionId]
  );
  const productos = useMemo(
    () => filtrarYOrdenar(baseProductos, precioMin, precioMax, orden),
    [baseProductos, precioMin, precioMax, orden]
  );

  const handleFiltrarPrecio = useCallback(() => {}, []);

  if (seccionId && !seccion) {
    return <Navigate to="/rosas-eternas" replace />;
  }

  const desde = 1;
  const hasta = productos.length;
  const total = productos.length;

  return (
    <section className="pagina-seccion-flores pagina-tienda">
      <div className="container">
        <Link to="/rosas-eternas" className="seccion-flores-back">
          ← Volver a Flores eternas
        </Link>
        <header
          className="seccion-flores-header"
          style={{ '--seccion-gradiente': seccion?.gradiente }}
        >
          <span className="seccion-flores-icon" aria-hidden />
          <div className="seccion-flores-texto">
            <h1 className="seccion-flores-titulo">{seccion?.nombre}</h1>
            <p className="seccion-flores-desc">{seccion?.descripcion}</p>
          </div>
        </header>

        {loading ? (
          <p className="productos-loading">Cargando productos...</p>
        ) : (
          <div className="tienda-layout">
            <TiendaSidebar
              categorias
              precioMin={precioMin}
              precioMax={precioMax}
              onPrecioMinChange={setPrecioMin}
              onPrecioMaxChange={setPrecioMax}
              onFiltrarPrecio={handleFiltrarPrecio}
              esMaquillaje={false}
            />
            <div className="tienda-main">
              <TiendaToolbar
                total={total}
                desde={desde}
                hasta={hasta}
                orden={orden}
                onOrdenChange={setOrden}
              />
              {productos.length === 0 ? (
                <p className="productos-vacio">No hay productos con estos filtros.</p>
              ) : (
                <div className="productos-grid productos-grid--tienda">
                  {productos.map((p, i) => (
                    <AnimateInView key={p.id} className="productos-grid-item" delay={i * 50}>
                      <ProductoCard producto={p} compacto />
                    </AnimateInView>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
