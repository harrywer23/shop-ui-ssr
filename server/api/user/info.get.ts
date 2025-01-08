import {API_CONSTANTS} from "~/utils/constants"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    // 获取请求头
    const headers = event.req.headers;
    const language= headers["accept-language"] ;
    const token = headers.authorization ? headers.authorization.split(' ')[1] : null;
    try {
        // 构建完整的 URL
        const fullUrl = `${API_CONSTANTS.BASE_URL}/user/info`;
        //console.log(fullUrl);
        // 在处理函数内执行 fetch
        const response = await fetch(fullUrl, {
          headers: {
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
        });

        // 解析响应
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching album info:', error);
        return {
          code: 500,
          msg: '获取专辑信息失败',
          data: null
        };
      }
})
