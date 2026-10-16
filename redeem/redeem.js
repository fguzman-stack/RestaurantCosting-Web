const form=document.querySelector('#redeem-form');
const status=document.querySelector('#status');
const download=document.querySelector('#license-download');
const submit=document.querySelector('#submit');
let url;
if(new URLSearchParams(location.search).get('store')==='gumroad')document.querySelector('#channel').value='gumroad';
form.addEventListener('submit',async e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const es=document.documentElement.lang==='es';
  submit.disabled=true;status.classList.remove('error');download.classList.add('hidden');
  status.textContent=es?'Verificando tu compra…':'Verifying your purchase…';
  try{
    const response=await fetch('https://bpxwzslftjzzokgmrrzj.supabase.co/functions/v1/redeem-restaurant-costing',{
      method:'POST',headers:{'Content-Type':'application/json'},cache:'no-store',signal:AbortSignal.timeout(20000),
      body:JSON.stringify({action:'redeem',channel:form.channel.value,email:form.email.value.trim(),code:form.code.value.trim(),acceptTerms:document.querySelector('#consent').checked})
    });
    const data=await response.json();
    if(!response.ok)throw new Error(data.error || (es?'No se pudo canjear.':'Could not redeem.'));
    if(typeof data.receipt?.payload!=='string'||typeof data.receipt?.signature!=='string')throw new Error('Invalid server response');
    if(url)URL.revokeObjectURL(url);
    url=URL.createObjectURL(new Blob([JSON.stringify(data.receipt)],{type:'application/json'}));
    download.href=url;download.download='RestaurantCosting-lifetime.rcslicense';download.classList.remove('hidden');
    form.code.value='';
    status.textContent=es?'Licencia preparada. Descárgala e impórtala en la aplicación.':'License ready. Download it and import it into the application.';
    download.focus();
  }catch(error){status.classList.add('error');status.textContent=error.name==='TimeoutError'?(es?'Tiempo agotado. Puedes reintentar con el mismo correo y código.':'Timed out. You can retry with the same email and code.'):error.message}
  finally{submit.disabled=false}
});
window.addEventListener('pagehide',()=>{if(url)URL.revokeObjectURL(url)});
