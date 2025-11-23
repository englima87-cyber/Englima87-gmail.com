
import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import ManagerScreen from './screens/ManagerScreen';
import ClientScreen from './screens/ClientScreen';
import CollaboratorScreen from './screens/CollaboratorScreen';
import WebsiteScreen from './screens/WebsiteScreen';

export type Role = 'manager' | 'collaborator' | 'client' | 'viewer';
type View = 'website' | 'corporate_login';

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [view, setView] = useState<View>('website');

  const handleLogin = (role: Role) => {
    setCurrentRole(role);
  };
  
  const handleLogout = () => {
    setCurrentRole(null);
    setView('website');
  }

  const renderAppView = () => {
    if (currentRole === 'manager') return <ManagerScreen onLogout={handleLogout} />;
    if (currentRole === 'viewer') return <ManagerScreen onLogout={handleLogout} readOnly />;
    if (currentRole === 'client') return <ClientScreen onLogout={handleLogout} />;
    if (currentRole === 'collaborator') return <CollaboratorScreen onLogout={handleLogout} />;
    return null;
  };

  const isFullWidthView = 
    !currentRole || 
    currentRole === 'manager' || 
    currentRole === 'viewer';

  if (!currentRole) {
      if (view === 'corporate_login') {
          return <LoginScreen onLogin={handleLogin} onBackToSite={() => setView('website')} />;
      }
      return (
        <div className="w-full min-h-screen">
            <WebsiteScreen 
                onClientLogin={() => handleLogin('client')} 
                onCorporateAccess={() => setView('corporate_login')} 
            />
        </div>
      );
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 font-sans text-gray-900">
      {isFullWidthView ? (
        <div className="w-full min-h-screen">
           {renderAppView()}
        </div>
      ) : (
        <div className="flex justify-center min-h-screen bg-gray-200">
           <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden">
              {renderAppView()}
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
