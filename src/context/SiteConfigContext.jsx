import React, { createContext, useContext, useState, useEffect } from 'react';

const SiteConfigContext = createContext(null);

const defaultConfig = {
  bannerInicio: null,
  categoriaFlores: null,
  categoriaMaquillaje: null,
  secciones: {},
  descuentoOferta: null,
};

export function SiteConfigProvider({ children }) {
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    fetch('/site-config.json')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        const raw = data.bannerInicio;
        const bannerInicio = raw == null ? null : Array.isArray(raw) ? raw.filter(Boolean) : [raw];
        const desc = data.descuentoOferta;
        const num = typeof desc === 'number' ? desc : (typeof desc === 'string' ? parseInt(desc, 10) : NaN);
        const descuentoOferta = (num > 0 && num < 100) ? num : null;
        setConfig({
          bannerInicio: bannerInicio && bannerInicio.length > 0 ? bannerInicio : null,
          categoriaFlores: data.categoriaFlores || null,
          categoriaMaquillaje: data.categoriaMaquillaje || null,
          secciones: data.secciones || {},
          descuentoOferta,
        });
      })
      .catch(() => setConfig(defaultConfig));
  }, []);

  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const ctx = useContext(SiteConfigContext);
  return ctx || defaultConfig;
}
