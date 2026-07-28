(() => {
  function install() {
    if (typeof window.showStats !== 'function' || window.showStats.__navFixed) return false;
    const original = window.showStats;
    const wrapped = async function() {
      await original();
      const stats = document.getElementById('stats');
      const setup = document.getElementById('setup');
      const quick = document.getElementById('quickDashboard');
      if (setup) setup.classList.add('hidden');
      if (quick) quick.classList.add('hidden');
      if (stats) {
        stats.classList.remove('hidden');
        if (!document.getElementById('dashboardBackBtn')) {
          const actions = document.createElement('div');
          actions.className = 'actions';
          actions.style.marginBottom = '14px';
          actions.innerHTML = '<button id="dashboardBackBtn" class="secondary">← Back to quiz setup</button>';
          stats.insertBefore(actions, stats.firstChild);
          document.getElementById('dashboardBackBtn').addEventListener('click', () => {
            stats.classList.add('hidden');
            if (setup) setup.classList.remove('hidden');
            if (quick) quick.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }
        requestAnimationFrame(() => stats.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      }
    };
    wrapped.__navFixed = true;
    window.showStats = wrapped;
    return true;
  }
  if (!install()) {
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      if (install() || tries > 20) clearInterval(timer);
    }, 250);
  }
})();
