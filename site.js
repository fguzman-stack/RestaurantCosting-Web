if(location.pathname.endsWith('/guide/')){
  const link=document.createElement('a');
  link.href='https://github.com/fguzman-stack/RestaurantCosting-Web/releases/latest';
  link.textContent='Official Windows downloads and SHA-256 checksums →';
  link.dataset.es='Descargas oficiales Windows y sumas SHA-256 →';
  link.className='button';
  document.querySelector('main h1')?.after(link);
}
const strings = new Map();
document.querySelectorAll('[data-es]').forEach(el=>strings.set(el,el.innerHTML));
let language='en';
try{language=localStorage.getItem('rcs-language')==='es'?'es':'en'}catch{}
function applyLanguage(){
  document.documentElement.lang=language;
  strings.forEach((english,el)=>el.innerHTML=language==='es'?el.dataset.es:english);
  document.querySelectorAll('.language').forEach(b=>b.textContent=language==='en'?'ES':'EN');
}
document.querySelectorAll('.language').forEach(b=>b.addEventListener('click',()=>{language=language==='en'?'es':'en';try{localStorage.setItem('rcs-language',language)}catch{}applyLanguage()}));
applyLanguage();
const viewer=document.querySelector('#image-viewer');
document.querySelectorAll('[data-lightbox]').forEach(a=>a.addEventListener('click',e=>{
  if(!viewer?.showModal)return;e.preventDefault();const img=viewer.querySelector('img');img.src=a.href;img.alt=a.querySelector('img').alt;viewer.showModal();
}));
document.querySelector('.close-viewer')?.addEventListener('click',()=>viewer.close());
viewer?.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});
