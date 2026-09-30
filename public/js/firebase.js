/* ══════════════════════════════════════════════════════════
   CONEXIÓN A FIREBASE (compartida por sitio y admin)
   El SDK se carga bajo demanda desde la CDN de Google solo
   cuando hay configuración real; así el sitio público sigue
   funcionando con los datos de ejemplo si aún no está listo.
   ══════════════════════════════════════════════════════════ */
import { firebaseConfig } from "./firebase-config.js";

const CDN = "https://www.gstatic.com/firebasejs/10.12.2/";
export const modulo = nombre => import(`${CDN}firebase-${nombre}.js`);

/* true cuando ya se pegó la configuración real */
export const configurado = !!firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith("PEGA_AQUI");

let _app = null;
export async function obtenerApp() {
  if (!configurado) return null;
  if (!_app) {
    const { initializeApp } = await modulo("app");
    _app = initializeApp(firebaseConfig);
  }
  return _app;
}

/* Un solo documento guarda todo el contenido del portafolio */
async function refContenido() {
  const app = await obtenerApp();
  const { getFirestore, doc } = await modulo("firestore");
  return doc(getFirestore(app), "portafolio", "contenido");
}

export async function leerContenido() {
  if (!configurado) return null;
  const { getDoc } = await modulo("firestore");
  const snap = await getDoc(await refContenido());
  return snap.exists() ? snap.data() : null;
}

export async function guardarContenido(datos) {
  const { setDoc } = await modulo("firestore");
  await setDoc(await refContenido(), datos);
}
