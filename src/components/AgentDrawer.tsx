import React from 'react';
import { X, Play, Pause, Eye, AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  status: 'running' | 'paused' | 'error' | 'completed';
  elapsedTime: string;
  lastAction: string;
  progress: number;
}

interface AgentDrawerProps {
  onClose: () => void;
}

export default function AgentDrawer({ onClose }: AgentDrawerProps) {
  const agents: Agent[] = [
    {
      id: '1',
      name: 'Schema Mapper',
      status: 'running',
      elapsedTime: '2m 34s',
      lastAction: 'Mapping Salesforce fields',
      progress: 67
    },
    {
      id: '2',
      name: 'Key Reconciler',
      status: 'completed',
      elapsedTime: '45s',
      lastAction: 'Matched 1,247 customer keys',
      progress: 100
    },
    {
      id: '3',
      name: 'Freshness Monitor',
      status: 'error',
      elapsedTime: '12m 8s',
      lastAction: 'Connection timeout to ServiceNow',
      progress: 23
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Clock className="text-blue-500 animate-spin" size={16} />;
      case 'completed':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={16} />;
      case 'paused':
        return <Pause className="text-yellow-500" size={16} />;
      default:
        return <AlertCircle className="text-gray-400" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-50 border-l-blue-500';
      case 'completed':
        return 'bg-green-50 border-l-green-500';
      case 'error':
        return 'bg-red-50 border-l-red-500';
      case 'paused':
        return 'bg-yellow-50 border-l-yellow-500';
      default:
        return 'bg-gray-50 border-l-gray-300';
    }
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 shadow-lg">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Agent Operations</h2>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 rounded"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {agents.map((agent) => (
            <div key={agent.id} className={`border-l-4 rounded-r-md p-4 ${getStatusColor(agent.status)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(agent.status)}
                  <h3 className="font-medium text-gray-900">{agent.name}</h3>
                </div>
                <span className="text-xs text-gray-500 font-mono">{agent.elapsedTime}</span>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-600">{agent.lastAction}</p>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${agent.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Progress</span>
                  <span>{agent.progress}%</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {agent.status === 'running' ? (
                  <button className="flex items-center space-x-1 px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors duration-200">
                    <Pause size={12} />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button className="flex items-center space-x-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors duration-200">
                    <Play size={12} />
                    <span>Resume</span>
                  </button>
                )}
                
                <button className="flex items-center space-x-1 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200">
                  <Eye size={12} />
                  <span>View Log</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">System Status</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-600">Active:</span>
              <span className="ml-2 font-medium text-blue-600">1</span>
            </div>
            <div>
              <span className="text-gray-600">Queued:</span>
              <span className="ml-2 font-medium text-yellow-600">0</span>
            </div>
            <div>
              <span className="text-gray-600">Completed:</span>
              <span className="ml-2 font-medium text-green-600">1</span>
            </div>
            <div>
              <span className="text-gray-600">Errors:</span>
              <span className="ml-2 font-medium text-red-600">1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}