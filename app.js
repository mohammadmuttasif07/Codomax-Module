const seed=[{id:'seed1',title:'Web Development',category:'Technology',content:'Learn the basics of modern web development using HTML, CSS and JavaScript.'},
{id:'seed2',title:'Artificial Intelligence',category:'Technology',content:'Discover how artificial intelligence is changing the world of technology.'},
{id:'seed3',title:'Student Life',category:'Education',content:'Useful tips and ideas to improve your college and student life.'}];

function loadPosts(){
  try{ const raw=localStorage.getItem('bloghub_posts'); if(raw) return JSON.parse(raw); }catch(e){}
  savePosts(seed); return seed;
}
function savePosts(p){ try{ localStorage.setItem('bloghub_posts',JSON.stringify(p)); }catch(e){} }
function excerpt(t){ return t.length>110 ? t.slice(0,110).trim()+'…' : t; }
function escapeHtml(s){ const d=document.createElement('div'); d.textContent=s; return d.innerHTML; }

function renderCard(p,ownerView){
  const action = ownerView
    ? `<a href="post.html?id=${p.id}" style="font-size:.85rem;color:var(--brick);font-weight:500">Read →</a><button class="btn danger" data-del="${p.id}">Delete</button>`
    : `<a href="post.html?id=${p.id}" style="font-size:.85rem;color:var(--brick);font-weight:500">Read →</a><small style="color:var(--ink-soft)">BlogHub</small>`;
  return `<div class="card"><div class="cat">${p.category}</div><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(excerpt(p.content))}</p><div class="meta">${action}</div></div>`;
}

function showToast(msg){
  const t=document.getElementById('toast'); if(!t) return;
  t.textContent=msg; t.classList.add('show');
  clearTimeout(showToast._t); showToast._t=setTimeout(()=>t.classList.remove('show'),2200);
}

function wireDelete(container,posts,afterDelete){
  container.querySelectorAll('[data-del]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(confirm('Delete this post?')){
        posts = posts.filter(p=>p.id!==btn.dataset.del);
        savePosts(posts);
        afterDelete(posts);
      }
    });
  });
}
