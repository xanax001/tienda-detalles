import React, { useState, useEffect } from 'react';

/** Intenta cargar la imagen; si falla, prueba nombres alternativos (p. ej. con espacio o guión bajo). */
const ALTERNATIVOS = {
  'ramos-mixto': ['ramos_mixto.jpg', 'ramos mixto.jpg', 'Ramos mixto.jpg', 'ramos-mixto.JPG'],
  'tematica': ['temática.jpg', 'con-tematica.jpg', 'tematica.JPG'],
};

export default function ImgSeccion({ seccionId, nombreArchivo, className, alt, onTodoFallido }) {
  const [srcIndex, setSrcIndex] = useState(0);
  const alternativos = ALTERNATIVOS[seccionId] || [];
  const todas = [nombreArchivo, ...alternativos].filter(Boolean);
  const src = todas[srcIndex] ? `/secciones/${todas[srcIndex]}` : null;

  const handleError = () => {
    if (srcIndex < todas.length - 1) {
      setSrcIndex((i) => i + 1);
    } else if (onTodoFallido) {
      onTodoFallido();
    }
  };

  useEffect(() => {
    if (!nombreArchivo) return;
    setSrcIndex(0);
  }, [nombreArchivo, seccionId]);

  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt || ''}
      className={className}
      onError={handleError}
    />
  );
}
