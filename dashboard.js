(() => {
  const TOTAL_QUESTIONS = 480;
  const pct = (n, d) => d ? Math.round((n / d) * 100) : 0;
  const escDash = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

  function topicFor(q) {
    const question = String(q?.question || '').toLowerCase();
    const correctText = (q?.answer || []).map(l => (q?.options || []).find(o => o.letter === l)?.text || '').join(' ').toLowerCase();
    const t = `${question} ${correctText}`;
    const rules = [
      ['RF & Signal Propagation', /reflection|absorption|refraction|diffraction|multipath|signal|interference|glass|building material/],
      ['Subnetting & IP', /subnet|cidr|\/\d{1,2}\b|ipv4|ipv6|ip address|vlsm|default gateway|apipa/],
      ['Routing', /router|routing|route\b|ospf|bgp|eigrp|rip\b|static route|gateway of last resort/],
      ['Switching & VLANs', /switch|vlan|trunk|802\.1q|stp|spanning tree|mac address|bridge|layer 2/],
      ['Wireless', /wireless|wi-?fi|802\.11|access point|\bwap\b|ssid|wpa|antenna|gsm|mimo|eap|peap|ccmp|cellular/],
      ['Ports & Protocols', /tcp|udp|port\b|dns|dhcp|http|https|ssh|telnet|snmp|smtp|imap|pop3|ldap|sip|rtp/],
      ['Security', /security|firewall|attack|malware|phishing|encryption|authentication|authorization|aaa|vpn|ids|ips|zero trust|hardening|nac/],
      ['Cabling & Physical', /cat[356]|fiber|cable|connector|rj45|sfp|transceiver|patch panel|poe|distance|multimode|single-mode|attenuation|otdr/],
      ['Troubleshooting', /troubleshoot|cannot|can't|unable|issue|problem|failure|fails|intermittent|command|ping|traceroute|ipconfig|netstat|baseline/],
      ['Network Design', /topology|mesh|star|ring|bus|wan|lan|soho|fault tolerant|redundan|high availability/],
      ['Cloud & Virtualization', /cloud|virtual|hypervisor|saas|paas|iaas|sdn|nfv|container/],
      ['Network Services', /dns|dhcp|ntp|aaa|radius|tacacs|proxy|load balancer|qos/],
      ['OSI Model', /osi|layer\s*[1-7]|transport|session|presentation|application layer|network layer/]
    ];
    for (const [name, re] of rules) if (re.test(t)) return name;
    return 'General Networking';
  }

  function getData() {
    const s = typeof getSaved === 'function' ? getSaved() : null;
    if (!s) return null;
    const seen = Object.keys(s.seen || {}).length;
    const attempts = s.stats?.attempts || 0;
    const correct = s.stats?.correct || 0;
    return { s, seen, attempts, correct, accuracy: pct(correct, attempts), completion: pct(seen, TOTAL_QUESTIONS) };
  }

  function bar(label, value, detail = '') {
    return `<div class="dashbar"><div class="dashbarhead"><span>${escDash(label)}</span><strong>${value}%</strong></div><div class="dashtrack"><div class="dashfill" style="width:${Math.max(0, Math.min(100, value))}%"></div></div>${detail ? `<div class="dashdetail">${detail}</div>` : ''}</div>`;
  }

  function strengthLabel(acc, attempts) {
    if (attempts < 3) return { label: 'Not enough data', cls: 'neutral' };
    if (acc >= 85) return { label: 'Strong', cls: 'strong' };
    if (acc >= 70) return { label: 'Solid', cls: 'solid' };
    if (acc >= 60) return { label: 'Needs work', cls: 'warn' };
    return { label: 'Weak', cls: 'weak' };
  }

  function weakestQuestions(s, limit = 5) {
    if (!window.BANK?.length) return [];
    const byId = Object.fromEntries(BANK.map(q => [String(q.id), q]));
    return Object.entries(s.perQuestion || {})
      .map(([id, d]) => ({ id, q: byId[String(id)], attempts: d.attempts || 0, correct: d.correct || 0 }))
      .filter(x => x.q && x.attempts > 0)
      .map(x => ({ ...x, accuracy: pct(x.correct, x.attempts) }))
      .sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts)
      .slice(0, limit);
  }

  function topicStats(s) {
    if (!window.BANK?.length) return [];
    const byId = Object.fromEntries(BANK.map(q => [String(q.id), q]));
    const totals = {};
    for (const q of BANK) {
      const topic = topicFor(q);
      totals[topic] = (totals[topic] || 0) + 1;
    }
    const buckets = {};
    for (const [id, d] of Object.entries(s.perQuestion || {})) {
      const q = byId[String(id)];
      if (!q || !(d.attempts > 0)) continue;
      const topic = topicFor(q);
      buckets[topic] ||= { topic, attempts: 0, correct: 0, questions: new Set() };
      buckets[topic].attempts += d.attempts || 0;
      buckets[topic].correct += d.correct || 0;
      buckets[topic].questions.add(id);
    }
    return Object.values(buckets)
      .map(x => {
        const questionCount = x.questions.size;
        const accuracy = pct(x.correct, x.attempts);
        const totalInBank = totals[x.topic] || questionCount;
        return { topic: x.topic, attempts: x.attempts, correct: x.correct, questionCount, accuracy, totalInBank, coverage: pct(questionCount, totalInBank), strength: strengthLabel(accuracy, x.attempts) };
      })
      .sort((a, b) => b.questionCount - a.questionCount || b.attempts - a.attempts);
  }

  function renderMiniDashboard() {
    const setup = document.getElementById('setup');
    if (!setup) return;
    let el = document.getElementById('quickDashboard');
    if (!el) {
      el = document.createElement('div');
      el.id = 'quickDashboard';
      el.className = 'card dashcard';
      setup.parentNode.insertBefore(el, setup);
    }
    const d = getData();
    if (!d) return;
    const last = d.s.sessions?.[0];
    el.innerHTML = `<div class="dashtitle"><div><div class="dashkicker">YOUR PROGRESS</div><h2>Network+ Dashboard</h2></div><button class="secondary dashopen" onclick="showStats()">Open details</button></div>
      <div class="dashgrid">
        <div class="dashstat"><div class="dashnum">${d.seen}<span>/480</span></div><div class="dashlabel">Questions completed</div></div>
        <div class="dashstat"><div class="dashnum">${d.completion}%</div><div class="dashlabel">Bank completion</div></div>
        <div class="dashstat"><div class="dashnum">${d.accuracy}%</div><div class="dashlabel">All-time accuracy</div></div>
        <div class="dashstat"><div class="dashnum">${Object.keys(d.s.missed || {}).length}</div><div class="dashlabel">In missed pool</div></div>
      </div>
      ${bar('Question bank', d.completion, `${d.seen} of ${TOTAL_QUESTIONS} unique questions seen`)}
      ${last ? `<div class="dashlatest">Last session <strong>${last.correct}/${last.total} (${last.percent}%)</strong> · ${new Date(last.date).toLocaleString()}</div>` : '<div class="dashlatest">No completed sessions yet — knock out a set and your history will show here.</div>'}`;
  }

  function topicTable(topics) {
    if (!topics.length) return '<div class="muted">Answer some questions and your topic breakdown will appear here.</div>';
    return `<div class="topictable">${topics.map(x => `<div class="topicrow">
      <div class="topicname"><strong>${escDash(x.topic)}</strong><div class="dashdetail">${x.questionCount}/${x.totalInBank} unique questions seen · ${x.attempts} attempts</div></div>
      <div class="topiccoverage"><div class="topicmetric">${x.coverage}%</div><div class="dashdetail">coverage</div></div>
      <div class="topicscore"><div class="topicmetric">${x.accuracy}%</div><div class="dashdetail">${x.correct}/${x.attempts} correct</div></div>
      <div class="strengthpill ${x.strength.cls}">${x.strength.label}</div>
    </div>`).join('')}</div>`;
  }

  function renderFullDashboard() {
    const d = getData();
    if (!d) return;
    const stats = document.getElementById('stats');
    if (!stats) return;
    show('stats', true);
    const weak = weakestQuestions(d.s, 6);
    const topics = topicStats(d.s);
    const weakestTopics = [...topics].sort((a,b)=>a.accuracy-b.accuracy||b.attempts-a.attempts).slice(0,6);
    const sessions = (d.s.sessions || []).slice(0, 5);
    const bookmarks = Object.keys(d.s.bookmarks || {}).length;

    stats.innerHTML = `<div class="dashtitle"><div><div class="dashkicker">DETAILED STATS</div><h2>Progress Dashboard</h2></div></div>
      <div class="dashgrid">
        <div class="dashstat"><div class="dashnum">${d.seen}<span>/480</span></div><div class="dashlabel">Unique questions</div></div>
        <div class="dashstat"><div class="dashnum">${d.attempts}</div><div class="dashlabel">Answers submitted</div></div>
        <div class="dashstat"><div class="dashnum">${d.accuracy}%</div><div class="dashlabel">Overall accuracy</div></div>
        <div class="dashstat"><div class="dashnum">${bookmarks}</div><div class="dashlabel">Bookmarks</div></div>
      </div>
      <div class="dashsection"><h3>📈 Overall progress</h3>${bar('Question bank completion', d.completion, `${d.seen} unique questions completed`)}${bar('Answer accuracy', d.accuracy, `${d.correct} correct out of ${d.attempts} attempts`)}</div>
      <div class="dashsection"><h3>🗂 Topic breakdown</h3><div class="muted">Coverage shows how much of each topic you have seen. Score and strength are based only on your answered questions so far.</div>${topicTable(topics)}</div>
      <div class="dashcols">
        <div class="dashsection"><h3>🎯 Weakest questions</h3>${weak.length ? weak.map(x => `<div class="dashrow"><div><strong>#${x.id}</strong> ${escDash(x.q.question).slice(0,120)}${x.q.question.length>120?'…':''}<div class="dashdetail">${x.correct}/${x.attempts} correct · ${topicFor(x.q)}</div></div><div class="dashbadge ${x.accuracy<60?'low':''}">${x.accuracy}%</div></div>`).join('') : '<div class="muted">Answer some questions first and this will identify your trouble spots.</div>'}</div>
        <div class="dashsection"><h3>🧠 Weakest topics</h3>${weakestTopics.length ? weakestTopics.map(x => `<div class="dashrow"><div><strong>${escDash(x.topic)}</strong><div class="dashdetail">${x.questionCount} unique questions · ${x.attempts} attempts</div></div><div class="dashbadge ${x.accuracy<60?'low':''}">${x.accuracy}%</div></div>`).join('') : '<div class="muted">Topic performance appears as you build answer history.</div>'}</div>
      </div>
      <div class="dashsection"><h3>🕘 Recent sessions</h3>${sessions.length ? sessions.map(x => `<div class="dashsession"><span>${new Date(x.date).toLocaleString()}</span><strong>${x.correct}/${x.total} · ${x.percent}% · ${escDash(x.mode)}</strong></div>`).join('') : '<div class="muted">No completed sessions saved yet.</div>'}</div>
      <div class="actions"><button class="secondary" onclick="exportProgress()">⬇ Export Progress</button><button class="secondary" onclick="document.getElementById('importFile').click()">⬆ Import Progress</button></div>`;
  }

  function installStyles() {
    if (document.getElementById('dashboardStyles')) return;
    const style = document.createElement('style');
    style.id = 'dashboardStyles';
    style.textContent = `.dashcard{border-color:#365b91;background:linear-gradient(180deg,#14213a,#10192b)}.dashtitle{display:flex;align-items:center;justify-content:space-between;gap:12px}.dashtitle h2{margin:.15rem 0 .6rem}.dashkicker{font-size:.72rem;font-weight:900;letter-spacing:.14em;color:var(--accent)}.dashopen{flex:0 0 auto}.dashgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin:12px 0}.dashstat{background:var(--panel2);border:1px solid var(--border);border-radius:14px;padding:13px}.dashnum{font-size:1.65rem;font-weight:900}.dashnum span{font-size:.8rem;color:var(--muted);font-weight:700}.dashlabel,.dashdetail{font-size:.78rem;color:var(--muted)}.dashbar{margin:13px 0}.dashbarhead{display:flex;justify-content:space-between;gap:10px;margin-bottom:6px}.dashtrack{height:12px;border-radius:999px;background:#08101e;overflow:hidden;border:1px solid var(--border)}.dashfill{height:100%;background:linear-gradient(90deg,var(--accent),var(--good));border-radius:999px}.dashlatest{margin-top:10px;padding-top:10px;border-top:1px solid var(--border);color:var(--muted)}.dashsection{margin-top:18px;padding-top:14px;border-top:1px solid var(--border)}.dashsection h3{margin:0 0 10px}.dashcols{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px}.dashrow,.dashsession{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;padding:10px 0;border-top:1px solid var(--border)}.dashrow:first-of-type,.dashsession:first-of-type{border-top:0}.dashbadge{min-width:54px;text-align:center;padding:5px 8px;border-radius:999px;background:#153322;color:var(--good);font-weight:900}.dashbadge.low{background:#381c27;color:var(--bad)}.dashsession{color:var(--muted)}.dashsession strong{color:var(--text);text-align:right}.topictable{margin-top:12px;border:1px solid var(--border);border-radius:14px;overflow:hidden}.topicrow{display:grid;grid-template-columns:minmax(220px,2fr) minmax(82px,.7fr) minmax(110px,.8fr) minmax(110px,.8fr);gap:10px;align-items:center;padding:12px 14px;border-top:1px solid var(--border);background:var(--panel2)}.topicrow:first-child{border-top:0}.topicmetric{font-size:1.05rem;font-weight:900}.strengthpill{justify-self:end;padding:6px 10px;border-radius:999px;font-size:.78rem;font-weight:900;border:1px solid var(--border);white-space:nowrap}.strengthpill.strong{background:#153322;color:var(--good);border-color:#315f40}.strengthpill.solid{background:#142846;color:#9fc5ff;border-color:#315888}.strengthpill.warn{background:#3a3214;color:#ffe7a0;border-color:#77651e}.strengthpill.weak{background:#381c27;color:var(--bad);border-color:#793247}.strengthpill.neutral{background:#20283a;color:var(--muted)}@media(max-width:700px){.dashopen{display:none}.dashcols{grid-template-columns:1fr}.dashsession{display:block}.dashsession strong{display:block;text-align:left;margin-top:3px}.topicrow{grid-template-columns:1fr 78px 88px}.strengthpill{grid-column:1/-1;justify-self:start}.topicname{min-width:0}}`;
    document.head.appendChild(style);
  }

  function initDashboard() {
    installStyles();
    renderMiniDashboard();
    window.showStats = async function() {
      try { await window.bankReadyPromise; } catch {}
      renderFullDashboard();
    };
    if (typeof window.putSaved === 'function' && !window.putSaved.__dashboardWrapped) {
      const original = window.putSaved;
      const wrapped = function(s) { const r = original(s); setTimeout(renderMiniDashboard, 0); return r; };
      wrapped.__dashboardWrapped = true;
      window.putSaved = wrapped;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initDashboard);
  else initDashboard();
})();