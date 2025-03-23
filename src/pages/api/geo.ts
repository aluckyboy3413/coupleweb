import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 地理位置查询API，用于获取城市ID
 * @param req 包含查询参数：
 *   - location: 城市名称（如"北京"，"Shanghai"，"New York"等）或经纬度（如"31.50,-9.77"）
 *   - lang: 返回语言，默认zh (可选，支持zh/en)
 * @param res 返回城市ID和名称列表
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 只支持GET请求
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '只支持GET请求' });
  }

  const { location, lang = 'zh' } = req.query;

  if (!location) {
    return res.status(400).json({ error: '缺少location参数' });
  }
  
  // 记录请求信息
  console.log(`Geo API request for location: ${location}, lang: ${lang}`);

  try {
    // 从环境变量获取API密钥
    const apiKey = process.env.QWEATHER_KEY || '6a69f0c3276048318d40ffd4020bdbf2'; // 直接使用备用密钥
    
    // 规范化位置参数
    let normalizedLocation = location;
    // 检查是否是经纬度格式 (如 "31.50,-9.77")
    if (typeof location === 'string' && location.includes(',')) {
      // 经纬度格式需要特殊处理，确保没有空格，并且保留负号
      normalizedLocation = location.replace(/\s+/g, '');
    }
    
    // 判断查询的是坐标还是地名，使用适当的API
    let geoUrl;
    if (typeof normalizedLocation === 'string' && normalizedLocation.match(/^[0-9.-]+,[0-9.-]+$/)) {
      // 如果是坐标格式，使用地理位置查询
      geoUrl = `https://geoapi.qweather.com/v2/city/lookup?location=${encodeURIComponent(
        normalizedLocation
      )}&key=${apiKey}&number=1&lang=${lang}`;
    } else {
      // 如果是城市名称，使用城市搜索
      geoUrl = `https://geoapi.qweather.com/v2/city/lookup?location=${encodeURIComponent(
        normalizedLocation as string
      )}&key=${apiKey}&number=10&lang=${lang}`;
    }
    
    console.log(`Making request to Geo API: ${geoUrl.replace(apiKey, 'API_KEY_HIDDEN')}`);

    // 设置超时
    const timeout = 10000; // 10秒
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      // 发送请求
      const response = await fetch(geoUrl, { signal: controller.signal });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Geo API response for ${location}:`, data);
      
      // 处理和返回结果
      return res.status(200).json(data);
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
    console.error('获取地理位置时出错:', error);
    return res.status(500).json({ 
      error: '服务器错误',
      message: errorMessage,
      location: location 
    });
  }
} 