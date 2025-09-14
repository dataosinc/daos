import React, { useState } from 'react';
import { Bot, Plus, Star, Shield, TrendingUp, AlertTriangle, Eye, Clock } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  installs: number;
  inputs: string[];
  outputs: string[];
  risks: string[];
  benefits: string[];
  cost: string;
  permissions: string[];
  installed: boolean;
}

export default function AgentMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const agents: Agent[] = [
    {
      id: '1',
      name: 'Schema Mapper',
      description: 'Automatically maps fields between different data sources using AI-powered pattern recognition',
      category: 'integration',
      rating: 4.8,
      installs: 1247,
      inputs: ['Source schemas', 'Sample data'],
      outputs: ['Field mappings', 'Confidence scores'],
      risks: ['May miss complex relationships', 'Requires manual validation'],
      benefits: ['Reduces mapping time by 80%', 'Identifies hidden relationships'],
      cost: 'Low',
      permissions: ['Read schema metadata', 'Sample data access'],
      installed: true
    },
    {
      id: '2',
      name: 'Key Reconciler',
      description: 'Identifies and reconciles primary and foreign keys across systems',
      category: 'data-quality',
      rating: 4.6,
      installs: 892,
      inputs: ['Table schemas', 'Data samples'],
      outputs: ['Key mappings', 'Relationship graph'],
      risks: ['May create false positives', 'Performance impact on large datasets'],
      benefits: ['Improves data integrity', 'Automates key discovery'],
      cost: 'Medium',
      permissions: ['Read table data', 'Analyze relationships'],
      installed: false
    },
    {
      id: '3',
      name: 'Redundancy Checker',
      description: 'Detects duplicate records and redundant data across sources',
      category: 'data-quality',
      rating: 4.9,
      installs: 1504,
      inputs: ['Source tables', 'Matching rules'],
      outputs: ['Duplicate reports', 'Merge recommendations'],
      risks: ['May flag legitimate variations', 'Resource intensive'],
      benefits: ['Reduces storage costs', 'Improves data quality'],
      cost: 'Medium',
      permissions: ['Full table access', 'Create temporary tables'],
      installed: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'integration', label: 'Data Integration' },
    { id: 'data-quality', label: 'Data Quality' },
    { id: 'monitoring', label: 'Monitoring' },
    { id: 'governance', label: 'Governance' }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Agent Marketplace</h1>
          <p className="text-gray-600">Discover and deploy intelligent agents to automate your data operations</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Bot className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="text-yellow-400 fill-current" size={12} />
                          <span>{agent.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{agent.installs} installs</span>
                      </div>
                    </div>
                  </div>
                  
                  {agent.installed && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Installed
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-4">{agent.description}</p>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Inputs</h4>
                    <div className="flex flex-wrap gap-1">
                      {agent.inputs.map((input, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          {input}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-1">Key Benefits</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {agent.benefits.slice(0, 2).map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <TrendingUp size={10} className="text-green-500" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>Cost: {agent.cost}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Shield size={12} />
                      <span>{agent.permissions.length} perms</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex space-x-2">
                  {!agent.installed ? (
                    <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                      <Plus size={16} />
                      <span>Install</span>
                    </button>
                  ) : (
                    <button className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200">
                      Configure
                    </button>
                  )}
                  
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}