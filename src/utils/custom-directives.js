/**
 * 自定义指令集合
 * 提供常用的Vue自定义指令，简化开发流程
 */

/**
 * 权限指令
 * 用法: v-permission="['admin']"
 * 待实现
 */
export const permission = {
  inserted(el, binding) {
    // 待实现：权限判断逻辑
  }
};

/**
 * 防抖指令
 * 用法: v-debounce="handleClick"
 * 待实现
 */
export const debounce = {
  inserted(el, binding) {
    // 待实现：防抖逻辑
  }
};

/**
 * 节流指令
 * 用法: v-throttle="handleClick"
 * 待实现
 */
export const throttle = {
  inserted(el, binding) {
    // 待实现：节流逻辑
  }
};

/**
 * 复制指令
 * 用法: v-copy="text"
 * 事件: @copy-success, @copy-error
 */
export const copy = {
  bind(el, binding, vnode) {
    // 保存复制处理函数
    el.$copyHandler = function() {
      const text = binding.value;

      if (!text) {
        console.warn('[v-copy] 复制内容不能为空');
        return;
      }

      // 使用现代 Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
          // 触发成功事件
          triggerEvent(vnode, 'copy-success');
        }).catch(err => {
          // 降级方案
          console.error('[v-copy] Clipboard API 失败，使用降级方案', err);
          fallbackCopy(text, vnode);
        });
      } else {
        // 降级方案
        fallbackCopy(text, vnode);
      }
    };

    // 绑定点击事件
    el.addEventListener('click', el.$copyHandler);
  },

  update(el, binding, vnode) {
    // 移除旧的事件监听器
    if (el.$copyHandler) {
      el.removeEventListener('click', el.$copyHandler);
    }

    // 更新绑定值时更新处理函数
    el.$copyHandler = function() {
      const text = binding.value;

      if (!text) {
        console.warn('[v-copy] 复制内容不能为空');
        return;
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
          triggerEvent(vnode, 'copy-success');
        }).catch(err => {
          console.error('[v-copy] Clipboard API 失败，使用降级方案', err);
          fallbackCopy(text, vnode);
        });
      } else {
        fallbackCopy(text, vnode);
      }
    };

    // 重新绑定事件监听器
    el.addEventListener('click', el.$copyHandler);
  },

  unbind(el) {
    // 移除事件监听
    if (el.$copyHandler) {
      el.removeEventListener('click', el.$copyHandler);
      delete el.$copyHandler;
    }
  }
};

/**
 * 降级复制方案（使用 document.execCommand）
 */
function fallbackCopy(text, vnode) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.width = '1px';
  textarea.style.height = '1px';
  textarea.style.padding = '0';
  textarea.style.border = 'none';
  textarea.style.outline = 'none';
  textarea.style.boxShadow = 'none';
  textarea.style.background = 'transparent';

  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      triggerEvent(vnode, 'copy-success');
    } else {
      triggerEvent(vnode, 'copy-error', new Error('复制失败'));
    }
  } catch (err) {
    triggerEvent(vnode, 'copy-error', err);
  } finally {
    document.body.removeChild(textarea);
  }
}

/**
 * 触发自定义事件
 */
function triggerEvent(vnode, eventName, error) {
  const handlers = (vnode.data && vnode.data.on) ||
    (vnode.componentInstance && vnode.componentInstance.$listeners);

  if (handlers && handlers[eventName]) {
    if (typeof handlers[eventName] === 'function') {
      handlers[eventName](error);
    } else if (Array.isArray(handlers[eventName])) {
      handlers[eventName].forEach(handler => handler(error));
    }
  }
}

/**
 * 长按指令
 * 用法: v-longpress="handleLongPress"
 * 待实现
 */
export const longpress = {
  bind(el, binding) {
    // 待实现：长按事件逻辑
  }
};

/**
 * 拖拽指令
 * 用法: v-draggable 或 v-draggable="{ handle: '.drag-handle', constraint: false }"
 * 配置项:
 *   - handle: 拖拽手柄选择器，默认为整个元素
 *   - constraint: 是否限制在父容器内，默认 true
 *   - axis: 限制拖拽方向，'x' | 'y' | 'both'，默认 'both'
 * 事件: @drag-start, @drag-move, @drag-end
 */
export const draggable = {
  bind(el, binding, vnode) {
    const options = typeof binding.value === 'object' ? binding.value : {};
    const handleSelector = options.handle;
    const constraint = options.constraint !== undefined ? options.constraint : true;
    const axis = options.axis || 'both';

    // 获取拖拽手柄元素
    const dragHandle = handleSelector ? el.querySelector(handleSelector) : el;

    if (!dragHandle) {
      console.warn('[v-draggable] 未找到拖拽手柄元素');
      return;
    }

    // 设置样式
    if (!handleSelector) {
      el.style.cursor = 'move';
    } else {
      dragHandle.style.cursor = 'move';
    }

    // 设置定位
    const currentPosition = window.getComputedStyle(el).position;
    if (currentPosition !== 'absolute' && currentPosition !== 'fixed') {
      // 保存当前位置
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement ? el.parentElement.getBoundingClientRect() : { left: 0, top: 0 };

      el.style.position = 'absolute';

      // 如果没有设置 left/top，则使用当前相对于父元素的位置
      if (!el.style.left) {
        el.style.left = (rect.left - parentRect.left) + 'px';
      }
      if (!el.style.top) {
        el.style.top = (rect.top - parentRect.top) + 'px';
      }
    }

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;

    // 鼠标按下事件
    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;

      // 获取元素当前位置
      // 先检查元素是否已经有准确的定位值
      const computedStyle = window.getComputedStyle(el);
      const currentLeft = parseFloat(computedStyle.left) || 0;
      const currentTop = parseFloat(computedStyle.top) || 0;

      initialX = currentLeft;
      initialY = currentTop;

      // 添加拖拽样式
      el.style.userSelect = 'none';
      dragHandle.style.cursor = 'move';

      // 触发拖拽开始事件
      triggerEvent(vnode, 'drag-start', {
        startX,
        startY,
        element: el
      });

      // 阻止默认行为
      e.preventDefault();
    };

    // 鼠标移动事件
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newX = initialX + deltaX;
      let newY = initialY + deltaY;

      // 根据 axis 限制方向
      if (axis === 'x') {
        newY = initialY;
      } else if (axis === 'y') {
        newX = initialX;
      }

      // 限制在父容器内
      if (constraint && el.parentElement) {
        const parent = el.parentElement;
        const parentWidth = parent.clientWidth;
        const parentHeight = parent.clientHeight;
        const elWidth = el.offsetWidth;
        const elHeight = el.offsetHeight;

        const minX = 0;
        const minY = 0;
        const maxX = parentWidth - elWidth;
        const maxY = parentHeight - elHeight;

        newX = Math.max(minX, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));
      }

      // 设置新位置
      if (axis !== 'y') {
        el.style.left = newX + 'px';
      }
      if (axis !== 'x') {
        el.style.top = newY + 'px';
      }

      // 触发拖拽移动事件
      triggerEvent(vnode, 'drag-move', {
        x: newX,
        y: newY,
        deltaX,
        deltaY,
        element: el
      });

      e.preventDefault();
    };

    // 鼠标释放事件
    const handleMouseUp = (e) => {
      if (!isDragging) return;

      isDragging = false;
      el.style.userSelect = '';

      // 触发拖拽结束事件
      triggerEvent(vnode, 'drag-end', {
        x: el.offsetLeft,
        y: el.offsetTop,
        element: el
      });

      e.preventDefault();
    };

    // 绑定事件
    dragHandle.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // 保存事件处理函数，用于后续清理
    el.$dragHandlers = {
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      dragHandle
    };
  },

  unbind(el) {
    // 清理事件监听
    if (el.$dragHandlers) {
      const { handleMouseDown, handleMouseMove, handleMouseUp, dragHandle } = el.$dragHandlers;

      dragHandle.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      delete el.$dragHandlers;
    }
  }
};

/**
 * Dialog 拖拽指令
 * 用法: <el-dialog v-dialog-drag>...</el-dialog>
 * 或: <el-dialog v-dialog-drag="{ constraint: false }">...</el-dialog>
 *
 * 配置项:
 *   - constraint: 是否限制在父容器内，默认 false（允许拖出屏幕）
 *
 * 自动处理 Dialog 的动态渲染，无需在每个 Dialog 中手动实现
 */
export const dialogDrag = {
  bind(el, binding, vnode) {
    const options = typeof binding.value === 'object' ? binding.value : {};
    const constraint = options.constraint !== undefined ? options.constraint : false;

    // 查找 Dialog 元素的辅助函数
    const findDialogElement = () => {
      // 尝试通过 custom-class 查找
      let customClass = null;

      if (vnode.componentInstance && vnode.componentInstance.$attrs) {
        customClass = vnode.componentInstance.$attrs['custom-class'];
      }

      if (!customClass && vnode.data && vnode.data.attrs) {
        customClass = vnode.data.attrs['custom-class'];
      }

      if (customClass) {
        return document.querySelector(`.el-dialog.${customClass}`);
      }

      // 如果没有 custom-class，通过 append-to-body 的特性在 body 下查找
      // 这里简单处理，实际使用建议添加 custom-class
      const dialogs = document.querySelectorAll('.el-dialog');
      return dialogs[dialogs.length - 1]; // 返回最新打开的 Dialog
    };

    // Dialog 打开时的处理
    const handleOpened = () => {
      setTimeout(() => {
        const dialogEl = findDialogElement();

        if (dialogEl && !dialogEl.__dialog_drag_applied) {
          dialogEl.__dialog_drag_applied = true;

          // 转换 Dialog 的 margin 定位为 absolute 定位
          const computedStyle = window.getComputedStyle(dialogEl);
          const currentMarginTop = computedStyle.marginTop;

          // 如果有 marginTop，转换为 top
          if (currentMarginTop && currentMarginTop !== '0px' && currentMarginTop !== 'auto') {
            dialogEl.style.marginTop = '0';
            dialogEl.style.top = currentMarginTop;
          }

          // 应用 draggable 指令
          draggable.bind(dialogEl, {
            value: {
              handle: '.el-dialog__header',
              constraint
            }
          }, vnode);

          // 添加拖拽提示样式
          const headerEl = dialogEl.querySelector('.el-dialog__header');
          if (headerEl) {
            headerEl.style.cursor = 'move';
            headerEl.style.userSelect = 'none';
          }
        }
      }, 50);
    };

    // Dialog 关闭时的处理
    const handleClosed = () => {
      const dialogEl = findDialogElement();
      if (dialogEl) {
        delete dialogEl.__dialog_drag_applied;
        // 清理拖拽事件
        if (dialogEl.$dragHandlers) {
          draggable.unbind(dialogEl);
        }
      }
    };

    // 保存事件处理器
    el._dialogDragHandlers = {
      opened: handleOpened,
      closed: handleClosed
    };

    // 监听 Dialog 组件的事件
    const component = vnode.componentInstance;
    if (component) {
      component.$on('opened', handleOpened);
      component.$on('closed', handleClosed);
    }
  },

  unbind(el, binding, vnode) {
    const handlers = el._dialogDragHandlers;
    if (handlers) {
      const component = vnode.componentInstance;
      if (component) {
        component.$off('opened', handlers.opened);
        component.$off('closed', handlers.closed);
      }
      delete el._dialogDragHandlers;
    }
  }
};

// 导出所有指令
export default {
  permission,
  debounce,
  throttle,
  copy,
  longpress,
  draggable,
  dialogDrag
};

