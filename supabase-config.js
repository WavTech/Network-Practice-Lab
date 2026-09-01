// Public browser configuration for Network+ Practice Lab.
// Supabase publishable keys are intended for client-side apps; RLS protects quiz_progress.
window.SUPABASE_PUBLISHABLE_KEY='sb_publishable_rdwrg5nVcLwN59wIwI6pew_td5ydz6u';

// Load N10-009 banks and supplemental material before the selector/dashboard initialize.
// Supplemental banks normalize question text and skip duplicates at load time.
const EXT_VERSION='20260901-3';
const extensionScripts=['n10009-bank.js','n10009-demo-addon.js','n10009-original-exam2.js','bank-selector.js','dashboard.js','bank-dashboard-addon.js','reasoning-engine.js','reasoning-overrides.js','dashboard-nav-fix.js'];
(function loadNext(i=0){
  if(i>=extensionScripts.length)return;
  const script=document.createElement('script');
  script.src=`${extensionScripts[i]}?v=${EXT_VERSION}`;
  script.onload=()=>loadNext(i+1);
  script.onerror=()=>{console.error(`Failed to load ${extensionScripts[i]}`);loadNext(i+1)};
  document.head.appendChild(script);
})();
