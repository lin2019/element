## Draggable Directive v-draggable

Make elements draggable.

:::tip
After importing Element UI, the `v-draggable` directive is automatically registered globally and can be used directly.
:::

### Basic Usage

```html
<!-- Basic dragging -->
<div v-draggable>Draggable element</div>

<!-- Constrained dragging -->
<div
  v-draggable="{ 
  axis: 'x',          // Only horizontal dragging, options: 'x', 'y', 'both'
  constraint: false,  // Allow dragging outside parent (default: true)
  handle: '.handle'   // Drag handle selector
}"
>
  <span class="handle">Drag handle</span>
  <span>Draggable element</span>
</div>

<!-- Dragging callbacks -->
<div v-draggable @drag-start="handleDragStart" @dragging="handleDragging" @drag-end="handleDragEnd">
  Draggable element
</div>
```

```javascript
export default {
  methods: {
    handleDragStart(e) {
      console.log('Drag started', e)
    },
    handleDragging(e) {
      console.log('Dragging', e)
    },
    handleDragEnd(e) {
      console.log('Drag ended', e)
    }
  }
}
```

### Use Cases

- Dialog dragging
- List item sorting
- Free layout

### API

#### Attributes

| Attribute  | Description                 | Type    | Accepted Values | Default |
| ---------- | --------------------------- | ------- | --------------- | ------- |
| axis       | Drag direction              | string  | x / y / both    | both    |
| constraint | Limit within parent element | boolean | —               | true    |
| handle     | Drag handle selector        | string  | CSS selector    | —       |

#### Events

| Event Name | Description  | Parameters |
| ---------- | ------------ | ---------- |
| drag-start | Drag started | event      |
| dragging   | Dragging     | event      |
| drag-end   | Drag ended   | event      |

### To be completed

Implementation code to be added.
