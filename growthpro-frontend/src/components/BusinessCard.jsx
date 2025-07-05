import { useState } from 'react';

export default function BusinessCard({ info, setInfo }) {
  const [isRegenerating, setIsRegenerating] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const regenerateHeadline = async () => {
    setIsRegenerating(true);
    try {
      const res = await fetch(`${API_URL}/api/regenerate-headline?name=${info.name}&location=${info.location}`);
      const data = await res.json();
      console.log('API response:', data);
      setInfo({ ...info, headline: data.headline });
    } catch (error) {
      console.error('Error regenerating headline:', error);
    } finally {
      setIsRegenerating(false);
    }
  };

  const resetAnalysis = () => {
    setInfo(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Business Card */}
      <div className="bg-black/40 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8 shadow-2xl mb-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">{info.name}</h2>
            <div className="flex items-center gap-2 text-gray-300 mb-4">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="text-sm sm:text-base">{info.location}</span>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse flex-shrink-0"></div>
              <span>LIVE DATA</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="bg-black/20 rounded-xl p-3 sm:p-4 border border-cyan-500/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-xs sm:text-sm">Rating</p>
                <p className="text-lg sm:text-2xl font-bold text-white truncate">{info.rating}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-black/20 rounded-xl p-3 sm:p-4 border border-cyan-500/20">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v4h2v-7.5c0-1.1.9-2 2-2s2 .9 2 2V18h2v-4h3v4h1v2H3v-2h1z"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-gray-400 text-xs sm:text-sm">Reviews</p>
                <p className="text-lg sm:text-2xl font-bold text-white truncate">{info.reviews}</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Generated Headline */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-cyan-400/10 rounded-xl p-4 sm:p-6 border border-cyan-400/30 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-cyan-300">AI-Generated Insight</span>
          </div>
          <p className="text-white text-base sm:text-lg italic leading-relaxed">"{info.headline}"</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={regenerateHeadline}
            disabled={isRegenerating}
            className={`flex-1 ${isRegenerating 
              ? 'bg-gradient-to-r from-gray-600 to-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-700 hover:to-cyan-600 transform hover:scale-105'
            } text-black font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base`}
          >
            {isRegenerating ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
            ) : (
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            <span>{isRegenerating ? 'Generating...' : 'Regenerate Insight'}</span>
          </button>
          
          <button
            onClick={resetAnalysis}
            className="bg-black/30 hover:bg-black/50 border border-cyan-500/30 text-white font-semibold py-3 px-4 rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Analysis</span>
          </button>
        </div>
      </div>

      {/* Market Insights Panel */}
      <div className="bg-black/20 backdrop-blur-lg border border-cyan-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
          </svg>
          Market Intelligence
        </h3>
        
        {info.marketIntelligence ? (
          <div className="space-y-4">
            {/* Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <p className="text-gray-400">Market Position</p>
                <p className={`font-semibold ${
                  info.marketIntelligence.marketPosition === 'Dominant' ? 'text-cyan-300' :
                  info.marketIntelligence.marketPosition === 'Strong' ? 'text-cyan-400' :
                  info.marketIntelligence.marketPosition === 'Growing' ? 'text-cyan-500' :
                  'text-gray-300'
                }`}>{info.marketIntelligence.marketPosition}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Growth Potential</p>
                <p className={`font-semibold ${
                  info.marketIntelligence.growthPotential === 'Explosive' ? 'text-cyan-300' :
                  info.marketIntelligence.growthPotential === 'High' ? 'text-cyan-400' :
                  info.marketIntelligence.growthPotential === 'Promising' ? 'text-cyan-500' :
                  'text-gray-300'
                }`}>{info.marketIntelligence.growthPotential}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Competition Level</p>
                <p className={`font-semibold ${
                  info.marketIntelligence.competitionLevel === 'Low' ? 'text-cyan-300' :
                  info.marketIntelligence.competitionLevel === 'Moderate' ? 'text-cyan-400' :
                  info.marketIntelligence.competitionLevel === 'High' ? 'text-orange-400' :
                  'text-red-400'
                }`}>{info.marketIntelligence.competitionLevel}</p>
              </div>
            </div>
            
            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <p className="text-gray-400">Trend Score</p>
                <p className="text-cyan-300 font-semibold">{info.marketIntelligence.trendScore}/100</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Market Share</p>
                <p className="text-cyan-400 font-semibold">{info.marketIntelligence.marketShare}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Customer Sentiment</p>
                <p className={`font-semibold ${
                  info.marketIntelligence.customerSentiment === 'Excellent' ? 'text-cyan-300' :
                  info.marketIntelligence.customerSentiment === 'Very Positive' ? 'text-cyan-400' :
                  info.marketIntelligence.customerSentiment === 'Positive' ? 'text-cyan-500' :
                  'text-gray-300'
                }`}>{info.marketIntelligence.customerSentiment}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Digital Presence</p>
                <p className="text-cyan-500 font-semibold">{info.marketIntelligence.digitalPresence}%</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="text-gray-400">Market Position</p>
              <p className="text-cyan-400 font-semibold">Strong</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">Growth Potential</p>
              <p className="text-cyan-400 font-semibold">High</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">Competition Level</p>
              <p className="text-cyan-400 font-semibold">Moderate</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}