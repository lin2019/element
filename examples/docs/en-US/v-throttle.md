## Throttle Directive v-throttle

Add throttle functionality to events to control execution frequency.

:::tip
After importing Element UI, the `v-throttle` directive is automatically registered globally and can be used directly.
:::

### Basic Usage

```html
<!-- Default 300ms -->
<el-button v-throttle="handleClick">Submit</el-button>

<!-- Custom delay time -->
<el-button v-throttle="{ fn: handleClick, delay: 1000 }">Submit</el-button>

<!-- Specify event type -->
<div v-throttle="{ fn: handleScroll, event: 'scroll', delay: 200 }"></div>
```

### Use Cases

- Button clicks
- Page scrolling
- Mouse movement
- Input events

### API

#### Attributes

| Attribute | Description      | Type     | Default |
| --------- | ---------------- | -------- | ------- |
| fn        | Execute function | Function | -       |
| delay     | Delay time (ms)  | number   | 300     |
| event     | Event type       | string   | 'click' |

### To be completed

Implementation code to be added.
