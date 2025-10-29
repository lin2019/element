/**
 * ECharts 统一导出
 * 自动适配 NPM 和 CDN 两种引入方式
 */

let echarts = null;

// 方式1: 尝试从 npm 包导入（构建时）
try {
  // 使用 require 避免构建时的硬性依赖
  if (typeof require !== 'undefined') {
    echarts = require('echarts');
  }
} catch (e) {
  // NPM 包未安装，继续尝试其他方式
}

// 方式2: 从 window 获取（CDN 方式）
if (!echarts && typeof window !== 'undefined' && window.echarts) {
  echarts = window.echarts;
}

// 如果都没找到，导出 null，使用时会有友好的错误提示
export default echarts;

