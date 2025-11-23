
import React, { useState, useEffect } from 'react';
import RouteIcon from '../../components/icons/RouteIcon';
import MapPinIcon from '../../components/icons/MapPinIcon';
import IdentificationIcon from '../../components/icons/IdentificationIcon';
import ExclamationTriangleIcon from '../../components/icons/ExclamationTriangleIcon';
import { TimeRecord } from '../../types';

// Mock de Histórico Inicial
const initialHistory: TimeRecord[] = [
    { id: '1', type: 'Entrada', timestamp: '2024-10-23T08:00:00', location: 'Av. Paulista, 1578', synced: true },
    { id: '2', type: 'Saída', timestamp: '2024-10-23T17:05:00', location: 'Av. Paulista, 1578', synced: true },
    { id: '3', type: 'Entrada', timestamp: '2024-10-24T08:10:00', location: 'Rua Augusta, 500', synced: true },
    // Intencionalmente sem saída do dia 24 para gerar alerta visual
];

const DigitalTimeClock: React.FC<{ onRegister: (record: TimeRecord) => void, lastStatus: 'Entrada' | 'Saída' | null }> = ({ onRegister, lastStatus }) => {
    const [time, setTime] = useState(new Date());
    const [locationStatus, setLocationStatus] = useState<'locating' | 'found'>('locating');
    const [address, setAddress] = useState('Buscando satélite...');

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        
        const locationTimer = setTimeout(() => {
            setLocationStatus('found');
            setAddress('Av. Paulista, 1578 - São Paulo, SP');
        }, 2000);

        return () => {
            clearInterval(timer);
            clearTimeout(locationTimer);
        };
    }, []);

    const handleRegister = () => {
        if (locationStatus !== 'found') return;

        const type = lastStatus === 'Entrada' ? 'Saída' : 'Entrada';
        
        const confirm = window.confirm(`Confirmar registro de ${type} em:\n${address}?`);
        
        if (confirm) {
            const newRecord: TimeRecord = {
                id: Date.now().toString(),
                type: type,
                timestamp: new Date().toISOString(),
                location: address,
                synced: false 
            };
            onRegister(newRecord);
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-1 shadow-2xl border-4 border-gray-700 mb-6 mx-4 md:mx-0 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
            
            <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center text-center relative z-10">
                <div className="flex justify-between w-full items-center mb-6 border-b border-gray-700 pb-2">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${locationStatus === 'found' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                        <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">GPS: {locationStatus === 'found' ? 'ATIVO' : 'BUSCANDO'}</span>
                    </div>
                    <div className="text-gray-500 text-xs font-bold">ID: 8839</div>
                </div>

                <div className="bg-[#9CA3AF]/10 w-full rounded-lg p-4 mb-6 border border-white/5 shadow-inner">
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1 font-mono">{time.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                    <h2 className="text-5xl md:text-6xl font-mono font-bold text-white tracking-wider text-shadow-glow">
                        {time.toLocaleTimeString('pt-BR')}
                    </h2>
                    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-400 bg-black/20 py-1 px-3 rounded-full mx-auto w-max">
                        <MapPinIcon className="w-3 h-3" />
                        <span className="truncate max-w-[200px]">{address}</span>
                    </div>
                </div>

                <div className="w-full">
                    <button 
                        onClick={handleRegister}
                        disabled={locationStatus !== 'found'}
                        className={`group relative w-full py-4 rounded-xl font-bold text-lg tracking-wide shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3
                        ${lastStatus === 'Entrada' 
                            ? 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:from-red-500 hover:to-red-400 ring-4 ring-red-900/30' 
                            : 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400 ring-4 ring-green-900/30'
                        } ${locationStatus !== 'found' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <IdentificationIcon className="w-6 h-6" />
                        <span>{lastStatus === 'Entrada' ? 'REGISTRAR SAÍDA' : 'REGISTRAR ENTRADA'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const TimeHistory: React.FC<{ history: TimeRecord[] }> = ({ history }) => {
    // Lógica simples para detectar inconsistência (ex: Dia anterior sem saída e hoje é outro dia)
    const hasInconsistency = history.length > 0 && history[0].type === 'Entrada' && new Date(history[0].timestamp).getDate() !== new Date().getDate();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8 mx-4 md:mx-0">
            <h3 className="font-bold text-gray-700 mb-4 flex items-center justify-between text-sm uppercase tracking-wide">
                <span>Histórico Recente</span>
                {hasInconsistency && (
                    <span className="flex items-center text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100 animate-pulse">
                        <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
                        Ponto Pendente
                    </span>
                )}
            </h3>
            
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-200">
                {history.slice().reverse().map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${record.type === 'Entrada' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <div>
                                <p className="text-sm font-bold text-gray-800">{record.type}</p>
                                <p className="text-xs text-gray-500">{new Date(record.timestamp).toLocaleDateString('pt-BR')} • {new Date(record.timestamp).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-gray-400 max-w-[120px] truncate">{record.location}</p>
                            <p className={`text-[10px] font-bold ${record.synced ? 'text-green-600' : 'text-yellow-600'}`}>
                                {record.synced ? 'Sincronizado' : 'Enviando...'}
                            </p>
                        </div>
                    </div>
                ))}
                {history.length === 0 && <p className="text-center text-gray-400 text-sm py-4">Nenhum registro encontrado.</p>}
            </div>
        </div>
    );
};

const calls = [
    { time: '09:00', type: 'Manutenção Preventiva', address: 'Av. Paulista, 1000 - Bela Vista, SP', client: 'Maria Oliveira (Residencial)' },
    { time: '13:00', type: 'Instalação Split', address: 'Rua Augusta, 500 - Consolação, SP', client: 'Escritório TechSolutions' },
    { time: '16:00', type: 'Manutenção Corretiva', address: 'Al. Santos, 230 - Jardins, SP', client: 'Restaurante Bom Sabor' },
];

const CallsTab: React.FC = () => {
    const [history, setHistory] = useState<TimeRecord[]>(initialHistory);
    
    const lastRecord = history.length > 0 ? history[history.length - 1] : null;
    const lastStatus = lastRecord?.type === 'Entrada' ? 'Entrada' : 'Saída'; 

    const handleRegisterPoint = (record: TimeRecord) => {
        setHistory(prev => [...prev, record]);
        
        // Simula sincronização
        setTimeout(() => {
            setHistory(prev => prev.map(r => r.id === record.id ? { ...r, synced: true } : r));
        }, 2000);
    };

    return (
        <div className="text-white pb-20">
            <div className="p-6 flex flex-col md:flex-row justify-between items-end md:items-center max-w-6xl mx-auto">
                <div className="mb-4 md:mb-0">
                    <p className="text-white/70 text-sm font-medium mb-1 uppercase tracking-wider">Visão Geral</p>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">Você tem 3 chamados<br/><span className="text-[#14B8A6]">agendados para hoje</span></h2>
                </div>
                <button className="bg-[#14B8A6] hover:bg-[#0d9488] flex items-center space-x-2 px-6 py-3 rounded-xl text-base font-bold shadow-lg transition-all transform hover:scale-105 active:scale-95">
                    <RouteIcon className="w-6 h-6"/>
                    <span>Otimizar Rota</span>
                </button>
            </div>
            
            <div className="max-w-xl mx-auto">
                <DigitalTimeClock onRegister={handleRegisterPoint} lastStatus={lastStatus} />
                <TimeHistory history={history} />
            </div>

            <div className="bg-[#F1F5F9] text-gray-800 rounded-t-[2.5rem] p-6 md:p-10 mt-4 min-h-[500px] shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
                <div className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto mb-8 md:hidden"></div>
                <div className="max-w-6xl mx-auto">
                    <h3 className="font-bold text-xl md:text-2xl mb-6 text-[#0B4F6C] flex items-center">
                        <span className="w-2 h-8 bg-[#0B4F6C] rounded-full mr-3"></span>
                        Agenda de Hoje
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {calls.map((call, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                                <div className="mb-6 flex-grow">
                                   <div className="space-y-3">
                                        <span className="bg-blue-50 text-[#0B4F6C] text-sm font-bold px-3 py-1 rounded-lg inline-block">{call.time}</span>
                                        <p className="font-bold text-gray-800 text-xl leading-tight">{call.type}</p>
                                        <div className="flex items-start space-x-2 text-gray-500 pt-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            <p className="text-base font-medium">{call.address}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 pl-1">
                                            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                                            <p className="text-sm font-semibold text-gray-400">{call.client}</p>
                                        </div>
                                   </div>
                                </div>
                                <button className="w-full bg-white border-2 border-[#14B8A6] text-[#14B8A6] font-bold py-3 rounded-xl hover:bg-[#14B8A6] hover:text-white transition-all duration-200 uppercase text-sm tracking-wide">
                                    Iniciar Deslocamento
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallsTab;
