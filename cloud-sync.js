(() => {
  const SUPABASE_URL = 'https://qnnhgeuedjttatnahtgk.supabase.co';
  const SUPABASE_KEY = window.SUPABASE_PUBLISHABLE_KEY;
  const TABLE = 'quiz_progress';

  if (!SUPABASE_KEY) {
    console.warn('Supabase publishable key not configured.');
    return;
  }
  if (!window.supabase || !window.supabase.createClient) {
    console.error('Supabase library failed to load.');
    return;
  }

  const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  window.quizSupabase = db;

  let currentUser = null;
  let syncing = false;
  let saveTimer = null;
  let originalPutSaved = null;

  function setCloudStatus(text, kind = 'muted') {
    const el = document.getElementById('cloudStatus');
    if (!el) return;
    el.textContent = text;
    el.className = kind === 'good' ? 'goodtxt' : kind === 'bad' ? 'badtxt' : 'muted';
  }

  function injectCloudUI() {
    const setup = document.getElementById('setup');
    if (!setup || document.getElementById('cloudSyncBox')) return;
    const box = document.createElement('div');
    box.id = 'cloudSyncBox';
    box.className = 'backup';
    box.innerHTML = `
      <strong>☁️ Cloud progress sync</strong>
      <div id="cloudStatus" class="muted">Checking sign-in…</div>
      <div id="cloudSignedOut">
        <div class="muted">Sign in with your email to sync progress between phone and computer.</div>
        <div class="actions">
          <input id="cloudEmail" type="email" autocomplete="email" placeholder="Email address" style="flex:2;min-width:220px;background:var(--panel2);color:var(--text);border:1px solid var(--border);border-radius:12px;padding:11px 14px;font:inherit">
          <button class="secondary" id="cloudLoginBtn">Email me a sign-in link</button>
        </div>
      </div>
      <div id="cloudSignedIn" class="hidden">
        <div class="actions">
          <button class="secondary" id="cloudSyncNowBtn">☁ Sync now</button>
          <button class="secondary" id="cloudSignOutBtn">Sign out</button>
        </div>
      </div>`;
    setup.insertBefore(box, document.getElementById('loadStatus'));
    document.getElementById('cloudLoginBtn').addEventListener('click', sendMagicLink);
    document.getElementById('cloudSyncNowBtn').addEventListener('click', () => syncProgress(true));
    document.getElementById('cloudSignOutBtn').addEventListener('click', async () => { await db.auth.signOut(); });
  }

  function localProgress() {
    try { return typeof getSaved === 'function' ? getSaved() : null; }
    catch { return null; }
  }

  function localTimestamp(progress) {
    const t = progress && progress.updatedAt ? Date.parse(progress.updatedAt) : 0;
    return Number.isFinite(t) ? t : 0;
  }

  async function sendMagicLink() {
    const input = document.getElementById('cloudEmail');
    const email = input ? input.value.trim() : '';
    if (!email) { alert('Enter your email address first.'); return; }
    setCloudStatus('Sending sign-in link…');
    const redirectTo = window.location.origin + window.location.pathname;
    const { error } = await db.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } });
    if (error) { setCloudStatus(`Sign-in failed: ${error.message}`, 'bad'); return; }
    setCloudStatus('✅ Check your email and tap the sign-in link.', 'good');
  }

  async function loadRemote() {
    if (!currentUser) return null;
    const { data, error } = await db.from(TABLE).select('progress, updated_at').eq('user_id', currentUser.id).maybeSingle();
    if (error) throw error;
    return data;
  }

  async function saveRemote(progress) {
    if (!currentUser || !progress) return;
    const updated = progress.updatedAt || new Date().toISOString();
    const { error } = await db.from(TABLE).upsert({ user_id: currentUser.id, progress, updated_at: updated }, { onConflict: 'user_id' });
    if (error) throw error;
  }

  async function syncProgress(manual = false) {
    if (!currentUser || syncing) return;
    syncing = true;
    if (manual) setCloudStatus('Syncing…');
    try {
      const local = localProgress();
      const remoteRow = await loadRemote();
      if (!remoteRow) {
        await saveRemote(local);
        setCloudStatus(`✅ Synced as ${currentUser.email}`, 'good');
        return;
      }
      const remote = remoteRow.progress;
      const localTime = localTimestamp(local);
      const remoteTime = Math.max(Date.parse(remoteRow.updated_at || 0) || 0, localTimestamp(remote));
      if (remote && remoteTime > localTime + 1000) {
        if (originalPutSaved) originalPutSaved(remote);
        setCloudStatus(`✅ Restored latest cloud progress for ${currentUser.email}`, 'good');
        const stats = document.getElementById('stats');
        if (typeof showStats === 'function' && stats && !stats.classList.contains('hidden')) showStats();
      } else {
        await saveRemote(local);
        setCloudStatus(`✅ Synced as ${currentUser.email}`, 'good');
      }
    } catch (err) {
      console.error('Cloud sync error:', err);
      const msg = err && err.message ? err.message : String(err);
      if (/quiz_progress|relation|does not exist/i.test(msg)) setCloudStatus('⚠️ Cloud table is not ready. Run supabase-setup.sql once in Supabase.', 'bad');
      else setCloudStatus(`Cloud sync error: ${msg}`, 'bad');
    } finally { syncing = false; }
  }

  function scheduleCloudSave() {
    if (!currentUser) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => syncProgress(false), 650);
  }

  function wrapLocalSave() {
    if (typeof window.putSaved !== 'function' || originalPutSaved) return;
    originalPutSaved = window.putSaved;
    window.putSaved = function(progress) {
      const next = progress && typeof progress === 'object' ? progress : {};
      next.updatedAt = new Date().toISOString();
      originalPutSaved(next);
      scheduleCloudSave();
    };
  }

  function updateAuthUI(session) {
    currentUser = session && session.user ? session.user : null;
    const out = document.getElementById('cloudSignedOut');
    const inside = document.getElementById('cloudSignedIn');
    if (!out || !inside) return;
    out.classList.toggle('hidden', !!currentUser);
    inside.classList.toggle('hidden', !currentUser);
    if (currentUser) {
      setCloudStatus(`Signed in as ${currentUser.email}. Syncing…`);
      syncProgress(false);
    } else setCloudStatus('Not signed in — progress is still saved on this device.');
  }

  async function init() {
    injectCloudUI();
    wrapLocalSave();
    const { data } = await db.auth.getSession();
    updateAuthUI(data.session);
    db.auth.onAuthStateChange((_event, session) => setTimeout(() => updateAuthUI(session), 0));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();