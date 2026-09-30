/* ══════════════════════════════════════════════════════════
   ADMINISTRADOR DEL PORTAFOLIO
   - Inicia sesión con correo y contraseña (Firebase Auth).
   - Carga portafolio/contenido desde Firestore (o los datos
     de ejemplo si aún no existe) y arma un formulario.
   - "Guardar" escribe el documento completo en Firestore.
   - Las imágenes se suben a Firebase Storage y se guarda su URL.
   ══════════════════════════════════════════════════════════ */
import { modulo, obtenerApp, configurado, leerContenido, guardarContenido } from './firebase.js';
import { DATOS_BASE, PROYECTO_VACIO } from './datos.js';

const $panel    = document.getElementById('panel');
const $acciones = document.getElementById('acciones');
const $toast    = document.getElementById('toast');

let Auth = null;            // módulo firebase-auth (se carga al arrancar)
let estado = null;          // contenido en edición
let pestanaActiva = 'perfil';
let hayCambios = false;

/* ── utilidades ──────────────────────────────────────────── */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clon = o => JSON.parse(JSON.stringify(o));
const obtener = (obj, ruta) => ruta.split('.').reduce((o, k) => o?.[k], obj);
const fijar = (obj, ruta, valor) => {
  const claves = ruta.split('.');
  let o = obj;
  claves.slice(0, -1).forEach((k, i) => {
    if (o[k] == null) o[k] = /^\d+$/.test(claves[i + 1]) ? [] : {};
    o = o[k];
  });
  o[claves.at(-1)] = valor;
};

let temporizadorToast;
function toast(msg, tipo = '') {
  $toast.textContent = msg;
  $toast.className = `visible ${tipo}`;
  clearTimeout(temporizadorToast);
  temporizadorToast = setTimeout(() => { $toast.className = ''; }, 3200);
}

/* ── serialización de listas a texto y viceversa ─────────── */
const aTexto = {
  texto:    v => v ?? '',
  numero:   v => v ?? '',
  lineas:   v => (v || []).join('\n'),
  parrafos: v => (v || []).join('\n\n'),
  entradas: v => (v || []).map(e => [e.fecha, ...(e.lineas || [])].join(' | ')).join('\n'),
  niveles:  v => (v || []).map(n => `${n.nombre} | ${n.nivel}`).join('\n')
};
const deTexto = {
  texto:    t => t.trim(),
  numero:   t => t.trim(),
  lineas:   t => t.split('\n').map(s => s.trim()).filter(Boolean),
  parrafos: t => t.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean),
  entradas: t => t.split('\n').map(s => s.trim()).filter(Boolean).map(l => {
    const [fecha, ...lineas] = l.split('|').map(s => s.trim());
    return { fecha, lineas };
  }),
  niveles:  t => t.split('\n').map(s => s.trim()).filter(Boolean).map(l => {
    const [nombre, nivel] = l.split('|').map(s => s.trim());
    return { nombre, nivel: Math.max(0, Math.min(100, parseInt(nivel, 10) || 0)) };
  })
};

/* ── constructores de campos ─────────────────────────────── */
const campo = (ruta, etiqueta, { tipo = 'texto', ancho = false, ayuda = '', alta = false } = {}) => {
  const valor = esc(aTexto[tipo](obtener(estado, ruta)));
  const multiline = ['lineas', 'parrafos', 'entradas', 'niveles'].includes(tipo) || alta;
  const control = multiline
    ? `<textarea data-ruta="${ruta}" data-tipo="${tipo}" class="${alta || tipo !== 'texto' ? 'alta' : ''}">${valor}</textarea>`
    : `<input type="text" data-ruta="${ruta}" data-tipo="${tipo}" value="${valor}">`;
  return `<div class="campo ${ancho ? 'ancho' : ''}"><label>${etiqueta}</label>${control}${ayuda ? `<span class="ayuda">${ayuda}</span>` : ''}</div>`;
};

const imagen = (ruta, etiqueta, medida) => {
  const url = obtener(estado, ruta) || '';
  return `
  <div class="campo">
    <label>${etiqueta}</label>
    <div class="imagen">
      <div class="previa">${url ? `<img src="${esc(url)}" alt="">` : medida}</div>
      <div class="controles">
        <input type="text" data-ruta="${ruta}" data-tipo="texto" value="${esc(url)}" placeholder="URL de la imagen (o sube un archivo)">
        <input type="file" accept="image/*" data-subir="${ruta}">
        <span class="estado"></span>
      </div>
    </div>
  </div>`;
};

const AYUDA_ENTRADAS = 'Una entrada por línea. Separa con <code>|</code>: <em>fecha | línea 1 | línea 2</em>.';
const AYUDA_NIVELES  = 'Una por línea: <em>Nombre | porcentaje</em> (0 a 100).';

/* ── secciones del formulario ────────────────────────────── */
const seccionPerfil = () => `
<div class="tarjeta"><h2>Portada</h2>
  <div class="grid">
    ${campo('autor', 'Nombre del autor')}
    ${campo('anio', 'Año')}
    ${campo('tituloPortada', 'Título de portada')}
  </div>
</div>
<div class="tarjeta"><h2>Perfil</h2>
  <div class="grid">
    ${imagen('perfil.foto', 'Foto de retrato', '600 × 800')}
    ${campo('perfil.datos.edad', 'Edad')}
    ${campo('perfil.datos.origen', 'Origen')}
    ${campo('perfil.datos.contacto', 'Contacto (correo)')}
    ${campo('perfil.datos.telefono', 'Teléfono')}
    ${campo('perfil.intro', 'Presentación', { ancho: true, alta: true })}
  </div>
</div>`;

const seccionCV = () => `
<div class="tarjeta"><h2>Página izquierda</h2>
  <div class="grid">
    ${campo('perfil.educacion', 'Educación', { tipo: 'entradas', ancho: true, ayuda: AYUDA_ENTRADAS })}
    ${campo('perfil.idiomas', 'Idiomas', { tipo: 'niveles', ayuda: AYUDA_NIVELES })}
    ${campo('perfil.voluntariado', 'Voluntariado', { tipo: 'entradas', ayuda: AYUDA_ENTRADAS })}
  </div>
</div>
<div class="tarjeta"><h2>Página derecha</h2>
  <div class="grid">
    ${campo('perfil.academica', 'Experiencia académica', { tipo: 'entradas', ancho: true, ayuda: AYUDA_ENTRADAS })}
    ${campo('perfil.profesional', 'Experiencia profesional', { tipo: 'entradas', ancho: true, ayuda: AYUDA_ENTRADAS })}
    ${campo('perfil.comisiones', 'Comisiones independientes', { tipo: 'entradas', ancho: true, ayuda: AYUDA_ENTRADAS })}
    ${campo('perfil.cursos', 'Cursos y certificaciones', { tipo: 'entradas', ancho: true, ayuda: AYUDA_ENTRADAS })}
    ${campo('perfil.concursos', 'Concursos', { tipo: 'entradas', ayuda: AYUDA_ENTRADAS })}
    ${campo('perfil.software', 'Softwares', { tipo: 'niveles', ayuda: AYUDA_NIVELES })}
  </div>
</div>`;

const seccionProyectos = () => {
  const lista = estado.proyectos || [];
  if (!lista.length) return `<p class="aviso">No hay proyectos. Pulsa "Añadir proyecto".</p><p style="text-align:center"><button type="button" data-accion="anadir">Añadir proyecto</button></p>`;
  return lista.map((p, i) => {
    const r = `proyectos.${i}`;
    return `
<div class="tarjeta" id="proy-${i}">
  <div class="cabecera-proy">
    <h2><span class="num">${esc(p.num)}</span>${esc(p.titulo || 'Proyecto')}</h2>
    <div class="orden">
      <button type="button" class="chico" data-accion="subir" data-i="${i}" ${i === 0 ? 'disabled' : ''}>↑ Subir</button>
      <button type="button" class="chico" data-accion="bajar" data-i="${i}" ${i === lista.length - 1 ? 'disabled' : ''}>↓ Bajar</button>
      <button type="button" class="chico peligro" data-accion="quitar" data-i="${i}">Quitar</button>
    </div>
  </div>
  <div class="grid">
    ${campo(`${r}.num`, 'Número (01, 02…)')}
    ${campo(`${r}.titulo`, 'Título')}
    ${campo(`${r}.subtitulo`, 'Subtítulo')}
    ${campo(`${r}.tipo`, 'Tipo (aparece en el índice)')}
    ${campo(`${r}.ubicacion`, 'Ubicación')}
    ${campo(`${r}.anio`, 'Año')}
    ${campo(`${r}.duracion`, 'Duración')}
    ${campo(`${r}.colaboracion`, 'Colaboración')}
    ${campo(`${r}.rol`, 'Rol / Tecnologías', { ancho: true })}
    ${campo(`${r}.parrafos`, 'Descripción (ficha)', { tipo: 'parrafos', ancho: true, ayuda: 'Separa los párrafos con una línea en blanco.' })}
    ${campo(`${r}.lista`, 'Lista de módulos', { tipo: 'lineas', ayuda: 'Un elemento por línea.' })}
    <div class="campo">
      <label>Pregunta central</label>
      <input type="text" data-ruta="${r}.pregunta.0" data-tipo="texto" value="${esc(p.pregunta?.[0])}" placeholder="Inicio: ¿Es posible ">
      <input type="text" data-ruta="${r}.pregunta.1" data-tipo="texto" value="${esc(p.pregunta?.[1])}" placeholder="Palabra destacada">
      <input type="text" data-ruta="${r}.pregunta.2" data-tipo="texto" value="${esc(p.pregunta?.[2])}" placeholder="Final: los costos…?">
    </div>
    ${campo(`${r}.desarrollo`, 'Texto de desarrollo', { tipo: 'parrafos', ancho: true, ayuda: 'Separa los párrafos con una línea en blanco.' })}
    ${campo(`${r}.pies`, 'Pies de imagen (4 líneas)', { tipo: 'lineas', ancho: true })}
    ${imagen(`${r}.img.mapa`, 'Mapa o diagrama', '600 × 600')}
    ${imagen(`${r}.img.principal`, 'Imagen principal (y miniatura)', '1200 × 900')}
    ${imagen(`${r}.img.dev.0`, 'Desarrollo 1', '800 × 440')}
    ${imagen(`${r}.img.dev.1`, 'Desarrollo 2', '800 × 440')}
    ${imagen(`${r}.img.dev.2`, 'Desarrollo 3', '900 × 600')}
    ${imagen(`${r}.img.dev.3`, 'Desarrollo 4', '900 × 600')}
  </div>
</div>`;
  }).join('') + `<p style="text-align:center"><button type="button" data-accion="anadir">Añadir proyecto</button></p>`;
};

const seccionContacto = () => `
<div class="tarjeta"><h2>Contraportada</h2>
  <div class="grid">
    ${campo('contacto.correo', 'Correo')}
    ${campo('contacto.telefono', 'Teléfono')}
    ${campo('contacto.ciudad', 'Ciudad')}
    ${campo('contacto.behance', 'Enlace Behance', { ayuda: 'Vacío = sin enlace' })}
    ${campo('contacto.linkedin', 'Enlace LinkedIn')}
    ${campo('contacto.github', 'Enlace GitHub')}
  </div>
</div>`;

/* ── formulario completo ─────────────────────────────────── */
const PESTANAS = [
  ['perfil', 'Portada y perfil', seccionPerfil],
  ['cv', 'Currículum', seccionCV],
  ['proyectos', 'Proyectos', seccionProyectos],
  ['contacto', 'Contacto', seccionContacto]
];

function dibujarFormulario() {
  $panel.innerHTML = `
  <div class="pestanas">${PESTANAS.map(([id, nombre]) =>
    `<button type="button" data-pestana="${id}" class="${id === pestanaActiva ? 'activa' : ''}">${nombre}</button>`).join('')}</div>
  ${PESTANAS.map(([id, , fn]) => `<section class="seccion ${id === pestanaActiva ? 'activa' : ''}" data-seccion="${id}">${fn()}</section>`).join('')}
  <div class="guardar-barra">
    <span class="estado" id="estado-guardado">${hayCambios ? 'Cambios sin guardar' : 'Todo guardado'}</span>
    <button type="button" id="btn-guardar" class="primario">Guardar y publicar</button>
  </div>`;
}

/* lee todos los campos del formulario y actualiza `estado` */
function recoger() {
  $panel.querySelectorAll('[data-ruta]').forEach(el => {
    fijar(estado, el.dataset.ruta, deTexto[el.dataset.tipo || 'texto'](el.value));
  });
}

function marcarCambios() {
  hayCambios = true;
  const e = document.getElementById('estado-guardado');
  if (e) e.textContent = 'Cambios sin guardar';
}

/* ── eventos del formulario ──────────────────────────────── */
$panel.addEventListener('input', e => { if (e.target.matches('[data-ruta]')) marcarCambios(); });

$panel.addEventListener('click', async e => {
  const btn = e.target.closest('button');
  if (!btn) return;

  if (btn.dataset.pestana) {
    pestanaActiva = btn.dataset.pestana;
    $panel.querySelectorAll('.pestanas button').forEach(b => b.classList.toggle('activa', b === btn));
    $panel.querySelectorAll('.seccion').forEach(s => s.classList.toggle('activa', s.dataset.seccion === pestanaActiva));
    return;
  }

  if (btn.id === 'btn-guardar') return guardar();

  const accion = btn.dataset.accion;
  if (!accion) return;
  recoger();
  const i = +btn.dataset.i;
  const lista = estado.proyectos = estado.proyectos || [];
  if (accion === 'anadir') {
    const nuevo = PROYECTO_VACIO();
    nuevo.num = String(lista.length + 1).padStart(2, '0');
    lista.push(nuevo);
  }
  if (accion === 'quitar' && confirm(`¿Quitar el proyecto "${lista[i].titulo}"? Se aplicará al guardar.`)) lista.splice(i, 1);
  if (accion === 'subir' && i > 0) [lista[i - 1], lista[i]] = [lista[i], lista[i - 1]];
  if (accion === 'bajar' && i < lista.length - 1) [lista[i + 1], lista[i]] = [lista[i], lista[i + 1]];
  marcarCambios();
  dibujarFormulario();
  if (accion === 'anadir') document.getElementById(`proy-${lista.length - 1}`)?.scrollIntoView({ behavior: 'smooth' });
});

/* subida de imágenes a Storage */
$panel.addEventListener('change', async e => {
  const input = e.target;
  if (!input.matches('[data-subir]') || !input.files?.[0]) return;
  const archivo = input.files[0];
  const bloque  = input.closest('.imagen');
  const estadoEl = bloque.querySelector('.estado');
  const urlInput = bloque.querySelector('[data-ruta]');
  if (archivo.size > 8 * 1024 * 1024) { estadoEl.textContent = 'Máximo 8 MB.'; return; }
  try {
    estadoEl.textContent = 'Subiendo…';
    const nombre = `portafolio/${Date.now()}-${archivo.name.replace(/[^\w.\-]+/g, '_')}`;
    const { getStorage, ref, uploadBytes, getDownloadURL } = await modulo('storage');
    const destino = ref(getStorage(await obtenerApp()), nombre);
    await uploadBytes(destino, archivo, { contentType: archivo.type });
    const url = await getDownloadURL(destino);
    urlInput.value = url;
    bloque.querySelector('.previa').innerHTML = `<img src="${esc(url)}" alt="">`;
    estadoEl.textContent = 'Imagen subida. Recuerda guardar.';
    marcarCambios();
  } catch (err) {
    console.error(err);
    estadoEl.textContent = 'Error al subir: ' + (err.code || err.message);
  }
});

async function guardar() {
  const btn = document.getElementById('btn-guardar');
  btn.disabled = true;
  try {
    recoger();
    await guardarContenido(estado);
    hayCambios = false;
    document.getElementById('estado-guardado').textContent = 'Todo guardado';
    toast('Portafolio publicado.', 'ok');
  } catch (err) {
    console.error(err);
    toast('No se pudo guardar: ' + (err.code || err.message), 'error');
  } finally {
    btn.disabled = false;
  }
}

/* ── login ───────────────────────────────────────────────── */
function dibujarLogin(auth) {
  $acciones.innerHTML = `<a class="btn" href="./">Ver sitio</a>`;
  $panel.innerHTML = `
  <form class="login" id="form-login">
    <h1>Iniciar sesión</h1>
    <div class="campo"><label>Correo</label><input type="email" name="correo" required autocomplete="username"></div>
    <div class="campo" style="margin-top:10px"><label>Contraseña</label><input type="password" name="clave" required autocomplete="current-password"></div>
    <div class="error" id="login-error"></div>
    <button type="submit" class="primario" style="width:100%;margin-top:6px">Entrar</button>
    <p class="nota" style="margin-top:14px">El usuario se crea en la consola de Firebase → Authentication → Users.</p>
  </form>`;
  document.getElementById('form-login').addEventListener('submit', async e => {
    e.preventDefault();
    const f = e.target;
    const err = document.getElementById('login-error');
    err.textContent = '';
    try {
      await Auth.signInWithEmailAndPassword(auth, f.correo.value.trim(), f.clave.value);
    } catch (ex) {
      err.textContent = ({
        'auth/invalid-credential': 'Correo o contraseña incorrectos.',
        'auth/user-not-found': 'Ese usuario no existe.',
        'auth/wrong-password': 'Contraseña incorrecta.',
        'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos.'
      })[ex.code] || 'No se pudo iniciar sesión (' + ex.code + ').';
    }
  });
}

function dibujarSinConfigurar() {
  $panel.innerHTML = `
  <div class="tarjeta">
    <h2>Falta configurar Firebase</h2>
    <p class="nota">Este panel necesita un proyecto de Firebase. Pasos:</p>
    <ol class="nota" style="padding-left:18px;line-height:1.9">
      <li>Crea un proyecto en <a href="https://console.firebase.google.com" target="_blank" rel="noopener">console.firebase.google.com</a>.</li>
      <li>Activa <b>Authentication</b> (correo/contraseña) y crea tu usuario administrador.</li>
      <li>Activa <b>Firestore</b> y <b>Storage</b>.</li>
      <li>Copia la configuración web del proyecto en <code>js/firebase-config.js</code>.</li>
      <li>Despliega con <code>firebase deploy</code> (ver README.md).</li>
    </ol>
  </div>`;
}

/* ── arranque ────────────────────────────────────────────── */
if (!configurado) {
  dibujarSinConfigurar();
} else {
  Auth = await modulo('auth');
  const auth = Auth.getAuth(await obtenerApp());
  Auth.onAuthStateChanged(auth, async usuario => {
    if (!usuario) { estado = null; dibujarLogin(auth); return; }
    $acciones.innerHTML = `
      <span class="usuario">${esc(usuario.email)}</span>
      <a class="btn" href="./" target="_blank" rel="noopener">Ver sitio</a>
      <button type="button" id="btn-ejemplo" class="chico">Cargar ejemplo</button>
      <button type="button" id="btn-salir" class="chico">Salir</button>`;
    document.getElementById('btn-salir').onclick = () => {
      if (!hayCambios || confirm('Hay cambios sin guardar. ¿Salir de todos modos?')) Auth.signOut(auth);
    };
    document.getElementById('btn-ejemplo').onclick = () => {
      if (!confirm('Esto reemplaza el formulario con los datos de ejemplo (no se guarda hasta pulsar Guardar). ¿Continuar?')) return;
      estado = clon(DATOS_BASE); marcarCambios(); dibujarFormulario();
    };
    $panel.innerHTML = '<p class="aviso">Cargando contenido…</p>';
    try {
      const guardado = await leerContenido();
      estado = clon(guardado || DATOS_BASE);
      if (!guardado) toast('Aún no hay contenido publicado: se muestran los datos de ejemplo.');
    } catch (err) {
      console.error(err);
      estado = clon(DATOS_BASE);
      toast('No se pudo leer Firestore: ' + (err.code || err.message), 'error');
    }
    hayCambios = false;
    dibujarFormulario();
  });
}

addEventListener('beforeunload', e => { if (hayCambios) { e.preventDefault(); e.returnValue = ''; } });
