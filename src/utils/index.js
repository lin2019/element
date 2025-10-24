/**
 * Util 工具函数统一导出
 * 所有工具方法都挂载到 yq 命名空间下
 */

import http from './http';
import directives from './custom-directives';
import tabManager from './tab-manager';
import * as tools from './tools';

/**
 * yq 命名空间对象
 * 统一的工具方法入口
 *
 * @example
 * // HTTP请求
 * yq.remoteCall(url, params, callback)
 * yq.tableCall(url, params, callback)
 * yq.daoCall(params, callback)
 * yq.exportCall(url, params, callback, option)
 * yq.get(url, params, config)
 * yq.post(url, data, config)
 *
 * // 弹窗操作
 * yq.popup.openTab(option)
 * yq.popup.jumpTab(option)
 * yq.popup.closeTab(option)
 *
 * // 工具方法
 * yq.uuid()
 * yq.formatDate(date, format)
 * yq.deepClone(obj)
 *
 * // 自定义指令
 * yq.directives.clickOutside
 * yq.directives.loading
 */
const yq = {
  // HTTP请求方法
  remoteCall: http.remoteCall.bind(http),
  tableCall: http.tableCall.bind(http),
  daoCall: http.daoCall.bind(http),
  exportCall: http.exportCall.bind(http),
  get: http.get.bind(http),
  post: http.post.bind(http),
  getCtxPath: http.getCtxPath.bind(http),

  // 标签页操作（popup命名空间）
  popup: {
    openTab: tabManager.openTab.bind(tabManager),
    jumpTab: tabManager.jumpTab.bind(tabManager),
    closeTab: tabManager.closeTab.bind(tabManager)
  },

  // 工具方法
  uuid: tools.generateUUID,
  formatDate: tools.formatDate,
  parseDate: tools.parseDate,
  deepClone: tools.deepClone,
  debounce: tools.debounce,
  throttle: tools.throttle,
  formatNumber: tools.formatNumber,
  formatCurrency: tools.formatCurrency,
  formatPhone: tools.formatPhone,
  validatePhone: tools.validatePhone,
  validateEmail: tools.validateEmail,
  validateIdCard: tools.validateIdCard,
  parseQueryString: tools.parseQueryString,
  stringifyQuery: tools.stringifyQuery,
  randomString: tools.randomString,
  flattenTree: tools.flattenTree,
  arrayToTree: tools.arrayToTree,
  downloadFile: tools.downloadFile,
  exportFile: tools.exportFile,
  getFileExtension: tools.getFileExtension,
  formatBytes: tools.formatBytes,

  // 自定义指令
  directives: directives,

  // 配置项
  cfg: {
    recordSort: true // 是否对RECORD类型数据进行转换
  }
};

// 挂载到window对象，方便全局使用
if (typeof window !== 'undefined') {
  window.yq = yq;
}

// 导出命名空间
export default yq;

// 兼容性导出
export { http, directives, tabManager, tools, yq };

