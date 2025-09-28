import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
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
export type AppState = 'landing' | 'login' | 'signup' | 'app';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [currentView, setCurrentView] = useState<ViewType>('playground');
  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const handleLogin = (email: string, password: string) => {
    // In a real app, this would validate credentials with an API
    setUser({ email, name: email.split('@')[0] });
    setAppState('app');
  };

  const handleSignUp = (userData: any) => {
    // In a real app, this would create the user account
    setUser({ 
      email: userData.email, 
      name: `${userData.firstName} ${userData.lastName}`,
      company: userData.company 
    });
    setAppState('app');
  };

  const handleLogout = () => {
    setUser(null);
    setAppState('landing');
    setCurrentView('playground');
  };

  // Landing page flow
  if (appState === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => setAppState('signup')}
        onLogin={() => setAppState('login')}
      />
    );
  }

  if (appState === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onBack={() => setAppState('landing')}
        onSignUp={() => setAppState('signup')}
        onForgotPassword={() => {
          // Handle forgot password
          console.log('Forgot password clicked');
        }}
      />
    );
  }

  if (appState === 'signup') {
    return (
      <SignUpPage
        onSignUp={handleSignUp}
        onBack={() => setAppState('landing')}
        onLogin={() => setAppState('login')}
      />
    );
  }

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
        user={user}
        onLogout={handleLogout}
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