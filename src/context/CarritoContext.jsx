import React, { createContext, useContext, useState, useCallback } from 'react';

const CarritoContext = createContext(null);

const OCASIONES = [
  { id: 'san-valentin', nombre: 'San Valentín' },
  { id: 'aniversario', nombre: 'Aniversario' },
  { id: 'cumpleanos', nombre: 'Cumpleaños' },
  { id: 'dia-madre', nombre: 'Día de la madre' },
  { id: 'otra', nombre: 'Otra fecha especial' },
];

export function CarritoProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ocasion, setOcasion] = useState('');
  const [direccionEntrega, setDireccionEntrega] = useState('');
  const [notas, setNotas] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [contactoCliente, setContactoCliente] = useState('');

  const agregar = useCallback((producto, cantidad = 1) => {
    setItems((prev) => {
      const existe = prev.find((p) => p.id === producto.id && p.nombre === producto.nombre);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id && p.nombre === producto.nombre
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  }, []);

  const quitar = useCallback((productoId, nombre) => {
    setItems((prev) => prev.filter((p) => !(p.id === productoId && p.nombre === nombre)));
  }, []);

  const cambiarCantidad = useCallback((productoId, nombre, delta) => {
    setItems((prev) =>
      prev
        .map((p) => {
          if (p.id === productoId && p.nombre === nombre) {
            const nueva = p.cantidad + delta;
            if (nueva <= 0) return null;
            return { ...p, cantidad: nueva };
          }
          return p;
        })
        .filter(Boolean)
    );
  }, []);

  const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);
  const totalPrecio = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  const vaciar = useCallback(() => {
    setItems([]);
    setOcasion('');
    setDireccionEntrega('');
    setNotas('');
    setNombreCliente('');
    setContactoCliente('');
  }, []);

  const valor = {
    items,
    ocasion,
    setOcasion,
    direccionEntrega,
    setDireccionEntrega,
    notas,
    setNotas,
    nombreCliente,
    setNombreCliente,
    contactoCliente,
    setContactoCliente,
    agregar,
    quitar,
    cambiarCantidad,
    totalItems,
    totalPrecio,
    vaciar,
    OCASIONES,
  };

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  return ctx;
}
