
import React, { useState } from 'react';
import HomeIcon from '../components/icons/HomeIcon';
import WrenchScrewdriverIcon from '../components/icons/WrenchScrewdriverIcon';
import DocumentTextIcon from '../components/icons/DocumentTextIcon';
import UserCircleIcon from '../components/icons/UserCircleIcon';
import HomeTab from './client/HomeTab';
import InvoicesTab from './client/InvoicesTab';
import EquipmentTab from './client/EquipmentTab';
import ProfileTab from './client/ProfileTab';
import ContractsTab from './client/ContractsTab';
import TrackServiceScreen from './client/TrackServiceScreen';
import RequestQuoteScreen from './client/RequestQuoteScreen';
import Bars3Icon from '../components/icons/Bars3Icon';
import AIChatWidget from '../components/AIChatWidget';
import ClipboardDocumentListIcon from '../components/icons/ClipboardDocumentListIcon';

interface ClientScreenProps {
    onLogout: () => void;
}

type ClientTab = 'Início' | 'Meus Equipamentos' | 'Contratos' | 'Faturas' | 'Perfil';
type ClientView = ClientTab | 'TrackService' | 'RequestQuote';

const Header: React.FC<{ title: string, onBack?: () => void }> = ({ title, onBack }) => (
  <header className="bg-[#0B4F6C] text-white sticky top-0 z-20 shadow-md">
    <div className="max-w-7xl mx-auto p-4 flex items-center space-x-4">
        {onBack ? (
            <button onClick={onBack} className="text-white hover:bg-white/10 p-1 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
        ) : (
            <button className="text-white hover:bg-white/10 p-1 rounded-lg transition-colors">
                <Bars3Icon className="h-6 w-6" />
            </button>
        )}
        <h1 className="text-lg font-bold text-white">{title}</h1>
    </div>
  </header>
);

const BottomNavBar: React.FC<{ activeTab: ClientTab, setActiveTab: (tab: ClientTab) => void }> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { name: 'Início', icon: <HomeIcon className="w-6 h-6" /> },
        { name: 'Meus Equipamentos', icon: <WrenchScrewdriverIcon className="w-6 h-6" /> },
        { name: 'Contratos', icon: <ClipboardDocumentListIcon className="w-6 h-6" /> },
        { name: 'Faturas', icon: <DocumentTextIcon className="w-6 h-6" /> },
        { name: 'Perfil', icon: <UserCircleIcon className="w-6 h-6" /> },
    ] as { name: ClientTab, icon: React.ReactElement }[];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-30">
            <div className="flex justify-center items-center h-16 max-w-7xl mx-auto space-x-4 md:space-x-16 px-2">
                {tabs.map(tab => (
                    <button key={tab.name} onClick={() => setActiveTab(tab.name)} className={`flex flex-col items-center justify-center space-y-1 w-16 md:w-20 group ${activeTab === tab.name ? 'text-teal-500' : 'text-gray-500 hover:text-gray-700'}`}>
                        {React.cloneElement(tab.icon as React.ReactElement<any>, { className: `w-5 h-5 md:w-6 md:h-6 transition-transform duration-200 ${activeTab === tab.name ? 'scale-110' : 'group-hover:scale-105'}` })}
                        <span className="text-[10px] font-medium text-center leading-tight">{tab.name.split(' ')[0]}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const ClientScreen: React.FC<ClientScreenProps> = ({ onLogout }) => {
    const [activeView, setActiveView] = useState<ClientView>('Início');
    const [isChatOpen, setIsChatOpen] = useState(false);

    const navigateTo = (view: ClientView) => setActiveView(view);

    const renderContent = () => {
        if (activeView === 'TrackService') {
            return <TrackServiceScreen />;
        }
        if (activeView === 'RequestQuote') {
            return <RequestQuoteScreen />;
        }
        
        switch (activeView) {
            case 'Faturas':
                return <InvoicesTab />;
            case 'Meus Equipamentos':
                return <EquipmentTab />;
            case 'Contratos':
                return <ContractsTab />;
            case 'Perfil':
                return <ProfileTab onLogout={onLogout} />;
            case 'Início':
            default:
                return <HomeTab onTrackService={() => navigateTo('TrackService')} onRequestQuote={() => navigateTo('RequestQuote')} />;
        }
    };
    
    const getHeaderTitle = () => {
        if (activeView === 'TrackService') return 'Acompanhamento em Tempo Real';
        if (activeView === 'RequestQuote') return 'Solicite seu Orçamento';
        if (activeView === 'Faturas') return 'Faturas e Histórico';
        if (activeView === 'Contratos') return 'Documentos e Acordos';
        return `ServicePro - Cliente`;
    }

    const showNavBar = !['TrackService', 'RequestQuote'].includes(activeView);
    const hasBackButton = ['TrackService', 'RequestQuote'].includes(activeView);


    return (
        <div className="bg-gray-100 min-h-screen relative pb-20">
            <Header 
                title={getHeaderTitle()} 
                onBack={hasBackButton ? () => navigateTo('Início') : undefined} 
            />
            <main className="max-w-7xl mx-auto w-full">
              {renderContent()}
            </main>
            
            {/* Botão Flutuante da IA Sofia */}
            {!isChatOpen && (
                <button 
                    onClick={() => setIsChatOpen(true)}
                    className="fixed bottom-24 right-6 z-40 group transition-transform hover:scale-105 focus:outline-none"
                    aria-label="Falar com Especialista"
                >
                    <div className="relative">
                         <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#0B4F6C] to-[#14B8A6] shadow-xl">
                            <img 
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                                alt="Sofia Especialista" 
                                className="w-full h-full rounded-full object-cover border-2 border-white"
                            />
                        </div>
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
                        
                        {/* Tooltip que aparece ao passar o mouse ou focar */}
                        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold text-[#0B4F6C] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Falar com Sofia
                        </div>
                    </div>
                </button>
            )}

            {/* Widget de Chat */}
            <AIChatWidget 
                isOpen={isChatOpen} 
                onClose={() => setIsChatOpen(false)} 
                onNavigateToQuote={() => navigateTo('RequestQuote')}
            />

            {showNavBar && <BottomNavBar activeTab={activeView as ClientTab} setActiveTab={navigateTo} />}
        </div>
    );
};

export default ClientScreen;
