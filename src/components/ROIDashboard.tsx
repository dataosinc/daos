import React, { useState } from 'react';
import { TrendingUp, DollarSign, Clock, Users, BarChart3, PieChart, ArrowUp, ArrowDown } from 'lucide-react';

interface ROIMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  description: string;
}

interface AgentImpact {
  id: string;
  name: string;
  timeSaved: string;
  errorReduction: string;
  duplicatesRemoved: number;
  costSavings: string;
  status: 'active' | 'paused';
}

export default function ROIDashboard() {
  const [timeRange, setTimeRange] = useState('30d');

  const roiMetrics: ROIMetric[] = [
    {
      id: '1',
      title: 'Time Saved',
      value: '247 hours',
      change: '+23%',
      changeType: 'positive',
      description: 'Manual data processing time eliminated'
    },
    {
      id: '2',
      title: 'Error Reduction',
      value: '94.2%',
      change: '+12%',
      changeType: 'positive',
      description: 'Fewer data quality issues detected'
    },
    {
      id: '3',
      title: 'Cost Savings',
      value: '$45,200',
      change: '+18%',
      changeType: 'positive',
      description: 'Operational cost reduction this quarter'
    },
    {
      id: '4',
      title: 'Data Quality Score',
      value: '96.8%',
      change: '+5.2%',
      changeType: 'positive',
      description: 'Overall data quality improvement'
    }
  ];

  const agentImpacts: AgentImpact[] = [
    {
      id: '1',
      name: 'Schema Mapper',
      timeSaved: '89 hours',
      errorReduction: '87%',
      duplicatesRemoved: 1247,
      costSavings: '$12,400',
      status: 'active'
    },
    {
      id: '2',
      name: 'Key Reconciler',
      timeSaved: '67 hours',
      errorReduction: '92%',
      duplicatesRemoved: 892,
      costSavings: '$9,800',
      status: 'active'
    },
    {
      id: '3',
      name: 'Redundancy Checker',
      timeSaved: '91 hours',
      errorReduction: '96%',
      duplicatesRemoved: 2156,
      costSavings: '$23,000',
      status: 'active'
    }
  ];

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return <ArrowUp className="text-green-500" size={16} />;
      case 'negative':
        return <ArrowDown className="text-red-500" size={16} />;
      default:
        return null;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">ROI Dashboard</h1>
              <p className="text-gray-600">Track the impact and value delivered by DAOS automation</p>
            </div>
            <div className="flex space-x-2">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {roiMetrics.map((metric) => (
            <div key={metric.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                <div className="flex items-center space-x-1">
                  {getChangeIcon(metric.changeType)}
                  <span className={`text-sm font-medium ${getChangeColor(metric.changeType)}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <p className="text-sm text-gray-500">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Time Savings Trend</h2>
              <BarChart3 className="text-gray-400" size={20} />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="mx-auto text-gray-300 mb-2" size={48} />
                <p className="text-gray-500">Chart visualization would appear here</p>
                <p className="text-sm text-gray-400">Showing cumulative time savings over {timeRange}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Cost Impact by Agent</h2>
              <PieChart className="text-gray-400" size={20} />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <PieChart className="mx-auto text-gray-300 mb-2" size={48} />
                <p className="text-gray-500">Pie chart would appear here</p>
                <p className="text-sm text-gray-400">Breaking down savings by agent type</p>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Impact Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Agent Performance Impact</h2>
            <p className="text-sm text-gray-600 mt-1">Detailed breakdown of value delivered by each agent</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Agent</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Time Saved</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Error Reduction</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Duplicates Removed</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Cost Savings</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {agentImpacts.map((agent, index) => (
                  <tr key={agent.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <TrendingUp className="text-white" size={16} />
                        </div>
                        <span className="font-medium text-gray-900">{agent.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-900">{agent.timeSaved}</td>
                    <td className="p-4">
                      <span className="text-green-600 font-medium">{agent.errorReduction}</span>
                    </td>
                    <td className="p-4 text-gray-900">{agent.duplicatesRemoved.toLocaleString()}</td>
                    <td className="p-4">
                      <span className="text-green-600 font-medium">{agent.costSavings}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        agent.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {agent.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="text-blue-600" size={24} />
              <h3 className="font-semibold text-gray-900">Productivity Gains</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Manual tasks eliminated:</span>
                <span className="font-medium">89%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average processing time:</span>
                <span className="font-medium text-green-600">-76%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Team efficiency:</span>
                <span className="font-medium text-green-600">+142%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <DollarSign className="text-green-600" size={24} />
              <h3 className="font-semibold text-gray-900">Financial Impact</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Quarterly savings:</span>
                <span className="font-medium text-green-600">$45,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Annual projection:</span>
                <span className="font-medium text-green-600">$180,800</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ROI:</span>
                <span className="font-medium text-green-600">340%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="text-purple-600" size={24} />
              <h3 className="font-semibold text-gray-900">Team Impact</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Data engineers freed up:</span>
                <span className="font-medium">3.2 FTE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Focus shift to strategy:</span>
                <span className="font-medium text-blue-600">+67%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Job satisfaction:</span>
                <span className="font-medium text-green-600">+28%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}