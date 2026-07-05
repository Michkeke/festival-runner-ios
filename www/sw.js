// Service worker minimal : rend la PWA installable et permet showNotification().
// (Le Web Push "app fermée" via FCM/VAPID sera ajouté ici plus tard.)
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

// Web Push: show a notification even when the app is closed / in the background.
self.addEventListener('push', e => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch (_) { data = { body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(data.title || 'Festival Runner', {
    body: data.body || '', tag: 'runner-push', renotify: true, vibrate: [200, 100, 200], icon: 'icon-192.png'
  }));
});

// Cliquer la notification ramène l'app au premier plan.
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window', includeUncontrolled:true}).then(list => {
    for (const c of list) if ('focus' in c) return c.focus();
    if (self.clients.openWindow) return self.clients.openWindow('./');
  }));
});
