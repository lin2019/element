## Permission Directive v-permission

Control element visibility based on user permissions.

:::tip
After importing Element UI, the `v-permission` directive is automatically registered globally and can be used directly.
:::

### Basic Usage

```html
<!-- Single permission -->
<el-button v-permission="['admin']">Delete</el-button>

<!-- Multiple permissions (match any) -->
<el-button v-permission="['admin', 'editor']">Edit</el-button>

<!-- Multiple permissions (match all) -->
<el-button v-permission="{ value: ['admin', 'editor'], mode: 'all' }">Manage</el-button>
```

### Notes

If the user does not have the required permission, the element will be removed (not hidden).

### API

#### Attributes

| Attribute | Description                       | Type           | Accepted Values | Default |
| --------- | --------------------------------- | -------------- | --------------- | ------- |
| value     | Permission array or config object | Array / Object | -               | -       |
| mode      | Permission match mode             | string         | any / all       | any     |

### To be completed

Implementation code to be added.
