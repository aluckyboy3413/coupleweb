import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 地理位置查询API，用于获取城市ID
 * @param req 包含查询参数：
 *   - location: 城市名称（如"北京"，"Shanghai"，"New York"等）
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

  try {
    // 从环境变量获取API密钥
    const apiKey = process.env.QWEATHER_KEY;
    if (!apiKey) {
      throw new Error('未配置QWEATHER_KEY环境变量');
    }

    // 构建API请求URL
    const geoUrl = `https://geoapi.qweather.com/v2/city/lookup?location=${encodeURIComponent(
      location as string
    )}&key=${apiKey}&number=10&lang=${lang}`;

    // 发送请求
    const response = await fetch(geoUrl);
    const data = await response.json();

    // 处理和返回结果
    return res.status(200).json(data);
  } catch (error) {
    console.error('获取地理位置时出错:', error);
    return res.status(500).json({ error: '服务器错误' });
  }
} 