
import React, { useState } from 'react';
import { Client, Contract, Equipment } from '../../types';
import WrenchIcon from '../../components/icons/WrenchIcon';
import DocumentTextIcon from '../../components/icons/DocumentTextIcon';
import ClipboardDocumentListIcon from '../../components/icons/ClipboardDocumentListIcon';
import PlusIcon from '../../components/icons/PlusIcon';
import ExclamationTriangleIcon from '../../components/icons/ExclamationTriangleIcon';

interface ClientDetailScreenProps {
    client: Client;
    readOnly?: boolean;
}

type DetailTab = 'Visão Geral' | 'Equipamentos' | 'Histórico' | 'Contratos';

const contractsMock: Contract[] = [
    {
        id: 'CTR-2024-001',
        clientId: 'CLI-001',
        title: 'Manutenção Preventiva - Climatização',
        status: 'Ativo',
        startDate: '2024-01-01',
        endDate: '2025-01-01',
        recurringValue: 1200.00,
        maintenanceFrequency: 'Trimestral',
        pdfUrl: '#',
        prerogatives: [
            'Acesso livre aos equipamentos.',
            'Rede elétrica conforme NBR 5410.',
            'Exclusão: Obras de alvenaria.'
        ]
    }
];

const equipmentMock: Equipment[] = [
    { id: 'EQ-01', name: 'Split Sala Estar', brand: 'Daikin', model: 'FTX12', serialNumber: 'B62JKR8', installationDate: '2022-05-10', lastMaintenance: '2024-02-15' },
    { id: 'EQ-02', name: 'Split Quarto Master', brand: 'LG', model: 'Dual Inverter', serialNumber: 'LG998877', installationDate: '2023-01-20', lastMaintenance: '2024-02-15' },
];

const ClientDetailScreen: React.FC<ClientDetailScreenProps> = ({ client, readOnly = false }) => {
    const [activeTab, setActiveTab] = useState<DetailTab>('Visão Geral');

    return (
        <div className="pb-20 max-w-7xl mx-auto px-4 py-6">
            {/* Header do Cliente */}
            <div className="bg-white p-6 rounded-2xl shadow-md mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                    <img src={client.img} alt={client.name} className="w-20 h-20 rounded-full border-4 border-gray-100" />
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{client.name}</h2>
                        <p className="text-gray-500 text-sm">{client.branch}</p>
                        <div className="flex items-center mt-2 space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${client.contractStatus === 'ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                Contrato {client.contractStatus}
                            </span>
                            <span className="text-xs text-gray-400">ID: {client.id}</span>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    {!readOnly && (
                        <button className="bg-[#0B4F6C] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#093e54] transition-colors shadow-sm">
                            Editar Dados
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {['Visão Geral', 'Equipamentos', 'Histórico', 'Contratos'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as DetailTab)}
                        className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                            activeTab === tab 
                            ? 'bg-teal-500 text-white shadow-md' 
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Conteúdo das Abas */}
            <div className="space-y-6">
                {activeTab === 'Visão Geral' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Informações de Contato</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">Email</p>
                                    <p className="font-medium text-gray-800">{client.email || 'email@cliente.com'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">Telefone</p>
                                    <p className="font-medium text-gray-800">{client.phone || '(11) 99999-9999'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase">Endereço Principal</p>
                                    <p className="font-medium text-gray-800">{client.address || 'Av. Principal, 100 - Centro'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm">
                            <h3 className="font-bold text-gray-700 mb-4 border-b pb-2">Resumo de Atividades</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 p-4 rounded-xl">
                                    <p className="text-2xl font-bold text-[#0B4F6C]">{equipmentMock.length}</p>
                                    <p className="text-xs text-gray-500 font-semibold">Equipamentos</p>
                                </div>
                                <div className="bg-teal-50 p-4 rounded-xl">
                                    <p className="text-2xl font-bold text-teal-600">1</p>
                                    <p className="text-xs text-gray-500 font-semibold">Contratos Ativos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Equipamentos' && (
                    <div className="space-y-4">
                        {equipmentMock.map(eq => (
                            <div key={eq.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-gray-100">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-gray-100 p-3 rounded-lg text-gray-500">
                                        <WrenchIcon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{eq.name}</h4>
                                        <p className="text-xs text-gray-500">{eq.brand} • {eq.model} • S/N: {eq.serialNumber}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400">Última Manutenção</p>
                                    <p className="text-sm font-bold text-teal-600">{eq.lastMaintenance}</p>
                                </div>
                            </div>
                        ))}
                        {!readOnly && (
                            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                                <PlusIcon className="w-5 h-5" />
                                <span>Adicionar Equipamento</span>
                            </button>
                        )}
                    </div>
                )}

                {activeTab === 'Contratos' && (
                    <div className="space-y-4">
                        {contractsMock.map(contract => (
                            <div key={contract.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-5 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                                    <div>
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h4 className="font-bold text-lg text-[#0B4F6C]">{contract.title}</h4>
                                            <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">{contract.status}</span>
                                        </div>
                                        <p className="text-xs text-gray-500">Vigência: {contract.startDate} a {contract.endDate}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 uppercase font-bold">Valor Recorrente</p>
                                        <p className="text-xl font-bold text-gray-800">R$ {contract.recurringValue.toFixed(2)}</p>
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">{contract.maintenanceFrequency}</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h5 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                                        <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500 mr-2" />
                                        Prerrogativas & Exclusões
                                    </h5>
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-1">
                                        {contract.prerogatives.map((p, i) => (
                                            <li key={i}>{p}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-gray-50 p-3 flex justify-end">
                                    <button className="text-teal-600 text-sm font-bold hover:underline flex items-center">
                                        <ClipboardDocumentListIcon className="w-4 h-4 mr-1" />
                                        Ver PDF do Contrato
                                    </button>
                                </div>
                            </div>
                        ))}
                        {!readOnly && (
                            <button className="w-full bg-[#0B4F6C] text-white py-3 rounded-xl font-bold shadow-md hover:bg-[#093e54] transition-colors flex items-center justify-center space-x-2">
                                <PlusIcon className="w-5 h-5" />
                                <span>Novo Contrato</span>
                            </button>
                        )}
                    </div>
                )}

                {activeTab === 'Histórico' && (
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                        <DocumentTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">Histórico de serviços completo disponível na versão web desktop.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientDetailScreen;
