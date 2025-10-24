## Directiva debounce v-debounce

Añade funcionalidad de debounce a eventos para evitar activaciones frecuentes.

:::tip
Después de importar Element UI, la directiva `v-debounce` se registra automáticamente de forma global y puede usarse directamente.
:::

### Uso básico

```html
<!-- Por defecto 300ms -->
<el-button v-debounce="handleClick">Buscar</el-button>

<!-- Tiempo de retardo personalizado -->
<el-button v-debounce="{ fn: handleClick, delay: 500 }">Buscar</el-button>

<!-- Especificar tipo de evento -->
<el-input v-debounce="{ fn: handleInput, event: 'input', delay: 300 }"></el-input>
```

### Casos de uso

- Entrada de búsqueda
- Eventos de redimensión de ventana
- Eventos de desplazamiento
- Clics repetidos de botón

### API

#### Atributos

| Atributo | Descripción            | Tipo     | Por defecto |
| -------- | ---------------------- | -------- | ----------- |
| fn       | Función a ejecutar     | Function | -           |
| delay    | Tiempo de retardo (ms) | number   | 300         |
| event    | Tipo de evento         | string   | 'click'     |

### Por completar

Código de implementación pendiente.
