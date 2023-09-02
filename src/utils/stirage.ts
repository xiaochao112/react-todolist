function getStorage(isLocal: boolean) {
  return isLocal ? window.localStorage : window.sessionStorage;
}
/**
 * 存储数据
 * @param {boolean} isLocal 是否本地存储
 * @param {string} key
 * @param {any} data
 */
export function setKey(isLocal: boolean, key: string, data: object | string) {
  getStorage(isLocal).setItem(key, JSON.stringify(data));
}

/**
 * 获取数据
 * @param {boolean} isLocal 是否本地存储
 * @param {string} key
 */
export function getKey(isLocal: boolean, key: string) {
  const data = getStorage(isLocal).getItem(key);
  return data ? JSON.parse(data) : null;
}

/**
 * 移除数据
 * @param {boolean} isLocal 是否本地存储
 * @param {string} key
 */
export function rmKey(isLocal: boolean, key: string) {
  getStorage(isLocal).removeItem(key);
}
