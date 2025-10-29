/**
 * 配置管理器
 * 负责配置的合并、验证和访问
 */

import { BASE_CONFIG, BASE_OPTIONS } from '../config/defaults';
import { getPreset } from '../config/presets';

export class ConfigManager {
  constructor(userConfig = {}, preset = null) {
    this.userConfig = userConfig;
    this.preset = preset;
    this.config = this.mergeConfig();
  }

  /**
   * 合并配置
   * 优先级: 用户配置 > 预设配置 > 默认配置
   */
  mergeConfig() {
    // 获取预设配置
    const presetConfig = this.preset ? getPreset(this.preset) : {};

    // 深度合并配置
    const merged = {
      ...BASE_CONFIG,
      ...presetConfig,
      ...this.userConfig
    };

    // 智能推断配置
    return this.inferConfig(merged);
  }

  /**
   * 智能推断配置
   */
  inferConfig(config) {
    // 使用新数据格式
    if (config.data && config.data.series) {
      config.dataCount = config.data.series.length;
      config.legendNames = config.data.series.map(s => s.name || '');

      // 自动判断是否需要滚动
      if (config.scroll === undefined && config.data.categories) {
        config.scroll = config.data.categories.length > 10;
        config.scrollPageNum = Math.min(config.data.categories.length, 8);
      }
    }

    return config;
  }

  /**
   * 验证配置
   */
  validate() {
    const errors = [];

    if (!this.config) {
      errors.push('配置对象不能为空');
      return { valid: false, errors };
    }

    // 验证数据格式
    if (!this.config.data) {
      errors.push('必须提供 data 配置');
      return { valid: false, errors };
    }

    if (!this.config.data.categories || !Array.isArray(this.config.data.categories)) {
      errors.push('data.categories 必须是数组');
    }

    if (!this.config.data.series || !Array.isArray(this.config.data.series)) {
      errors.push('data.series 必须是数组');
    } else {
      // 验证每个系列
      this.config.data.series.forEach((series, index) => {
        if (!series.data || !Array.isArray(series.data)) {
          errors.push(`data.series[${index}].data 必须是数组`);
        }

        if (this.config.data.categories &&
          series.data &&
          series.data.length !== this.config.data.categories.length) {
          console.warn(`data.series[${index}].data 长度与 categories 长度不匹配`);
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 获取配置值（支持路径访问）
   * @param {string} path - 配置路径，如 'colors.0' 或 'barWidth'
   * @param {any} defaultValue - 默认值
   */
  get(path, defaultValue = undefined) {
    const keys = path.split('.');
    let value = this.config;

    for (const key of keys) {
      if (value === null || value === undefined) {
        return defaultValue;
      }
      value = value[key];
    }

    return value !== undefined ? value : defaultValue;
  }

  /**
   * 获取完整配置
   */
  getConfig() {
    return this.config;
  }

  /**
   * 获取 ECharts 选项配置
   */
  getChartOptions() {
    return {
      ...BASE_OPTIONS,
      ...(this.config.options || {})
    };
  }
}

