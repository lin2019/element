## Directive debounce v-debounce

Ajoute une fonctionnalité de debounce aux événements pour éviter les déclenchements fréquents.

:::tip
Après l'importation d'Element UI, la directive `v-debounce` est automatiquement enregistrée globalement et peut être utilisée directement.
:::

### Usage de base

```html
<!-- Par défaut 300ms -->
<el-button v-debounce="handleClick">Rechercher</el-button>

<!-- Délai personnalisé -->
<el-button v-debounce="{ fn: handleClick, delay: 500 }">Rechercher</el-button>

<!-- Spécifier le type d'événement -->
<el-input v-debounce="{ fn: handleInput, event: 'input', delay: 300 }"></el-input>
```

### Cas d'utilisation

- Saisie de recherche
- Événements de redimensionnement de fenêtre
- Événements de défilement
- Clics répétés sur bouton

### API

#### Attributs

| Attribut | Description         | Type     | Par défaut |
| -------- | ------------------- | -------- | ---------- |
| fn       | Fonction à exécuter | Function | -          |
| delay    | Délai (ms)          | number   | 300        |
| event    | Type d'événement    | string   | 'click'    |

### À compléter

Code d'implémentation à ajouter.
