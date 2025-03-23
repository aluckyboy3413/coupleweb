"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DebugPage() {
  const [locationId, setLocationId] = useState('31.50,-9.77');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const testWeatherApi = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/weather?location=${encodeURIComponent(locationId)}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('API测试出错:', error);
      setResult({ error: '请求失败' });
    } finally {
      setLoading(false);
    }
  };
  
  const testGeoApi = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/geo?location=${encodeURIComponent(locationId)}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('API测试出错:', error);
      setResult({ error: '请求失败' });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">API调试工具</h1>
      <button onClick={() => router.push('/')} className="mb-6 px-4 py-2 bg-blue-500 text-white rounded">
        返回首页
      </button>
      
      <div className="mb-6">
        <label className="block mb-2">位置ID或城市名称:</label>
        <input 
          type="text" 
          value={locationId}
          onChange={(e) => setLocationId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={testWeatherApi} 
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
        >
          测试天气API
        </button>
        <button 
          onClick={testGeoApi} 
          disabled={loading}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:bg-gray-400"
        >
          测试地理位置API
        </button>
      </div>
      
      {loading && <p className="mb-4">加载中...</p>}
      
      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">结果:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 