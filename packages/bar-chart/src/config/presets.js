/**
 * 预设模板配置
 */

/**
 * 业务预设 - 适合业务数据展示
 */
export const BUSINESS_PRESET = {
  scroll: false,
  showValue: false,
  barWidth: 16,
  colors: [
    'rgba(5, 85, 206, 1)',
    'rgba(34, 184, 207, 1)',
    'rgba(92, 124, 250, 1)'
  ]
};

/**
 * 数据分析预设 - 适合数据分析场景
 */
export const ANALYTICS_PRESET = {
  scroll: true,
  scrollPageNum: 8,
  showValue: true,
  barWidth: 20,
  colors: [
    'rgba(81, 207, 102, 1)',
    'rgba(252, 196, 25, 1)',
    'rgba(255, 107, 107, 1)'
  ]
};

/**
 * 报表预设 - 适合报表展示
 */
export const REPORT_PRESET = {
  showTitle: true,
  showValue: true,
  barWidth: 24,
  scroll: false
};

/**
 * 大屏预设 - 适合大屏展示
 */
export const DASHBOARD_PRESET = {
  showValue: false,
  barWidth: 32,
  scroll: false,
  colors: [
    'rgba(5, 85, 206, 1)',
    'rgba(34, 184, 207, 1)',
    'rgba(252, 196, 25, 1)',
    'rgba(255, 107, 107, 1)'
  ]
};

/**
 * 获取预设配置
 */
export function getPreset(presetName) {
  const presets = {
    business: BUSINESS_PRESET,
    analytics: ANALYTICS_PRESET,
    report: REPORT_PRESET,
    dashboard: DASHBOARD_PRESET
  };

  return presets[presetName] || {};
}

