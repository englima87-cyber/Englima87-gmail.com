
import React, { useState } from 'react';
import DocumentTextIcon from '../../components/icons/DocumentTextIcon';
import CreditCardIcon from '../../components/icons/CreditCardIcon';
import PixIcon from '../../components/icons/PixIcon';

type InvoiceTab = 'Faturas' | 'Histórico de Serviços';

const InvoicesTab: React.FC = () => {
    const [activeTab, setActiveTab] = useState<InvoiceTab>('Faturas');

    const InvoicePayment: React.FC = () => (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
            {/* Invoice Details */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div>
                    <p className="font-bold text-lg text-gray-800">Fatura #2024-055</p>
                    <p className="text-sm text-gray-500 mb-1">Vencimento: 15/10/2024</p>
                    <p className="font-extrabold text-3xl text-[#14B8A6]">R$ 350,00</p>
                </div>
                <div className="text-right">
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full">Pendente</span>
                </div>
            </div>

            <div className="space-y-2">
                <p className="font-semibold text-gray-700 text-sm">Detalhamento</p>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Mão de Obra (Visita)</span>
                    <span>R$ 250,00</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Gás Refrigerante R410A</span>
                    <span>R$ 100,00</span>
                </div>
            </div>

            {/* Payment Options */}
            <div>
                <h3 className="font-bold text-gray-800 mb-3">Como deseja pagar?</h3>
                <div className="flex space-x-3">
                    <button className="flex-1 flex items-center justify-center space-x-2 border-2 border-[#14B8A6] bg-teal-50 text-[#14B8A6] font-bold py-3 rounded-xl hover:bg-[#14B8A6] hover:text-white transition-colors">
                        <CreditCardIcon className="w-5 h-5" />
                        <span className="text-sm">Cartão</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 border border-gray-200 bg-white text-gray-600 font-bold py-3 rounded-xl hover:border-gray-400 transition-colors">
                        <PixIcon className="w-5 h-5" />
                        <span className="text-sm">Pix</span>
                    </button>
                </div>
            </div>

            {/* Fiscal Note & Payment */}
            <div className="pt-2 space-y-4">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="h-5 w-5 text-[#14B8A6] rounded border-gray-300 focus:ring-[#14B8A6]" />
                        <span className="font-medium text-gray-700 text-sm">Emitir Nota Fiscal (NF)</span>
                    </label>
                </div>
                 <input type="text" placeholder="CPF/CNPJ para a Nota" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent outline-none text-sm" />
                
                <button className="w-full bg-[#14B8A6] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#0d9488] transition-all transform active:scale-95">
                    Realizar Pagamento
                </button>
            </div>
        </div>
    );

    return (
        <div>
            <div className="bg-white px-4 py-2 shadow-sm sticky top-[64px] z-10">
                 <div className="flex bg-gray-100 rounded-xl p-1">
                     <button onClick={() => setActiveTab('Faturas')} className={`w-1/2 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'Faturas' ? 'bg-white text-[#0B4F6C] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Faturas</button>
                     <button onClick={() => setActiveTab('Histórico de Serviços')} className={`w-1/2 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'Histórico de Serviços' ? 'bg-white text-[#0B4F6C] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Histórico</button>
                 </div>
            </div>
            <div className="p-4 space-y-4 bg-gray-50 min-h-[calc(100vh-130px)]">
                {activeTab === 'Faturas' && (
                    <div>
                        <h3 className="font-bold text-gray-700 mb-4 ml-1">Pagamentos Pendentes</h3>
                        <InvoicePayment />
                    </div>
                )}
                {activeTab === 'Histórico de Serviços' && (
                     <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <DocumentTextIcon className="w-12 h-12 mb-2 opacity-50" />
                        <p className="font-medium">Nenhum histórico disponível.</p>
                     </div>
                )}
            </div>
        </div>
    );
};

export default InvoicesTab;
