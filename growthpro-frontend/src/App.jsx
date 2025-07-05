import { useState } from 'react';
import BusinessForm from './components/BusinessForm';
import BusinessCard from './components/BusinessCard';

export default function App() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({ name, location }) => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API_URL}/api/business-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location })
      });
      const data = await res.json();
      setInfo({ ...data, name, location });
    } catch (error) {
      console.error('Error fetching business data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-cyan-600/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDAsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-black to-cyan-500 rounded-xl flex items-center justify-center border border-cyan-400/30">
              <svg className="w-7 h-7 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              GrowthPro AI
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Advanced Business Intelligence Platform
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              Real-time Analytics
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
              AI-Powered Insights
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              Market Intelligence
            </div>
          </div>
        </div>
        
        {/* Form Section */}
        {!info && !loading && (
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-2">Business Analysis</h2>
                  <p className="text-gray-300 text-sm">Get comprehensive market insights for your business</p>
                </div>
                <BusinessForm onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        )}
        
        {/* Loading Section */}
        {loading && (
          <div className="text-center">
            <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-12 shadow-2xl max-w-md mx-auto">
              <div className="relative">
                <div className="w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-700/50"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin"></div>
                  <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-cyan-300 animate-spin animate-reverse"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Analyzing Business Data</h3>
                <p className="text-gray-300 mb-4">Processing market intelligence...</p>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Results Section */}
        {info && (
          <div className="flex justify-center">
            <BusinessCard info={info} setInfo={setInfo} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-gray-500 text-sm">
          Powered by Advanced AI • Real-time Market Data • Enterprise Grade Security
        </p>
      </div>
    </div>
  );
}