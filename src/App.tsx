import React, { useState } from 'react';
import TopNavigation from './components/TopNavigation';
import LeftRail from './components/LeftRail';
import Playground from './components/Playground';
import RightRail from './components/RightRail';
import LogsPage from './components/LogsPage';
import AgentDrawer from './components/AgentDrawer';
import AgentMarketplace from './components/AgentMarketplace';
import TableInspector from './components/TableInspector';
import MetadataScreen from './components/MetadataScreen';
import LMSHub from './components/LMSHub';
import ROIDashboard from './components/ROIDashboard';

export type ViewType = 'playground' | 'logs' | 'agent-drawer' | 'agent-marketplace' | 'table-inspector' | 'metadata' | 'lms' | 'roi';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('playground');
  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const renderMainContent = () => {
    switch (currentView) {
      case 'logs':
        return <LogsPage />;
      case 'agent-marketplace':
        return <AgentMarketplace />;
      case 'table-inspector':
        return <TableInspector tableName={selectedTable} onClose={() => setCurrentView('playground')} />;
      case 'metadata':
        return <MetadataScreen onClose={() => setCurrentView('playground')} />;
      case 'lms':
        return <LMSHub />;
      case 'roi':
        return <ROIDashboard />;
      case 'playground':
      default:
        return (
          <div className="flex flex-1 h-full">
            <LeftRail />
            <div className="flex-1 flex flex-col">
              <Playground onOpenTableInspector={(table) => {
                setSelectedTable(table);
                setCurrentView('table-inspector');
              }} onOpenMetadata={() => setCurrentView('metadata')} />
            </div>
            <RightRail />
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <TopNavigation 
        currentView={currentView}
        onViewChange={setCurrentView}
        onToggleAgentDrawer={() => setIsAgentDrawerOpen(!isAgentDrawerOpen)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {renderMainContent()}
        
        {isAgentDrawerOpen && (
          <AgentDrawer onClose={() => setIsAgentDrawerOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default App;