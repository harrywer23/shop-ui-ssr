import { defineEventHandler } from 'h3';
import { LRUCache } from 'lru-cache';
import {API_CONSTANTS, fnv1a} from "~/utils/constants";

const cache =new LRUCache<string, any>({
  max: 1000,
  ttl: 1000 * 60,
})
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  // 获取请求头
  const headers = event.req.headers;
  const language= headers["accept-language"] ;

  // console.log('language:', language)
// 你需要计算 MD5 的字符串
  const stringToHash =query ? JSON.stringify(query):"random";
// 创建一个 MD5 哈希实例
  const hash = fnv1a(stringToHash);
// 输出结果
//   console.log(hash);
  const cacheKey = `prod:random:${hash}`;

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    //console.log('Using cached data for:'+cacheKey);
    return cachedData;
  }

  try {
    // 构建完整的 URL
    const fullUrl = `${API_CONSTANTS.BASE_URL}/prod/random?`+tansParams(query);
    //console.log('Fetching from URL:', fullUrl);

    // 在处理函数内执行 fetch
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language':  `${language}`
      }
    });

    // 解析响应
    const data = await response.json();
    //console.log('API Response:', {
    //   code: data.code,
    //   msg: data.msg,
    //   hasData: !!data.data
    // });

    if (data.code === 200) {
       cache.set(cacheKey, data);
      //console.log('Caching successful response for:'+cacheKey);
    }
    return data;

  } catch (error) {
    console.error('Error fetching album info:', error);
    return {
      code: 500,
      msg: '获取专辑信息失败',
      data: null
    };
  }
});
