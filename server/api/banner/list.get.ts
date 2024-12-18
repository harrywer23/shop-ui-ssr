import { defineEventHandler, getQuery } from 'h3';
import { API_CONSTANTS } from "~/utils/constants";
import { createHash } from 'node:crypto';
import { LRUCache } from 'lru-cache';

const cache = new LRUCache<string, any>({
  max: 1000,
  ttl: 1000 * 60 * 60 * 24,
})

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const headers = event.req.headers;
  const language = headers["accept-language"];

  // console.log('language:', language)

  const stringToHash = query ? JSON.stringify(query) : "list";
  const hash = createHash('md5').update(stringToHash).digest('hex');
//  console.log(hash);
  const cacheKey = `banner:list:${hash}`;

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const fullUrl = `${API_CONSTANTS.BASE_URL}/banner/list?`+tansParams(query);

    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
         'Accept-Language':  `${language}`
      }
    });

    const data = await response.json();
    if (data.code === 200) {
       cache.set(cacheKey, data);
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
