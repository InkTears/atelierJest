# Démo Jest — Tests unitaires en Node.js

Démo resserrée à l'essentiel : **l'ordre TDD** (le test d'abord, le code ensuite) et les
4 notions à connaître. Que des tests unitaires.

## Démarrage

```bash
npm install      # installe Jest
npm test         # lance les tests
npm run test:watch   # relance à chaque modification (mode dev)
npm run test:cov     # avec le rapport de couverture
```

## La démarche : test d'abord, code après (TDD)

Le réflexe à transmettre : on écrit **le test avant le code**.

1. **RED** — on écrit le test. On le lance : il échoue (le code n'existe pas encore).
2. **GREEN** — on écrit le minimum de code pour le faire passer.
3. **REFACTOR** — on nettoie le code, les tests garantissent qu'on ne casse rien.

Exemple concret (le module `src/combat.js`) :

```js
// 1. RED — on écrit d'abord le test, sans le code
test("un coup super efficace double les dégâts", () => {
  expect(calculDegats({ type: "feu", cible: "plante", base: 20 })).toBe(40);
});
```

```js
// 2. GREEN — on écrit ENSUITE le code qui fait passer le test
function calculDegats({ type, cible, base }) {
  if (!type || !cible || base == null) throw new Error("Attaque invalide");
  const mult = (TABLE[type] && TABLE[type][cible]) ?? 1;
  return Math.floor(base * mult);
}
```

Pour le montrer en live : commente le contenu d'une fonction de `src/`, lance `npm test`
(rouge), puis réécris le code (vert).

## Les 4 notions de la démo

| Fichier de test | Notion | Code testé |
|---|---|---|
| `01-matchers.test.js` | `toBe`, `toEqual`, `toContain`, `not` | `src/combat.js` |
| `02-exceptions.test.js` | `toThrow` (+ la règle `expect(() => ...)`) | `src/combat.js` |
| `03-hooks.test.js` | `beforeEach`, `afterEach` (indépendance) | `src/panier.js` |
| `04-mocks.test.js` | ` jest.fn()` (contrôler le hasard) | `src/attaque.js` |

## Structure des fichiers

```
demo-jest/
├── package.json        # scripts + dépendance jest
├── jest.config.js      # config (testEnvironment, clearMocks, verbose)
├── src/                # LE CODE À TESTER (écrit pour faire passer les tests)
│   ├── combat.js       # calculDegats (matchers + exceptions)
│   ├── panier.js       # classe à état (hooks)
│   └── attaque.js      # coup critique au hasard (mocks)
└── tests/              # LES TESTS (un thème par fichier)
    ├── 01-matchers.test.js
    ├── 02-exceptions.test.js
    ├── 03-hooks.test.js
    └── 04-mocks.test.js
```

Jest exécute automatiquement tout fichier `*.test.js` / `*.spec.js`, ou placé dans un
dossier `__tests__/`. Deux organisations possibles : tests à côté du code
(`src/panier.js` + `src/panier.test.js`) ou dossier `tests/` séparé (ici).
