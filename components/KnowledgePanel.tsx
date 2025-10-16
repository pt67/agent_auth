
import React from 'react';
import { KnowledgeSource } from '../types';

interface KnowledgePanelProps {
  sources: KnowledgeSource[];
  onToggleKnowledge: (sourceId: string) => void;
}

const KnowledgePanel: React.FC<KnowledgePanelProps> = ({ sources, onToggleKnowledge }) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-4">Knowledge Access (RAG)</h2>
      <div className="space-y-3">
        {sources.map(source => (
          <div key={source.id} className="flex items-center justify-between bg-gray-700/40 p-3 rounded-md">
            <div className="flex items-center gap-3">
              {source.icon}
              <div>
                <p className="font-semibold text-white">{source.name}</p>
                <p className="text-xs text-gray-400">{source.description}</p>
              </div>
            </div>
            <button
              onClick={() => onToggleKnowledge(source.id)}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                source.accessible ? 'bg-teal-500' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  source.accessible ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgePanel;
