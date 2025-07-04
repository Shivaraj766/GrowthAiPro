import { useState } from 'react';

export default function BusinessForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !location.trim()) {
      alert('Both fields are required');
      return;
    }
    onSubmit({ name: name.trim(), location: location.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Enter Business Name"
            className="w-full pl-12 pr-4 py-4 bg-black/30 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 backdrop-blur-sm transition-all duration-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Enter Business Location"
            className="w-full pl-12 pr-4 py-4 bg-black/30 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 backdrop-blur-sm transition-all duration-300"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
      
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-black to-cyan-600 hover:from-gray-900 hover:to-cyan-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-cyan-500/25 border border-cyan-500/30 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Analyze Business
      </button>
    </form>
  );
}