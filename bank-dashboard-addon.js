(() => {
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  function combined(){
    const p=typeof getSaved==='function'?getSaved():null;
    const rows=window.getQuestionBankSummary?window.getQuestionBankSummary(p):[];
    const total=rows.reduce((n,x)=>n+x.total,0), completed=rows.reduce((n,x)=>n+x.completed,0), attempts=rows.reduce((n,x)=>n+x.attempts,0), correct=rows.reduce((n,x)=>n+x.correct,0);
    return {rows,total,completed,attempts,correct,accuracy:attempts?Math.round(correct/attempts*100):0,coverage:total?Math.round(completed/total*100):0};
  }
  function html(){
    const d=combined();
    return `<div id="bankBreakdown" class="dashsection"><h3>📚 Question-bank breakdown</h3><div class="muted">Each bank tracks its own completed questions and score. Both contribute to the combined totals below.</div><div class="dashgrid"><div class="dashstat"><div class="dashnum">${d.completed}<span>/${d.total}</span></div><div class="dashlabel">Combined unique questions</div></div><div class="dashstat"><div class="dashnum">${d.coverage}%</div><div class="dashlabel">Combined coverage</div></div><div class="dashstat"><div class="dashnum">${d.accuracy}%</div><div class="dashlabel">Combined accuracy</div></div><div class="dashstat"><div class="dashnum">${d.attempts}</div><div class="dashlabel">Combined attempts</div></div></div><div class="bankcards">${d.rows.map(x=>`<div class="bankcard"><div><strong>${esc(x.label)}</strong><div class="dashdetail">${x.completed}/${x.total} unique questions completed</div></div><div class="bankmetrics"><span>${x.total?Math.round(x.completed/x.total*100):0}% coverage</span><strong>${x.accuracy}% score</strong><span>${x.correct}/${x.attempts} correct</span></div></div>`).join('')}</div></div>`;
  }
  function append(){const s=document.getElementById('stats');if(!s)return;document.getElementById('bankBreakdown')?.remove();s.insertAdjacentHTML('afterbegin',html());}
  function styles(){if(document.getElementById('bankDashStyles'))return;const s=document.createElement('style');s.id='bankDashStyles';s.textContent='.bankcards{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:12px;margin-top:12px}.bankcard{display:flex;justify-content:space-between;gap:14px;background:var(--panel2);border:1px solid var(--border);border-radius:14px;padding:14px}.bankmetrics{text-align:right;display:flex;flex-direction:column;font-size:.82rem;color:var(--muted)}.bankmetrics strong{font-size:1.15rem;color:var(--text)}@media(max-width:600px){.bankcard{display:block}.bankmetrics{text-align:left;margin-top:8px}}';document.head.appendChild(s)}
  function patch(){styles();const original=window.showStats;if(typeof original!=='function'||original.__banks)return;const wrapped=async function(...args){const r=await original.apply(this,args);append();return r};wrapped.__banks=true;window.showStats=wrapped;}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(patch,100));else setTimeout(patch,100);
  setTimeout(patch,700);
})();