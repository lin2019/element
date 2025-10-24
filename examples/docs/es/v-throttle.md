## Directiva throttle v-throttle

Añade funcionalidad de throttle a eventos para controlar la frecuencia de ejecución.

:::tip
Después de importar Element UI, la directiva `v-throttle` se registra automáticamente de forma global y puede usarse directamente.
:::

### Uso básico

```html
<!-- Por defecto 300ms -->
<el-button v-throttle="handleClick">Enviar</el-button>

<!-- Tiempo de retardo personalizado -->
<el-button v-throttle="{ fn: handleClick, delay: 1000 }">Enviar</el-button>

<!-- Especificar tipo de evento -->
<div v-throttle="{ fn: handleScroll, event: 'scroll', delay: 200 }"></div>
```

### Casos de uso

- Clics de botón
- Desplazamiento de página
- Movimiento del mouse
- Eventos de entrada

### API

#### Atributos

| Atributo | Descripción            | Tipo     | Por defecto |
| -------- | ---------------------- | -------- | ----------- |
| fn       | Función a ejecutar     | Function | -           |
| delay    | Tiempo de retardo (ms) | number   | 300         |
| event    | Tipo de evento         | string   | 'click'     |

### Por completar

Código de implementación pendiente.
