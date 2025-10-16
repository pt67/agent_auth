
import React from 'react';
import { Tool } from '../types';

interface ToolsPanelProps {
  tools: Tool[];
  onToggleTool: (toolId: string) => void;
}

const ToolsPanel: React.FC<ToolsPanelProps> = ({ tools, onToggleTool }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-4">Tool Connections (Token Vault)</h2>
      <div className="space-y-3">
        {tools.map(tool => (
          <div key={tool.id} className="flex items-center justify-between bg-gray-700/40 p-3 rounded-md">
            <div className="flex items-center gap-3">
              {tool.icon}
              <div>
                <p className="font-semibold text-white">{tool.name}</p>
                <p className="text-xs text-gray-400">{tool.description}</p>
              </div>
            </div>
            <button
              onClick={() => onToggleTool(tool.id)}
              className={`px-3 py-1 text-sm font-semibold rounded-full transition-all ${
                tool.connected
                  ? 'bg-emerald-500/80 hover:bg-emerald-500 text-white'
                  : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
              }`}
            >
              {tool.connected ? 'Connected' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsPanel;
