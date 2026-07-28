// Public browser configuration for Network+ Practice Lab.
// Supabase publishable keys are intended for client-side apps; RLS protects quiz_progress.
window.SUPABASE_PUBLISHABLE_KEY='sb_publishable_rdwrg5nVcLwN59wIwI6pew_td5ydz6u';

// Load the progress dashboard, reasoning layer, and mobile dashboard navigation fix.
for (const src of ['dashboard.js','reasoning-engine.js','dashboard-nav-fix.js']) {
  const script=document.createElement('script');
  script.src=src;
  script.defer=true;
  document.head.appendChild(script);
}
