## Directive de copie v-copy

Copie le contenu dans le presse-papiers lors du clic sur un élément.

:::tip
Après l'importation d'Element UI, la directive `v-copy` est automatiquement enregistrée globalement et peut être utilisée directement.
:::

### Usage de base

Copier directement le contenu du texte.

:::demo Utilisez la directive `v-copy` pour implémenter rapidement la fonctionnalité de copie. Cliquez sur le bouton pour copier le contenu dans le presse-papiers.

```html
<div>
  <el-button v-copy="'Ceci est le contenu texte à copier'" @copy-success="handleSuccess" @copy-error="handleError">
    Cliquer pour copier le texte
  </el-button>
</div>

<script>
  export default {
    methods: {
      handleSuccess() {
        this.$message.success('Copié avec succès')
      },
      handleError() {
        this.$message.error('Échec de la copie')
      }
    }
  }
</script>
```

:::

### Copier une variable

Copier le contenu d'une variable depuis data.

:::demo Vous pouvez copier le contenu de variables définies dans data vers le presse-papiers.

```html
<div>
  <el-input v-model="copyText" placeholder="Entrez le contenu à copier"></el-input>
  <el-button v-copy="copyText" @copy-success="handleSuccess" @copy-error="handleError" style="margin-top: 10px;">
    Copier le contenu de l'entrée
  </el-button>
</div>

<script>
  export default {
    data() {
      return {
        copyText: 'Ceci est le contenu de copie par défaut'
      }
    },
    methods: {
      handleSuccess() {
        this.$message.success('Copié avec succès')
      },
      handleError() {
        this.$message.error('Échec de la copie')
      }
    }
  }
</script>
```

:::

### API

#### Attributs

| Attribut | Description      | Type   |
| -------- | ---------------- | ------ |
| value    | Contenu à copier | string |

#### Événements

| Nom de l'événement | Description       | Paramètres |
| ------------------ | ----------------- | ---------- |
| copy-success       | Copie réussie     | -          |
| copy-error         | Échec de la copie | error      |
