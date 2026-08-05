(() => {
  let mainBank = null;
  const labelFor = key => key === 'n10009' ? 'CompTIA N10-009 Practice Test' : 'Original N10-007 Bank';
  const totalFor = key => key === 'n10009' ? (window.N10009_BANK?.length || 0) : (mainBank?.length || 480);

  function activeKey(){ return localStorage.getItem('networkplus_active_bank') || 'n10007'; }

  function applyBank(key){
    if (!mainBank || !window.BANK) return;
    const source = key === 'n10009' ? (window.N10009_BANK || []) : mainBank;
    window.BANK.splice(0, window.BANK.length, ...source);
    localStorage.setItem('networkplus_active_bank', key);
    window.ACTIVE_BANK_KEY = key;
    const count = document.getElementById('count');
    if (count) {
      const all = [...count.options].find(o => o.value === 'all');
      if (all) all.textContent = `All ${source.length}`;
      [...count.options].forEach(o => {
        if (o.value !== 'all') o.disabled = Number(o.value) > source.length;
      });
      if (count.selectedOptions[0]?.disabled) count.value = source.length >= 50 ? '50' : source.length >= 25 ? '25' : '10';
    }
    const status = document.getElementById('loadStatus');
    if (status) status.textContent = `✅ ${source.length} questions loaded — ${labelFor(key)}.`;
    const sub = document.querySelector('.sub');
    if (sub) sub.textContent = `${labelFor(key)} • instant grading • cloud progress tracking`;
    const pool = document.getElementById('pool');
    if (pool) pool.value = 'all';
  }

  function injectSelector(){
    const setupGrid = document.querySelector('#setup .grid');
    if (!setupGrid || document.getElementById('bankSelect')) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = `<label class="small">Question bank</label><select id="bankSelect"><option value="n10007">Original N10-007 — 480 questions</option><option value="n10009">CompTIA N10-009 Practice Test — ${window.N10009_BANK?.length || 78} questions</option></select>`;
    setupGrid.insertBefore(wrap, setupGrid.firstChild);
    const select = document.getElementById('bankSelect');
    select.value = activeKey();
    select.addEventListener('change', e => applyBank(e.target.value));
  }

  window.getAllQuestionBanks = () => ({
    n10007: mainBank ? mainBank.slice() : [],
    n10009: (window.N10009_BANK || []).slice()
  });

  window.getQuestionBankSummary = progress => {
    const banks = window.getAllQuestionBanks();
    const seen = progress?.seen || {};
    const per = progress?.perQuestion || {};
    return Object.entries(banks).map(([key, list]) => {
      const ids = new Set(list.map(q => String(q.id)));
      const completed = [...ids].filter(id => seen[id]).length;
      let attempts = 0, correct = 0;
      for (const id of ids) {
        const d = per[id];
        if (d) { attempts += d.attempts || 0; correct += d.correct || 0; }
      }
      return { key, label: labelFor(key), total:list.length, completed, attempts, correct, accuracy:attempts?Math.round(correct/attempts*100):0 };
    });
  };

  async function init(){
    try { await window.bankReadyPromise; } catch { return; }
    mainBank = window.BANK.slice();
    mainBank.forEach(q => { if (!q.bank) q.bank='n10007'; });
    injectSelector();
    applyBank(activeKey());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();