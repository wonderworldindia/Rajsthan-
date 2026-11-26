import { openDB, putItem, getAllItems, deleteItem } from './db.js';
import { appendRowsToGoogleSheet } from './sheets-sync.js';
import { narrate } from './speech.js';
import { launchCelebration } from './canvas-fx.js';
export async function registerServiceWorker(onSyncTrigger) {
 if ('serviceWorker' in navigator) {
  const reg=await navigator.serviceWorker.register('./sw.js');
  navigator.serviceWorker.addEventListener('message',e=>{if(e.data&&e.data.type==='TRIGGER_SHEETS_SYNC')onSyncTrigger();});
  if ('SyncManager' in window) await reg.sync.register('sync-sheets-queue').catch(()=>{});
  return reg;
 }
 return null;
}
export { openDB, putItem, getAllItems, deleteItem, appendRowsToGoogleSheet, narrate, launchCelebration };