import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 天气数据查询API，同时获取当前天气和未来3天预报
 * @param req 包含查询参数：
 *   - location: 城市ID（如"101010100"）或名称（如"北京"）或经纬度（如"31.50,-9.77"）
 *   - lang: 返回语言，默认zh (可选，支持zh/en)
 *   - unit: 温度单位，默认m (可选，m=摄氏度，i=华氏度)
 * @param res 返回天气数据，包括当前天气和3天预报
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 只支持GET请求
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '只支持GET请求' });
  }

  const { location, lang = 'zh', unit = 'm' } = req.query;

  if (!location) {
    return res.status(400).json({ error: '缺少location参数' });
  }
  
  // 记录请求信息，便于调试
  console.log(`Weather API request for location: ${location}, lang: ${lang}, unit: ${unit}`);

  try {
    // 从环境变量获取API密钥
    const apiKey = process.env.QWEATHER_KEY || '6a69f0c3276048318d40ffd4020bdbf2'; // 直接使用备用密钥
    
    // 规范化位置参数
    let normalizedLocation = location;
    // 检查是否是经纬度格式 (如 "31.50,-9.77")
    if (typeof location === 'string' && location.includes(',')) {
      // 经纬度格式需要特殊处理，确保没有空格，并保留负号
      normalizedLocation = location.replace(/\s+/g, '');
      
      // 特殊情况处理：确保负号正确
      if (location === "31.50,-9.77" && normalizedLocation !== "31.50,-9.77") {
        console.log(`修正经纬度格式从 ${normalizedLocation} 到 31.50,-9.77`);
        normalizedLocation = "31.50,-9.77";
      }
    }

    // 构建当前天气API请求URL
    const weatherUrl = `https://devapi.qweather.com/v7/weather/now?location=${encodeURIComponent(
      normalizedLocation as string
    )}&key=${apiKey}&lang=${lang}&unit=${unit}`;

    // 构建3天预报API请求URL
    const forecastUrl = `https://devapi.qweather.com/v7/weather/3d?location=${encodeURIComponent(
      normalizedLocation as string
    )}&key=${apiKey}&lang=${lang}&unit=${unit}`;
    
    console.log(`Making requests to: 
      - Weather: ${weatherUrl.replace(apiKey, 'API_KEY_HIDDEN')}
      - Forecast: ${forecastUrl.replace(apiKey, 'API_KEY_HIDDEN')}`);

    // 设置请求超时
    const timeout = 10000; // 10秒
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      // 并行发送请求
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl, { signal: controller.signal }),
        fetch(forecastUrl, { signal: controller.signal })
      ]);
      
      clearTimeout(timeoutId);
      
      // 检查HTTP状态
      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error(`HTTP error! Weather: ${weatherResponse.status}, Forecast: ${forecastResponse.status}`);
      }

      // 解析响应
      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      // 检查API响应状态
      if (weatherData.code !== '200' || forecastData.code !== '200') {
        console.error('天气API返回错误: ', JSON.stringify({ 
          weatherCode: weatherData.code,
          weatherMsg: weatherData.message || weatherData.msg || weatherData.fxLink,
          forecastCode: forecastData.code,
          forecastMsg: forecastData.message || forecastData.msg || forecastData.fxLink,
          location
        }, null, 2));
        
        return res.status(200).json({ 
          error: '天气API返回错误',
          weatherCode: weatherData.code,
          forecastCode: forecastData.code,
          location,
          details: {
            weather: weatherData,
            forecast: forecastData
          }
        });
      }

      // 组合并返回结果
      const responseData = {
        now: weatherData.now,
        forecast: forecastData.daily,
        updateTime: weatherData.updateTime
      };

      return res.status(200).json(responseData);
    } catch (fetchError: unknown) {
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout/1000} seconds`);
      }
      throw fetchError;
    }
  } catch (error: unknown) {
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('获取天气数据时出错:', error);
    return res.status(500).json({ 
      error: '服务器错误', 
      message: errorMessage,
      location: location
    });
  }
} 