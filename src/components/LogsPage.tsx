import React, { useState } from 'react';
import { Search, Filter, Download, MessageCircle, AlertCircle, CheckCircle, Clock, Database } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: Date;
  source: string;
  table: string;
  run: string;
  step: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  message: string;
  details: any;
}

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    source: '',
    severity: '',
    timeRange: '24h'
  });

  const [logs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 300000),
      source: 'Salesforce',
      table: 'Customers',
      run: 'RUN-2025-001',
      step: 'Data Sync',
      severity: 'success',
      message: 'Successfully synced 1,247 customer records',
      details: { recordsProcessed: 1247, duplicatesFound: 23 }
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 600000),
      source: 'ServiceNow',
      table: 'Tickets',
      run: 'RUN-2025-002',
      step: 'Schema Validation',
      severity: 'warning',
      message: 'Missing foreign key constraint detected',
      details: { missingConstraints: ['customer_id'], impact: 'medium' }
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 900000),
      source: 'PostgreSQL',
      table: 'Orders',
      run: 'RUN-2025-003',
      step: 'Deduplication',
      severity: 'error',
      message: 'Duplicate key violation during merge operation',
      details: { errorCode: 'PG_23505', affectedRows: 45 }
    }
  ]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'success':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'warning':
        return <AlertCircle className="text-yellow-500" size={16} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-blue-500" size={16} />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'bg-green-50 border-l-green-500';
      case 'warning':
        return 'bg-yellow-50 border-l-yellow-500';
      case 'error':
        return 'bg-red-50 border-l-red-500';
      default:
        return 'bg-blue-50 border-l-blue-500';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Logs & Observability</h1>
          <p className="text-gray-600">Monitor data operations, track changes, and troubleshoot issues</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={selectedFilters.source}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, source: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Sources</option>
                  <option value="salesforce">Salesforce</option>
                  <option value="servicenow">ServiceNow</option>
                  <option value="postgresql">PostgreSQL</option>
                </select>

                <select
                  value={selectedFilters.severity}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, severity: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Severities</option>
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="success">Success</option>
                </select>

                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
                  <Filter size={16} />
                  <span>Filter</span>
                </button>

                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                  <Download size={16} />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className={`border-l-4 rounded-r-md p-4 ${getSeverityColor(log.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getSeverityIcon(log.severity)}
                        <span className="font-medium text-gray-900">{log.message}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Source:</span>
                          <div className="flex items-center space-x-1">
                            <Database size={12} />
                            <span>{log.source}</span>
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Table:</span> {log.table}
                        </div>
                        <div>
                          <span className="font-medium">Run:</span> {log.run}
                        </div>
                        <div>
                          <span className="font-medium">Step:</span> {log.step}
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        {log.timestamp.toLocaleString()}
                      </div>
                    </div>
                    
                    <button className="ml-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200">
                      <MessageCircle size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Chat with Logs</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Ask about your logs (e.g., 'why did yesterday's run backfill 23k rows?')"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}