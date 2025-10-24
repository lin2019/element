/**
 * HTTP请求工具
 * 基于axios封装的HTTP请求工具，支持请求拦截、响应拦截、错误处理等功能
 */

/* global Promise */

import axios from 'axios';
import MessageBox from '../../packages/message-box/index.js';
import Message from '../../packages/message/index.js';
import Loading from '../../packages/loading/index.js';

/**
 * 响应数据转换函数
 * 将RECORD类型的数据转换为Map对象，便于字典查询
 * @param {Object} res - 响应数据
 * @returns {Object} 转换后的响应数据
 */
function resTransform(res) {
  if (typeof res === 'object') {
    for (const key in res) {
      if (typeof res[key] === 'object' && res[key].type === 'RECORD' && res[key].list) {
        const tempObj = {};
        const list = res[key].list;
        /* eslint-disable no-undef */
        const mapObj = new Map();
        /* eslint-enable no-undef */

        for (let i = 0; i < list.length; i++) {
          tempObj[list[i].code] = list[i].name;
          mapObj.set(list[i].name, list[i].code);
        }

        res[key].data = tempObj;
        res[key].map = mapObj;
      }
    }
  }
  return res;
}

/**
 * 获取上下文路径
 * @returns {string} 上下文路径
 */
function getCtxPath() {
  // todo 取第二个
  const prefixPath = ''; // getPrefixPath();
  if (prefixPath) {
    const pathName = window.document.location.pathname;
    const array = pathName.split('/');
    const contextPath = array[1];
    return prefixPath + contextPath;
  } else {
    const pathName = window.document.location.pathname;
    const contextPath = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return contextPath;
  }
}

/**
 * 默认axios配置
 */
const defaultAxiosConfig = {
  method: 'post',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
};

/**
 * 错误处理函数
 * @param {Object} error - axios错误对象
 * @param {string} url - 请求地址
 */
function errorHandle(error, url) {
  console.error('发送AJAX请求到"' + url + '"时出错', error);

  if (!error.response) {
    // 请求未发出或网络错误
    if (error.code === 'ECONNABORTED' || error.message.indexOf('timeout') !== -1) {
      MessageBox.alert('请求超时,请检查网络!', '错误', {
        confirmButtonText: '确定',
        type: 'error'
      });
    } else if (error.message === 'Network Error') {
      MessageBox.alert('网络异常,请刷新页面重试！', '错误', {
        confirmButtonText: '确定',
        type: 'error'
      });
    } else {
      Message.error('ajax请求没有发出或已被取消');
    }
  } else {
    // 请求已发出，服务器返回错误状态码
    const status = error.response.status;

    if (status === 404) {
      MessageBox.alert('链接[' + url + ']不存在!', '404错误', {
        confirmButtonText: '确定',
        type: 'error'
      });
    } else if (status === 500) {
      MessageBox.alert('功能异常,请与管理员联系或稍后再试!', '服务器错误', {
        confirmButtonText: '确定',
        type: 'error'
      });
    } else {
      const errorMsg = error.response.data || error.response.statusText;
      Message.error(typeof errorMsg === 'string' ? errorMsg : '请求失败');
    }
  }
}

/**
 * 处理参数前缀
 * @param {Object} params - 原始参数对象
 * @param {Object} option - 配置选项
 * @returns {Object} 处理后的参数对象
 */
function handleParamPrefix(params, option) {
  if (!option || !option.prefix || typeof params !== 'object') {
    return params;
  }

  const result = {};
  for (const key in params) {
    let shouldPrefix = true;

    // 白名单检查
    if (option.prefixWhite) {
      shouldPrefix = option.prefixWhite.indexOf(key) !== -1;
    } else if (option.prefixBlack) {
      // 黑名单检查
      shouldPrefix = option.prefixBlack.indexOf(key) === -1;
    }

    if (shouldPrefix) {
      result[option.prefix + key] = params[key];
    } else {
      result[key] = params[key];
    }
  }
  return result;
}

/**
 * 从Content-Disposition响应头中提取文件名
 * @param {string} disposition - Content-Disposition响应头
 * @returns {string} 文件名
 */
function getFilenameFromDisposition(disposition) {
  if (!disposition || disposition.indexOf('attachment') === -1) return '';
  const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
  return matches ? decodeURIComponent(matches[1].replace(/['"]/g, '')) : '';
}

/**
 * HTTP请求类
 */
class Http {
  constructor() {
    // 初始化axios实例
    this.instance = axios.create(defaultAxiosConfig);

    // Loading 相关属性
    this.loadingInstance = null;
    this.requestCount = 0;

    // 设置拦截器
    this.setupInterceptors();
  }

  /**
   * 显示 loading
   * @param {Object} config - axios配置对象
   */
  showLoading(config) {
    // 如果配置了 loading: false，则不显示
    if (config.loading === false) return;

    this.requestCount++;
    if (this.requestCount === 1) {
      const loadingOptions = {
        lock: true,
        text: config.loadingText || '加载中...',
        spinner: 'el-icon-loading'
      };

      // 如果指定了覆盖的目标节点
      if (config.target) {
        loadingOptions.target = config.target;
      }

      // 如果指定了背景色
      if (config.background) {
        loadingOptions.background = config.background;
      }

      this.loadingInstance = Loading.service(loadingOptions);
    }
  }

  /**
   * 隐藏 loading
   */
  hideLoading() {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.loadingInstance && this.loadingInstance.close();
      this.loadingInstance = null;
    }
  }

  /**
   * 设置拦截器
   */
  setupInterceptors() {
    // 请求拦截器
    this.instance.interceptors.request.use(
      config => {
        this.showLoading(config);
        // 可以在这里添加token等
        return config;
      },
      error => {
        this.hideLoading();
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      response => {
        this.hideLoading();
        return response.data;
      },
      error => {
        this.hideLoading();
        return Promise.reject(error);
      }
    );
  }

  /**
   * 获取上下文路径
   */
  getCtxPath() {
    return getCtxPath();
  }

  /**
   * 远程调用
   * @param {string} url - 请求地址
   * @param {Object} postdataOrigin - 请求参数对象
   * @param {Function} successCallback - 成功回调函数
   * @param {Object} option - 额外配置选项
   * @returns {Promise}
   */
  remoteCall(url, postdataOrigin, successCallback, option) {
    let postdata = postdataOrigin || {};

    // 处理参数前缀
    postdata = handleParamPrefix(postdata, option);

    // 转换为JSON字符串
    const dataStr = JSON.stringify(postdata);

    // 构建请求配置
    const axiosConfig = {
      ...defaultAxiosConfig,
      ...option,
      url: url,
      data: new URLSearchParams({ data: dataStr })
    };

    return this.instance(axiosConfig)
      .then(res => {
        successCallback && successCallback(res);
        return res;
      })
      .catch(error => {
        errorHandle(error, url);
        throw error;
      });
  }

  /**
   * DAO调用
   * @param {Object} postdata - 请求参数 {controls:[],params:{}}
   * @param {Function} successCallback - 成功回调函数
   * @param {Object} option - 额外配置选项
   * @returns {Promise}
   */
  daoCall(postdata, successCallback, option) {
    option = option || {};

    // daoCall 默认不显示 loading
    if (option.loading === undefined) {
      option.loading = false;
    }

    const contextPath = option.contextPath
      ? (option.contextPath.indexOf('/') === -1 ? '/' + option.contextPath : option.contextPath)
      : getCtxPath();

    // 处理params的前缀
    if (option && option.prefix && typeof postdata === 'object' && postdata.params) {
      postdata.params = handleParamPrefix(postdata.params, option);
    }

    // 转换为JSON字符串
    const dataStr = JSON.stringify(postdata);

    const url = contextPath + '/webcall';

    // 构建请求配置
    const axiosConfig = {
      ...defaultAxiosConfig,
      ...option,
      url: url,
      data: new URLSearchParams({ data: dataStr })
    };

    return this.instance(axiosConfig)
      .then(res => {
        // 字典形式需要转换
        if (window.yq && window.yq.cfg && window.yq.cfg.recordSort) {
          res = resTransform(res);
        }
        successCallback && successCallback(res);
        return res;
      })
      .catch(error => {
        errorHandle(error, url);
        throw error;
      });
  }

  /**
   * 表格数据调用
   * @param {string} url - 请求地址
   * @param {Object} postdata - 请求参数 {pageSize,pageIndex,data}
   * @param {Function} successCallback - 成功回调函数
   * @param {Object} option - 额外配置选项
   * @returns {Promise}
   */
  tableCall(url, postdata, successCallback, option) {
    postdata = postdata || { pageSize: 20, pageIndex: 1, data: {} };

    // 处理data的前缀
    if (option && option.prefix && typeof postdata === 'object' && postdata.data) {
      postdata.data = handleParamPrefix(postdata.data, option);
    }

    // 将data转换为JSON字符串
    if (typeof postdata.data === 'object') {
      postdata.data = JSON.stringify(postdata.data);
    }

    // 构建请求配置
    const axiosConfig = {
      ...defaultAxiosConfig,
      ...option,
      url: url,
      data: new URLSearchParams(postdata)
    };

    return this.instance(axiosConfig)
      .then(res => {
        successCallback && successCallback(res);
        return res;
      })
      .catch(error => {
        errorHandle(error, url);
        throw error;
      });
  }

  /**
   * 文件导出/下载调用
   * @param {string} url - 下载地址
   * @param {Object} params - 请求参数
   * @param {Function} successCallback - 成功回调函数
   * @param {Object} option - 额外配置选项
   * @param {string} option.method - 请求方法，默认'GET'
   * @param {Function} option.onStart - 开始下载回调
   * @param {Function} option.onEnd - 结束下载回调（无论成功失败）
   * @param {string} option.defaultFilename - 默认文件名
   * @returns {Promise<string>} 返回下载的文件名
   */
  exportCall(url, params, successCallback, option) {
    option = option || {};
    const method = (option.method || 'GET').toUpperCase();

    // 触发开始回调
    option.onStart && option.onStart();

    // 构建请求配置，使用axios直接请求以获取完整响应对象
    const axiosConfig = {
      url: url,
      method: method,
      responseType: 'blob',
      timeout: option.timeout || 60000
    };

    // 处理请求参数
    if (params) {
      if (method === 'GET') {
        axiosConfig.params = params;
      } else if (method === 'POST') {
        axiosConfig.data = new URLSearchParams(params);
        axiosConfig.headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        };
      }
    }

    // 使用axios直接请求，不经过响应拦截器，以获取完整的response对象
    return axios(axiosConfig)
      .then(response => {
        // 触发结束回调
        option.onEnd && option.onEnd();

        // 获取文件名
        const disposition = response.headers['content-disposition'];
        const filename = getFilenameFromDisposition(disposition) || option.defaultFilename || 'download';

        // 创建下载链接
        const blob = response.data;
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);

        // 执行成功回调
        successCallback && successCallback(filename);

        return filename;
      })
      .catch(error => {
        // 触发结束回调
        option.onEnd && option.onEnd();

        // 处理错误
        errorHandle(error, url);
        throw error;
      });
  }

  /**
   * GET请求
   * @param {string} url - 请求地址
   * @param {Object} params - 请求参数（查询参数）
   * @param {Object} config - axios配置选项
   * @returns {Promise}
   */
  get(url, params, config) {
    const axiosConfig = {
      ...config,
      url: url,
      method: 'GET',
      params: params
    };

    return this.instance(axiosConfig)
      .catch(error => {
        errorHandle(error, url);
        throw error;
      });
  }

  /**
   * POST请求
   * @param {string} url - 请求地址
   * @param {Object} data - 请求数据
   * @param {Object} config - axios配置选项
   * @param {string} config.contentType - 内容类型：'json'|'form'|'formData'，默认'form'
   * @returns {Promise}
   */
  post(url, data, config) {
    config = config || {};
    const contentType = config.contentType || 'form';

    let requestData = data;
    let headers = {};

    // 根据内容类型处理数据
    if (contentType === 'json') {
      requestData = data;
      headers['Content-Type'] = 'application/json';
    } else if (contentType === 'formData') {
      // FormData 类型，浏览器会自动设置 Content-Type
      requestData = data;
    } else {
      // 默认 form 类型
      requestData = new URLSearchParams(data);
      headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    const axiosConfig = {
      ...config,
      url: url,
      method: 'POST',
      data: requestData,
      headers: {
        ...headers,
        ...config.headers
      }
    };

    return this.instance(axiosConfig)
      .catch(error => {
        errorHandle(error, url);
        throw error;
      });
  }

}

export default new Http();

