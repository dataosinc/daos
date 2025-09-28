import React, { useState } from 'react';
import { Save, FileText, Bot, Store, BookOpen, TrendingUp, HelpCircle, Search, Command, User, LogOut } from 'lucide-react';
import { ViewType } from '../App';

interface TopNavigationProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onToggleAgentDrawer: () => void;
  user: any;
  onLogout: () => void;
}

export default function TopNavigation({ currentView, onViewChange, onToggleAgentDrawer, user, onLogout }: TopNavigationProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const handleSave = () => {
    setLastSaved(new Date());
    // Save logic would go here
  };

  const NavButton = ({ 
    icon: Icon, 
    label, 
    onClick, 
    active = false,
    badge = null 
  }: { 
    icon: React.ComponentType<any>, 
    label: string, 
    onClick: () => void,
    active?: boolean,
    badge?: string | null
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
        active 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
      {badge && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-3 mr-8">
            <img src="/IMG_2137.png" alt="DAOS" className="h-8" />
          </div>

          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            <Save size={16} />
            <span>Save</span>
            {lastSaved && (
              <span className="text-blue-200 text-xs ml-2">
                {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </button>

          <NavButton 
            icon={FileText} 
            label="Logs" 
            onClick={() => onViewChange('logs')}
            active={currentView === 'logs'}
          />

          <NavButton 
            icon={Bot} 
            label="Agent Drawer" 
            onClick={onToggleAgentDrawer}
            badge="3"
          />

          <NavButton 
            icon={Store} 
            label="Agent Marketplace" 
            onClick={() => onViewChange('agent-marketplace')}
            active={currentView === 'agent-marketplace'}
          />

          <NavButton 
            icon={BookOpen} 
            label="Learn/Educate" 
            onClick={() => onViewChange('lms')}
            active={currentView === 'lms'}
          />

          <NavButton 
            icon={TrendingUp} 
            label="ROI" 
            onClick={() => onViewChange('roi')}
            active={currentView === 'roi'}
          />

          <NavButton 
            icon={HelpCircle} 
            label="Help" 
            onClick={() => {}}
          />
        </div>

        <div className="flex items-center space-x-4">
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="text-white" size={16} />
              </div>
              <span className="text-sm font-medium">{user?.name || 'User'}</span>
            </button>

            {userMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-sm text-gray-500">{user?.email}</div>
                  {user?.company && (
                    <div className="text-xs text-gray-400 mt-1">{user.company}</div>
                  )}
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    Profile Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    Billing
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                    Team Settings
                  </button>
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center space-x-2"
                    >
                      <LogOut size={14} />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              <Search size={18} />
              <span className="text-sm">Search</span>
              <div className="flex items-center space-x-1 text-xs bg-gray-200 px-2 py-1 rounded">
                <Command size={12} />
                <span>K</span>
              </div>
            </button>

            {searchOpen && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4">
                  <input
                    type="text"
                    placeholder="Search tables, columns, agents, runs..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
                <div className="border-t border-gray-100 p-2">
                  <div className="text-sm text-gray-500 px-3 py-2">Recent searches</div>
                  <div className="space-y-1">
                    <div className="px-3 py-2 hover:bg-gray-50 rounded text-sm cursor-pointer">customers table</div>
                    <div className="px-3 py-2 hover:bg-gray-50 rounded text-sm cursor-pointer">schema mapper agent</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {searchOpen && (
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setSearchOpen(false)}
            />
          )}
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(searchOpen || userMenuOpen) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => {
            setSearchOpen(false);
            setUserMenuOpen(false);
          }}
        />
      )}
    </div>
  );
}