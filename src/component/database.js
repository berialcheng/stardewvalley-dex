import {bleach} from "./mpHtml";
import {getCacheData, setCacheData} from "./cache"
import Taro from '@tarojs/taro'

async function callCloudFunction(key) {
  if (typeof qq !== 'undefined' && qq.cloud) {
    qq.cloud.init({
      env: "stardewvalley-5g8bi0xq0651d03e"
    });

    let resp = await qq.cloud.callFunction({name: 'fetchArticle', data: {text: key}});
    return resp.result
  } else if (typeof wx !== 'undefined') {
    let resp = await Taro.request({
      url: `https://stardewvalley-5g8bi0xq0651d03e-1304966148.ap-shanghai.app.tcloudbase.com/fetchStartdew?name=${key}`,
    });
    return resp.data
  }
}

async function callCloudDatabase(key) {
  if (typeof qq !== 'undefined' && qq.cloud !== undefined) {
    const db = qq.cloud.database({env: "stardewvalley-5g8bi0xq0651d03e"})
    let resp =  await db.collection('article')
      .where({
        _id: key
      }).get();
    if (resp.data.length > 0) {
      return resp.data[0].parse.text['*'];
    }
  }
}

export async function fetchData(key) {
  let resp;

  resp = getCacheData(key);
  if (resp) {
    return resp;
  }

  resp = await callCloudDatabase(key);
  if (!resp) {
    resp = await callCloudFunction(key)
  }

  setCacheData(key, bleach(resp));
  return getCacheData(key);
}
