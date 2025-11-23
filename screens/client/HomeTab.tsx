
import React from 'react';
import MegaphoneIcon from '../../components/icons/MegaphoneIcon';
import MapPinIcon from '../../components/icons/MapPinIcon';
import CalendarIcon from '../../components/icons/CalendarIcon';

interface HomeTabProps {
    onTrackService: () => void;
    onRequestQuote: () => void;
}

const HomeTab: React.FC<HomeTabProps> = ({ onTrackService, onRequestQuote }) => {
    return (
        <div className="p-6 space-y-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Acompanhamento de Chamado</h2>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 border border-gray-100">
                 <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Seu Último Serviço</p>
                 <div className="flex items-center space-x-4">
                    <div className="bg-teal-50 p-3 rounded-xl">
                        <CalendarIcon className="w-8 h-8 text-teal-500" />
                    </div>
                    <div>
                        <p className="font-bold text-xl text-gray-800">Serviço #4528</p>
                        <p className="text-gray-600">Manutenção Preventiva</p>
                    </div>
                 </div>
                 <div className="bg-green-100 text-green-800 text-sm font-bold text-center py-3 rounded-xl flex items-center justify-center space-x-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                    <span>Status: Agendado para 10:00 AM</span>
                 </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <button onClick={onRequestQuote} className="group w-full flex items-center justify-center space-x-4 bg-teal-500 text-white font-bold py-6 rounded-2xl shadow-lg hover:bg-teal-600 transition-all transform hover:-translate-y-1">
                    <MegaphoneIcon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    <span className="text-lg">Solicitar Novo Serviço</span>
                </button>
                 <button onClick={onTrackService} className="group w-full flex items-center justify-center space-x-4 bg-[#0B4F6C] text-white font-bold py-6 rounded-2xl shadow-lg hover:bg-[#093e54] transition-all transform hover:-translate-y-1">
                    <MapPinIcon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    <span className="text-lg">Acompanhar Chamados</span>
                </button>
            </div>
        </div>
    );
};

export default HomeTab;
