// eslint-disable-next-line no-undef-init
var storage = undefined;
if (typeof qq !== 'undefined') {
  storage = qq;
} else if (typeof wx !== 'undefined') {
  storage = wx;
}

export function getCacheData(key) {
  let timestamp = Date.parse(new Date())
  let expiration = storage.getStorageSync(key + '_expiration')
  let data = storage.getStorageSync(key)
  if (data && expiration > timestamp) {
    return data
  } else {
    storage.removeStorageSync(key)
    storage.removeStorageSync(key + '_expiration')
    return null
  }
}

export function setCacheData(key, data, expireTime = 600000) { //600s
  var timestamp = Date.parse(new Date())
  var expiration = timestamp + expireTime
  storage.setStorageSync(key, data)
  storage.setStorageSync(key + '_expiration', expiration)
  return data
}

export default {
  getCacheData,
  setCacheData
}
