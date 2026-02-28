import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';
import { useSiteConfig } from '../context/SiteConfigContext';
import AnimateInView from '../components/AnimateInView';
import ImgSeccion from '../components/ImgSeccion';
import { SECCIONES_RAMOS } from '../data/seccionesRamos';

function countBySeccion(productos) {
  const counts = {};
  SECCIONES_RAMOS.forEach((s) => { counts[s.id] = 0; });
  (productos || []).forEach((p) => {
    const sec = p.seccion || 'rosas';
    if (counts[sec] !== undefined) counts[sec]++;
  });
  return counts;
}

export default function FloresEternasIndex() {
  const { rosas, loading } = useProductos();
  const { secciones: seccionesImagenes } = useSiteConfig();
  const [imagenFallida, setImagenFallida] = useState({});
  const cantidades = useMemo(() => countBySeccion(rosas), [rosas]);

  return (
    <section className="pagina-flores-index pagina-flores-index--ordenada">
      <div className="container">
        <header className="flores-index-header">
          <AnimateInView>
            <h1 className="flores-index-titulo">Flores eternas</h1>
            <p className="flores-index-subtitulo">Elige un apartado y descubre</p>
            <ul className="flores-index-lista-categorias" aria-hidden>
              {SECCIONES_RAMOS.map((s) => (
                <li key={s.id}>{s.nombre.toLowerCase()}</li>
              ))}
            </ul>
          </AnimateInView>
        </header>

        {loading ? (
          <p className="productos-loading">Cargando...</p>
        ) : (
          <div className="flores-apartados flores-apartados--grid">
            {SECCIONES_RAMOS.map((seccion, idx) => {
              const imgSeccion = seccionesImagenes[seccion.id];
              return (
                <AnimateInView key={seccion.id} delay={idx * 80}>
                  <Link
                    to={`/rosas-eternas/${seccion.id}`}
                    className="flores-apartado-card flores-apartado-card--foto"
                    style={{ '--apartado-gradiente': seccion.gradiente }}
                  >
                    <div className="flores-apartado-foto">
                      {imgSeccion && !imagenFallida[seccion.id] ? (
                        <ImgSeccion
                          seccionId={seccion.id}
                          nombreArchivo={imgSeccion}
                          className="flores-apartado-foto-img"
                          onTodoFallido={() => setImagenFallida((f) => ({ ...f, [seccion.id]: true }))}
                        />
                      ) : null}
                      <span className={`flores-apartado-icon ${!imgSeccion || imagenFallida[seccion.id] ? 'visible' : ''}`} aria-hidden />
                    </div>
                    <div className="flores-apartado-body">
                      <h2 className="flores-apartado-titulo">{seccion.nombre}</h2>
                      <p className="flores-apartado-desc">{seccion.descripcion}</p>
                      <span className="flores-apartado-count">
                        {(cantidades[seccion.id] || 0)} producto{(cantidades[seccion.id] || 0) !== 1 ? 's' : ''}
                      </span>
                      <span className="flores-apartado-arrow" aria-hidden>→</span>
                    </div>
                  </Link>
                </AnimateInView>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
