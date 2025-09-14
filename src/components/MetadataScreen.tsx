import React from 'react';
import { X, Database, User, Shield, Clock, GitBranch, AlertCircle, CheckCircle } from 'lucide-react';

interface MetadataScreenProps {
  onClose: () => void;
}

export default function MetadataScreen({ onClose }: MetadataScreenProps) {
  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Database size={24} className="text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Data Source Metadata</h1>
                  <p className="text-gray-600">Comprehensive view of your data assets and governance</p>
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

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Database size={20} className="text-blue-600" />
                  <h3 className="font-semibold text-blue-900">Sources</h3>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">4</div>
                <div className="text-sm text-blue-700">Connected systems</div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle size={20} className="text-green-600" />
                  <h3 className="font-semibold text-green-900">Quality Score</h3>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">94.2%</div>
                <div className="text-sm text-green-700">Overall data quality</div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle size={20} className="text-yellow-600" />
                  <h3 className="font-semibold text-yellow-900">Issues</h3>
                </div>
                <div className="text-2xl font-bold text-yellow-600 mb-1">3</div>
                <div className="text-sm text-yellow-700">Requiring attention</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Lineage</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">Salesforce → Customers</h3>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">Primary source for customer master data</div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock size={10} />
                        <span>Last sync: 2m ago</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitBranch size={10} />
                        <span>12 downstream tables</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">PostgreSQL → Orders</h3>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Processing</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">Transactional order data from e-commerce system</div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock size={10} />
                        <span>Last sync: 5m ago</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitBranch size={10} />
                        <span>8 downstream tables</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">ServiceNow → Tickets</h3>
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Warning</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">Customer service tickets and interactions</div>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock size={10} />
                        <span>Last sync: 15m ago</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitBranch size={10} />
                        <span>3 downstream tables</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Governance</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Data Stewards</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User size={16} className="text-gray-400" />
                          <span className="text-sm">Sarah Chen</span>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Customer Data</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User size={16} className="text-gray-400" />
                          <span className="text-sm">Mike Rodriguez</span>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Order Data</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User size={16} className="text-gray-400" />
                          <span className="text-sm">Lisa Park</span>
                        </div>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Support Data</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">PII & Compliance</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">PII Fields Identified</span>
                        <span className="text-sm font-medium text-red-600">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Encryption Status</span>
                        <span className="text-sm font-medium text-green-600">Compliant</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Retention Policies</span>
                        <span className="text-sm font-medium text-blue-600">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Access Control</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Shield size={16} className="text-green-500" />
                        <span className="text-sm text-gray-700">Row-level security: Enabled</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield size={16} className="text-green-500" />
                        <span className="text-sm text-gray-700">Column masking: Active</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield size={16} className="text-blue-500" />
                        <span className="text-sm text-gray-700">Audit logging: Comprehensive</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Changes</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle size={16} className="text-green-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Schema mapping updated for Salesforce Customers</div>
                  <div className="text-xs text-gray-500">2 hours ago by Sarah Chen</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Database size={16} className="text-blue-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">New data source connected: Customer Survey Results</div>
                  <div className="text-xs text-gray-500">Yesterday by Mike Rodriguez</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle size={16} className="text-yellow-600" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Data quality alert: Increased null values in phone field</div>
                  <div className="text-xs text-gray-500">2 days ago - Auto-detected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}