## Directive throttle v-throttle

Ajoute une fonctionnalité de throttle aux événements pour contrôler la fréquence d'exécution.

:::tip
Après l'importation d'Element UI, la directive `v-throttle` est automatiquement enregistrée globalement et peut être utilisée directement.
:::

### Usage de base

```html
<!-- Par défaut 300ms -->
<el-button v-throttle="handleClick">Soumettre</el-button>

<!-- Délai personnalisé -->
<el-button v-throttle="{ fn: handleClick, delay: 1000 }">Soumettre</el-button>

<!-- Spécifier le type d'événement -->
<div v-throttle="{ fn: handleScroll, event: 'scroll', delay: 200 }"></div>
```

### Cas d'utilisation

- Clics sur bouton
- Défilement de page
- Mouvement de souris
- Événements de saisie

### API

#### Attributs

| Attribut | Description         | Type     | Par défaut |
| -------- | ------------------- | -------- | ---------- |
| fn       | Fonction à exécuter | Function | -          |
| delay    | Délai (ms)          | number   | 300        |
| event    | Type d'événement    | string   | 'click'    |

### À compléter

Code d'implémentation à ajouter.
