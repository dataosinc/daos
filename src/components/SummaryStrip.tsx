import React from 'react';
import { Database, Key, AlertTriangle, Users, Clock, Target } from 'lucide-react';

interface SummaryStripProps {
  onOpenMetadata: () => void;
}

export default function SummaryStrip({ onOpenMetadata }: SummaryStripProps) {
  const stats = [
    { icon: Database, label: '4 Sources', value: 'Connected', color: 'text-blue-600' },
    { icon: Key, label: 'PK Coverage', value: '87%', color: 'text-green-600' },
    { icon: AlertTriangle, label: 'Duplicate Risk', value: 'Medium', color: 'text-yellow-600' },
    { icon: Users, label: 'M-M Bridges', value: '3 Found', color: 'text-purple-600' },
    { icon: Target, label: 'PII Flags', value: '12 Fields', color: 'text-red-600' },
    { icon: Clock, label: 'Last Run', value: '5m ago', color: 'text-gray-600' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {stats.map((stat, index) => (
            <button
              key={index}
              onClick={onOpenMetadata}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
            >
              <stat.icon size={16} className={`${stat.color} group-hover:scale-110 transition-transform duration-200`} />
              <div className="text-left">
                <div className="text-xs text-gray-500">{stat.label}</div>
                <div className={`text-sm font-medium ${stat.color}`}>{stat.value}</div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Real-time sync active</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Delta: +2.3K rows</span>
          </div>
        </div>
      </div>
    </div>
  );
}