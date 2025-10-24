## Directiva de pulsación larga v-longpress

Activa evento al mantener presionado un elemento.

:::tip
Después de importar Element UI, la directiva `v-longpress` se registra automáticamente de forma global y puede usarse directamente.
:::

### Uso básico

```html
<!-- Por defecto 500ms -->
<el-button v-longpress="handleLongPress">Mantener presionado para eliminar</el-button>

<!-- Duración personalizada -->
<el-button v-longpress="{ fn: handleLongPress, duration: 1000 }">
  Mantener presionado para eliminar
</el-button>
```

```javascript
export default {
  methods: {
    handleLongPress() {
      this.$confirm('¿Confirmar eliminación?', 'Advertencia').then(() => {
        // Operación de eliminación
      })
    }
  }
}
```

### Casos de uso

- Mantener presionado para eliminar
- Mantener presionado para mostrar menú
- Mantener presionado para acciones especiales

### API

#### Atributos

| Atributo | Descripción                    | Tipo     | Por defecto |
| -------- | ------------------------------ | -------- | ----------- |
| fn       | Función a ejecutar             | Function | -           |
| duration | Tiempo de pulsación larga (ms) | number   | 500         |

### Por completar

Código de implementación pendiente.
