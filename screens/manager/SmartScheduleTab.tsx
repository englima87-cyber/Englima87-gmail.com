
import React, { useState } from 'react';
import MapPinIcon from '../../components/icons/MapPinIcon';
import RouteIcon from '../../components/icons/RouteIcon';
import SparklesIcon from '../../components/icons/SparklesIcon';
import { SmartAssignment } from '../../types';

const pendingOrders = [
    { id: 'OS-9021', client: 'Edifício Horizon', address: 'Rua Augusta, 1500', issue: 'Falha VRF', urgency: 'Alta' },
    { id: 'OS-9022', client: 'Clínica Saúde', address: 'Av. Paulista, 2200', issue: 'Manutenção Prev.', urgency: 'Média' },
    { id: 'OS-9023', client: 'Restaurante Chef', address: 'Rua Oscar Freire, 300', issue: 'Vazamento', urgency: 'Alta' },
];

const suggestions: SmartAssignment[] = [
    { technicianId: '2', technicianName: 'Carlos Oliveira', matchScore: 95, reason: 'Certificado VRF + Proximidade (2km)', distance: '2.1km' },
    { technicianId: '3', technicianName: 'João Silva', matchScore: 80, reason: 'Rota Otimizada', distance: '4.5km' },
];

const SmartScheduleTab: React.FC = () => {
    const [optimizing, setOptimizing] = useState(false);

    const handleOptimize = () => {
        setOptimizing(true);
        setTimeout(() => setOptimizing(false), 2000);
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Header e Controle */}
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <SparklesIcon className="w-6 h-6 text-purple-500 mr-2" />
                        Agendamento Inteligente
                    </h2>
                    <p className="text-sm text-gray-500">IA analisando rotas, trânsito e skills técnicas.</p>
                </div>
                <button 
                    onClick={handleOptimize}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${optimizing ? 'bg-gray-400 cursor-wait' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105'}`}
                >
                    {optimizing ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Calculando...</span>
                        </>
                    ) : (
                        <>
                            <RouteIcon className="w-5 h-5" />
                            <span>Otimizar Rotas</span>
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lista de Pendências */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="font-bold text-gray-700 uppercase tracking-wide text-sm">Chamados Pendentes ({pendingOrders.length})</h3>
                    {pendingOrders.map(order => (
                        <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-purple-200 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-mono text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">{order.id}</span>
                                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${order.urgency === 'Alta' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>{order.urgency}</span>
                            </div>
                            <h4 className="font-bold text-gray-800 mb-1">{order.client}</h4>
                            <p className="text-sm text-gray-500 flex items-center">
                                <MapPinIcon className="w-4 h-4 mr-1 text-gray-400" />
                                {order.address}
                            </p>
                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <p className="text-xs font-semibold text-gray-600">Problema: <span className="text-gray-800">{order.issue}</span></p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mapa e Sugestões IA */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Mock do Mapa */}
                    <div className="bg-gray-200 rounded-2xl h-80 w-full relative overflow-hidden shadow-inner group">
                        <img 
                            src="https://i.imgur.com/8O5VbFf.png" 
                            alt="Mapa de Rotas" 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"></div>
                        
                        {/* Overlay Técnico */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                            <p className="text-xs font-bold text-gray-600 uppercase mb-1">Técnicos em Campo</p>
                            <div className="flex -space-x-2">
                                <img src="https://i.pravatar.cc/150?img=11" className="w-8 h-8 rounded-full border-2 border-white" title="Carlos" />
                                <img src="https://i.pravatar.cc/150?img=12" className="w-8 h-8 rounded-full border-2 border-white" title="João" />
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">+2</div>
                            </div>
                        </div>
                    </div>

                    {/* Painel de Sugestão IA */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-2xl border border-purple-100">
                        <h3 className="font-bold text-purple-900 mb-4 flex items-center">
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            Sugestão de Atribuição (IA)
                        </h3>
                        <p className="text-sm text-purple-700 mb-4">Para: <strong>OS-9021 (Edifício Horizon - Falha VRF)</strong></p>
                        
                        <div className="space-y-3">
                            {suggestions.map((sug, idx) => (
                                <div key={sug.technicianId} className={`bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center ${idx === 0 ? 'border-green-400 ring-2 ring-green-100' : 'border-gray-200 opacity-70'}`}>
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${idx === 0 ? 'bg-green-500' : 'bg-gray-400'}`}>
                                            {sug.matchScore}%
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{sug.technicianName}</h4>
                                            <p className="text-xs text-gray-500">{sug.reason}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-gray-700">{sug.distance}</p>
                                        <button className={`text-xs font-bold px-3 py-1.5 rounded-lg mt-1 transition-colors ${idx === 0 ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                            Atribuir
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartScheduleTab;
