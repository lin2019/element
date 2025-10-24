## Directiva de permisos v-permission

Controla la visibilidad de elementos basándose en permisos de usuario.

:::tip
Después de importar Element UI, la directiva `v-permission` se registra automáticamente de forma global y puede usarse directamente.
:::

### Uso básico

```html
<!-- Permiso único -->
<el-button v-permission="['admin']">Eliminar</el-button>

<!-- Múltiples permisos (coincide cualquiera) -->
<el-button v-permission="['admin', 'editor']">Editar</el-button>

<!-- Múltiples permisos (coincide todos) -->
<el-button v-permission="{ value: ['admin', 'editor'], mode: 'all' }">Gestionar</el-button>
```

### Notas

Si el usuario no tiene el permiso requerido, el elemento será eliminado (no ocultado).

### API

#### Atributos

| Atributo | Descripción                                 | Tipo           | Valores aceptados | Por defecto |
| -------- | ------------------------------------------- | -------------- | ----------------- | ----------- |
| value    | Array o objeto de configuración de permisos | Array / Object | -                 | -           |
| mode     | Modo de coincidencia de permisos            | string         | any / all         | any         |

### Por completar

Código de implementación pendiente.
