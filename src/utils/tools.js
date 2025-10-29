import deepmerge from 'deepmerge';
import fecha from './date';
import { getI18nSettings } from './date-util';

/* global Map, Set, Uint8Array, Promise, ArrayBuffer */
/**
 * 通用工具函数集合
 * 提供常用的工具函数，包括日期处理、数据格式化、验证等
 */

/**
 * 日期格式化
 * @param {Date|string|number} date - 日期
 * @param {string} format - 格式化模板
 * @returns {string} 格式化后的日期字符串
 * 待实现
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (date === null || date === undefined) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const tokenMap = (fmt) => fmt
    .replace(/YYYY/g, 'yyyy')
    .replace(/YY(?!YY)/g, 'yy')
    .replace(/DD/g, 'dd');
  const mask = tokenMap(format);
  try {
    return fecha.format(d, mask, getI18nSettings && getI18nSettings());
  } catch (e) {
    try { return d.toISOString(); } catch (_) { return String(d); }
  }
}

/**
 * 解析日期
 * @param {string} dateStr - 日期字符串
 * @returns {Date} 日期对象
 * 待实现
 */
export function parseDate(dateStr, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!dateStr) return null;
  const tokenMap = (fmt) => fmt
    .replace(/YYYY/g, 'yyyy')
    .replace(/YY(?!YY)/g, 'yy')
    .replace(/DD/g, 'dd');
  const mask = tokenMap(format);
  try {
    const dt = fecha.parse(String(dateStr), mask, getI18nSettings && getI18nSettings());
    return dt instanceof Date && !isNaN(dt.getTime()) ? dt : null;
  } catch (e) {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? null : d;
  }
}
/**
 * 日期差值
 * @param {Date|number|string} start
 * @param {Date|number|string} end
 * @param {string} unit 默认 day，支持 millisecond|second|minute|hour|day|week
 */
export function getDateDiff(start, end, unit = 'day') {
  const a = new Date(start);
  const b = new Date(end);
  if (isNaN(a.getTime()) || isNaN(b.getTime())) return NaN;
  const diffMs = b.getTime() - a.getTime();
  switch (unit) {
    case 'millisecond':
    case 'ms':
      return diffMs;
    case 'second':
    case 's':
      return diffMs / 1000;
    case 'minute':
    case 'm':
      return diffMs / (60 * 1000);
    case 'hour':
    case 'h':
      return diffMs / (60 * 60 * 1000);
    case 'week':
    case 'w':
      return diffMs / (7 * 24 * 60 * 60 * 1000);
    case 'day':
    case 'd':
    default:
      return diffMs / (24 * 60 * 60 * 1000);
  }
}

function addDays(date, days) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days, d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
}

/** 添加指定单位 */
export function add(date, amount, unit) {
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  const n = Number(amount) || 0;
  switch (unit) {
    case 'year':
    case 'y': {
      const nd = new Date(d);
      nd.setFullYear(d.getFullYear() + n);
      return nd;
    }
    case 'month':
    case 'M': {
      const nd = new Date(d);
      const day = nd.getDate();
      nd.setDate(1);
      nd.setMonth(d.getMonth() + n);
      const lastDay = new Date(nd.getFullYear(), nd.getMonth() + 1, 0).getDate();
      nd.setDate(Math.min(day, lastDay));
      return nd;
    }
    case 'week':
    case 'w':
      return addDays(d, n * 7);
    case 'day':
    case 'd':
      return addDays(d, n);
    case 'hour':
    case 'h':
      return new Date(d.getTime() + n * 60 * 60 * 1000);
    case 'minute':
    case 'm':
      return new Date(d.getTime() + n * 60 * 1000);
    case 'second':
    case 's':
      return new Date(d.getTime() + n * 1000);
    case 'millisecond':
    case 'ms':
    default:
      return new Date(d.getTime() + n);
  }
}

export function subtract(date, amount, unit) {
  return add(date, -Number(amount || 0), unit);
}

export function toTimestamp(date) {
  const d = new Date(date);
  return isNaN(d.getTime()) ? NaN : d.getTime();
}

export function fromTimestamp(ms) {
  const n = Number(ms);
  return isNaN(n) ? null : new Date(n);
}

export function isSameDay(a, b) {
  const d1 = new Date(a); const d2 = new Date(b);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

export function isBetween(date, start, end, unit, inclusive = true) {
  const d = new Date(date); const s = new Date(start); const e = new Date(end);
  if (isNaN(d) || isNaN(s) || isNaN(e)) return false;
  let x = d.getTime(); let a = s.getTime(); let b = e.getTime();
  if (typeof unit === 'string') {
    // Align to unit by truncating to start of unit for comparison (basic)
    const trunc = (dt) => {
      const t = new Date(dt);
      switch (unit) {
        case 'year': return new Date(t.getFullYear(), 0, 1).getTime();
        case 'month': return new Date(t.getFullYear(), t.getMonth(), 1).getTime();
        case 'day': return new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime();
        case 'hour': return new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours()).getTime();
        case 'minute': return new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes()).getTime();
        default: return t.getTime();
      }
    };
    x = trunc(d); a = trunc(s); b = trunc(e);
  }
  return inclusive ? (x >= Math.min(a, b) && x <= Math.max(a, b)) : (x > Math.min(a, b) && x < Math.max(a, b));
}

export function fromNow(date) {
  const d = new Date(date);
  if (isNaN(d)) return '';
  const diff = Date.now() - d.getTime();
  const abs = Math.abs(diff);
  const sign = diff >= 0 ? 1 : -1;
  const format = (n, u) => (sign >= 0 ? `${n}${u}前` : `${n}${u}后`);
  if (abs < 10 * 1000) return sign >= 0 ? '刚刚' : '马上';
  const sec = Math.floor(abs / 1000);
  if (sec < 60) return format(sec, '秒');
  const min = Math.floor(sec / 60);
  if (min < 60) return format(min, '分钟');
  const hour = Math.floor(min / 60);
  if (hour < 24) return format(hour, '小时');
  const day = Math.floor(hour / 24);
  if (day < 7) return format(day, '天');
  const week = Math.floor(day / 7);
  if (week < 5) return format(week, '周');
  const month = Math.floor(day / 30);
  if (month < 12) return format(month, '个月');
  const year = Math.floor(day / 365);
  return format(year, '年');
}

/**
 * 深拷贝
 * @param {any} obj - 要拷贝的对象
 * @returns {any} 拷贝后的对象
 * 待实现
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
  if (Array.isArray(obj)) return obj.map(item => deepClone(item));
  const cloned = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

/**
 * 防抖函数
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间(ms)
 * @returns {Function} 防抖后的函数
 * 待实现
 */
export function debounce(fn, delay = 300) {
  // 待实现
  return fn;
}

/**
 * 节流函数
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间(ms)
 * @returns {Function} 节流后的函数
 * 待实现
 */
export function throttle(fn, delay = 300) {
  // 待实现
  return fn;
}

// ---------------------- Format 工具实现 ----------------------

/**
 * 数字格式化（千分位分隔）
 * @param {number} num - 数字
 * @param {number} decimals - 小数位数，默认 2
 * @param {string} decimalSeparator - 小数点符号，默认 '.'
 * @param {string} thousandsSeparator - 千分位符号，默认 ','
 * @returns {string} 格式化后的字符串
 */
export function formatNumber(num, decimals = 2, decimalSeparator = '.', thousandsSeparator = ',') {
  const n = Number(num);
  if (isNaN(n)) return '';

  const fixed = n.toFixed(decimals);
  const parts = fixed.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
  const decimalPart = parts[1];

  return decimalPart ? `${integerPart}${decimalSeparator}${decimalPart}` : integerPart;
}

/**
 * 金额格式化
 * @param {number} amount - 金额
 * @param {string|Object} options - 货币符号或配置对象
 * @returns {string} 格式化后的金额字符串
 */
export function formatCurrency(amount, options) {
  const n = Number(amount);
  if (isNaN(n)) return '';

  let opts = {
    symbol: '¥',
    decimals: 2,
    symbolPosition: 'before' // 'before' | 'after'
  };

  if (typeof options === 'string') {
    opts.symbol = options;
  } else if (typeof options === 'object') {
    opts = { ...opts, ...options };
  }

  const formatted = formatNumber(n, opts.decimals);
  return opts.symbolPosition === 'after' ? `${formatted}${opts.symbol}` : `${opts.symbol}${formatted}`;
}

/**
 * 手机号格式化（3-4-4 格式）
 * @param {string} phone - 手机号
 * @param {string} separator - 分隔符，默认空格
 * @returns {string} 格式化后的手机号
 */
export function formatPhone(phone, separator = ' ') {
  if (!phone) return '';
  const cleaned = String(phone).replace(/\D/g, '');
  if (cleaned.length !== 11) return phone;
  return `${cleaned.slice(0, 3)}${separator}${cleaned.slice(3, 7)}${separator}${cleaned.slice(7)}`;
}

/**
 * 银行卡号格式化（4位一组）
 * @param {string} cardNo - 银行卡号
 * @param {string} separator - 分隔符，默认空格
 * @returns {string} 格式化后的卡号
 */
export function formatBankCard(cardNo, separator = ' ') {
  if (!cardNo) return '';
  const cleaned = String(cardNo).replace(/\s+/g, '');
  return cleaned.replace(/(\d{4})(?=\d)/g, `$1${separator}`);
}

/**
 * 隐藏手机号中间四位
 * @param {string} phone - 手机号
 * @param {string} mask - 遮罩字符，默认 '*'
 * @returns {string} 脱敏后的手机号
 */
export function maskPhone(phone, mask = '*') {
  if (!phone) return '';
  const str = String(phone);
  if (str.length !== 11) return str;
  return str.replace(/(\d{3})\d{4}(\d{4})/, `$1${mask.repeat(4)}$2`);
}

/**
 * 隐藏身份证号
 * @param {string} idCard - 身份证号
 * @param {number} startLen - 开头保留位数，默认 6
 * @param {number} endLen - 结尾保留位数，默认 4
 * @returns {string} 脱敏后的身份证号
 */
export function maskIdCard(idCard, startLen = 6, endLen = 4) {
  if (!idCard) return '';
  const str = String(idCard);
  if (str.length < startLen + endLen) return str;
  const start = str.slice(0, startLen);
  const end = str.slice(-endLen);
  const middle = '*'.repeat(str.length - startLen - endLen);
  return `${start}${middle}${end}`;
}

/**
 * 百分比格式化
 * @param {number} value - 数值（0-1 或 0-100）
 * @param {number} decimals - 小数位数，默认 2
 * @param {boolean} isDecimal - 输入是否为小数（0-1），默认 true
 * @returns {string} 百分比字符串
 */
export function formatPercent(value, decimals = 2, isDecimal = true) {
  const n = Number(value);
  if (isNaN(n)) return '0%';
  const percent = isDecimal ? n * 100 : n;
  return `${percent.toFixed(decimals)}%`;
}

/**
 * 文本截断（省略号）
 * @param {string} text - 文本
 * @param {number} maxLength - 最大长度
 * @param {string} ellipsis - 省略号，默认 '...'
 * @returns {string} 截断后的文本
 */
export function truncate(text, maxLength, ellipsis = '...') {
  if (!text) return '';
  const str = String(text);
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * 驼峰转下划线
 * @param {string} str - 驼峰字符串
 * @returns {string} 下划线字符串
 */
export function camelToSnake(str) {
  if (!str) return '';
  return String(str).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 * 下划线转驼峰
 * @param {string} str - 下划线字符串
 * @returns {string} 驼峰字符串
 */
export function snakeToCamel(str) {
  if (!str) return '';
  return String(str).replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * 首字母大写
 * @param {string} str - 字符串
 * @returns {string} 首字母大写的字符串
 */
export function capitalize(str) {
  if (!str) return '';
  const s = String(str);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * 每个单词首字母大写
 * @param {string} str - 字符串
 * @returns {string} 转换后的字符串
 */
export function capitalizeWords(str) {
  if (!str) return '';
  return String(str).replace(/\b\w/g, letter => letter.toUpperCase());
}

/**
 * 金额转中文大写
 * @param {number} amount - 金额
 * @returns {string} 中文大写金额
 */
export function formatChineseAmount(amount) {
  const n = Number(amount);
  if (isNaN(n)) return '';
  if (n === 0) return '零元整';

  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const units = ['', '拾', '佰', '仟'];
  const bigUnits = ['', '万', '亿', '兆'];
  const decimalUnits = ['角', '分'];

  const negative = n < 0;
  const abs = Math.abs(n);
  const integerPart = Math.floor(abs);
  const decimalPart = Math.round((abs - integerPart) * 100);

  let result = '';

  // 整数部分
  if (integerPart === 0) {
    result = '零';
  } else {
    const intStr = String(integerPart);
    const groups = [];
    for (let i = intStr.length; i > 0; i -= 4) {
      groups.unshift(intStr.slice(Math.max(0, i - 4), i));
    }

    groups.forEach((group, groupIdx) => {
      let groupStr = '';
      let hasDigit = false;
      for (let i = 0; i < group.length; i++) {
        const digit = parseInt(group[i], 10);
        const unitIdx = group.length - 1 - i;
        if (digit === 0) {
          if (hasDigit && i < group.length - 1 && parseInt(group[i + 1], 10) !== 0) {
            groupStr += '零';
          }
        } else {
          groupStr += digits[digit] + units[unitIdx];
          hasDigit = true;
        }
      }
      if (hasDigit) {
        result += groupStr + bigUnits[groups.length - 1 - groupIdx];
      }
    });
  }

  result += '元';

  // 小数部分
  if (decimalPart === 0) {
    result += '整';
  } else {
    const jiao = Math.floor(decimalPart / 10);
    const fen = decimalPart % 10;
    if (jiao > 0) result += digits[jiao] + decimalUnits[0];
    if (fen > 0) result += digits[fen] + decimalUnits[1];
  }

  return negative ? '负' + result : result;
}

/**
 * 数字转中文
 * @param {number} num - 数字
 * @returns {string} 中文数字
 */
export function formatChineseNumber(num) {
  const n = Number(num);
  if (isNaN(n)) return '';
  if (n === 0) return '零';

  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const units = ['', '十', '百', '千'];
  const bigUnits = ['', '万', '亿'];

  const negative = n < 0;
  const abs = Math.floor(Math.abs(n));
  const str = String(abs);

  if (abs < 10) return (negative ? '负' : '') + digits[abs];

  const groups = [];
  for (let i = str.length; i > 0; i -= 4) {
    groups.unshift(str.slice(Math.max(0, i - 4), i));
  }

  let result = '';
  groups.forEach((group, groupIdx) => {
    let groupStr = '';
    let hasDigit = false;
    for (let i = 0; i < group.length; i++) {
      const digit = parseInt(group[i], 10);
      const unitIdx = group.length - 1 - i;
      if (digit === 0) {
        if (hasDigit && i < group.length - 1 && parseInt(group[i + 1], 10) !== 0) {
          groupStr += '零';
        }
      } else {
        groupStr += digits[digit] + units[unitIdx];
        hasDigit = true;
      }
    }
    if (hasDigit) {
      result += groupStr + bigUnits[groups.length - 1 - groupIdx];
    }
  });

  return negative ? '负' + result : result;
}

/**
 * 序数词格式化（1st, 2nd, 3rd...）
 * @param {number} num - 数字
 * @returns {string} 序数词
 */
export function formatOrdinal(num) {
  const n = Number(num);
  if (isNaN(n)) return '';
  const abs = Math.abs(n);
  const lastDigit = abs % 10;
  const lastTwoDigits = abs % 100;

  let suffix = 'th';
  if (lastTwoDigits < 11 || lastTwoDigits > 13) {
    if (lastDigit === 1) suffix = 'st';
    else if (lastDigit === 2) suffix = 'nd';
    else if (lastDigit === 3) suffix = 'rd';
  }

  return `${n}${suffix}`;
}

// ---------------------- Validate 工具实现 ----------------------

/**
 * 手机号验证（支持中国大陆 11 位手机号）
 * @param {string} phone - 手机号
 * @returns {boolean} 是否有效
 */
export function validatePhone(phone) {
  if (!phone) return false;
  const pattern = /^1[3-9]\d{9}$/;
  return pattern.test(String(phone).trim());
}

/**
 * 邮箱验证
 * @param {string} email - 邮箱
 * @returns {boolean} 是否有效
 */
export function validateEmail(email) {
  if (!email) return false;
  const pattern = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;
  return pattern.test(String(email).trim());
}

/**
 * 身份证验证（支持 15 位和 18 位中国大陆身份证）
 * @param {string} idCard - 身份证号
 * @returns {boolean} 是否有效
 */
export function validateIdCard(idCard) {
  if (!idCard) return false;
  const id = String(idCard).trim();

  // 15位身份证
  if (id.length === 15) {
    const pattern = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    return pattern.test(id);
  }

  // 18位身份证
  if (id.length === 18) {
    const pattern = /^[1-9]\d{5}(18|19|20)\d{2}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[0-9Xx]$/;
    if (!pattern.test(id)) return false;

    // 校验码验证
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const codes = '10X98765432';
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += parseInt(id[i], 10) * weights[i];
    }
    const checkCode = codes[sum % 11];
    return checkCode === id[17].toUpperCase();
  }

  return false;
}

/**
 * URL 验证
 * @param {string} url - URL 地址
 * @returns {boolean} 是否有效
 */
export function validateURL(url) {
  if (!url) return false;
  try {
    const u = new URL(String(url));
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

/**
 * IP 地址验证（IPv4）
 * @param {string} ip - IP 地址
 * @returns {boolean} 是否有效
 */
export function validateIPv4(ip) {
  if (!ip) return false;
  const pattern = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
  return pattern.test(String(ip).trim());
}

/**
 * 银行卡号验证（Luhn 算法）
 * @param {string} cardNo - 银行卡号
 * @returns {boolean} 是否有效
 */
export function validateBankCard(cardNo) {
  if (!cardNo) return false;
  const num = String(cardNo).trim().replace(/\s+/g, '');
  if (!/^\d{13,19}$/.test(num)) return false;

  // Luhn 算法校验
  let sum = 0;
  let isEven = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

/**
 * 中文姓名验证（2-20个汉字）
 * @param {string} name - 姓名
 * @returns {boolean} 是否有效
 */
export function validateChineseName(name) {
  if (!name) return false;
  const pattern = /^[\u4e00-\u9fa5]{2,20}$/;
  return pattern.test(String(name).trim());
}

/**
 * 车牌号验证（支持新能源车牌）
 * @param {string} plate - 车牌号
 * @returns {boolean} 是否有效
 */
export function validatePlateNumber(plate) {
  if (!plate) return false;
  const p = String(plate).trim();
  // 普通车牌
  const normal = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{5}$/;
  // 新能源车牌
  const newEnergy = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/;
  return normal.test(p) || newEnergy.test(p);
}

/**
 * 护照号验证（中国护照）
 * @param {string} passport - 护照号
 * @returns {boolean} 是否有效
 */
export function validatePassport(passport) {
  if (!passport) return false;
  // 中国护照: E开头 + 8位数字 或 G开头 + 8位数字 或 旧版P开头
  const pattern = /^([EeGgPp]\d{8})|([Ss][Ee]\d{7})$/;
  return pattern.test(String(passport).trim());
}

/**
 * 密码强度验证
 * @param {string} password - 密码
 * @param {Object} options - 配置选项
 * @param {number} options.minLength - 最小长度，默认 8
 * @param {boolean} options.requireUpperCase - 是否需要大写字母，默认 false
 * @param {boolean} options.requireLowerCase - 是否需要小写字母，默认 false
 * @param {boolean} options.requireNumber - 是否需要数字，默认 false
 * @param {boolean} options.requireSpecial - 是否需要特殊字符，默认 false
 * @returns {boolean} 是否有效
 */
export function validatePassword(password, options) {
  if (!password) return false;
  const pwd = String(password);
  const opts = {
    minLength: 8,
    requireUpperCase: false,
    requireLowerCase: false,
    requireNumber: false,
    requireSpecial: false,
    ...options
  };

  if (pwd.length < opts.minLength) return false;
  if (opts.requireUpperCase && !/[A-Z]/.test(pwd)) return false;
  if (opts.requireLowerCase && !/[a-z]/.test(pwd)) return false;
  if (opts.requireNumber && !/\d/.test(pwd)) return false;
  if (opts.requireSpecial && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) return false;

  return true;
}

/**
 * 社会统一信用代码验证（18位）
 * @param {string} code - 统一社会信用代码
 * @returns {boolean} 是否有效
 */
export function validateUnifiedSocialCreditCode(code) {
  if (!code) return false;
  const c = String(code).trim();
  if (!/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(c)) return false;

  // 校验码计算
  const baseCode = '0123456789ABCDEFGHJKLMNPQRTUWXY';
  const weights = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += baseCode.indexOf(c[i]) * weights[i];
  }
  const checkCode = baseCode[31 - sum % 31];
  return checkCode === c[17];
}

/**
 * 邮政编码验证（中国）
 * @param {string} postcode - 邮政编码
 * @returns {boolean} 是否有效
 */
export function validatePostcode(postcode) {
  if (!postcode) return false;
  const pattern = /^[1-9]\d{5}$/;
  return pattern.test(String(postcode).trim());
}

/**
 * QQ号验证
 * @param {string} qq - QQ号
 * @returns {boolean} 是否有效
 */
export function validateQQ(qq) {
  if (!qq) return false;
  const pattern = /^[1-9]\d{4,10}$/;
  return pattern.test(String(qq).trim());
}

/**
 * 微信号验证
 * @param {string} wechat - 微信号
 * @returns {boolean} 是否有效
 */
export function validateWeChat(wechat) {
  if (!wechat) return false;
  // 微信号规则：6-20位，字母、数字、下划线、减号，字母开头
  const pattern = /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/;
  return pattern.test(String(wechat).trim());
}

/**
 * URL参数解析
 * @param {string} url - URL地址
 * @returns {object} 参数对象
 * 待实现
 */
export function parseQueryString(url) {
  try {
    const input = (url == null ? '' : String(url)).trim();
    const search = input === ''
      ? (typeof window !== 'undefined' && window.location ? window.location.search : '')
      : (input.startsWith('?') ? input : (input.includes('?') ? input.slice(input.indexOf('?')) : ''));
    const params = new (typeof URLSearchParams !== 'undefined' ? URLSearchParams : null)(search.replace(/^\?/, ''));
    const result = {};
    if (!params) return result;
    params.forEach((value, key) => {
      if (Object.prototype.hasOwnProperty.call(result, key)) {
        const prev = result[key];
        if (Array.isArray(prev)) result[key] = prev.concat(value);
        else result[key] = [prev, value];
      } else {
        result[key] = value;
      }
    });
    return result;
  } catch (e) {
    return {};
  }
}

/**
 * 对象转URL参数
 * @param {object} obj - 参数对象
 * @returns {string} URL参数字符串
 * 待实现
 */
export function stringifyQuery(obj) {
  if (!obj || typeof obj !== 'object') return '';
  const parts = [];
  Object.keys(obj).forEach((key) => {
    const v = obj[key];
    if (v == null) return;
    if (Array.isArray(v)) {
      v.forEach(item => parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`));
    } else if (typeof v === 'object') {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(v))}`);
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
    }
  });
  return parts.join('&');
}

export function getQueryParam(key, url) {
  const obj = parseQueryString(url);
  const val = obj[key];
  return Array.isArray(val) ? val[0] : (val != null ? String(val) : null);
}

export function getQueryObject(url) {
  return parseQueryString(url);
}

export function setQueryParam(url, key, value) {
  try {
    const hasWindow = typeof window !== 'undefined';
    const base = url || (hasWindow ? String(window.location.href) : '');
    const u = new URL(base, hasWindow ? window.location.origin : 'http://localhost');
    if (value == null) u.searchParams.delete(key);
    else u.searchParams.set(key, String(value));
    return u.toString();
  } catch (e) {
    const obj = parseQueryString(url);
    if (value == null) delete obj[key]; else obj[key] = value;
    const [prefix] = (url || '').split('?');
    const q = stringifyQuery(obj);
    return q ? `${prefix || ''}?${q}` : (prefix || '');
  }
}

export function buildUrl(base, params, hash) {
  const q = params ? stringifyQuery(params) : '';
  const h = hash ? String(hash).replace(/^#/, '') : '';
  let s = String(base || '');
  if (q) s += (s.includes('?') ? '&' : '?') + q;
  if (h) s += `#${h}`;
  return s;
}

export function joinPath() {
  const segments = Array.prototype.slice.call(arguments).filter(Boolean).map(s => String(s));
  return segments
    .map((seg, idx) => idx === 0 ? seg.replace(/[\/]+$/g, '') : seg.replace(/^[\/]+|[\/]+$/g, ''))
    .filter(seg => seg !== '')
    .join('/') || '/';
}

/**
 * 生成UUID
 * @returns {string} UUID字符串
 */
export function generateUUID() {
  // Prefer cryptographically strong values when available
  const getCrypto = () => {
    try {
      var g;
      if (typeof window !== 'undefined') g = window;
      else if (typeof global !== 'undefined') g = global;
      else if (typeof self !== 'undefined') g = self;
      else g = undefined;
      if (!g) return null;
      const c = g.crypto || g.msCrypto;
      if (c && typeof c.getRandomValues === 'function') return c;
      return null;
    } catch (e) {
      return null;
    }
  };

  const cryptoObj = getCrypto();
  if (cryptoObj) {
    const bytes = new (typeof Uint8Array !== 'undefined' ? Uint8Array : Array)(16);
    cryptoObj.getRandomValues(bytes);
    // Per RFC 4122 section 4.4
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10
    const hex = [];
    for (let i = 0; i < 256; i++) hex[i] = (i + 0x100).toString(16).substr(1);
    return (
      hex[bytes[0]] + hex[bytes[1]] + hex[bytes[2]] + hex[bytes[3]] + '-' +
      hex[bytes[4]] + hex[bytes[5]] + '-' +
      hex[bytes[6]] + hex[bytes[7]] + '-' +
      hex[bytes[8]] + hex[bytes[9]] + '-' +
      hex[bytes[10]] + hex[bytes[11]] + hex[bytes[12]] + hex[bytes[13]] + hex[bytes[14]] + hex[bytes[15]]
    );
  }

  // Fallback (non-crypto)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * 随机字符串
 * @param {number} length - 长度
 * @returns {string} 随机字符串
 * 待实现
 */
export function randomString(length = 8) {
  const defaultAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return randomStringWithAlphabet(length, defaultAlphabet);
}

function randomStringWithAlphabet(length, alphabet) {
  const getCrypto = () => {
    try {
      var g;
      if (typeof window !== 'undefined') g = window;
      else if (typeof global !== 'undefined') g = global;
      else if (typeof self !== 'undefined') g = self;
      else g = undefined;
      if (!g) return null;
      const c = g.crypto || g.msCrypto;
      if (c && typeof c.getRandomValues === 'function') return c;
      return null;
    } catch (e) {
      return null;
    }
  };
  const cryptoObj = getCrypto();
  let result = '';
  if (cryptoObj) {
    const bytes = new (typeof Uint8Array !== 'undefined' ? Uint8Array : Array)(length);
    cryptoObj.getRandomValues(bytes);
    for (let i = 0; i < length; i++) {
      result += alphabet[bytes[i] % alphabet.length];
    }
    return result;
  }
  for (let i = 0; i < length; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return result;
}

/**
 * 树形数据扁平化
 * @param {Array} tree - 树形数据
 * @param {string} childrenKey - 子节点key
 * @returns {Array} 扁平化后的数组
 * 待实现
 */
export function flattenTree(tree, childrenKey = 'children') {
  // 待实现
  return [];
}

/**
 * 数组转树形结构
 * @param {Array} list - 扁平数组
 * @param {string} idKey - ID字段名
 * @param {string} pidKey - 父ID字段名
 * @param {string} childrenKey - 子节点字段名
 * @returns {Array} 树形数据
 * 待实现
 */
export function arrayToTree(list, idKey = 'id', pidKey = 'pid', childrenKey = 'children') {
  // 待实现
  return [];
}

// ---------------------- File 工具实现 ----------------------

/**
 * 下载文件
 * @param {string} url - 文件地址
 * @param {string} filename - 文件名（可选）
 */
export function downloadFile(url, filename) {
  if (!url) return;
  if (typeof window === 'undefined') return;

  const link = document.createElement('a');
  link.href = url;
  if (filename) link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * 导出文件（从 Blob 或数据）
 * @param {Blob|string} data - 文件数据（Blob 或字符串）
 * @param {string} filename - 文件名
 * @param {string} type - MIME 类型（可选）
 */
export function exportFile(data, filename, type) {
  if (!data || !filename) return;
  if (typeof window === 'undefined') return;

  let blob;
  if (data instanceof Blob) {
    blob = data;
  } else {
    const mimeType = type || 'text/plain;charset=utf-8';
    blob = new Blob([data], { type: mimeType });
  }

  // 使用现代 API
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
    return;
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 获取文件扩展名
 * @param {string} filename - 文件名或路径
 * @returns {string} 扩展名（小写，不含点）
 */
export function getFileExtension(filename) {
  if (!filename) return '';
  const name = String(filename);
  const lastDot = name.lastIndexOf('.');
  if (lastDot === -1 || lastDot === name.length - 1) return '';
  return name.slice(lastDot + 1).toLowerCase();
}

/**
 * 字节大小格式化
 * @param {number} bytes - 字节大小
 * @param {number} decimals - 小数位数，默认 2
 * @returns {string} 格式化后的字符串
 */
export function formatBytes(bytes, decimals = 2) {
  const num = Number(bytes);
  if (isNaN(num) || num < 0) return '0 B';
  if (num === 0) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(num) / Math.log(k));
  const size = num / Math.pow(k, i);

  return `${size.toFixed(dm)} ${sizes[i]}`;
}

/**
 * 文件转 Base64
 * @param {File|Blob} file - 文件对象
 * @returns {Promise<string>} Base64 字符串
 */
export function fileToBase64(file) {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Not in browser environment'));
  }
  if (!(file instanceof Blob)) {
    return Promise.reject(new Error('Invalid file'));
  }

  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Base64 转 Blob
 * @param {string} base64 - Base64 字符串
 * @param {string} contentType - MIME 类型，默认从 base64 中提取
 * @returns {Blob} Blob 对象
 */
export function base64ToBlob(base64, contentType) {
  if (!base64) return null;
  if (typeof window === 'undefined') return null;

  let dataUrl = String(base64);
  let type = contentType;

  // 如果是 data URL 格式，提取类型和数据
  if (dataUrl.startsWith('data:')) {
    const matches = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (matches) {
      type = type || matches[1];
      dataUrl = matches[2];
    } else {
      return null;
    }
  }

  try {
    const byteString = atob(dataUrl);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: type || 'application/octet-stream' });
  } catch (e) {
    return null;
  }
}

/**
 * 导出 JSON 文件
 * @param {any} data - 数据对象
 * @param {string} filename - 文件名
 * @param {number} space - JSON 格式化缩进，默认 2
 */
export function exportJSON(data, filename, space = 2) {
  try {
    const json = JSON.stringify(data, null, space);
    exportFile(json, filename || 'data.json', 'application/json;charset=utf-8');
  } catch (e) {
    console.error('Export JSON failed:', e);
  }
}

/**
 * 导出 CSV 文件
 * @param {Array<Array|Object>} data - 数据数组
 * @param {string} filename - 文件名
 * @param {Array<string>} headers - 表头（可选）
 */
export function exportCSV(data, filename, headers) {
  if (!Array.isArray(data) || data.length === 0) return;

  const rows = [];

  // 如果是对象数组
  if (typeof data[0] === 'object' && !Array.isArray(data[0])) {
    const keys = headers || Object.keys(data[0]);
    rows.push(keys.map(k => `"${String(k).replace(/"/g, '""')}"`).join(','));

    data.forEach(item => {
      const row = keys.map(key => {
        const val = item[key];
        const str = val == null ? '' : String(val);
        return `"${str.replace(/"/g, '""')}"`;
      });
      rows.push(row.join(','));
    });
  } else {
    // 如果是数组数组
    if (headers) {
      rows.push(headers.map(h => `"${String(h).replace(/"/g, '""')}"`).join(','));
    }
    data.forEach(row => {
      if (Array.isArray(row)) {
        rows.push(row.map(cell => {
          const str = cell == null ? '' : String(cell);
          return `"${str.replace(/"/g, '""')}"`;
        }).join(','));
      }
    });
  }

  const csv = '\uFEFF' + rows.join('\n'); // BOM for Excel
  exportFile(csv, filename || 'data.csv', 'text/csv;charset=utf-8');
}

/**
 * 读取文件内容为文本
 * @param {File|Blob} file - 文件对象
 * @param {string} encoding - 编码格式，默认 UTF-8
 * @returns {Promise<string>} 文件内容
 */
export function readFileAsText(file, encoding = 'UTF-8') {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Not in browser environment'));
  }
  if (!(file instanceof Blob)) {
    return Promise.reject(new Error('Invalid file'));
  }

  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsText(file, encoding);
  });
}

/**
 * 获取文件 MIME 类型
 * @param {string} filename - 文件名
 * @returns {string} MIME 类型
 */
export function getFileMimeType(filename) {
  const ext = getFileExtension(filename);
  const mimeTypes = {
    // 文本
    txt: 'text/plain',
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    xml: 'application/xml',
    csv: 'text/csv',
    // 图片
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    ico: 'image/x-icon',
    // 文档
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // 压缩
    zip: 'application/zip',
    rar: 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed',
    tar: 'application/x-tar',
    gz: 'application/gzip',
    // 音视频
    mp3: 'audio/mpeg',
    mp4: 'video/mp4',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
    wmv: 'video/x-ms-wmv',
    flv: 'video/x-flv',
    wav: 'audio/wav',
    // 字体
    ttf: 'font/ttf',
    otf: 'font/otf',
    woff: 'font/woff',
    woff2: 'font/woff2'
  };

  return mimeTypes[ext] || 'application/octet-stream';
}

// ---------------------- Storage 工具实现 ----------------------

/**
 * LocalStorage 封装 - 设置
 * @param {string} key - 键名
 * @param {any} value - 值（自动 JSON 序列化）
 * @param {number} expire - 过期时间（毫秒），可选
 */
export function setStorage(key, value, expire) {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  try {
    const data = {
      value,
      timestamp: Date.now(),
      expire: expire ? Date.now() + expire : null
    };
    window.localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('setStorage error:', e);
    return false;
  }
}

/**
 * LocalStorage 封装 - 获取
 * @param {string} key - 键名
 * @param {any} defaultValue - 默认值
 * @returns {any} 值（自动 JSON 反序列化）
 */
export function getStorage(key, defaultValue) {
  if (typeof window === 'undefined' || !window.localStorage) return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return defaultValue;

    const data = JSON.parse(item);
    // 检查是否过期
    if (data.expire && Date.now() > data.expire) {
      window.localStorage.removeItem(key);
      return defaultValue;
    }
    return data.value !== undefined ? data.value : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

/**
 * LocalStorage 封装 - 删除
 * @param {string} key - 键名
 */
export function removeStorage(key) {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * LocalStorage 封装 - 清空
 */
export function clearStorage() {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  try {
    window.localStorage.clear();
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * SessionStorage 封装 - 设置
 * @param {string} key - 键名
 * @param {any} value - 值（自动 JSON 序列化）
 */
export function setSession(key, value) {
  if (typeof window === 'undefined' || !window.sessionStorage) return false;
  try {
    window.sessionStorage.setItem(key, JSON.stringify({ value }));
    return true;
  } catch (e) {
    console.error('setSession error:', e);
    return false;
  }
}

/**
 * SessionStorage 封装 - 获取
 * @param {string} key - 键名
 * @param {any} defaultValue - 默认值
 * @returns {any} 值（自动 JSON 反序列化）
 */
export function getSession(key, defaultValue) {
  if (typeof window === 'undefined' || !window.sessionStorage) return defaultValue;
  try {
    const item = window.sessionStorage.getItem(key);
    if (!item) return defaultValue;
    const data = JSON.parse(item);
    return data.value !== undefined ? data.value : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

/**
 * SessionStorage 封装 - 删除
 * @param {string} key - 键名
 */
export function removeSession(key) {
  if (typeof window === 'undefined' || !window.sessionStorage) return false;
  try {
    window.sessionStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * SessionStorage 封装 - 清空
 */
export function clearSession() {
  if (typeof window === 'undefined' || !window.sessionStorage) return false;
  try {
    window.sessionStorage.clear();
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Cookie 封装 - 设置
 * @param {string} name - Cookie 名称
 * @param {string} value - Cookie 值
 * @param {Object} options - 配置选项
 * @param {number} options.days - 过期天数
 * @param {string} options.path - 路径
 * @param {string} options.domain - 域名
 * @param {boolean} options.secure - 是否仅 HTTPS
 * @param {string} options.sameSite - SameSite 策略
 */
export function setCookie(name, value, options = {}) {
  if (typeof document === 'undefined') return false;
  try {
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.days) {
      const date = new Date();
      date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
      cookie += `; expires=${date.toUTCString()}`;
    }

    cookie += `; path=${options.path || '/'}`;
    if (options.domain) cookie += `; domain=${options.domain}`;
    if (options.secure) cookie += '; secure';
    if (options.sameSite) cookie += `; samesite=${options.sameSite}`;

    document.cookie = cookie;
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Cookie 封装 - 获取
 * @param {string} name - Cookie 名称
 * @returns {string|null} Cookie 值
 */
export function getCookie(name) {
  if (typeof document === 'undefined') return null;
  try {
    const nameEQ = encodeURIComponent(name) + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  } catch (e) {
    return null;
  }
}

/**
 * Cookie 封装 - 删除
 * @param {string} name - Cookie 名称
 * @param {Object} options - 配置选项（path、domain）
 */
export function removeCookie(name, options = {}) {
  return setCookie(name, '', { ...options, days: -1 });
}

/**
 * 获取存储空间使用情况
 * @returns {Object} 使用情况统计
 */
export function getStorageSize() {
  if (typeof window === 'undefined') return { localStorage: 0, sessionStorage: 0 };

  const calcSize = (storage) => {
    if (!storage) return 0;
    let size = 0;
    try {
      for (const key in storage) {
        if (storage.hasOwnProperty(key)) {
          size += storage[key].length + key.length;
        }
      }
    } catch (e) {
      return 0;
    }
    return size;
  };

  return {
    localStorage: calcSize(window.localStorage),
    sessionStorage: calcSize(window.sessionStorage),
    localStorageKB: (calcSize(window.localStorage) / 1024).toFixed(2),
    sessionStorageKB: (calcSize(window.sessionStorage) / 1024).toFixed(2)
  };
}

// ---------------------- Security 工具实现 ----------------------

/**
 * XSS 防护 - HTML 转义
 * @param {string} str - 待转义字符串
 * @returns {string} 转义后的字符串
 */
export function escapeHtml(str) {
  if (!str) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  return String(str).replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * XSS 防护 - HTML 反转义
 * @param {string} str - 待反转义字符串
 * @returns {string} 反转义后的字符串
 */
export function unescapeHtml(str) {
  if (!str) return '';
  const map = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#x27;': "'",
    '&#x2F;': '/'
  };
  return String(str).replace(/&(amp|lt|gt|quot|#x27|#x2F);/g, (match) => map[match]);
}

/**
 * 简单加密（Base64 + 混淆，不适用于敏感数据）
 * @param {string} str - 待加密字符串
 * @param {string} key - 密钥
 * @returns {string} 加密后的字符串
 */
export function simpleEncrypt(str, key = 'default') {
  if (!str) return '';
  try {
    const keyCode = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const encrypted = String(str).split('').map((char, i) => {
      const code = char.charCodeAt(0) ^ (keyCode + i);
      return String.fromCharCode(code);
    }).join('');
    return btoa(encodeURIComponent(encrypted));
  } catch (e) {
    return '';
  }
}

/**
 * 简单解密
 * @param {string} str - 待解密字符串
 * @param {string} key - 密钥
 * @returns {string} 解密后的字符串
 */
export function simpleDecrypt(str, key = 'default') {
  if (!str) return '';
  try {
    const keyCode = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const decoded = decodeURIComponent(atob(str));
    return decoded.split('').map((char, i) => {
      const code = char.charCodeAt(0) ^ (keyCode + i);
      return String.fromCharCode(code);
    }).join('');
  } catch (e) {
    return '';
  }
}

/**
 * MD5 哈希（简化版，不适用于安全场景）
 * @param {string} str - 待哈希字符串
 * @returns {string} 哈希值
 */
export function simpleMD5(str) {
  if (!str) return '';
  // 简化的哈希实现，实际项目应使用 crypto-js 等库
  let hash = 0;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

/**
 * 生成随机 Token
 * @param {number} length - Token 长度，默认 32
 * @returns {string} 随机 Token
 */
export function generateToken(length = 32) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  const getCrypto = () => {
    try {
      if (typeof window !== 'undefined') return window.crypto || window.msCrypto;
      return null;
    } catch (e) {
      return null;
    }
  };

  const cryptoObj = getCrypto();
  if (cryptoObj && cryptoObj.getRandomValues) {
    const bytes = new Uint8Array(length);
    cryptoObj.getRandomValues(bytes);
    for (let i = 0; i < length; i++) {
      token += chars[bytes[i] % chars.length];
    }
  } else {
    for (let i = 0; i < length; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  return token;
}

/**
 * 防抖动（debounce）
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @param {boolean} immediate - 是否立即执行
 * @returns {Function} 防抖后的函数
 */
export function debounceFunc(func, wait = 300, immediate = false) {
  let timeout;
  return function (...args) {
    const context = this;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * 节流（throttle）
 * @param {Function} func - 要节流的函数
 * @param {number} wait - 等待时间（毫秒）
 * @param {Object} options - 配置选项
 * @returns {Function} 节流后的函数
 */
export function throttleFunc(func, wait = 300, options = {}) {
  let timeout, context, args, result;
  let previous = 0;

  const later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  return function (...params) {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    args = params;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

/**
 * 过滤敏感词
 * @param {string} text - 待过滤文本
 * @param {Array<string>} words - 敏感词列表
 * @param {string} replacement - 替换字符，默认 '*'
 * @returns {string} 过滤后的文本
 */
export function filterSensitiveWords(text, words = [], replacement = '*') {
  if (!text || !Array.isArray(words) || words.length === 0) return text;
  let result = String(text);
  words.forEach(word => {
    if (word) {
      const regex = new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      result = result.replace(regex, replacement.repeat(word.length));
    }
  });
  return result;
}

// ---------------------- DOM 工具实现 ----------------------

export function trimAll(str) {
  if (str == null) return '';
  return String(str).replace(/\s+/g, '');
}

export function byteLength(str, encoding) {
  if (str == null) return 0;
  const s = String(str);
  try {
    if (typeof TextEncoder !== 'undefined' && (!encoding || encoding.toLowerCase() === 'utf-8')) {
      return new TextEncoder().encode(s).length;
    }
  } catch (e) { }
  // Fallback: rough count (ASCII=1, others=2)
  let len = 0;
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    len += code <= 0x7f ? 1 : (code <= 0x7ff ? 2 : 3);
  }
  return len;
}

export function toClipboard(text) {
  const s = text == null ? '' : String(text);
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(s);
  }
  if (typeof Promise === 'undefined') {
    // 环境不支持 Promise，直接降级失败
    try {
      const textarea = document.createElement('textarea');
      textarea.value = s;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (!ok) throw new Error('COPY_COMMAND_FAILED');
      return undefined;
    } catch (err) {
      return undefined;
    }
  }
  // eslint-disable-next-line no-undef
  return new Promise(function (resolve, reject) {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = s;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      ok ? resolve() : reject(new Error('COPY_COMMAND_FAILED'));
    } catch (err) {
      reject(err);
    }
  });
}

export function scrollIntoViewIfNeeded(el, options) {
  if (!el || typeof window === 'undefined') return;
  if (typeof el.scrollIntoViewIfNeeded === 'function') {
    try { el.scrollIntoViewIfNeeded(true); } catch (e) { }
    return;
  }
  try {
    el.scrollIntoView(options || { block: 'nearest', inline: 'nearest' });
  } catch (e) { }
}

export function getBoundingClientRectSafe(el) {
  if (!el || typeof el.getBoundingClientRect !== 'function') return null;
  try {
    return el.getBoundingClientRect();
  } catch (e) {
    return null;
  }
}

export function isInViewport(el, offset) {
  const rect = getBoundingClientRectSafe(el);
  if (!rect) return false;
  const off = offset || 0;
  const top = rect.top - off;
  const left = rect.left - off;
  const right = rect.right + off;
  const bottom = rect.bottom + off;
  const vw = (typeof window !== 'undefined' ? window.innerWidth : 0) || 0;
  const vh = (typeof window !== 'undefined' ? window.innerHeight : 0) || 0;
  return top < vh && bottom > 0 && left < vw && right > 0;
}

// ---------------------- Env 工具实现 ----------------------

/**
 * 检测是否为浏览器环境
 */
export function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * 检测是否为移动设备
 */
export function isMobile() {
  if (!isBrowser()) return false;
  const ua = navigator.userAgent || '';
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}

/**
 * 检测是否为 iOS 设备
 */
export function isIOS() {
  if (!isBrowser()) return false;
  const ua = navigator.userAgent || '';
  return /iPhone|iPad|iPod/i.test(ua);
}

/**
 * 检测是否为 Android 设备
 */
export function isAndroid() {
  if (!isBrowser()) return false;
  const ua = navigator.userAgent || '';
  return /Android/i.test(ua);
}

/**
 * 检测是否为微信浏览器
 */
export function isWeChat() {
  if (!isBrowser()) return false;
  const ua = navigator.userAgent || '';
  return /MicroMessenger/i.test(ua);
}

/**
 * 获取浏览器类型和版本
 */
export function getBrowserInfo() {
  if (!isBrowser()) return { name: 'unknown', version: 'unknown' };
  const ua = navigator.userAgent || '';
  let name = 'unknown';
  let version = 'unknown';

  // Edge (Chromium-based)
  if (/Edg\//i.test(ua)) {
    name = 'Edge';
    const match = ua.match(/Edg\/(\S+)/);
    if (match) version = match[1];
  } else if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) {
    // Chrome
    name = 'Chrome';
    const match = ua.match(/Chrome\/(\S+)/);
    if (match) version = match[1].split(' ')[0];
  } else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) {
    // Safari
    name = 'Safari';
    const match = ua.match(/Version\/(\S+)/);
    if (match) version = match[1].split(' ')[0];
  } else if (/Firefox/i.test(ua)) {
    // Firefox
    name = 'Firefox';
    const match = ua.match(/Firefox\/(\S+)/);
    if (match) version = match[1];
  } else if (/MSIE|Trident/i.test(ua)) {
    // IE
    name = 'IE';
    const match = ua.match(/(?:MSIE |rv:)(\d+(\.\d+)?)/);
    if (match) version = match[1];
  }

  return { name, version };
}

/**
 * 获取操作系统信息
 */
export function getOSInfo() {
  if (!isBrowser()) return { name: 'unknown', version: 'unknown' };
  const ua = navigator.userAgent || '';
  let name = 'unknown';
  let version = 'unknown';

  if (/Windows NT/i.test(ua)) {
    name = 'Windows';
    const match = ua.match(/Windows NT (\d+\.\d+)/);
    if (match) {
      const ntVersion = match[1];
      const versionMap = {
        '10.0': '10',
        '6.3': '8.1',
        '6.2': '8',
        '6.1': '7',
        '6.0': 'Vista',
        '5.1': 'XP'
      };
      version = versionMap[ntVersion] || ntVersion;
    }
  } else if (/Mac OS X/i.test(ua)) {
    name = 'macOS';
    const match = ua.match(/Mac OS X (\d+[._]\d+([._]\d+)?)/);
    if (match) version = match[1].replace(/_/g, '.');
  } else if (/Android/i.test(ua)) {
    name = 'Android';
    const match = ua.match(/Android (\d+(\.\d+)?)/);
    if (match) version = match[1];
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    name = 'iOS';
    const match = ua.match(/OS (\d+[._]\d+([._]\d+)?)/);
    if (match) version = match[1].replace(/_/g, '.');
  } else if (/Linux/i.test(ua)) {
    name = 'Linux';
  }

  return { name, version };
}

/**
 * 获取设备类型
 */
export function getDeviceType() {
  if (!isBrowser()) return 'unknown';
  const ua = navigator.userAgent || '';
  if (/iPad/i.test(ua)) return 'tablet';
  if (/Mobile|Android|iPhone|iPod/i.test(ua)) return 'mobile';
  return 'desktop';
}

/**
 * 检测是否支持触摸
 */
export function isTouchDevice() {
  if (!isBrowser()) return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0)
  );
}

/**
 * 获取视口尺寸
 */
export function getViewportSize() {
  if (!isBrowser()) return { width: 0, height: 0 };
  return {
    width: window.innerWidth || document.documentElement.clientWidth || 0,
    height: window.innerHeight || document.documentElement.clientHeight || 0
  };
}

/**
 * 检测是否为暗色模式
 */
export function isDarkMode() {
  if (!isBrowser()) return false;
  if (window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
}

/**
 * 获取网络连接信息
 */
export function getNetworkInfo() {
  if (!isBrowser()) return { effectiveType: 'unknown', downlink: 0, rtt: 0, saveData: false };
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!conn) {
    return { effectiveType: 'unknown', downlink: 0, rtt: 0, saveData: false };
  }
  return {
    effectiveType: conn.effectiveType || 'unknown',
    downlink: conn.downlink || 0,
    rtt: conn.rtt || 0,
    saveData: conn.saveData || false
  };
}

/**
 * 检测是否在线
 */
export function isOnline() {
  if (!isBrowser()) return true;
  return navigator.onLine !== false;
}

// ---------------------- Core 工具实现 ----------------------

function isPlainObject(value) {
  if (Object.prototype.toString.call(value) !== '[object Object]') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === null || proto === Object.prototype;
}

export function isEmpty(value) {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof Map !== 'undefined' && value instanceof Map) return value.size === 0;
  if (typeof Set !== 'undefined' && value instanceof Set) return value.size === 0;
  if (isPlainObject(value)) return Object.keys(value).length === 0;
  return false;
}

export function merge(target, ...sources) {
  const validSources = sources.filter(s => s != null);
  const base = target == null ? {} : target;
  return deepmerge.all([base, ...validSources]);
}

export function toNumber(value, fallback) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : (fallback !== undefined ? fallback : NaN);
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (value == null) return fallback !== undefined ? fallback : NaN;
  const n = Number(String(value).trim());
  return Number.isFinite(n) ? n : (fallback !== undefined ? fallback : NaN);
}

export function toBoolean(value, truthyList) {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  const normalized = String(value).trim().toLowerCase();
  const defaults = ['true', '1', 'yes', 'y', 'on'];
  const truthies = Array.isArray(truthyList) && truthyList.length ? truthyList.map(s => String(s).toLowerCase()) : defaults;
  if (truthies.includes(normalized)) return true;
  if (normalized === 'false' || normalized === '0' || normalized === 'no' || normalized === 'off' || normalized === '') return false;
  return false;
}

export function get(object, path, defaultValue) {
  if (object == null) return defaultValue;
  if (Array.isArray(path)) {
    return path.reduce((acc, key) => (acc != null ? acc[key] : undefined), object) || defaultValue;
  }
  const keys = String(path)
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/\["([^\]]+)"\]/g, '.$1')
    .replace(/^\./, '')
    .split('.');
  let result = object;
  for (const key of keys) {
    if (result == null) return defaultValue;
    result = result[key];
  }
  return result === undefined ? defaultValue : result;
}

export function set(object, path, value) {
  const obj = isPlainObject(object) || Array.isArray(object) ? deepClone(object) : {};
  const keys = Array.isArray(path) ? path.slice() : String(path)
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/\["([^\]]+)"\]/g, '.$1')
    .replace(/^\./, '')
    .split('.');
  let cur = obj;
  while (keys.length > 1) {
    const key = keys.shift();
    if (!isPlainObject(cur[key]) && !Array.isArray(cur[key])) {
      // 下一个键是否为数字，决定创建数组还是对象
      const nextKey = keys[0];
      cur[key] = /^\d+$/.test(nextKey) ? [] : {};
    }
    cur = cur[key];
  }
  cur[keys[0]] = value;
  return obj;
}

/**
 * 生成唯一 ID
 * - 默认返回 RFC4122 v4 UUID（带连字符）
 * - 若传入 options.length，则按指定长度生成随机字符串（可自定义字符集、前缀、大小写）
 * @param {Object} [options]
 * @param {number} [options.length] 自定义长度；提供时返回短 ID
 * @param {string} [options.alphabet] 自定义字符集，默认大小写字母+数字
 * @param {string} [options.prefix] 自定义前缀，将直接拼接在 ID 前
 * @param {boolean} [options.upperCase] 转为大写，仅对短 ID 或 UUID 生效
 * @returns {string}
 */
export function uuid(arg1, arg2) {
  // Overloads:
  // - uuid() → RFC4122 v4
  // - uuid(length:number)
  // - uuid(prefix:string, length?:number)
  // - uuid(options: { length?, alphabet?, prefix?, upperCase?, case? })
  const normalize = () => {
    // Backward compatible options object
    if (typeof arg1 === 'object' && arg1 !== null) return { ...arg1 };
    // uuid(length)
    if (typeof arg1 === 'number') return { length: arg1 };
    // uuid(prefix, length?)
    if (typeof arg1 === 'string') {
      if (typeof arg2 === 'number') return { prefix: arg1, length: arg2 };
      if (typeof arg2 === 'object' && arg2 !== null) return { prefix: arg1, ...arg2 };
      return { prefix: arg1 };
    }
    // no args → default UUID
    return {};
  };

  const opts = normalize();
  let id;
  if (opts.length && opts.length > 0) {
    const alphabet = typeof opts.alphabet === 'string' && opts.alphabet.length > 0
      ? opts.alphabet
      : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    id = randomStringWithAlphabet(opts.length, alphabet);
  } else {
    id = generateUUID();
  }
  // case option: 'upper' | 'lower' | undefined; keep upperCase for compatibility
  if (opts.case === 'upper' || opts.upperCase === true) id = id.toUpperCase();
  if (opts.case === 'lower') id = id.toLowerCase();
  if (opts.prefix) id = `${opts.prefix}${id}`;
  return id;
}

export default {
  // Core
  isEmpty,
  merge,
  toNumber,
  toBoolean,
  get,
  set,
  uuid,
  // Datetime
  formatDate,
  parseDate,
  getDateDiff,
  add,
  subtract,
  toTimestamp,
  fromTimestamp,
  isSameDay,
  isBetween,
  fromNow,
  // URL
  getQueryParam,
  getQueryObject,
  setQueryParam,
  buildUrl,
  joinPath,
  // DOM
  trimAll,
  byteLength,
  toClipboard,
  scrollIntoViewIfNeeded,
  getBoundingClientRectSafe,
  isInViewport,
  // Env
  isBrowser,
  isMobile,
  isIOS,
  isAndroid,
  isWeChat,
  getBrowserInfo,
  getOSInfo,
  getDeviceType,
  isTouchDevice,
  getViewportSize,
  isDarkMode,
  getNetworkInfo,
  isOnline,
  // Validate
  validatePhone,
  validateEmail,
  validateIdCard,
  validateURL,
  validateIPv4,
  validateBankCard,
  validateChineseName,
  validatePlateNumber,
  validatePassport,
  validatePassword,
  validateUnifiedSocialCreditCode,
  validatePostcode,
  validateQQ,
  validateWeChat,
  // File
  downloadFile,
  exportFile,
  getFileExtension,
  formatBytes,
  fileToBase64,
  base64ToBlob,
  exportJSON,
  exportCSV,
  readFileAsText,
  getFileMimeType,
  // Format
  formatNumber,
  formatCurrency,
  formatPhone,
  formatBankCard,
  maskPhone,
  maskIdCard,
  formatPercent,
  truncate,
  camelToSnake,
  snakeToCamel,
  capitalize,
  capitalizeWords,
  formatChineseAmount,
  formatChineseNumber,
  formatOrdinal,
  // Storage
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
  setSession,
  getSession,
  removeSession,
  clearSession,
  setCookie,
  getCookie,
  removeCookie,
  getStorageSize,
  // Security
  escapeHtml,
  unescapeHtml,
  simpleEncrypt,
  simpleDecrypt,
  simpleMD5,
  generateToken,
  debounceFunc,
  throttleFunc,
  filterSensitiveWords,
  // Legacy/Existing
  deepClone,
  debounce,
  throttle,
  parseQueryString,
  stringifyQuery,
  generateUUID,
  randomString,
  flattenTree,
  arrayToTree
};

