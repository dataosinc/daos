import React, { useState } from 'react';
import { X, Grid, BarChart3, MessageCircle, Edit3, User, Tag, Database } from 'lucide-react';

interface TableInspectorProps {
  tableName: string | null;
  onClose: () => void;
}

export default function TableInspector({ tableName, onClose }: TableInspectorProps) {
  const [activeTab, setActiveTab] = useState('grid');

  if (!tableName) return null;

  const sampleData = [
    { id: 1, name: 'John Smith', email: 'j.smith@company.com', status: 'active', created_at: '2024-01-15' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@client.com', status: 'inactive', created_at: '2024-01-20' },
    { id: 3, name: 'Bob Wilson', email: 'b.wilson@org.com', status: 'active', created_at: '2024-01-22' }
  ];

  const schema = [
    { column: 'id', type: 'INTEGER', nullable: false, key: 'PRIMARY' },
    { column: 'name', type: 'VARCHAR(255)', nullable: false, key: null },
    { column: 'email', type: 'VARCHAR(255)', nullable: false, key: 'UNIQUE' },
    { column: 'status', type: 'VARCHAR(50)', nullable: true, key: null },
    { column: 'created_at', type: 'TIMESTAMP', nullable: true, key: null }
  ];

  const renderGrid = () => (
    <div className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Schema</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-3 text-gray-600">Column</th>
                <th className="text-left p-3 text-gray-600">Type</th>
                <th className="text-left p-3 text-gray-600">Nullable</th>
                <th className="text-left p-3 text-gray-600">Key</th>
              </tr>
            </thead>
            <tbody>
              {schema.map((col, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="p-3 font-medium">{col.column}</td>
                  <td className="p-3 text-gray-600">{col.type}</td>
                  <td className="p-3">{col.nullable ? 'Yes' : 'No'}</td>
                  <td className="p-3">
                    {col.key && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {col.key}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sample Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {Object.keys(sampleData[0]).map((key) => (
                  <th key={key} className="text-left p-3 text-gray-600 capitalize">
                    {key.replace('_', ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="p-3">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProfiles = () => (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Data Quality</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Completeness:</span>
              <span className="font-medium text-green-600">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span>Uniqueness:</span>
              <span className="font-medium text-blue-600">99.8%</span>
            </div>
            <div className="flex justify-between">
              <span>Validity:</span>
              <span className="font-medium text-yellow-600">87.5%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Freshness</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Last Updated:</span>
              <span className="font-medium">5m ago</span>
            </div>
            <div className="flex justify-between">
              <span>Update Frequency:</span>
              <span className="font-medium">Real-time</span>
            </div>
            <div className="flex justify-between">
              <span>Lag Time:</span>
              <span className="font-medium text-green-600">{"< 1m"}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Volume</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Rows:</span>
              <span className="font-medium">12,450</span>
            </div>
            <div className="flex justify-between">
              <span>Today's Growth:</span>
              <span className="font-medium text-green-600">+247</span>
            </div>
            <div className="flex justify-between">
              <span>Avg Daily:</span>
              <span className="font-medium">+156</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-gray-900 mb-3">Column Distributions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h5 className="font-medium text-gray-800 mb-2">Status Distribution</h5>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-gray-200 rounded">
                    <div className="w-3/4 h-2 bg-green-500 rounded"></div>
                  </div>
                  <span className="text-sm text-gray-600">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Inactive</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-gray-200 rounded">
                    <div className="w-1/4 h-2 bg-red-500 rounded"></div>
                  </div>
                  <span className="text-sm text-gray-600">25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDictionary = () => (
    <div className="p-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-yellow-800 mb-2">Dictionary Editor</h4>
        <p className="text-sm text-yellow-700">
          Updates to the data dictionary require approval from table owners or data stewards.
        </p>
      </div>

      <div className="space-y-6">
        {schema.map((col, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">{col.column}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                  <span>{col.type}</span>
                  <div className="flex items-center space-x-1">
                    <User size={12} />
                    <span>Owner: Data Team</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-blue-600 rounded">
                <Edit3 size={16} />
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Business Definition:</span>
                <p className="text-gray-600 mt-1">
                  {col.column === 'id' && 'Unique identifier for customer records'}
                  {col.column === 'name' && 'Full customer name as provided during registration'}
                  {col.column === 'email' && 'Primary email address for customer communications'}
                  {col.column === 'status' && 'Current status of customer account (active/inactive)'}
                  {col.column === 'created_at' && 'Timestamp when the customer record was created'}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Tag size={12} className="text-gray-400" />
                  <span className="text-gray-600">Tags:</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">customer-data</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'grid', label: 'Grid & Schema', icon: Grid },
    { id: 'profiles', label: 'Profiles', icon: BarChart3 },
    { id: 'dictionary', label: 'Dictionary', icon: MessageCircle }
  ];

  return (
    <div className="flex-1 bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Database size={24} className="text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{tableName} Table</h1>
              <p className="text-sm text-gray-600">Inspect schema, data quality, and documentation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-md"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50">
        {activeTab === 'grid' && renderGrid()}
        {activeTab === 'profiles' && renderProfiles()}
        {activeTab === 'dictionary' && renderDictionary()}
      </div>
    </div>
  );
}