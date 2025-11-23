
import React from 'react';
import ClipboardDocumentListIcon from '../../components/icons/ClipboardDocumentListIcon';
import ExclamationTriangleIcon from '../../components/icons/ExclamationTriangleIcon';
import { Contract } from '../../types';

const contracts: Contract[] = [
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
            'O cliente deve fornecer acesso livre aos equipamentos.',
            'A rede elétrica deve estar conforme a norma NBR 5410.',
            'Exclusão: Não inclui obras de alvenaria ou recomposição de gesso.',
            'Exclusão: Não inclui locação de andaimes acima de 3 metros.'
        ]
    },
    {
        id: 'CTR-2023-058',
        clientId: 'CLI-001',
        title: 'Instalação Split 12000 BTUs (Finalizado)',
        status: 'Vencido',
        startDate: '2023-05-10',
        endDate: '2023-05-10',
        recurringValue: 650.00,
        maintenanceFrequency: 'Anual', // Apenas como placeholder
        pdfUrl: '#',
        prerogatives: []
    }
];

const ContractsTab: React.FC = () => {
    return (
        <div className="p-4 space-y-6 max-w-4xl mx-auto pb-24">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-teal-50 p-3 rounded-full text-[#14B8A6]">
                        <ClipboardDocumentListIcon className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Documentos e Acordos</h2>
                </div>
                <p className="text-gray-600 text-sm">
                    Acesse seus contratos assinados e verifique as condições de serviço acordadas. A transparência é nosso compromisso.
                </p>
            </div>

            <div className="space-y-6">
                {contracts.map((contract) => (
                    <div key={contract.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
                        <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-start">
                            <div>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-2 ${contract.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                                    {contract.status}
                                </span>
                                <h3 className="font-bold text-lg text-[#0B4F6C] leading-tight">{contract.title}</h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Contrato: {contract.id} • Vigência: {contract.startDate.split('-').reverse().join('/')} - {contract.endDate.split('-').reverse().join('/')}
                                </p>
                                <div className="mt-2 text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded inline-block">
                                    Frequência: {contract.maintenanceFrequency}
                                </div>
                            </div>
                        </div>

                        {contract.prerogatives.length > 0 && (
                            <div className="p-5 bg-yellow-50/50 border-b border-yellow-100">
                                <h4 className="text-sm font-bold text-yellow-800 mb-3 flex items-center uppercase tracking-wide">
                                    <ExclamationTriangleIcon className="w-4 h-4 mr-2" />
                                    Destaques do Acordo & Prerrogativas
                                </h4>
                                <ul className="space-y-2">
                                    {contract.prerogatives.map((item, idx) => (
                                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                                            <span className="mr-2 text-yellow-500">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="p-5 flex justify-end bg-white">
                            <button className="flex items-center space-x-2 text-[#14B8A6] font-bold text-sm hover:text-[#0d9488] transition-colors px-4 py-2 border border-[#14B8A6] rounded-lg hover:bg-teal-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                <span>Baixar PDF Assinado</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContractsTab;
