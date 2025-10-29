## Directiva de permisos v-auth

Controla la visibilidad de elementos basándose en permisos de usuario.

:::tip
Después de importar Element UI, la directiva `v-auth` se registra automáticamente de forma global y puede usarse directamente.
:::

### Uso básico

```html
<!-- Permiso único (solo cadena) -->
<el-button v-auth="'admin'">Eliminar</el-button>

<!-- Múltiples permisos (separados por punto y coma; permite punto y coma final; coincide cualquiera) -->
<el-button v-auth="'admin;editor;'">Editar</el-button>

<!-- Múltiples permisos (separados por coma; coincide cualquiera) -->
<el-button v-auth="'admin,editor'">Gestionar</el-button>
```

### Notas

Si el usuario no tiene ninguno de los permisos requeridos, el elemento será eliminado (no ocultado).

### API

#### Atributos

| Atributo | Descripción        | Tipo   | Valores aceptados | Por defecto |
| -------- | ------------------ | ------ | ----------------- | ----------- |
| value    | Cadena de permisos | String | -                 | -           |
