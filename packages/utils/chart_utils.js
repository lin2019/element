// 单例 canvas 用于颜色解析，避免重复创建
let canvasSingleton = null;
let canvasContext = null;

/**
 * 获取单例 canvas 上下文
 */
function getCanvasContext() {
  if (!canvasContext) {
    canvasSingleton = document.createElement('canvas');
    canvasContext = canvasSingleton.getContext('2d');
  }
  return canvasContext;
}

/**
 * 将任意常见颜色格式转换为 rgba 字符串，并应用指定的透明度
 * @param {string} color - 输入颜色（支持: #rgb, #rrggbb, rgb(), rgba(), 颜色关键词）
 * @param {number} alpha - 透明度，范围 0 ~ 1（会覆盖原颜色的 alpha）
 * @returns {string} 格式为 'rgba(r, g, b, a)'
 */
function colorToRgba(color, alpha = 1) {
  // 边界处理
  if (typeof color !== 'string') {
    console.warn('colorToRgba: color must be a string, fallback to black');
    return `rgba(0, 0, 0, ${clamp(alpha, 0, 1)})`;
  }

  // 标准化 alpha
  alpha = clamp(alpha, 0, 1);

  // 1. 处理 rgba / rgb
  if (color.startsWith('rgba(') || color.startsWith('rgb(')) {
    // const isRgba = color.startsWith('rgba(');
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/i);
    if (match) {
      const [, r, g, b] = match;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }

  // 2. 处理 hex (#rgb 或 #rrggbb)
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    // 扩展简写 #rgb → #rrggbb
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    } else if (hex.length !== 6) {
      console.warn('Invalid hex color:', color);
      return `rgba(0, 0, 0, ${alpha})`;
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // 3. 处理颜色关键词（如 'red', 'blue', 'transparent' 等）
  // 利用浏览器的 CSS 解析能力（使用单例 canvas）
  const ctx = getCanvasContext();
  ctx.fillStyle = color;
  const parsed = ctx.fillStyle; // 浏览器会将其转为 rgb/rgba

  // 如果解析失败（比如无效颜色），fillStyle 会保持原值或变成 black
  if (parsed === color) {
    // 可能是无效颜色，fallback
    console.warn('Unrecognized color format:', color);
    return `rgba(0, 0, 0, ${alpha})`;
  }

  // 现在 parsed 通常是 'rgb(r,g,b)' 或 'rgba(r,g,b,a)'
  if (parsed.startsWith('rgba(')) {
    const match = parsed.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)/);
    if (match) {
      const [, r, g, b] = match;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  } else if (parsed.startsWith('rgb(')) {
    const match = parsed.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const [, r, g, b] = match;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }

  // fallback
  return `rgba(0, 0, 0, ${alpha})`;
}

/**
 * 辅助函数：限制数值在 [min, max] 范围内
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export { colorToRgba, clamp };
