function getStorage(isLocal?: boolean) {
  return isLocal ? window.sessionStorage : window.localStorage;
}
/**
 * 存储数据
 * @param {string} key
 * @param {any} data
 * @param {boolean} isLocal 是否临时存储，默认是本地
 */
export function setKey(key: string, data: object | string, isLocal?: boolean) {
  data = typeof data === 'object' ? JSON.stringify(data) : data;
  getStorage(isLocal).setItem(key, data);
}

/**
 * 获取数据
 * @param {string} key
 * @param {boolean} isLocal 是否从临时存储中获取数据，默认是本地
 */
export function getKey(key: string, isLocal?: boolean) {
  const data = getStorage(isLocal).getItem(key);
  return data ? JSON.parse(data) : null;
}

/**
 * 移除数据
 * @param {string} key
 * @param {boolean} isLocal 是否移除临时存储数据，默认是本地
 */
export function rmKey(key: string, isLocal?: boolean) {
  getStorage(isLocal).removeItem(key);
}
