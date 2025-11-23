
import React, { useState } from 'react';
import UserIcon from '../components/icons/UserIcon';
import DashboardTab from './manager/DashboardTab';
import EquipeTab from './manager/EquipeTab';
import FinanceiroTab from './manager/FinanceiroTab';
import ClientesTab from './manager/ClientesTab';

interface ManagerScreenProps {
  onLogout: () => void;
}

type TabName = 'Dashboard' | 'Equipe' | 'Financeiro' | 'Clientes';

const Header: React.FC<{onLogout: () => void}> = ({ onLogout }) => (
  <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
    <div className="flex items-center space-x-2">
        <img src="https://i.imgur.com/Jm2M9s1.png" alt="ServicePro Logo" className="w-8 h-8"/>
        <h1 className="text-lg font-bold text-gray-700">ServicePro - <span className="text-teal-500">Gerência</span></h1>
    </div>
    <button onClick={onLogout} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">
        <UserIcon className="h-5 w-5" />
    </button>
  </header>
);

const Tabs: React.FC<{ activeTab: TabName, setActiveTab: (tab: TabName) => void }> = ({ activeTab, setActiveTab }) => {
    const tabs: TabName[] = ['Dashboard', 'Equipe', 'Financeiro', 'Clientes'];

    return (
        <div className="bg-white border-b border-gray-200 sticky top-[65px] z-20">
            <nav className="flex space-x-2 px-4" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${
                            activeTab === tab
                                ? 'border-teal-500 text-teal-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>
    );
};


const ManagerScreen: React.FC<ManagerScreenProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabName>('Dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'Equipe':
        return <EquipeTab />;
      case 'Financeiro':
        return <FinanceiroTab />;
      case 'Clientes':
        return <ClientesTab onSelectClient={() => {}} />;
      case 'Dashboard':
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
        <Header onLogout={onLogout} />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="p-4 space-y-6">
            {renderContent()}
        </main>
    </div>
  );
};

export default ManagerScreen;