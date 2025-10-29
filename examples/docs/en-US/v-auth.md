## Permission Directive v-auth

Control element visibility based on user permissions.

:::tip
After importing Element UI, the `v-auth` directive is automatically registered globally and can be used directly.
:::

### Basic Usage

```html
<!-- Single permission (string only) -->
<el-button v-auth="'admin'">Delete</el-button>

<!-- Multiple permissions (semicolon, trailing semicolon allowed; match any) -->
<el-button v-auth="'admin;editor;'">Edit</el-button>

<!-- Multiple permissions (comma; match any) -->
<el-button v-auth="'admin,editor'">Manage</el-button>
```

### Notes

If the user does not have any of the required permissions, the element will be removed (not hidden).

### API

#### Attributes

| Attribute | Description       | Type   | Accepted Values | Default |
| --------- | ----------------- | ------ | --------------- | ------- |
| value     | Permission string | String | -               | -       |
