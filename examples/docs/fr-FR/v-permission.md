## Directive de permissions v-permission

Contrôle la visibilité des éléments en fonction des permissions utilisateur.

:::tip
Après l'importation d'Element UI, la directive `v-permission` est automatiquement enregistrée globalement et peut être utilisée directement.
:::

### Usage de base

```html
<!-- Permission unique -->
<el-button v-permission="['admin']">Supprimer</el-button>

<!-- Permissions multiples (correspond à n'importe laquelle) -->
<el-button v-permission="['admin', 'editor']">Modifier</el-button>

<!-- Permissions multiples (correspond à toutes) -->
<el-button v-permission="{ value: ['admin', 'editor'], mode: 'all' }">Gérer</el-button>
```

### Notes

Si l'utilisateur n'a pas la permission requise, l'élément sera supprimé (pas caché).

### API

#### Attributs

| Attribut | Description                                      | Type           | Valeurs acceptées | Par défaut |
| -------- | ------------------------------------------------ | -------------- | ----------------- | ---------- |
| value    | Tableau ou objet de configuration de permissions | Array / Object | -                 | -          |
| mode     | Mode de correspondance des permissions           | string         | any / all         | any        |

### À compléter

Code d'implémentation à ajouter.
