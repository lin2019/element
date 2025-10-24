## Popup Methods

Provides methods for opening, closing, and jumping between tabs, suitable for multi-tab application scenarios.

### Import

```javascript
import { popup } from 'element-ui/src/utils'

// Or via yq namespace
yq.popup.openTab(option)
```

### Open Tab

Supports two calling methods to open a new tab.

**Method 1: Object Parameters**

```javascript
popup.openTab({
  id: 'uniqueId', // Optional, unique tab identifier
  url: 'page.html', // Required, page URL
  title: 'Tab Title', // Optional, tab title
  data: { param1: 'value' }, // Optional, parameter object to pass
  callback: function() {
    // Optional, callback after opening
    console.log('Tab opened')
  }
})
```

**Method 2: Separate Parameters**

```javascript
// Simplified calling method
popup.openTab('page.html', 'Tab Title', { param1: 'value' })

// URL only
popup.openTab('page.html')

// URL and title
popup.openTab('page.html', 'Tab Title')
```

### Jump to Tab

Jump to an already opened tab.

```javascript
// Basic usage
popup.jumpTab({
  id: 'uniqueId' // Unique tab identifier
})
```

### Close Tab

Supports two ways to close tabs.

```javascript
// Close tab by specified ID
popup.closeTab({ id: 'uniqueId' })

// Or use string ID
popup.closeTab('uniqueId')

// Close current tab (no parameters)
popup.closeTab()
```

### API Reference

#### popup.openTab(option) / popup.openTab(url, title, data)

Open a new tab.

**Method 1: Object Parameters**

| Parameter | Description              | Type     | Required | Default |
| --------- | ------------------------ | -------- | -------- | ------- |
| id        | Unique tab identifier    | string   | Optional | -       |
| url       | Page URL                 | string   | Required | -       |
| title     | Tab title                | string   | Optional | -       |
| data      | Parameter object to pass | object   | Optional | -       |
| callback  | Callback after opening   | function | Optional | -       |

**Method 2: Separate Parameters**

| Parameter | Description              | Type   | Required | Default |
| --------- | ------------------------ | ------ | -------- | ------- |
| url       | Page URL                 | string | Required | -       |
| title     | Tab title                | string | Optional | -       |
| data      | Parameter object to pass | object | Optional | -       |

#### popup.jumpTab(option)

Jump to an already opened tab.

| Parameter | Description           | Type   | Required | Default |
| --------- | --------------------- | ------ | -------- | ------- |
| id        | Unique tab identifier | string | Required | -       |

#### popup.closeTab(option)

Close a tab.

| Parameter | Description                                        | Type          | Required | Default |
| --------- | -------------------------------------------------- | ------------- | -------- | ------- |
| option    | Tab configuration or ID, omit to close current tab | object/string | Optional | -       |
| option.id | Unique tab identifier                              | string        | Required | -       |

### Notes

:::warning

1. `openTab` method supports two calling methods, choose according to actual needs
2. When using object parameters, `url` is required, other parameters are optional
3. When using separate parameters, at least `url` parameter is required
4. `id` parameter is used to uniquely identify tabs, recommended when jumping or closing
5. `data` parameter will be passed to the opened page
6. `callback` function executes after the tab is opened
7. `closeTab()` without parameters will close the current tab

:::

### Dependencies

This method depends on the following methods of the top window:

- `top._createPage` - Create tab
- `top._jumpPage` - Jump to tab
- `top._removePage` - Remove tab
