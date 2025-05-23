import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 天气数据查询API，同时获取当前天气和未来3天预报
 * @param req 包含查询参数：
 *   - location: 城市ID（如"101010100"）或名称（如"北京"）或经纬度（如"30.42,-9.6"）
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
    
    // 检查是否是经纬度格式 (如 "30.42,-9.6")
    if (typeof location === 'string' && location.includes(',')) {
      // 确保经纬度格式正确，移除所有空格并保留负号
      const parts = location.split(',').map(part => part.trim());
      if (parts.length === 2) {
        const lat = parseFloat(parts[0]);
        const lon = parseFloat(parts[1]);
        
        if (!isNaN(lat) && !isNaN(lon)) {
          // 使用标准格式重构经纬度，确保精度和格式正确
          normalizedLocation = `${lat.toFixed(2)},${lon.toFixed(2)}`;
          console.log(`规范化经纬度: ${location} -> ${normalizedLocation}`);
        } else {
          console.error(`无效的经纬度格式: ${location}`);
        }
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
    const timeout = 20000; // 20秒
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      // 并行发送请求
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl, { signal: controller.signal }),
        fetch(forecastUrl, { signal: controller.signal })
      ]);
      
      clearTimeout(timeoutId);
      
      // 检查HTTP状态 - 注意：这里返回200状态码但在payload中包含错误信息
      if (!weatherResponse.ok || !forecastResponse.ok) {
        console.error(`HTTP error! Weather: ${weatherResponse.status}, Forecast: ${forecastResponse.status}`);
        
        // 尝试读取错误响应内容来获取更多信息
        let weatherErrorText = '';
        let forecastErrorText = '';
        
        try {
          weatherErrorText = await weatherResponse.text();
          forecastErrorText = await forecastResponse.text();
        } catch (e) {
          console.error('读取错误响应时失败:', e);
        }
        
        return res.status(200).json({ 
          error: `Weather API returned HTTP error`,
          weatherStatus: weatherResponse.status,
          forecastStatus: forecastResponse.status,
          location: location,
          details: {
            weatherError: weatherErrorText,
            forecastError: forecastErrorText
          }
        });
      }

      // 解析响应
      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      // 检查API响应状态
      if (weatherData.code !== '200' || forecastData.code !== '200') {
        console.error('天气API返回错误: ', JSON.stringify({ 
          weatherCode: weatherData.code,
          weatherMsg: weatherData.message || weatherData.msg || 'Unknown error',
          forecastCode: forecastData.code,
          forecastMsg: forecastData.message || forecastData.msg || 'Unknown error',
          location
        }, null, 2));
        
        return res.status(200).json({ 
          error: '天气API返回错误',
          weatherCode: weatherData.code,
          forecastCode: forecastData.code,
          location,
          message: weatherData.message || weatherData.msg || 'Unknown error',
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
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return res.status(200).json({
          error: `请求超时`,
          message: `Request timeout after ${timeout/1000} seconds`,
          location: location
        });
      }
      throw fetchError;
    }
  } catch (error: unknown) {
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('获取天气数据时出错:', error);
    return res.status(200).json({ 
      error: '服务器错误', 
      message: errorMessage,
      location: location
    });
  }
} 