# Portafolio · Leider Tisnado Mego

Portafolio editorial en HTML, CSS y JavaScript puro, publicado en **Firebase Hosting**
con un **panel de administración** (`/admin`) para editar textos, proyectos e imágenes
sin tocar código.

## Estructura

```
public/
  index.html          → sitio público (19 líneas; todo lo demás es CSS y JS)
  admin.html          → administrador (18 líneas)
  css/estilos.css     → diseño del libro
  css/admin.css       → diseño del administrador
  js/firebase-config.js → PEGA AQUÍ la configuración de tu proyecto
  js/firebase.js      → conexión a Firestore (lee/escribe portafolio/contenido)
  js/datos.js         → contenido de ejemplo (se usa si Firestore está vacío)
  js/app.js           → dibuja el portafolio a partir de los datos
  js/admin.js         → login, formulario, subida de imágenes y guardado
firebase.json         → configuración de Hosting, Firestore y Storage
firestore.rules       → lectura pública, escritura solo con sesión iniciada
storage.rules         → imágenes públicas, subida solo con sesión iniciada
```

## Cómo funciona

1. El sitio público lee el documento `portafolio/contenido` en Firestore.
2. Si no existe (o Firebase no está configurado), muestra los datos de `js/datos.js`.
3. En `/admin` inicias sesión, editas todo en un formulario y pulsas
   **Guardar y publicar**. El cambio se ve en internet al instante, sin volver a desplegar.
4. Las imágenes se suben a Firebase Storage desde el mismo formulario.

## Puesta en marcha (una sola vez)

1. **Crear el proyecto** en <https://console.firebase.google.com> (plan gratuito Spark es suficiente).
2. **Authentication** → Método de acceso → activar *Correo electrónico/contraseña*.
   Luego en *Users* → *Add user*: crea tu correo y contraseña de administrador.
3. **Firestore Database** → Crear base de datos (modo producción; las reglas se suben desde este repo).
4. **Storage** → Comenzar (las reglas también se suben desde este repo).
5. **Configuración del proyecto** → *Tus apps* → añadir app **Web** → copiar el objeto
   `firebaseConfig` y pegarlo en `public/js/firebase-config.js`.
6. Poner el ID del proyecto en `.firebaserc` (reemplaza `TU-PROYECTO`).
7. Instalar la CLI y desplegar:

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

Al terminar verás la URL pública, por ejemplo `https://TU-PROYECTO.web.app`.
El administrador queda en `https://TU-PROYECTO.web.app/admin`.

8. Entra al administrador, revisa el contenido de ejemplo y pulsa **Guardar y publicar**
   para crear el documento en Firestore.

## Editar más adelante

Solo entra a `/admin`, cambia lo que necesites y guarda. No hace falta volver a
ejecutar `firebase deploy` salvo que cambies el diseño (CSS/JS).

## Probar en local

```bash
firebase serve
```

o cualquier servidor estático dentro de `public/` (los módulos ES no funcionan abriendo el archivo con doble clic).

## Formato de los campos de lista en el administrador

| Campo | Formato |
|---|---|
| Educación, experiencia, cursos… | Una entrada por línea: `fecha \| línea 1 \| línea 2` |
| Idiomas y softwares | Una por línea: `Nombre \| porcentaje` |
| Párrafos | Separados por una línea en blanco |
| Lista de módulos, pies de imagen | Un elemento por línea |
