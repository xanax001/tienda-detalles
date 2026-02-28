import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import ProductoCard from '../components/ProductoCard';
import AnimateInView from '../components/AnimateInView';

const BANNER_INTERVAL_MS = 4500;

function useProductosInicio() {
  const { rosas, maquillaje, loading } = useProductos();
  const todos = useMemo(() => {
    const r = (rosas || []).map((p) => ({ ...p, categoria: 'rosas' }));
    const m = (maquillaje || []).map((p) => ({ ...p, categoria: 'maquillaje' }));
    return [...r, ...m];
  }, [rosas, maquillaje]);
  const nuevos = useMemo(() => todos.slice(0, 8), [todos]);
  const destacados = useMemo(() => todos.slice(8, 16).length > 0 ? todos.slice(8, 16) : todos.slice(0, 6), [todos]);
  return { nuevos, destacados, loading };
}

export default function Inicio() {
  const { nuevos, destacados, loading } = useProductosInicio();
  const { bannerInicio, categoriaFlores, categoriaMaquillaje } = useSiteConfig();
  const [bannerIndex, setBannerIndex] = useState(0);
  const imagenes = Array.isArray(bannerInicio) ? bannerInicio : (bannerInicio ? [bannerInicio] : []);
  const tieneCarrusel = imagenes.length > 1;

  useEffect(() => {
    if (!tieneCarrusel) return;
    const t = setInterval(() => {
      setBannerIndex((i) => (i + 1) % imagenes.length);
    }, BANNER_INTERVAL_MS);
    return () => clearInterval(t);
  }, [tieneCarrusel, imagenes.length]);

  return (
    <div className="inicio-estilo inicio-estilo--ordenado">
      <section className={`inicio-banner inicio-banner--carrusel ${imagenes.length ? 'inicio-banner--con-imagen' : ''}`}>
        <div className="inicio-banner-fondo">
          {imagenes.map((img, i) => (
            <div
              key={img}
              className={`inicio-banner-slide ${i === bannerIndex ? 'activo' : ''}`}
              style={{ backgroundImage: `url(/${img})` }}
              aria-hidden={i !== bannerIndex}
            />
          ))}
        </div>
        <div className="inicio-banner-overlay" />
        <div className="container inicio-banner-content">
          <p className="inicio-banner-categoria">Categoría productos</p>
          <h1 className="inicio-banner-titulo">Nuevos productos</h1>
        </div>
        {tieneCarrusel && (
          <div className="inicio-banner-dots" role="tablist" aria-label="Slides del banner">
            {imagenes.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === bannerIndex}
                aria-label={`Ir a imagen ${i + 1}`}
                className={`inicio-banner-dot ${i === bannerIndex ? 'activo' : ''}`}
                onClick={() => setBannerIndex(i)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="inicio-seccion inicio-seccion--caja">
        <div className="container">
          <header className="inicio-seccion-header">
            <h2 className="inicio-seccion-titulo">Nuevos productos</h2>
            <p className="inicio-seccion-desc">Descubre nuestros ramos y detalles recientes.</p>
          </header>
          {loading ? (
            <p className="productos-loading">Cargando...</p>
          ) : nuevos.length === 0 ? (
            <div className="inicio-vacio">
              <p className="productos-vacio">Pronto tendremos productos. Mientras tanto explora la tienda.</p>
              <div className="inicio-ctas">
                <Link to="/rosas-eternas" className="btn btn-primario">Ver rosas eternas</Link>
                <Link to="/maquillaje" className="btn btn-secundario">Ver maquillaje</Link>
              </div>
            </div>
          ) : (
            <div className="productos-grid productos-grid--inicio">
              {nuevos.map((p, i) => (
                <AnimateInView key={p.id} className="productos-grid-item" delay={i * 60}>
                  <ProductoCard producto={p} compacto />
                </AnimateInView>
              ))}
            </div>
          )}
        </div>
      </section>

      {destacados.length > 0 && (
        <section className="inicio-seccion inicio-seccion--destacados inicio-seccion--caja">
          <div className="container">
            <header className="inicio-seccion-header">
              <h2 className="inicio-seccion-titulo">Más vendidos</h2>
              <p className="inicio-seccion-desc">Los favoritos de nuestros clientes.</p>
            </header>
            <div className="productos-grid productos-grid--inicio">
              {destacados.map((p, i) => (
                <AnimateInView key={p.id} className="productos-grid-item" delay={i * 60}>
                  <ProductoCard producto={p} compacto />
                </AnimateInView>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="inicio-ctas-seccion">
        <div className="container">
          <header className="inicio-seccion-header inicio-seccion-header--centro">
            <p className="inicio-ctas-texto">Explora por categoría</p>
          </header>
          <div className="inicio-categorias-grid">
            <Link to="/rosas-eternas" className="inicio-categoria-card">
              <div className="inicio-categoria-imagen">
                {categoriaFlores ? (
                  <img src={`/${categoriaFlores}`} alt="" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.add('visible'); }} />
                ) : null}
                <span className={`inicio-categoria-icon inicio-categoria-icon--flores ${!categoriaFlores ? 'visible' : ''}`} aria-hidden />
              </div>
              <span className="inicio-categoria-nombre">Rosas eternas</span>
            </Link>
            <Link to="/maquillaje" className="inicio-categoria-card">
              <div className="inicio-categoria-imagen">
                {categoriaMaquillaje ? (
                  <img src={`/${categoriaMaquillaje}`} alt="" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.add('visible'); }} />
                ) : null}
                <span className={`inicio-categoria-icon inicio-categoria-icon--maq ${!categoriaMaquillaje ? 'visible' : ''}`} aria-hidden />
              </div>
              <span className="inicio-categoria-nombre">Maquillaje</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
