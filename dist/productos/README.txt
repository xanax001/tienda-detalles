IMÁGENES DE PRODUCTOS
=====================

1. Pon aquí las fotos de cada producto (JPG o PNG).
   Ejemplo: ramobuchon.jpg, rosa-domo.jpg, etc.

2. En la carpeta del proyecto abre: public/productos.json

3. En cada producto, el campo "imagen" debe ser exactamente el nombre del archivo:
   "imagen": "ramobuchon.jpg"   →  el archivo debe llamarse ramobuchon.jpg y estar en esta carpeta

4. Para cambiar nombre, descripción o precio de un producto, edita public/productos.json:
   - "nombre": "El nombre que se muestra"
   - "descripcion": "La descripción del producto"
   - "precio": 45
   - "imagen": "foto.jpg"   (nombre del archivo en esta carpeta)

IMPORTANTE: Edita siempre public/productos.json (no la carpeta dist).
La carpeta dist se genera al hacer "npm run build".

Tamaño sugerido para fotos: 600x450 px o similar.
