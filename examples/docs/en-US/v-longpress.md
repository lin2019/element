## Long Press Directive v-longpress

Trigger event when long pressing an element.

:::tip
After importing Element UI, the `v-longpress` directive is automatically registered globally and can be used directly.
:::

### Basic Usage

```html
<!-- Default 500ms -->
<el-button v-longpress="handleLongPress">Long press to delete</el-button>

<!-- Custom duration -->
<el-button v-longpress="{ fn: handleLongPress, duration: 1000 }">
  Long press to delete
</el-button>
```

```javascript
export default {
  methods: {
    handleLongPress() {
      this.$confirm('Confirm deletion?', 'Warning').then(() => {
        // Delete operation
      })
    }
  }
}
```

### Use Cases

- Long press to delete
- Long press to show menu
- Long press for special actions

### API

#### Attributes

| Attribute | Description          | Type     | Default |
| --------- | -------------------- | -------- | ------- |
| fn        | Execute function     | Function | -       |
| duration  | Long press time (ms) | number   | 500     |

### To be completed

Implementation code to be added.
