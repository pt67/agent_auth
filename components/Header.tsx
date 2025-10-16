
import React from 'react';
import { ShieldCheckIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 shadow-md">
      <div className="flex items-center gap-3">
        <ShieldCheckIcon className="w-8 h-8 text-teal-400" />
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Auth0 AI Agent Assistant
        </h1>
      </div>
      <div className="text-sm text-gray-400">
        Securing AI Interactions
      </div>
    </header>
  );
};

export default Header;
