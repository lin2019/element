## Debounce Directive v-debounce

Add debounce functionality to events to avoid frequent triggering.

:::tip
After importing Element UI, the `v-debounce` directive is automatically registered globally and can be used directly.
:::

### Basic Usage

```html
<!-- Default 300ms -->
<el-button v-debounce="handleClick">Search</el-button>

<!-- Custom delay time -->
<el-button v-debounce="{ fn: handleClick, delay: 500 }">Search</el-button>

<!-- Specify event type -->
<el-input v-debounce="{ fn: handleInput, event: 'input', delay: 300 }"></el-input>
```

### Use Cases

- Search input
- Window resize events
- Scroll events
- Button repeated clicks

### API

#### Attributes

| Attribute | Description      | Type     | Default |
| --------- | ---------------- | -------- | ------- |
| fn        | Execute function | Function | -       |
| delay     | Delay time (ms)  | number   | 300     |
| event     | Event type       | string   | 'click' |

### To be completed

Implementation code to be added.
