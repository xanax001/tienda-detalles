Fotos de las secciones (Rosas, Tulipanes, Girasoles, Ramos mixto, Con temática)
================================================================================

Pon aquí las imágenes. El nombre del archivo debe coincidir EXACTAMENTE
con lo que tienes en public/site-config.json en "secciones".

Nombres que usa site-config.json por defecto:
  rosas.jpg
  tulipanes.jpg
  girasoles.jpg
  ramos-mixto.jpg    <-- con GUION, sin espacio (ramos-mixto)
  tematica.jpg       <-- sin tilde (tematica, no temática)

Si las dos últimas (Ramos mixto, Con temática) no se ven:
  1. Revisa que los archivos estén en esta carpeta: public/secciones/
  2. Nombres exactos: ramos-mixto.jpg y tematica.jpg (minúsculas).
  3. Si tus archivos tienen otro nombre (ej. "Ramos mixto.jpg"), edita
     public/site-config.json y en "secciones" pon ese nombre:
     "ramos-mixto": "Ramos mixto.jpg"
     "tematica": "tu-archivo.jpg"

Después de cambiar archivos o site-config.json, vuelve a ejecutar
"npm run build" si estás viendo la carpeta dist.
