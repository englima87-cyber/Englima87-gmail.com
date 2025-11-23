
import React, { useState } from 'react';
import CallsTab from './collaborator/CallsTab';
import ExecutionTab from './collaborator/ExecutionTab';
import CommunicationTab from './collaborator/CommunicationTab';
import MyHrTab from './collaborator/MyHrTab';
import TrainingTab from './collaborator/TrainingTab'; // Nova Importação
import HomeIcon from '../components/icons/HomeIcon';
import BriefcaseIcon from '../components/icons/BriefcaseIcon';
import ChatBubbleLeftRightIcon from '../components/icons/ChatBubbleLeftRightIcon';
import UserIcon from '../components/icons/UserIcon';
import Bars3Icon from '../components/icons/Bars3Icon';
import CalendarDaysIcon from '../components/icons/CalendarDaysIcon';
import MapPinIcon from '../components/icons/MapPinIcon';
import IdentificationIcon from '../components/icons/IdentificationIcon';
import AcademicCapIcon from '../components/icons/AcademicCapIcon'; // Nova Importação

interface CollaboratorScreenProps {
    onLogout: () => void;
}

type CollaboratorTab = 'Chamados' | 'Execução' | 'Comunicação' | 'Meu RH' | 'Cursos';

const Header: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
  <header className="bg-[#0B4F6C] sticky top-0 z-20 shadow-md">
    <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <button className="text-white hover:bg-white/10 p-1 rounded-lg transition-colors">
            <Bars3Icon className="h-6 w-6" />
        </button>
        <div className="flex items-center space-x-2">
            <img src="https://i.imgur.com/Jm2M9s1.png" alt="ServicePro Logo" className="w-8 h-8"/>
            <h1 className="text-lg font-bold text-white tracking-wide">ServicePro</h1>
        </div>
        <button onClick={onLogout} className="text-white hover:bg-white/10 p-1 rounded-lg transition-colors">
            <UserIcon className="h-6 w-6" />
        </button>
    </div>
  </header>
);

const BottomNavBar: React.FC<{ activeTab: CollaboratorTab, setActiveTab: (tab: CollaboratorTab) => void }> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { name: 'Chamados', icon: <HomeIcon className="w-6 h-6" /> },
        { name: 'Execução', icon: <BriefcaseIcon className="w-6 h-6" /> },
        { name: 'Comunicação', icon: <ChatBubbleLeftRightIcon className="w-6 h-6" /> },
        { name: 'Cursos', icon: <AcademicCapIcon className="w-6 h-6" /> }, // Nova Aba
        { name: 'Meu RH', icon: <IdentificationIcon className="w-6 h-6" /> },
    ] as { name: CollaboratorTab, icon: React.ReactElement }[];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 pb-safe pt-2 z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
            <div className="flex justify-center items-center h-16 max-w-7xl mx-auto space-x-2 md:space-x-12 px-2">
                {tabs.map(tab => (
                    <button 
                        key={tab.name} 
                        onClick={() => setActiveTab(tab.name)} 
                        className={`flex flex-col items-center justify-center space-y-1 w-14 md:w-16 transition-colors duration-200 group ${activeTab === tab.name ? 'text-[#14B8A6]' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        {React.cloneElement(tab.icon as React.ReactElement<any>, { className: `w-5 h-5 md:w-6 md:h-6 ${activeTab === tab.name ? 'transform scale-110' : 'group-hover:scale-105'} transition-transform` })}
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">{tab.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
    <div className="min-h-screen bg-[#0B4F6C] flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#14B8A6] rounded-full filter blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/4 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-[100px] opacity-10 -translate-x-1/2 translate-y-1/4"></div>

        <div className="relative z-10 flex flex-col justify-center max-w-2xl w-full">
            <div className="mb-10 animate-fade-in-up flex flex-col md:flex-row items-center md:space-x-8 text-center md:text-left">
                <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-32 h-32 rounded-full border-4 border-white/20 mb-6 md:mb-0 shadow-2xl"/>
                <div>
                    <h1 className="text-2xl font-light opacity-90 mb-1">Bem-vindo,</h1>
                    <h2 className="text-5xl font-bold tracking-tight">Carlos Oliveira</h2>
                </div>
            </div>

            <p className="text-xl text-white/80 mb-12 leading-relaxed text-center md:text-left max-w-xl">
                Sua agenda do dia e ferramentas de serviço estão prontas. Bom trabalho hoje!
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl flex items-center space-x-5 border border-white/10 hover:bg-white/15 transition-colors cursor-default">
                    <div className="bg-[#14B8A6] p-4 rounded-2xl shadow-lg">
                        <CalendarDaysIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-3xl">3 Chamados</p>
                        <p className="text-sm text-white/70 font-medium">Agendados para hoje</p>
                    </div>
                </div>
                 <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl flex items-center space-x-5 border border-white/10 hover:bg-white/15 transition-colors cursor-default">
                    <div className="bg-blue-500 p-4 rounded-2xl shadow-lg">
                        <MapPinIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-3xl">Rota Otimizada</p>
                        <p className="text-sm text-white/70 font-medium">Economia prevista: 15% tempo</p>
                    </div>
                </div>
            </div>

            <button 
                onClick={onStart}
                className="w-full bg-[#14B8A6] text-white font-bold text-xl py-5 rounded-2xl shadow-xl hover:bg-[#0d9488] transition-all transform hover:scale-[1.01] active:scale-[0.99]"
            >
                Acessar Painel
            </button>
        </div>
    </div>
);

const CollaboratorScreen: React.FC<CollaboratorScreenProps> = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState<CollaboratorTab>('Chamados');
    const [showWelcome, setShowWelcome] = useState(true);

    if (showWelcome) {
        return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'Execução':
                return <ExecutionTab />;
            case 'Comunicação':
                return <CommunicationTab />;
            case 'Cursos':
                return <TrainingTab />;
            case 'Meu RH':
                return <MyHrTab />;
            case 'Chamados':
            default:
                return <CallsTab />;
        }
    };
    
    return (
        <div className="bg-[#0B4F6C] min-h-screen pb-24">
            <Header onLogout={onLogout} />
            <main className="max-w-7xl mx-auto w-full">
              {renderContent()}
            </main>
            <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};

export default CollaboratorScreen;
