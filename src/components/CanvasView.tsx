import React, { useState } from 'react';
import { Database, ArrowRight, Settings, Eye, Edit3 } from 'lucide-react';

interface CanvasViewProps {
  activeView: string;
  onOpenTableInspector: (tableName: string) => void;
}

interface TableNode {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
  records: number;
  connections: string[];
}

export default function CanvasView({ activeView, onOpenTableInspector }: CanvasViewProps) {
  const [tables] = useState<TableNode[]>([
    { id: '1', name: 'Customers', type: 'Salesforce', x: 100, y: 150, records: 12450, connections: ['2', '3'] },
    { id: '2', name: 'Orders', type: 'PostgreSQL', x: 350, y: 100, records: 45230, connections: ['1', '4'] },
    { id: '3', name: 'Tickets', type: 'ServiceNow', x: 350, y: 200, records: 8760, connections: ['1'] },
    { id: '4', name: 'Products', type: 'CSV', x: 600, y: 150, records: 560, connections: ['2'] }
  ]);

  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    
    tables.forEach((table) => {
      table.connections.forEach((connId) => {
        const connectedTable = tables.find(t => t.id === connId);
        if (connectedTable && parseInt(table.id) < parseInt(connId)) {
          connections.push(
            <line
              key={`${table.id}-${connId}`}
              x1={table.x + 120}
              y1={table.y + 40}
              x2={connectedTable.x + 120}
              y2={connectedTable.y + 40}
              stroke="#6366f1"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="opacity-60"
            />
          );
        }
      });
    });
    
    return connections;
  };

  const render360View = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 p-8 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {renderConnections()}
      </svg>
      
      {tables.map((table) => (
        <div
          key={table.id}
          className="absolute bg-white rounded-lg shadow-lg border border-gray-200 w-60 cursor-move hover:shadow-xl transition-shadow duration-200"
          style={{ left: table.x, top: table.y }}
        >
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Database size={16} className="text-blue-600" />
                <h3 className="font-semibold text-gray-900">{table.name}</h3>
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={() => onOpenTableInspector(table.name)}
                  className="p-1 text-gray-400 hover:text-blue-600 rounded"
                >
                  <Eye size={14} />
                </button>
                <button className="p-1 text-gray-400 hover:text-green-600 rounded">
                  <Edit3 size={14} />
                </button>
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <Settings size={14} />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-600">{table.type}</div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Records:</span>
              <span className="font-medium">{table.records.toLocaleString()}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-gray-600">Connections:</span>
              <span className="font-medium">{table.connections.length}</span>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-8 right-8">
        <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Data Lineage</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Primary Tables</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-1 bg-indigo-400"></div>
              <span>Relationships</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGoldenView = () => (
    <div className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 h-full">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Star className="mr-2 text-yellow-500" size={24} />
            Golden Data Model
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Source Priority</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span>Salesforce</span>
                  <span className="text-sm font-medium text-green-600">Primary</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span>PostgreSQL</span>
                  <span className="text-sm font-medium text-blue-600">Secondary</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>ServiceNow</span>
                  <span className="text-sm font-medium text-gray-600">Tertiary</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Survivorship Rules</h3>
              <div className="space-y-2">
                <div className="p-2 border border-gray-200 rounded">
                  <div className="font-medium text-sm">Customer Name</div>
                  <div className="text-xs text-gray-600">Most recent non-null</div>
                </div>
                <div className="p-2 border border-gray-200 rounded">
                  <div className="font-medium text-sm">Email</div>
                  <div className="text-xs text-gray-600">Salesforce priority</div>
                </div>
                <div className="p-2 border border-gray-200 rounded">
                  <div className="font-medium text-sm">Phone</div>
                  <div className="text-xs text-gray-600">Longest value</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Deduplication</h3>
              <div className="space-y-2">
                <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="font-medium text-sm">Match Keys</div>
                  <div className="text-xs text-gray-600">Email + Phone</div>
                </div>
                <div className="p-2 bg-red-50 border border-red-200 rounded">
                  <div className="font-medium text-sm">Fuzzy Match</div>
                  <div className="text-xs text-gray-600">Name similarity 85%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Preview Output</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-2 text-gray-600">Golden ID</th>
                  <th className="text-left p-2 text-gray-600">Name</th>
                  <th className="text-left p-2 text-gray-600">Email</th>
                  <th className="text-left p-2 text-gray-600">Sources</th>
                  <th className="text-left p-2 text-gray-600">Confidence</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-2 font-mono text-blue-600">GLD-001</td>
                  <td className="p-2">John Smith</td>
                  <td className="p-2">j.smith@company.com</td>
                  <td className="p-2">SF, PG</td>
                  <td className="p-2"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">98%</span></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-2 font-mono text-blue-600">GLD-002</td>
                  <td className="p-2">Jane Doe</td>
                  <td className="p-2">jane.doe@client.com</td>
                  <td className="p-2">SF, SN</td>
                  <td className="p-2"><span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">87%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUseCaseView = () => (
    <div className="p-8 bg-gradient-to-br from-green-50 to-teal-50 h-full">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {activeTab === 'customer-360' ? 'Customer 360 Golden Set' : 'Order Analytics Golden Set'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Data Sources</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                  <Database size={16} className="text-blue-600" />
                  <span>Salesforce Customers</span>
                  <ArrowRight size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600">45K records</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                  <Database size={16} className="text-green-600" />
                  <span>PostgreSQL Orders</span>
                  <ArrowRight size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600">128K records</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-purple-50 rounded">
                  <Database size={16} className="text-purple-600" />
                  <span>ServiceNow Tickets</span>
                  <ArrowRight size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600">8.7K records</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Golden Set Metrics</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded">
                  <div className="text-lg font-bold text-blue-600">42.1K</div>
                  <div className="text-sm text-gray-600">Unique Records</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                  <div className="text-lg font-bold text-green-600">94.5%</div>
                  <div className="text-sm text-gray-600">Match Rate</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded">
                  <div className="text-lg font-bold text-yellow-600">2.8K</div>
                  <div className="text-sm text-gray-600">Duplicates</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded">
                  <div className="text-lg font-bold text-red-600">127</div>
                  <div className="text-sm text-gray-600">Conflicts</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-800 mb-3">Sample Golden Records</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-2 text-gray-600">Customer ID</th>
                    <th className="text-left p-2 text-gray-600">Name</th>
                    <th className="text-left p-2 text-gray-600">Total Orders</th>
                    <th className="text-left p-2 text-gray-600">Open Tickets</th>
                    <th className="text-left p-2 text-gray-600">LTV</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-2 font-mono text-blue-600">CUST-12045</td>
                    <td className="p-2">Acme Corporation</td>
                    <td className="p-2">47</td>
                    <td className="p-2">2</td>
                    <td className="p-2 text-green-600 font-medium">$124,500</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-2 font-mono text-blue-600">CUST-12046</td>
                    <td className="p-2">Global Tech Inc</td>
                    <td className="p-2">23</td>
                    <td className="p-2">0</td>
                    <td className="p-2 text-green-600 font-medium">$87,300</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  switch (activeView) {
    case 'golden-view':
      return renderGoldenView();
    case 'customer-360':
    case 'order-analytics':
      return renderUseCaseView();
    default:
      return render360View();
  }
}