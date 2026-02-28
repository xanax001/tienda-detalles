import React, { useMemo, useState, useCallback } from 'react';
import { useProductos } from '../context/ProductosContext';
import ProductoCard from '../components/ProductoCard';
import AnimateInView from '../components/AnimateInView';
import TiendaSidebar from '../components/TiendaSidebar';
import TiendaToolbar from '../components/TiendaToolbar';

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

export default function Maquillaje() {
  const { maquillaje, loading } = useProductos();
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [orden, setOrden] = useState('default');

  const productos = useMemo(
    () => filtrarYOrdenar(maquillaje, precioMin, precioMax, orden),
    [maquillaje, precioMin, precioMax, orden]
  );

  const handleFiltrarPrecio = useCallback(() => {}, []);

  const desde = 1;
  const hasta = productos.length;
  const total = productos.length;

  return (
    <section className="pagina-productos pagina-tienda">
      <div className="container">
        <AnimateInView className="pagina-productos-header">
          <h1 className="pagina-titulo">Maquillaje</h1>
          <p className="pagina-desc">Kits y sets de maquillaje ideales para regalar o para ti.</p>
        </AnimateInView>
        {loading ? (
          <p className="productos-loading">Cargando productos...</p>
        ) : (
          <div className="tienda-layout">
            <TiendaSidebar
              precioMin={precioMin}
              precioMax={precioMax}
              onPrecioMinChange={setPrecioMin}
              onPrecioMaxChange={setPrecioMax}
              onFiltrarPrecio={handleFiltrarPrecio}
              esMaquillaje
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
