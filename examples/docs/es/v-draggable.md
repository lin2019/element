## Directiva arrastrable v-draggable

Hace que los elementos sean arrastrables.

:::tip
Después de importar Element UI, la directiva `v-draggable` se registra automáticamente de forma global y puede usarse directamente.
:::

### Uso básico

```html
<!-- Arrastre básico -->
<div v-draggable>Elemento arrastrable</div>

<!-- Arrastre restringido -->
<div
  v-draggable="{ 
  axis: 'x',          // Solo arrastre horizontal, opciones: 'x', 'y', 'both'
  constraint: false,  // Permitir arrastre fuera del padre (por defecto: true)
  handle: '.handle'   // Selector del manejador de arrastre
}"
>
  <span class="handle">Manejador de arrastre</span>
  <span>Elemento arrastrable</span>
</div>

<!-- Callbacks de arrastre -->
<div v-draggable @drag-start="handleDragStart" @dragging="handleDragging" @drag-end="handleDragEnd">
  Elemento arrastrable
</div>
```

```javascript
export default {
  methods: {
    handleDragStart(e) {
      console.log('Arrastre iniciado', e)
    },
    handleDragging(e) {
      console.log('Arrastrando', e)
    },
    handleDragEnd(e) {
      console.log('Arrastre finalizado', e)
    }
  }
}
```

### Casos de uso

- Arrastre de diálogos
- Ordenar elementos de lista
- Diseño libre

### API

#### Atributos

| Atributo   | Descripción                        | Tipo    | Valores aceptados | Por defecto |
| ---------- | ---------------------------------- | ------- | ----------------- | ----------- |
| axis       | Dirección de arrastre              | string  | x / y / both      | both        |
| constraint | Limitar dentro del elemento padre  | boolean | —                 | true        |
| handle     | Selector del manejador de arrastre | string  | Selector CSS      | —           |

#### Eventos

| Nombre del evento | Descripción         | Parámetros |
| ----------------- | ------------------- | ---------- |
| drag-start        | Arrastre iniciado   | event      |
| dragging          | Arrastrando         | event      |
| drag-end          | Arrastre finalizado | event      |

### Por completar

Código de implementación pendiente.
