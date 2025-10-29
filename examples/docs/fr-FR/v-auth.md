## Directive de permissions v-auth

Contrôle la visibilité des éléments en fonction des permissions utilisateur.

:::tip
Après l'importation d'Element UI, la directive `v-auth` est automatiquement enregistrée globalement et peut être utilisée directement.
:::

### Usage de base

```html
<!-- Permission unique (chaîne uniquement) -->
<el-button v-auth="'admin'">Supprimer</el-button>

<!-- Permissions multiples (séparées par point-virgule; point-virgule final autorisé; correspond à n'importe laquelle) -->
<el-button v-auth="'admin;editor;'">Modifier</el-button>

<!-- Permissions multiples (séparées par virgule; correspond à n'importe laquelle) -->
<el-button v-auth="'admin,editor'">Gérer</el-button>
```

### Notes

Si l'utilisateur n'a aucune des permissions requises, l'élément sera supprimé (pas caché).

### API

#### Attributs

| Attribut | Description           | Type   | Valeurs acceptées | Par défaut |
| -------- | --------------------- | ------ | ----------------- | ---------- |
| value    | Chaîne de permissions | String | -                 | -          |
