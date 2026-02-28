import React, { createContext, useContext, useState, useEffect } from 'react';
import { productosFallback } from '../data/productosFallback';

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(productosFallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/productos.json')
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo cargar productos.json');
        return res.json();
      })
      .then((data) => {
        const rosas = Array.isArray(data.rosas) ? data.rosas : [];
        const maquillaje = Array.isArray(data.maquillaje) ? data.maquillaje : [];
        setProductos({ rosas, maquillaje });
      })
      .catch(() => {
        setProductos(productosFallback);
        setError('Usando lista por defecto. Edita public/productos.json para cambiar.');
      })
      .finally(() => setLoading(false));
  }, []);

  const value = {
    rosas: productos.rosas,
    maquillaje: productos.maquillaje,
    loading,
    error,
  };

  return (
    <ProductosContext.Provider value={value}>
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  const ctx = useContext(ProductosContext);
  if (!ctx) throw new Error('useProductos debe usarse dentro de ProductosProvider');
  return ctx;
}
