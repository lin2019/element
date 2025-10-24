## Directive de pression longue v-longpress

Déclenche un événement lors d'une pression longue sur un élément.

:::tip
Après l'importation d'Element UI, la directive `v-longpress` est automatiquement enregistrée globalement et peut être utilisée directement.
:::

### Usage de base

```html
<!-- Par défaut 500ms -->
<el-button v-longpress="handleLongPress">Appuyer longuement pour supprimer</el-button>

<!-- Durée personnalisée -->
<el-button v-longpress="{ fn: handleLongPress, duration: 1000 }">
  Appuyer longuement pour supprimer
</el-button>
```

```javascript
export default {
  methods: {
    handleLongPress() {
      this.$confirm('Confirmer la suppression?', 'Avertissement').then(() => {
        // Opération de suppression
      })
    }
  }
}
```

### Cas d'utilisation

- Pression longue pour supprimer
- Pression longue pour afficher un menu
- Pression longue pour des actions spéciales

### API

#### Attributs

| Attribut | Description                   | Type     | Par défaut |
| -------- | ----------------------------- | -------- | ---------- |
| fn       | Fonction à exécuter           | Function | -          |
| duration | Durée de pression longue (ms) | number   | 500        |

### À compléter

Code d'implémentation à ajouter.
