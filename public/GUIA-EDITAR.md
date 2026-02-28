# Guía: agregar productos y editar fotos

## ¿Por qué hay dos productos.json (public y dist)?

- **`public/productos.json`** es el archivo que debes **editar siempre**. Ahí cambias precios, nombres, productos nuevos.
- **`dist/productos.json`** es una **copia** que se genera al ejecutar **`npm run build`**. No lo edites: se sobrescribe cada vez que vuelves a hacer build.
- La web en desarrollo (`npm run dev`) usa los archivos de **`public/`**. Al desplegar (Vercel, etc.) se usa la carpeta **`dist/`**, por eso existe esa copia.

**Resumen:** edita solo **`public/productos.json`**. Si cambias algo en `dist/`, se pierde al volver a hacer build.

---

## 1. Agregar más productos

Abre **`public/productos.json`**.

- **Productos de flores (rosas, tulipanes, etc.):** agrégalos dentro del array `"rosas"`.
- **Productos de maquillaje:** agrégalos dentro del array `"maquillaje"`.

Cada producto debe tener estos campos (copia uno existente y cambia los valores):

```json
{
  "id": "re6",
  "nombre": "Nombre del producto",
  "precio": 50,
  "categoria": "rosas",
  "seccion": "rosas",
  "descripcion": "Descripción corta del producto.",
  "imagen": "nombre-del-archivo.jpg"
}
```

- **id:** único para cada producto (ej: `re6`, `re7`, `mq6`).
- **nombre:** texto que se muestra en la tienda.
- **precio:** número (soles).
- **categoria:** `"rosas"` o `"maquillaje"`.
- **seccion:** solo para productos en `"rosas"`. Puede ser: `"rosas"`, `"tulipanes"`, `"girasoles"`, `"ramos-mixto"`, `"tematica"`.
- **descripcion:** texto descriptivo.
- **imagen:** nombre del archivo de la foto (la foto va en la carpeta **`public/productos/`**).
- **imagenes** (opcional): lista de nombres de archivos para **vista previa** con varias fotos de referencia del mismo ramo. Ejemplo: `"imagenes": ["ramo1.jpg", "ramo1-detalle.jpg", "ramo1-caja.jpg"]`. Todas en **`public/productos/`**. Si no pones `imagenes`, en la vista previa se usará solo `imagen`.

Después de editar, guarda el archivo. Las fotos de productos deben estar en **`public/productos/`** con el mismo nombre que pusiste en `"imagen"` (y en `"imagenes"` si lo usas).

---

## 2. Banner de inicio (carrusel de 2–3 imágenes)

Las imágenes del banner **todas van en la carpeta `public/`** (la misma raíz del proyecto).

En **`public/site-config.json`** el banner se configura con una **lista** de nombres de archivo:

```json
"bannerInicio": [
  "banner-inicio.jpg",
  "banner-2.jpg",
  "banner-3.jpg"
]
```

- **banner-inicio.jpg** → primera imagen (ya la tienes en `public/`).
- **banner-2.jpg** → segunda imagen: pon el archivo en **`public/`** con ese nombre.
- **banner-3.jpg** → tercera imagen: pon el archivo en **`public/`** con ese nombre.

Puedes usar 1, 2 o 3 (o más) imágenes. Si solo pones una, no hay animación; si pones varias, cambian solas cada unos segundos y puedes elegir la slide con los puntos debajo del banner.

Para cambiar las fotos: sustituye o añade archivos en **`public/`** y ajusta los nombres en **`site-config.json`** en `"bannerInicio"`.

---

## 3. Fotos de las categorías (Inicio – “Explora por categoría”)

Ahí se muestran dos bloques: **Rosas eternas** y **Maquillaje**.

- **Archivos:** en la carpeta **`public/`** (raíz).
- **Nombres:** los que tenga **`public/site-config.json`** en `"categoriaFlores"` y `"categoriaMaquillaje"`.

Por defecto:

```json
"categoriaFlores": "categoria-flores.jpg",
"categoriaMaquillaje": "categoria-maquillaje.jpg"
```

Pon en **`public/`** las imágenes con esos nombres (o cambia los nombres en `site-config.json` para que coincidan con tus archivos).

---

## 4. Fotos de las secciones (Rosas, Tulipanes, Girasoles, etc.)

Son las tarjetas de la página **Tienda → Flores eternas** (Rosas, Tulipanes, Girasoles, Ramos mixto, Con temática).

- **Carpeta:** **`public/secciones/`**
- **Nombres:** los que tenga **`public/site-config.json`** en `"secciones"`:

```json
"secciones": {
  "rosas": "rosas.jpg",
  "tulipanes": "tulipanes.jpg",
  "girasoles": "girasoles.jpg",
  "ramos-mixto": "ramos-mixto.jpg",
  "tematica": "tematica.jpg"
}
```

Pon en **`public/secciones/`** las imágenes con esos nombres (por ejemplo `rosas.jpg`, `tulipanes.jpg`). Si usas otro nombre, cambia el valor en `site-config.json` para esa sección.

---

## Oferta / descuento de marketing (todos los productos)

Puedes mostrar **“En oferta”** con un porcentaje de descuento **sin cambiar el precio real** que tienes en `productos.json`. El cliente sigue pagando el precio que pusiste; solo se muestra un “antes” tachado y un badge tipo “15% OFF”.

En **`public/site-config.json`** agrega (o edita):

```json
"descuentoOferta": 15
```

- **15** = se muestra “15% OFF” y un precio “antes” tachado en todos los productos. El precio que ves (S/ XX) es el que sigue en **`public/productos.json`**; no hace falta subir ni bajar precios ahí.
- Para **quitar** la oferta: pon **`null`** o borra la línea: `"descuentoOferta": null`

Si no pones `descuentoOferta` o lo dejas en null, no se muestra oferta ni precio tachado.

---

## Resumen de carpetas

| Dónde se ve | Carpeta | Archivo de configuración |
|-------------|---------|---------------------------|
| Productos (nombre, precio, foto) | `public/productos/` | `public/productos.json` |
| Banner página principal | `public/` | `public/site-config.json` → `bannerInicio` |
| Categorías Inicio (Flores / Maquillaje) | `public/` | `public/site-config.json` → `categoriaFlores`, `categoriaMaquillaje` |
| Secciones (Rosas, Tulipanes, etc.) | `public/secciones/` | `public/site-config.json` → `secciones` |

Siempre edita **`public/`**, no la carpeta **`dist/`** (esa se genera al hacer build).
