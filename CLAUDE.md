@AGENTS.md

# App de coaching santé — Expo

Direction visuelle : **luxe chaleureux**, zéro look générique. Aucune couleur, taille, police ou espacement hors des tokens.

## Design system

Source unique de vérité : [theme/tokens.ts](theme/tokens.ts). Tout le reste en dérive :
- `components/ui/text.tsx` : typographie via `<Text variant>`.
- `tailwind.config.ts` : couleurs, espacements, rayons et dimensions **remplacés** par les tokens (`p-5`, `text-red-500` n'existent pas).
- `global.css` est **généré** (`npm run theme`) : variables des composants RNR. Ne jamais l'éditer à la main.
- `app.config.ts` importe les tokens (splash, icône Android).
- `lib/theme.ts` : `THEME` / `NAV_THEME` (convention RNR, navigation).

Mode **clair uniquement** (`userInterfaceStyle: light`). Pas de variantes `dark:`.

### Couleurs (source : maquette validée AujourdhuiScreen)

| Token | Classe | Hex | Rôle | Contraste |
|---|---|---|---|---|
| bg | `bg-bg` | `#ECE8DF` | Fond d'écran | — |
| surface | `bg-surface` | `#F7F4EE` | Cartes, feuilles, texte sur pine | — |
| ink | `text-ink` | `#23261F` | Texte principal, texte sur amber | 12,6:1 sur bg |
| inkSoft | `text-ink-soft` | `#5C5F54` | Texte secondaire | 5,3:1 sur bg |
| line | `border-line` | `#23261F17` | Bordures, séparateurs (ink à 9 %) | décoratif |
| pine | `bg-pine` | `#38583F` | Action principale, chiffres clés, carte accent | 7,3:1 avec surface |
| sage | `bg-sage` | `#B9C4B2` | Piste des jauges, fonds doux, texte sur pine | jamais de texte sur bg |
| sageFill | `bg-sage-fill` | `#7C9079` | Remplissage secondaire, contour des états | 3,1:1 sur surface |
| amber | `bg-amber` | `#C6873F` | CTA rare (texte **ink**) | 5,1:1 avec ink |

Correspondance RNR (`semanticColors`) : primary = pine, secondary/muted/accent = sageFill, destructive = ink, border/input = line, ring = pine.

Pas de couleur d'erreur dédiée : une alerte s'exprime en texte ink/inkSoft avec une icône. Contrôles non sélectionnés : contour sageFill ou inkSoft, jamais sage (1,7:1, invisible).

Sur fond pine : texte en surface (7,3:1) et texte secondaire en sage (4,4:1). inkSoft y est illisible (1,2:1).

### Typographie

Toujours `<Text variant="…" color="…">` depuis `@/components/ui/text`. Jamais de `fontSize`, `fontFamily`, `lineHeight`, `letterSpacing` ni de classe `text-sm`/`font-*` dans un écran.

| Variante | Famille | Poids | Taille / interligne | Approche |
|---|---|---|---|---|
| `display` | Fraunces | 500 | 62 / 64 | -0.6 |
| `title` | Hanken Grotesk | 600 | 28 / 36 | -0.4 |
| `heading` | Hanken Grotesk | 600 | 20 / 28 | -0.2 |
| `body` | Hanken Grotesk | 400 | 16 / 24 | 0 |
| `label` | Hanken Grotesk | 500 | 14 / 20 | 0.1 |
| `caption` | Hanken Grotesk | 400 | 12 / 16 | 0.2 |

- **Fraunces = gros chiffres héro uniquement** (`display`). Tout le reste en Hanken Grotesk.
- Polices chargées au démarrage (`theme/fonts.ts`), splash natif maintenu jusqu'au chargement.
- `fontWeight` est informatif : chaque graisse est un fichier distinct (`fontFamily`).
- Agrandissement du texte (Dynamic Type) plafonné par variante (`maxFontSizeMultiplier` : display 1.2 → body 2).

**Chiffres tabulaires** — obligatoires pour toute donnée chiffrée :
- `display` est tabulaire par défaut ; ailleurs, passer `tabular`.
- Hanken Grotesk a des chiffres à chasse fixe par défaut (vérifié : 0–9 = 0.56 em).
- Fraunces n'a **aucune** fonctionnalité `tnum` (ni version Google Fonts, ni fichiers officiels Undercase Type) et ses chiffres sont proportionnels. `<Text>` émule donc les chiffres tabulaires : chaque chiffre est centré dans une cellule de `0.6485 em` (largeur du « 0 »). Cette émulation ne s'applique que si l'enfant est une chaîne ou un nombre simple, et le lecteur d'écran lit la valeur entière.

### Espacement, rayons, dimensions

| Espacement | xs | sm | md | lg | xl | 2xl |
|---|---|---|---|---|---|---|
| px | 4 | 8 | 12 | 16 | 24 | 32 |

Classes : `p-lg`, `gap-sm`, `px-xl`… Seuls ces noms existent (plus `0` et `px`).

| Rayon | sm | md | lg | pill |
|---|---|---|---|---|
| px | 12 | 16 | 24 | 99 |

Classes : `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-pill` (`rounded` = sm, `rounded-full` pour les cercles).

Dimensions (`sizes`) : `icon-xs` 12, `icon-sm` 16, `icon` 20, `control-sm` 40, `control` 48, `avatar` 40, `tab-bar` 64 → `h-control`, `size-avatar`…

Autres tokens :
- `shadows.warm` : ombre chaude en `boxShadow` (teinte ink, jamais noir).
- `focusRing` : anneau clavier pine de 3px (`useFocusRing`).
- `meter` : `thin` 5, `regular` 6, `thick` 8.
- `ring` : `sm` 48/4, `md` 96/8, `lg` 160/12 (taille/trait).
- `iconStroke` : `regular` 1.5, `active` 2.25.
- `motion` : `press` 120, `fill` 700, `countUp` 900 ms.

### Nombres

Toujours `formatNumber()` / `formatLongDate()` de `lib/format.ts`. `Intl` fr-FR sépare les milliers par U+202F, absent des deux polices (carré vide) : le helper le remplace par U+00A0.

## Composants métier (`components/`)

Galerie de validation : `app/gallery.tsx` (ouverte au lancement). Réutiliser ces composants avant d'en créer.

| Composant | Rôle | À retenir |
|---|---|---|
| `Card` | Conteneur | `variant` surface/accent, `padding` (SpacingToken), `radius` md/lg ; base `ui/card` |
| `Meter` | Barre de progression | `default` pine sur sage (4,4:1) ; `soft` sageFill sur surface (3,1:1) ; `height` thin/regular/thick |
| `Ring` | Anneau Skia | `progress` 0–1, `preset` sm/md/lg, `children` centrés |
| `MacroStat` | Macro nutritionnelle | `layout` row (défaut) ou stacked (rangée de macros) ; lu « Protéines, 82 sur 120 grammes » |
| `StatNumber` | Chiffre héro | Fraunces tabulaire, count-up, `unit` + `unitLabel` pour le lecteur d'écran |
| `PrimaryButton` | CTA | `primary` = amber (moments clés : lancer, conclure), `solid` = pine plein (action courante, ex. « Continuer »), `secondary` = contour pine ; haptique ; `loading` |
| `NumberField` | Saisie numérique | libellé, unité en suffixe, clavier numérique/décimal, erreur (bordure ink 2px + FormError) |
| `FormError` | Message d'erreur | icône + texte ink, annoncé au lecteur d'écran |
| `BackButton` | Retour | cible 48px, « Revenir à l'étape précédente » |
| `SelectableCard` | Choix d'onboarding | `mode` single (radio) / multiple (checkbox) ; haptique de sélection |
| `TabBar` / `TabBarView` | Navigation | `APP_TABS` ; `TabBar` pour expo-router (`app/(tabs)/_layout.tsx`), `TabBarView` sans navigation |
| `ScreenHeader` | En-tête d'écran | date du jour, `title` optionnel, avatar (photo ou initiales) |
| `MealRow` | Repas | case cochée pine si fait, kcal, chevron ; état annoncé au lecteur d'écran |

Règles communes :
- **Animations** : `useReducedMotion()` + `reduceMotion: ReduceMotion.System` ; si réduit, valeur finale immédiate.
- **Accessibilité** : rôles (`progressbar`, `radio`, `tab`…), `accessibilityState`, libellés en français, valeurs finales annoncées (jamais les étapes d'animation).
- **Focus clavier** : tout Pressable utilise `useFocusRing` (`hooks/use-focus-ring.ts`).
- **Haptique** : `useHaptics` (`hooks/use-haptics.ts`) — `impact('medium')` pour le CTA, `selection()` pour les choix.
- **Classes Tailwind littérales** : jamais `p-${token}` (non généré) ; passer par une table (voir `components/card.tsx`).
- **expo-image** ne lit pas `className` : dimensions via `style` + tokens.

## Écran Aujourd'hui

`app/(tabs)/today.tsx` reproduit la maquette : en-tête (date + avatar), salutation, carte héro (badge objectif, restantes, StatNumber, Meter, 3 MacroStat), carte accent entraînement, liste de repas.

- **Données : `features/today/mock.ts` uniquement.** Valeurs fictives reprises de la maquette, aucune valeur santé calculée. À remplacer par le calcul issu de l'onboarding et par Supabase.
- **Un seul moment serif par écran :** le chiffre héro (`<Text variant="display">` via StatNumber). Partout ailleurs, Hanken Grotesk.

## Onboarding

- Routes : `app/onboarding/` — `index` (bienvenue), `goal`, `sex`, `age`, `body`, `activity`, `frequency`, `summary`. Ordre et progression : `features/onboarding/steps.ts`.
- `app/onboarding/_layout.tsx` : pile dédiée + en-tête persistant (BackButton + Meter « Étape n sur 7 »), masqué sur la bienvenue.
- Store : `store/onboarding-store.ts` (zustand + persist MMKV `onboarding`). `completed` décide de l'écran de lancement (`app/index.tsx`).
- Validation : `features/onboarding/schema.ts` (zod). Bornes : âge 18–90 ans (entier), taille 120–230 cm (entier), poids 35–250 kg (une décimale, virgule ou point).
- Textes : `features/onboarding/copy.ts`. Étapes à choix : `ChoiceStep` ; corps commun : `OnboardingFrame`.
- Comportement : on n'avance qu'au tap sur le CTA ; l'erreur n'apparaît qu'après ce tap et disparaît dès que la réponse est valide ; « Modifier » depuis le récapitulatif ouvre l'étape avec `?from=summary` (le CTA devient « Enregistrer » et revient au récapitulatif).
- **Aucun calcul de programme** pour l'instant : le flux collecte et stocke seulement.

### Voix des messages

Tutoiement, sentence case, verbes actifs. Une erreur dit quoi corriger, avec un exemple si utile, jamais d'excuse ni de reproche : « Indique ton poids avec une seule décimale, par exemple 72,5. »

### Garde-fou

`npm run lint:tokens` échoue sur toute valeur en dur dans `app/`, `components/`, `features/`, `store/`, `hooks/` : hex, rgb/hsl, valeurs numériques de typo/espacement/rayon dans un `style`, valeurs Tailwind arbitraires en px/rem/#, classes typo hors `components/ui/`. Exception justifiée : commentaire `tokens-ignore` sur la ligne.

## Stack installée

Expo SDK 57, React Native 0.86, New Architecture (seule architecture en SDK 57, aucun flag nécessaire). Versions réellement installées :

| Rôle | Package | Version |
|---|---|---|
| Socle | expo | 57.0.23 |
| | react / react-native | 19.2.3 / 0.86.3 |
| | typescript | 6.0.3 |
| Navigation | expo-router | 57.0.21 |
| | react-native-screens | 4.26.2 |
| | react-native-safe-area-context | 5.7.0 |
| Dev build | expo-dev-client | 57.0.19 |
| Style | nativewind | 4.2.7 |
| | tailwindcss (v3 requis par NativeWind 4) | 3.4.19 |
| | tailwindcss-animate | 1.0.7 |
| | prettier-plugin-tailwindcss | 0.5.14 |
| Composants (RNR) | @rn-primitives/portal | 1.5.3 |
| | @rn-primitives/slot | 1.5.2 |
| | class-variance-authority | 0.7.1 |
| | clsx | 2.1.1 |
| | tailwind-merge (v2 = Tailwind v3) | 2.6.1 |
| Motion & gestes | react-native-reanimated | 4.5.1 |
| | react-native-worklets | 0.10.1 |
| | react-native-gesture-handler | 2.32.0 |
| Dessin & data viz | @shopify/react-native-skia | 2.6.2 |
| | victory-native | 42.0.1 |
| State local | zustand | 5.0.15 |
| State serveur | @tanstack/react-query | 5.102.8 |
| Backend | @supabase/supabase-js | 2.116.0 |
| | react-native-url-polyfill | 4.0.0 |
| | expo-secure-store | 57.0.4 |
| Abonnements | react-native-purchases | 10.9.1 |
| Stockage local | react-native-mmkv | 4.3.2 |
| | react-native-nitro-modules (requis par MMKV 4) | 0.37.1 |
| Bottom sheet | @gorhom/bottom-sheet | 5.2.14 |
| Formulaires | react-hook-form | 7.88.0 |
| | zod | 4.6.5 |
| | @hookform/resolvers | 5.9.1 |
| Haptique | expo-haptics | 57.0.3 |
| Icônes | lucide-react-native | 1.46.0 |
| | react-native-svg (requis par lucide) | 15.15.4 |
| Polices | expo-font | 57.0.4 |
| | @expo-google-fonts/fraunces | 0.4.1 |
| | @expo-google-fonts/hanken-grotesk | 0.4.3 |
| Images | expo-image | 57.0.5 |

Déjà présents via le template Expo : expo-constants, expo-device, expo-glass-effect, expo-linking, expo-splash-screen, expo-status-bar, expo-symbols, expo-system-ui, expo-web-browser, @expo/ui, react-native-web, react-dom.

## Règles

- **Ne tourne pas dans Expo Go** (Skia, MMKV/Nitro, RevenueCat sont natifs). Toujours un development build.
- Installer avec `npx expo install <pkg>` (versions alignées SDK). Vérifier avec `npx expo install --check`.
- Tout nouveau package natif impose de recompiler le dev build.
- Composants UI : `npx @react-native-reusables/cli@latest add <nom>`, puis adapter aux tokens (le code nous appartient). Contrôle : `npx @react-native-reusables/cli@latest doctor`.
- `<PortalHost />` reste le dernier enfant du layout racine (overlays RNR).
- Pas d'écran métier sans validation.
- Aucune couleur ni taille en dur : tout passe par `@/theme/tokens`, `<Text variant>` et les classes issues des tokens. Vérifier avec `npm run lint:tokens`.
- Variables d'environnement : `.env.local` (voir `.env.example`), préfixe `EXPO_PUBLIC_`.

## Structure

```
app/               routes expo-router ; (tabs)/ = 4 onglets vides ; gallery.tsx et design-system.tsx = démos temporaires
components/ui/     composants React Native Reusables (code possédé)
components/        composants métier (voir tableau ci-dessus)
features/          onboarding/ (schéma, copy, étapes, frame), program/, nutrition/
theme/             tokens.ts (source de vérité), fonts.ts (chargement polices)
lib/               supabase, revenuecat, mmkv, query-client, theme (THEME/NAV_THEME), utils (cn), format (nombres, dates)
store/             stores zustand (onboarding-store)
hooks/             use-focus-ring, use-haptics
scripts/           generate-theme-css.mjs, check-tokens.mjs
```

## Commandes

- `npm run ios` / `npm run android` : compile et installe le dev build en local, puis lance Metro
- `npm start` : Metro pour un dev build déjà installé
- `npm run typecheck` · `npm run lint` · `npm run lint:tokens` · `npm run theme`
