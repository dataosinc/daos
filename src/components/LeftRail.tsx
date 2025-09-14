import React, { useState } from 'react';
import { Plus, Database, CheckCircle, AlertCircle, Clock, Users } from 'lucide-react';

interface Connector {
  id: string;
  name: string;
  type: string;
  status: 'healthy' | 'warning' | 'error' | 'syncing';
  lastSync: string;
  rowCount: number;
  owner: string;
}

export default function LeftRail() {
  const [connectors] = useState<Connector[]>([
    {
      id: '1',
      name: 'Salesforce Prod',
      type: 'Salesforce',
      status: 'healthy',
      lastSync: '2 minutes ago',
      rowCount: 45230,
      owner: 'Sales Team'
    },
    {
      id: '2',
      name: 'ServiceNow',
      type: 'ServiceNow',
      status: 'warning',
      lastSync: '15 minutes ago',
      rowCount: 12450,
      owner: 'IT Operations'
    },
    {
      id: '3',
      name: 'PostgreSQL Main',
      type: 'PostgreSQL',
      status: 'healthy',
      lastSync: '5 minutes ago',
      rowCount: 128900,
      owner: 'Data Team'
    },
    {
      id: '4',
      name: 'Customer Data CSV',
      type: 'CSV',
      status: 'syncing',
      lastSync: 'In progress',
      rowCount: 8760,
      owner: 'Marketing'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'warning':
        return <AlertCircle className="text-yellow-500" size={16} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={16} />;
      case 'syncing':
        return <Clock className="text-blue-500 animate-spin" size={16} />;
      default:
        return <AlertCircle className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'border-l-green-500 bg-green-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'error':
        return 'border-l-red-500 bg-red-50';
      case 'syncing':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-300 bg-white';
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
          <Plus size={20} />
          <span>Add Data Source</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Connected Sources</h3>
          <div className="space-y-3">
            {connectors.map((connector) => (
              <div
                key={connector.id}
                className={`border-l-4 rounded-r-md p-3 cursor-pointer hover:shadow-sm transition-all duration-200 ${getStatusColor(connector.status)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Database size={16} className="text-gray-600" />
                    <span className="font-medium text-gray-900 text-sm">{connector.name}</span>
                  </div>
                  {getStatusIcon(connector.status)}
                </div>
                
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Type:</span>
                    <span className="font-medium">{connector.type}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Sync:</span>
                    <span>{connector.lastSync}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Rows:</span>
                    <span className="font-medium">{connector.rowCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Owner:</span>
                    <div className="flex items-center space-x-1">
                      <Users size={12} />
                      <span>{connector.owner}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Quick Stats</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">4</div>
                <div className="text-gray-600">Sources</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">195K</div>
                <div className="text-gray-600">Total Rows</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">12</div>
                <div className="text-gray-600">Relations</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">3</div>
                <div className="text-gray-600">Issues</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}