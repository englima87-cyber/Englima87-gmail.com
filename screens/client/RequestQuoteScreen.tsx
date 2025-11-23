
import React, { useState } from 'react';
import WrenchIcon from '../../components/icons/WrenchIcon';
import ShieldCheckIcon from '../../components/icons/ShieldCheckIcon';
import BellAlertIcon from '../../components/icons/BellAlertIcon';
import CameraIcon from '../../components/icons/CameraIcon';

type ServiceType = 'Instalação' | 'Manutenção Preventiva' | 'Manutenção Corretiva';

const ServiceButton: React.FC<{ icon: React.ReactNode, label: string, selected: boolean, onClick: () => void, fullWidth?: boolean }> = 
({ icon, label, selected, onClick, fullWidth = false }) => (
    <button 
        onClick={onClick} 
        className={`p-4 rounded-xl flex flex-col items-center justify-center space-y-3 border-2 transition-all duration-200 shadow-sm hover:shadow-md
        ${selected ? 'bg-[#14B8A6] border-[#14B8A6] text-white transform scale-[1.02]' : 'bg-white border-gray-100 text-gray-500 hover:border-[#14B8A6] hover:text-[#14B8A6]'} 
        ${fullWidth ? 'w-full flex-row space-y-0 space-x-4' : 'flex-1'}`}
    >
        {icon}
        <span className="font-bold text-sm text-center">{label}</span>
    </button>
);

const RequestQuoteScreen: React.FC = () => {
    const [selectedService, setSelectedService] = useState<ServiceType | null>('Instalação');

    return (
        <div className="p-4 space-y-6 bg-gray-50 min-h-[calc(100vh-64px)]">
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-700 ml-1">Qual serviço você precisa?</h2>
                <div className="flex space-x-4">
                    <ServiceButton 
                        icon={<WrenchIcon className="w-8 h-8"/>} 
                        label="Instalação"
                        selected={selectedService === 'Instalação'}
                        onClick={() => setSelectedService('Instalação')}
                    />
                    <ServiceButton 
                        icon={<ShieldCheckIcon className="w-8 h-8"/>} 
                        label="Manutenção Preventiva"
                        selected={selectedService === 'Manutenção Preventiva'}
                        onClick={() => setSelectedService('Manutenção Preventiva')}
                    />
                </div>
                 <ServiceButton 
                    icon={<BellAlertIcon className="w-8 h-8"/>} 
                    label="Manutenção Corretiva (Reparo)"
                    selected={selectedService === 'Manutenção Corretiva'}
                    onClick={() => setSelectedService('Manutenção Corretiva')}
                    fullWidth
                />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="font-semibold text-gray-400 text-xs uppercase tracking-wider mb-1">Estimativa de Preço</p>
                <p className="text-4xl font-extrabold text-[#0B4F6C] mb-2">R$ 250,00</p>
                <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded-lg inline-block">
                    *Preço padrão para visita técnica e diagnóstico de 1 aparelho Split até 12.000 BTUs.
                </p>
            </div>
            
            <div className="space-y-2">
                 <label className="font-bold text-gray-700 ml-1">Detalhes do Problema</label>
                 <textarea className="w-full h-24 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent bg-white outline-none resize-none shadow-sm" placeholder="Descreva o que está acontecendo com seu equipamento..."></textarea>
            </div>
            
             <button className="w-full flex items-center justify-center space-x-2 border-2 border-dashed border-gray-300 text-gray-500 font-semibold py-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-colors">
                <CameraIcon className="w-6 h-6" />
                <span>Anexar Fotos do Equipamento</span>
             </button>

             <button className="w-full bg-[#0B4F6C] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#093e54] transition-all transform active:scale-95 mt-4">
                Confirmar Solicitação
             </button>

        </div>
    );
};

export default RequestQuoteScreen;
