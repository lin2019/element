## Directiva de copia v-copy

Copia contenido al portapapeles al hacer clic en un elemento.

:::tip
Después de importar Element UI, la directiva `v-copy` se registra automáticamente de forma global y puede usarse directamente.
:::

### Uso básico

Copiar contenido de texto directamente.

:::demo Use la directiva `v-copy` para implementar rápidamente la funcionalidad de copia. Haga clic en el botón para copiar el contenido al portapapeles.

```html
<div>
  <el-button v-copy="'Este es el contenido de texto a copiar'" @copy-success="handleSuccess" @copy-error="handleError">
    Haga clic para copiar texto
  </el-button>
</div>

<script>
  export default {
    methods: {
      handleSuccess() {
        this.$message.success('Copiado con éxito')
      },
      handleError() {
        this.$message.error('Error al copiar')
      }
    }
  }
</script>
```

:::

### Copiar variable

Copiar contenido de variable desde data.

:::demo Puede copiar contenido de variables definidas en data al portapapeles.

```html
<div>
  <el-input v-model="copyText" placeholder="Ingrese el contenido a copiar"></el-input>
  <el-button v-copy="copyText" @copy-success="handleSuccess" @copy-error="handleError" style="margin-top: 10px;">
    Copiar contenido de entrada
  </el-button>
</div>

<script>
  export default {
    data() {
      return {
        copyText: 'Este es el contenido de copia predeterminado'
      }
    },
    methods: {
      handleSuccess() {
        this.$message.success('Copiado con éxito')
      },
      handleError() {
        this.$message.error('Error al copiar')
      }
    }
  }
</script>
```

:::

### API

#### Atributos

| Atributo | Descripción        | Tipo   |
| -------- | ------------------ | ------ |
| value    | Contenido a copiar | string |

#### Eventos

| Nombre del evento | Descripción       | Parámetros |
| ----------------- | ----------------- | ---------- |
| copy-success      | Copia exitosa     | -          |
| copy-error        | Error en la copia | error      |
