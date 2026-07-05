# Festival Runner — app iOS (App Store)

Enveloppe native (Capacitor) de la PWA runner, **compilée dans le cloud** (Codemagic) — aucun Mac requis.

- **Nom** : Festival Runner
- **Bundle ID** : `ch.festival.runner` (à enregistrer dans le portail Apple ; s'il est déjà pris, changer ici + dans `codemagic.yaml`)
- **Web embarqué** : `www/` (copie de `../runner-app/public`, resynchro via `npm run sync-web`)
- **Icône** : `resources/icon.png` (1024×1024) → `@capacitor/assets` génère toutes les tailles

## Ce qui reste à finaliser au moment du build (moi)
1. **Notifications natives iOS (APNs)** : le Web Push ne marche pas dans le WebView natif → on branche `@capacitor/push-notifications` (récupère le token APNs, l'enregistre dans Firebase `runners/{id}/apnsToken`) + l'envoi ProdForge via la clé APNs. Un petit pont JS détecte Capacitor et bascule sur le natif.
2. **Permissions Info.plist** : `NSLocationWhenInUseUsageDescription` (GPS), notifications — ajoutées à la génération du projet iOS.
3. **`APP_STORE_APPLE_ID`** dans `codemagic.yaml` : l'ID de l'app, dispo après l'avoir créée dans App Store Connect (Phase 4).

## Étapes (résumé — voir la procédure complète)
1. [Toi] Apple Developer 99 $/an ; enregistrer l'App ID `ch.festival.runner` (+ capacité Push) ; clés `.p8` (APNs + App Store Connect API).
2. [Toi] Créer l'app dans App Store Connect (nom, bundle id, SKU).
3. [Toi] Pousser ce dossier sur un dépôt GitHub ; le connecter à Codemagic ; y coller la clé App Store Connect API (intégration nommée `FestivalRunnerASC`).
4. [Codemagic] Lancer le workflow `ios-testflight` → build + signature + envoi TestFlight.
5. [Toi] Tester via TestFlight sur iPhone.
6. [Toi] Remplir la fiche (captures, description, confidentialité = `https://<hosting>/privacy.html`) → soumettre à la review.

## Build local (optionnel, seulement sur un vrai Mac)
```
npm install
npm run sync-web
npx cap add ios
npx cap sync ios
npx cap open ios   # ouvre Xcode
```
