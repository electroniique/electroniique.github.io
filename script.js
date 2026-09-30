const root=document.documentElement;
const homeView=document.querySelector('#homeView');
const pageView=document.querySelector('#pageView');
const zones=[...document.querySelectorAll('.zone')];
const navButtons=[...document.querySelectorAll('.legacy-tabs button')];
const pageTitle=document.querySelector('#pageTitle');
const pageIndex=document.querySelector('#pageIndex');
const pageBody=document.querySelector('#pageBody');
const colors={home:'#d7d7d7',physics:'#e32222',mathematics:'#e0b51f',music:'#22a447',film:'#1456b8',essay:'#7b32b5'};
const pages={
 physics:{index:'04 / SECTION',title:'PHYSICS',body:'<p>The physics section.</p><div class="placeholder">CONTENT AREA / existing Physics content can be placed here.</div>'},
 mathematics:{index:'06 / SECTION',title:'MATHEMATICS',body:'<p>The mathematics section replaces the former Links tab.</p><div class="placeholder">CONTENT AREA / Mathematics</div>'},
 music:{index:'02 / SECTION',title:'MUSIC',body:'<p>The music section.</p><div class="placeholder">CONTENT AREA / existing Music content can be placed here.</div>'},
 film:{index:'03 / SECTION',title:'FILM',body:'<p>The film section.</p><div class="placeholder">CONTENT AREA / existing Film content can be placed here.</div>'},
 essay:{index:'05 / SECTION',title:'ESSAY',body:'<p>The essay section.</p><div class="placeholder">CONTENT AREA / existing Essay content can be placed here.</div>'}
};
function showHome(push=true){root.style.setProperty('--accent',colors.home);homeView.classList.add('active');pageView.classList.remove('active');navButtons.forEach(b=>b.classList.remove('active'));if(push)history.pushState({page:'home'},'',location.pathname+location.search);window.scrollTo(0,0)}
function showPage(name,push=true){if(!pages[name])return showHome(push);root.style.setProperty('--accent',colors[name]);homeView.classList.remove('active');pageView.classList.add('active');pageTitle.textContent=pages[name].title;pageIndex.textContent=pages[name].index;pageBody.innerHTML=pages[name].body;navButtons.forEach(b=>b.classList.toggle('active',b.dataset.page===name));if(push)history.pushState({page:name},'',`#${name}`);window.scrollTo(0,0)}
zones.forEach(z=>z.addEventListener('click',()=>showPage(z.dataset.page)));
document.querySelectorAll('[data-page]').forEach(el=>{if(!el.classList.contains('zone'))el.addEventListener('click',()=>el.dataset.page==='home'?showHome():showPage(el.dataset.page))});
window.addEventListener('popstate',()=>{const p=location.hash.slice(1);p?showPage(p,false):showHome(false)});
const initial=location.hash.slice(1);initial?showPage(initial,false):showHome(false);
