## Directive draggable v-draggable

Rend les éléments déplaçables par glisser-déposer.

:::tip
Après l'importation d'Element UI, la directive `v-draggable` est automatiquement enregistrée globalement et peut être utilisée directement.
:::

### Usage de base

```html
<!-- Glisser-déposer de base -->
<div v-draggable>Élément déplaçable</div>

<!-- Glisser-déposer contraint -->
<div
  v-draggable="{ 
  axis: 'x',          // Déplacement horizontal uniquement, options: 'x', 'y', 'both'
  constraint: false,  // Autoriser le déplacement hors du parent (par défaut: true)
  handle: '.handle'   // Sélecteur de poignée de glissement
}"
>
  <span class="handle">Poignée de glissement</span>
  <span>Élément déplaçable</span>
</div>

<!-- Callbacks de glissement -->
<div v-draggable @drag-start="handleDragStart" @dragging="handleDragging" @drag-end="handleDragEnd">
  Élément déplaçable
</div>
```

```javascript
export default {
  methods: {
    handleDragStart(e) {
      console.log('Glissement commencé', e)
    },
    handleDragging(e) {
      console.log('En cours de glissement', e)
    },
    handleDragEnd(e) {
      console.log('Glissement terminé', e)
    }
  }
}
```

### Cas d'utilisation

- Glisser-déposer de dialogues
- Tri d'éléments de liste
- Mise en page libre

### API

#### Attributs

| Attribut   | Description                        | Type    | Valeurs acceptées | Par défaut |
| ---------- | ---------------------------------- | ------- | ----------------- | ---------- |
| axis       | Direction de déplacement           | string  | x / y / both      | both       |
| constraint | Limiter dans l'élément parent      | boolean | —                 | true       |
| handle     | Sélecteur de poignée de glissement | string  | Sélecteur CSS     | —          |

#### Événements

| Nom de l'événement | Description            | Paramètres |
| ------------------ | ---------------------- | ---------- |
| drag-start         | Glissement commencé    | event      |
| dragging           | En cours de glissement | event      |
| drag-end           | Glissement terminé     | event      |

### À compléter

Code d'implémentation à ajouter.
