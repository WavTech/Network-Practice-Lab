// Public browser configuration for Network+ Practice Lab.
// Supabase publishable keys are intended for client-side apps; RLS protects quiz_progress.
window.SUPABASE_PUBLISHABLE_KEY='sb_publishable_rdwrg5nVcLwN59wIwI6pew_td5ydz6u';

// Load extensions in order so the new bank exists before the selector/dashboard initialize.
const extensionScripts=['n10009-bank.js','bank-selector.js','dashboard.js','bank-dashboard-addon.js','reasoning-engine.js','dashboard-nav-fix.js'];
(function loadNext(i=0){
  if(i>=extensionScripts.length)return;
  const script=document.createElement('script');
  script.src=extensionScripts[i];
  script.onload=()=>loadNext(i+1);
  script.onerror=()=>{console.error(`Failed to load ${extensionScripts[i]}`);loadNext(i+1)};
  document.head.appendChild(script);
})();
