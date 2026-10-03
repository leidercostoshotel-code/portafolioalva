/* ══════════════════════════════════════════════════════════
   SITIO PÚBLICO
   1. Lee el contenido desde Firestore (portafolio/contenido).
   2. Si no hay Firebase o el documento no existe, usa DATOS_BASE.
   3. Dibuja todos los spreads del libro dentro de #app.
   ══════════════════════════════════════════════════════════ */
import { DATOS_BASE } from './datos.js';
import { leerContenido, configurado } from './firebase.js';

/* ── utilidades ──────────────────────────────────────────── */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
/* texto escapado que admite **negrita** escrita en el administrador */
const rico = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
const pad = n => String(n).padStart(2, '0');
const ph  = (texto, src, clase = '') =>
  `<div class="ph ${clase}">${src ? `<img src="${esc(src)}" alt="${esc(texto.replace(/<br>/g,' '))}" loading="lazy">` : texto}</div>`;
const entradas = lista => (lista || []).map(e =>
  `<div class="entrada"><span class="fecha">${esc(e.fecha)}</span><br>${(e.lineas || []).map(esc).join('<br>')}</div>`).join('');
/* sección con título; se omite por completo si la lista está vacía */
const bloque = (titulo, lista, extra = '') =>
  (lista && lista.length) ? `<div class="bloque"><h2 class="t-seccion">${titulo}</h2>${entradas(lista)}${extra}</div>` : '';
const seccionDer = (titulo, lista) =>
  (lista && lista.length) ? `<h2 class="t-seccion">${titulo}</h2>${entradas(lista)}` : '';

/* ── ilustraciones ───────────────────────────────────────── */
const SVG_PORTADA = `
<svg viewBox="0 0 264 380" fill="none" stroke="#777" stroke-width=".6" stroke-linejoin="round">
  <g opacity=".55">
    <path d="M0 60 L264 212 M0 90 L264 242 M0 120 L264 272 M0 150 L264 302 M0 180 L264 332 M0 210 L264 362 M0 240 L264 392"/>
    <path d="M264 60 L0 212 M264 90 L0 242 M264 120 L0 272 M264 150 L0 302 M264 180 L0 332 M264 210 L0 362 M264 30 L0 182 M264 0 L0 152"/>
  </g>
  <g stroke="#666">
    <path d="M92 150 L152 116 L212 150 L152 184 Z"/>
    <path d="M92 150 L92 214 L152 248 L212 214 L212 150 M152 184 L152 248"/>
    <path d="M104 136 L104 96 L164 62 L224 96 L224 136 M164 62 L164 102 M104 96 L164 130 L224 96 M164 130 L164 170"/>
    <path d="M40 200 L70 183 L100 200 L70 217 Z M40 200 L40 232 L70 249 L100 232 L100 200 M70 217 L70 249"/>
    <path d="M176 232 L206 215 L236 232 L206 249 Z M176 232 L176 258 L206 275 L236 258 L236 232 M206 249 L206 275"/>
  </g>
  <g stroke="#888">
    <path d="M120 300 L150 282 L180 296 L210 270 L240 284"/>
    <path d="M120 316 L150 300 L180 312 L210 288 L240 300"/>
    <path d="M120 332 L150 318 L180 328 L210 306 L240 316"/>
    <circle cx="150" cy="282" r="1.4"/><circle cx="210" cy="270" r="1.4"/><circle cx="180" cy="312" r="1.4"/>
  </g>
  <g stroke="#999" stroke-width=".4">
    <path d="M30 120 L30 260 M26 120 L34 120 M26 260 L34 260"/>
    <path d="M92 330 L212 330 M92 326 L92 334 M212 326 L212 334"/>
  </g>
</svg>`;

const esquema = i => `
<svg viewBox="0 0 240 70" fill="none" stroke="#777" stroke-width=".6" aria-hidden="true">
  <rect x="10" y="${14+i*2}" width="220" height="${42-i*2}"/>
  <path d="M10 ${30+i*3} H230 M10 ${44+i} H230"/>
  <path d="M${60+i*8} 14 V56 M${120+i*6} 14 V56 M${180-i*4} 14 V56"/>
  <path d="M20 62 L40 50 L70 58 L100 44 L130 52 L160 40 L190 48 L220 36" stroke="#999"/>
  <path d="M10 66 H230" stroke="#bbb" stroke-dasharray="2 2"/>
</svg>`;

const seccion = i => {
  const pisos = 3 + (i % 3);
  let f = '';
  for (let p = 0; p < pisos; p++) {
    const y = 150 - p * 26;
    f += `<path d="M120 ${y} H520" /><path d="M${130+p*10} ${y} V${y-26}" stroke-dasharray="1 2"/>`;
  }
  const top = 150 - (pisos - 1) * 26;
  return `
<svg viewBox="0 0 640 220" fill="none" stroke="#777" stroke-width=".6" stroke-linejoin="round" aria-hidden="true">
  <path d="M20 176 H620" stroke="#444"/>
  <path d="M20 180 H620 M20 184 H620" stroke="#ccc"/>
  <g>${f}</g>
  <path d="M120 176 V${top-18} H520 V176"/>
  <path d="M120 ${top-18} L200 ${top-30} H440 L520 ${top-18}" stroke="#555"/>
  <path d="M150 176 L190 ${150-(pisos-2)*26} M190 ${150-(pisos-2)*26} L230 176" stroke="#999"/>
  <path d="M330 176 V${top} M300 176 V${top} M360 176 V${top}" stroke="#999"/>
  <g stroke="#bbb" stroke-width=".4">
    <path d="M60 176 V${top-18} M56 176 H64 M56 ${top-18} H64"/>
    <path d="M120 200 H520 M120 196 V204 M520 196 V204"/>
  </g>
  <g stroke="#aaa"><path d="M540 176 c0-20 10-30 20-30 s20 10 20 30 M560 176 v-30"/>
  <path d="M40 176 c0-14 8-22 16-22 s16 8 16 22 M56 176 v-22"/></g>
</svg>`;
};

/* ── SPREAD 0: portada ───────────────────────────────────── */
const spreadPortada = d => `
<header class="spread-wrap">
  <section class="spread simple" id="portada" aria-label="Portada">
    <div class="pagina">
      <span class="vertical">Portafolio ${esc(d.anio)}</span>
      <div class="ilustracion" aria-hidden="true">${SVG_PORTADA}</div>
      <div class="titulo"><h1>${esc(d.tituloPortada || 'Portfolio')}</h1><p>${esc(d.autor)}<span class="anio">${esc(d.anio)}</span></p></div>
    </div>
  </section>
</header>`;

/* ── SPREAD 1: perfil / CV ───────────────────────────────── */
const spreadCV = d => {
  const p = d.perfil || {};
  const dt = p.datos || {};
  return `
<div class="spread-wrap">
<section class="spread" id="cv" aria-label="Perfil y currículum" data-titulo="Perfil">
  <div class="pagina izq">
    <span class="autor-mini">${esc(d.autor)}</span>
    ${ph('Foto de retrato<br>600 × 800', p.foto, 'retrato')}
    <p class="cuerpo">${esc(p.intro)}</p>
    <dl class="datos">${[['Edad', dt.edad], ['Origen', dt.origen], ['Contacto', dt.contacto], ['Teléfono', dt.telefono]]
      .filter(([, v]) => v).map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
    ${bloque('Educación', p.educacion)}
    ${(p.idiomas || []).length ? `<div class="bloque"><h2 class="t-seccion">Idiomas</h2>
      ${p.idiomas.map(i => `<div class="idioma"><span>${esc(i.nombre)}</span><span class="barra"><i style="width:${+i.nivel || 0}%"></i></span></div>`).join('')}
    </div>` : ''}
    ${bloque('Voluntariado', p.voluntariado)}
  </div>
  <div class="pagina der">
    <div>
      ${seccionDer('Experiencia académica', p.academica)}
      ${seccionDer('Experiencia profesional', p.profesional)}
    </div>
    <div>
      ${seccionDer('Comisiones independientes', p.comisiones)}
      ${seccionDer('Cursos y certificaciones', p.cursos)}
      ${seccionDer('Concursos', p.concursos)}
      ${(p.software || []).length ? `<h2 class="t-seccion">Softwares</h2>
      <div class="software">${p.software.map(s => `<span>${esc(s.nombre)}</span><span>${+s.nivel || 0}%</span>`).join('')}</div>` : ''}
    </div>
  </div>
</section>
</div>`;
};

/* ── SPREAD 2: índice ────────────────────────────────────── */
const spreadIndice = d => `
<div class="spread-wrap">
<section class="spread" id="indice" aria-label="Índice de proyectos" data-titulo="Índice">
  <div class="pagina izq"><span class="cabecera">Índice</span></div>
  <div class="pagina der"><span class="cabecera">Proyectos seleccionados</span></div>
  <nav class="grilla" aria-label="Proyectos">${(d.proyectos || []).map(p => `
    <a class="tarjeta" href="#proyecto-${esc(p.num)}">
      <span class="num">${esc(p.num)}</span>
      <div class="mini">${ph(`Miniatura<br>${esc(p.num)}`, p.img?.principal)}</div>
      <span class="nombre">${esc(p.titulo)}</span>
      <div class="tipo">${esc(p.tipo)}</div>
    </a>`).join('')}
  </nav>
</section>
</div>`;

/* ── SPREADS DE PROYECTO ─────────────────────────────────── */
const spreadFicha = (p, i) => {
  const datos = [['Ubicación', p.ubicacion], ['Área', p.area], ['Año', p.anio], ['Duración', p.duracion],
                 ['Colaboración', p.colaboracion], ['Estructura', p.estructura], ['Rol / Tecnologías', p.rol]]
    .filter(([, v]) => v)
    /* si el valor empieza por "Etiqueta: …", esa etiqueta sustituye a la del campo */
    .map(([k, v]) => { const m = String(v).match(/^([^:*\d]{2,30}):\s+(.+)$/s); return m ? [m[1].trim(), m[2]] : [k, v]; })
    .map(([k, v]) => `<b>${k}:</b> ${rico(v)}`).join('<br>');
  return `
<div class="spread-wrap">
<article class="spread ficha-proy" id="proyecto-${esc(p.num)}" data-titulo="${esc(p.titulo)}">
  <div class="pagina izq">
    <h2 class="t-proyecto">${esc(p.titulo)}</h2>
    <p class="st-proyecto">${esc(p.subtitulo)}</p>
    <div class="ficha">${datos}</div>
    <div class="fila">
      <figure class="mapa">
        ${ph(`Mapa o diagrama<br>proyecto ${esc(p.num)}<br>600 × 600`, p.img?.mapa)}
        <figcaption class="pie"><span>Plano de ubicación</span><span>Escala 1:1000</span></figcaption>
      </figure>
      ${(p.parrafos || []).map(t => `<p class="cuerpo">${rico(t)}</p>`).join('')}
    </div>
    ${(p.lista || []).length ? `<ol class="lista">${p.lista.map((l, n) => `<li>${n+1}. ${esc(l)}</li>`).join('')}</ol>` : ''}
  </div>
  <div class="pagina der">
    <div class="marco">
      <span class="num-proyecto">${esc(p.num)}</span>
      ${ph(`Imagen principal<br>proyecto ${esc(p.num)}<br>1200 × 900`, p.img?.principal)}
    </div>
  </div>
</article>
</div>`;
};

const spreadPregunta = (p, i) => {
  const q = p.pregunta || ['', '', ''];
  const img = p.img?.pregunta;
  return `
<div class="spread-wrap">
<article class="spread pregunta ${img ? 'con-imagen' : ''}" data-titulo="${esc(p.titulo)}">
  <div class="pagina izq"></div>
  <div class="pagina der"></div>
  <div class="centro">
    ${img ? `<div class="panoramica"><img src="${esc(img)}" alt="${esc(p.titulo)}" loading="lazy"></div>` : seccion(i + 1)}
    <p class="frase">${esc(String(q[0] || '').trim())} <b>${esc(String(q[1] || '').trim())}</b> ${esc(String(q[2] || '').trim())}</p>
    ${p.textoPregunta ? `<p class="cuerpo texto-pregunta">${rico(p.textoPregunta)}</p>` : ''}
  </div>
</article>
</div>`;
};

const spreadDesarrollo = p => {
  const pies = p.pies || [];
  const dev  = p.img?.dev || [];
  return `
<div class="spread-wrap">
<article class="spread desarrollo" data-titulo="${esc(p.titulo)}">
  <div class="pagina izq">
    <div class="fila">
      <div class="apilados">
        ${[0, 1, 2].map(i => ph(`${esc(pies[i] || 'Imagen')}<br>800 × 440`, dev[i])).join('')}
      </div>
      <div>${(p.desarrollo || []).map(t => `<p class="cuerpo">${rico(t)}</p>`).join('')}</div>
    </div>
  </div>
  <div class="pagina der">
    <div class="grilla2">
      ${[3, 4, 5, 6].map(i => `<figure>${ph(`${esc(pies[i] || 'Imagen')}<br>900 × 600`, dev[i])}<figcaption>${esc(pies[i] || '')}</figcaption></figure>`).join('')}
    </div>
  </div>
</article>
</div>`;
};

/* ── SPREAD FINAL: contacto ──────────────────────────────── */
const ICONOS = {
  behance:  '<svg viewBox="0 0 24 24"><path d="M3 5h6a3 3 0 0 1 0 6H3zM3 11h7a3.5 3.5 0 0 1 0 7H3zM15 13h7a3.5 3.5 0 0 0-7 0zM15 13a3.5 3.5 0 0 0 6.5 2M16 6h5"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18"/><path d="M7 10v7M7 7v.5M11 17v-7M11 13a3 3 0 0 1 6 0v4"/></svg>',
  github:   '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-3 17.5v-2.4c-2.5.5-3-1.2-3-1.2-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4 1 1.4 1 .8 1.4 2.2 1 2.7.8.1-.6.3-1 .6-1.2-2.1-.2-4.2-1-4.2-4.5 0-1 .3-1.8.9-2.4-.1-.3-.4-1.2.1-2.5 0 0 .8-.2 2.5.9a8.7 8.7 0 0 1 4.6 0c1.7-1.1 2.5-.9 2.5-.9.5 1.3.2 2.2.1 2.5.6.6.9 1.4.9 2.4 0 3.5-2.1 4.3-4.2 4.5.4.3.7.9.7 1.8v2.9A9 9 0 0 0 12 3z"/></svg>'
};
const spreadContacto = d => {
  const c = d.contacto || {};
  const red = (clave, etiqueta) =>
    `<a href="${esc(c[clave] || '#')}" ${c[clave] ? 'target="_blank" rel="noopener"' : ''} aria-label="${etiqueta}">${ICONOS[clave]}${clave}</a>`;
  return `
<footer class="spread-wrap">
  <section class="spread simple" id="contacto" aria-label="Contacto">
    <div class="pagina">
      <h2>contacto</h2>
      <div class="lineas">${esc(c.correo)}<br>${esc(c.telefono)}<br>${esc(c.ciudad)}</div>
      <div class="redes">${red('behance', 'Behance')}${red('linkedin', 'LinkedIn')}${red('github', 'GitHub')}</div>
      <div class="copy">© Todos los derechos reservados · ${esc(d.anio)}</div>
    </div>
  </section>
</footer>`;
};

/* ── ensamblado ──────────────────────────────────────────── */
function dibujar(d) {
  const proyectos = (d.proyectos || []).map((p, i) => spreadFicha(p, i) + spreadPregunta(p, i) + spreadDesarrollo(p)).join('');
  document.getElementById('app').innerHTML =
    spreadPortada(d) + `<main>${spreadCV(d)}${spreadIndice(d)}${proyectos}</main>` + spreadContacto(d);
  document.title = `Portfolio · ${d.autor}`;
  iniciarInteraccion(d);
}

/* ── encabezados corridos, folios e interacción ──────────── */
function iniciarInteraccion(d) {
  const spreads = [...document.querySelectorAll('.spread')];
  let folio = 1;
  const totalPaginas = spreads.reduce((n, s) => n + (s.classList.contains('simple') ? 1 : 2), 0);

  spreads.forEach(s => {
    if (s.classList.contains('simple')) { folio++; return; }
    const titulo = s.dataset.titulo || '';
    s.querySelector('.pagina.izq').insertAdjacentHTML('beforeend',
      `<span class="corrido">${esc(d.anio)} · Proyectos seleccionados · ${esc(titulo.toUpperCase())}</span><span class="folio">| ${folio}</span>`);
    s.querySelector('.pagina.der').insertAdjacentHTML('beforeend',
      `<span class="corrido">${esc(d.autor)}</span><span class="folio">${folio+1} |</span>`);
    s.dataset.folio = folio;
    folio += 2;
  });

  /* animación de entrada + indicador de página */
  const indicador = document.getElementById('indicador');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      if (e.intersectionRatio > .5) {
        const idx = spreads.indexOf(e.target);
        const pag = idx === 0 ? 1 : (e.target.dataset.folio ? +e.target.dataset.folio : totalPaginas);
        indicador.textContent = `Página ${pad(pag)} / ${pad(totalPaginas)}`;
      }
    });
  }, { threshold: [0, .55] });
  spreads.forEach(s => io.observe(s));
  indicador.textContent = `Página 01 / ${pad(totalPaginas)}`;

  /* barra de progreso */
  const progreso = document.getElementById('progreso');
  const actualizarProgreso = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    progreso.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
  };
  addEventListener('scroll', actualizarProgreso, { passive: true });

  /* teclado: salto de spread en spread */
  const wraps = [...document.querySelectorAll('.spread-wrap')];
  const actualIndex = () => {
    const c = innerHeight / 2;
    let best = 0, dist = Infinity;
    wraps.forEach((w, i) => {
      const r = w.getBoundingClientRect();
      const dd = Math.abs(r.top + r.height / 2 - c);
      if (dd < dist) { dist = dd; best = i; }
    });
    return best;
  };
  addEventListener('keydown', e => {
    const abajo  = ['ArrowDown', 'PageDown'].includes(e.key);
    const arriba = ['ArrowUp', 'PageUp'].includes(e.key);
    if (!abajo && !arriba) return;
    e.preventDefault();
    const i = Math.min(wraps.length - 1, Math.max(0, actualIndex() + (abajo ? 1 : -1)));
    wraps[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* botón PDF */
  document.getElementById('btn-pdf').addEventListener('click', () => window.print());

  /* escala proporcional en tablet (700–1099px) */
  const escalar = () => {
    const w = innerWidth;
    const escala = (w >= 900 && w < 1100) ? Math.min(1, (w - 40) / 1000) : 1;
    document.documentElement.style.setProperty('--escala', escala);
    wraps.forEach(wr => {
      const s = wr.querySelector('.spread');
      const alto = s.getBoundingClientRect().height / (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--escala')) || 1);
      wr.style.minHeight = escala < 1 ? (alto * escala + 80) + 'px' : '';
    });
  };
  addEventListener('resize', escalar);
  escalar();
  actualizarProgreso();
}

/* ── arranque ────────────────────────────────────────────── */
(async () => {
  let datos = null;
  try {
    datos = await leerContenido();
  } catch (err) {
    console.warn('No se pudo leer Firestore, se usan los datos de ejemplo.', err);
  }
  if (!datos && configurado) console.info('Firestore no tiene contenido todavía: entra a /admin.html y pulsa "Guardar".');
  dibujar(datos || DATOS_BASE);
})();
