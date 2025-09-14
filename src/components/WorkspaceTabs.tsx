import React from 'react';
import { Globe, Star, Plus } from 'lucide-react';

interface WorkspaceTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function WorkspaceTabs({ activeTab, onTabChange }: WorkspaceTabsProps) {
  const tabs = [
    { id: '360-view', label: '360° View', icon: Globe },
    { id: 'golden-view', label: 'Golden View', icon: Star },
    { id: 'customer-360', label: 'Customer 360', icon: null, isUseCase: true },
    { id: 'order-analytics', label: 'Order Analytics', icon: null, isUseCase: true }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center px-4">
        <div className="flex items-center space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {tab.icon && <tab.icon size={16} />}
              <span>{tab.label}</span>
              {tab.isUseCase && (
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
        
        <button className="ml-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200">
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}