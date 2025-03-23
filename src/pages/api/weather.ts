import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 天气数据查询API，同时获取当前天气和未来3天预报
 * @param req 包含查询参数：
 *   - location: 城市ID（如"101010100"）或名称（如"北京"）
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

  try {
    // 从环境变量获取API密钥
    const apiKey = process.env.QWEATHER_KEY;
    if (!apiKey) {
      throw new Error('未配置QWEATHER_KEY环境变量');
    }

    // 构建当前天气API请求URL
    const weatherUrl = `https://devapi.qweather.com/v7/weather/now?location=${encodeURIComponent(
      location as string
    )}&key=${apiKey}&lang=${lang}&unit=${unit}`;

    // 构建3天预报API请求URL
    const forecastUrl = `https://devapi.qweather.com/v7/weather/3d?location=${encodeURIComponent(
      location as string
    )}&key=${apiKey}&lang=${lang}&unit=${unit}`;

    // 并行发送请求
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(weatherUrl),
      fetch(forecastUrl)
    ]);

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
        location
      });
    }

    // 组合并返回结果
    const responseData = {
      now: weatherData.now,
      forecast: forecastData.daily,
      updateTime: weatherData.updateTime
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error('获取天气数据时出错:', error);
    return res.status(500).json({ error: '服务器错误' });
  }
} 