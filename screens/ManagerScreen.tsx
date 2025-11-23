
import React, { useState } from 'react';
import UserIcon from '../components/icons/UserIcon';
import DashboardTab from './manager/DashboardTab';
import EquipeTab from './manager/EquipeTab';
import FinanceiroTab from './manager/FinanceiroTab';
import ClientesTab from './manager/ClientesTab';
import ClientDetailScreen from './manager/ClientDetailScreen';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import AdminTab from './manager/AdminTab';
import InventoryTab from './manager/InventoryTab';
import SmartScheduleTab from './manager/SmartScheduleTab'; // Nova Importação
import { Client } from '../types';


interface ManagerScreenProps {
  onLogout: () => void;
  readOnly?: boolean;
}

type TabName = 'Dashboard' | 'Agendamento' | 'Equipe' | 'Financeiro' | 'Estoque' | 'Clientes' | 'Admin';

const Header: React.FC<{onLogout: () => void, title: string, onBack?: () => void}> = ({ onLogout, title, onBack }) => (
  <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-20">
    <div className="flex items-center space-x-2">
       {onBack && (
         <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
            <ChevronLeftIcon className="h-6 w-6" />
         </button>
       )}
       <div className="flex items-center space-x-2">
         <img src="https://i.imgur.com/Jm2M9s1.png" alt="ServicePro Logo" className="w-8 h-8"/>
         <h1 className="text-lg font-bold text-gray-700">{title}</h1>
       </div>
    </div>
    <button onClick={onLogout} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300">
        <UserIcon className="h-5 w-5" />
    </button>
  </header>
);

const Tabs: React.FC<{ activeTab: TabName, setActiveTab: (tab: TabName) => void }> = ({ activeTab, setActiveTab }) => {
    const tabs: TabName[] = ['Dashboard', 'Agendamento', 'Equipe', 'Financeiro', 'Estoque', 'Clientes', 'Admin'];

    return (
        <div className="bg-white border-b border-gray-200 sticky top-[65px] z-20">
            <nav className="flex space-x-2 px-4 overflow-x-auto scrollbar-hide" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`${
                            activeTab === tab
                                ? 'border-teal-500 text-teal-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-3 px-3 border-b-2 font-medium text-sm focus:outline-none transition-colors`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>
    );
};


const ManagerScreen: React.FC<ManagerScreenProps> = ({ onLogout, readOnly = false }) => {
  const [activeTab, setActiveTab] = useState<TabName>('Dashboard');
  const [viewingClient, setViewingClient] = useState<Client | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'Agendamento':
        return <SmartScheduleTab />;
      case 'Equipe':
        return <EquipeTab />;
      case 'Financeiro':
        return <FinanceiroTab readOnly={readOnly} />;
      case 'Estoque':
        return <InventoryTab />;
      case 'Clientes':
        return <ClientesTab onSelectClient={(client) => setViewingClient(client)} readOnly={readOnly} />;
      case 'Admin':
        return <AdminTab readOnly={readOnly} />;
      case 'Dashboard':
      default:
        return <DashboardTab />;
    }
  };

  if (viewingClient) {
      return (
        <div className="bg-gray-100 min-h-screen">
            <Header onLogout={onLogout} title="Detalhes do Cliente" onBack={() => setViewingClient(null)} />
            <main>
                <ClientDetailScreen client={viewingClient} readOnly={readOnly} />
            </main>
        </div>
      );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
        <Header onLogout={onLogout} title={readOnly ? "ServicePro - Consulta" : "ServicePro - Gerência"}/>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="p-4 space-y-6 max-w-7xl mx-auto">
            {renderContent()}
        </main>
    </div>
  );
};

export default ManagerScreen;
