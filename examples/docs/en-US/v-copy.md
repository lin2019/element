## Copy Directive v-copy

Copy content to clipboard when clicking an element.

:::tip
After importing Element UI, the `v-copy` directive is automatically registered globally and can be used directly.
:::

### Basic Usage

Copy text content directly.

:::demo Use the `v-copy` directive to quickly implement copy functionality. Click the button to copy content to clipboard.

```html
<div>
  <el-button v-copy="'This is the text content to copy'" @copy-success="handleSuccess" @copy-error="handleError">
    Click to Copy Text
  </el-button>
</div>

<script>
  export default {
    methods: {
      handleSuccess() {
        this.$message.success('Copied successfully')
      },
      handleError() {
        this.$message.error('Copy failed')
      }
    }
  }
</script>
```

:::

### Copy Variable

Copy variable content from data.

:::demo You can copy content from variables defined in data to clipboard.

```html
<div>
  <el-input v-model="copyText" placeholder="Enter content to copy"></el-input>
  <el-button v-copy="copyText" @copy-success="handleSuccess" @copy-error="handleError" style="margin-top: 10px;">
    Copy Input Content
  </el-button>
</div>

<script>
  export default {
    data() {
      return {
        copyText: 'This is the default copy content'
      }
    },
    methods: {
      handleSuccess() {
        this.$message.success('Copied successfully')
      },
      handleError() {
        this.$message.error('Copy failed')
      }
    }
  }
</script>
```

:::

### API

#### Attributes

| Attribute | Description     | Type   |
| --------- | --------------- | ------ |
| value     | Content to copy | string |

#### Events

| Event Name   | Description    | Parameters |
| ------------ | -------------- | ---------- |
| copy-success | Copy succeeded | -          |
| copy-error   | Copy failed    | error      |
