// Keeps ./www in sync with the runner PWA (../runner-app/public) so the native app bundles the latest web.
const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, '..', '..', 'runner-app', 'public');
const dst = path.join(__dirname, '..', 'www');
fs.rmSync(dst, { recursive: true, force: true });
fs.cpSync(src, dst, { recursive: true });
console.log('www synced from', src);
