
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import MoneyIcon from '../../components/icons/MoneyIcon';
import PlusIcon from '../../components/icons/PlusIcon';
import ArrowDownTrayIcon from '../../components/icons/ArrowDownTrayIcon';
import DocumentTextIcon from '../../components/icons/DocumentTextIcon';
import CogIcon from '../../components/icons/CogIcon';

type FinanceSubTab = 'Fluxo de Caixa' | 'Holerites & Comissões' | 'Custos Operacionais';

const KpiCard: React.FC<{ icon: React.ReactNode, title: string, value: string, subValue: string, color: string }> = ({ icon, title, value, subValue, color }) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex-grow border border-gray-100">
        <div className="flex items-center space-x-3 mb-2">
            <div className={`p-2 rounded-full ${color}`}>
                {icon}
            </div>
            <p className="font-bold text-gray-700">{title}</p>
        </div>
        <p className="text-2xl font-bold text-gray-800 ml-1">{value}</p>
        <p className="text-sm text-gray-500 ml-1">{subValue}</p>
    </div>
);

const cashFlowData = [
  { name: 'Jan', receivable: 4000, payable: 2400 },
  { name: 'Fev', receivable: 3000, payable: 1900 },
  { name: 'Mar', receivable: 5000, payable: 3200 },
  { name: 'Abr', receivable: 4500, payable: 2800 },
  { name: 'Mai', receivable: 6000, payable: 4000 },
  { name: 'Jun', receivable: 5500, payable: 3500 },
];

const CashFlowChart: React.FC = () => (
    <div className="bg-white p-4 rounded-xl shadow-md">
        <h3 className="font-bold text-gray-700 mb-4">Fluxo de Caixa (Mensal)</h3>
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cashFlowData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" tickFormatter={(value) => `R$${value/1000}k`} />
                    <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
                    <Line type="monotone" dataKey="receivable" stroke="#14B8A6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Recebimentos"/>
                    <Line type="monotone" dataKey="payable" stroke="#0B4F6C" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Pagamentos" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
);

const PayrollTable: React.FC = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-700">Auditoria de Folha & Comissões</h3>
            <button className="flex items-center space-x-2 text-[#14B8A6] font-bold text-sm border border-[#14B8A6] px-3 py-1.5 rounded-lg hover:bg-teal-50">
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span>Exportar CSV</span>
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600 font-semibold uppercase tracking-wider">
                    <tr>
                        <th className="p-4">Colaborador</th>
                        <th className="p-4 text-center">Salário Base</th>
                        <th className="p-4 text-center">Comissões</th>
                        <th className="p-4 text-center">Total</th>
                        <th className="p-4 text-center">Status</th>
                        <th className="p-4 text-right">Ação</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                        <td className="p-4 font-bold text-gray-800">Carlos Oliveira</td>
                        <td className="p-4 text-center">R$ 2.500,00</td>
                        <td className="p-4 text-center text-green-600 font-bold">R$ 750,00</td>
                        <td className="p-4 text-center font-bold">R$ 3.250,00</td>
                        <td className="p-4 text-center"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Pago</span></td>
                        <td className="p-4 text-right"><button className="text-blue-600 hover:underline">Ver Detalhes</button></td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                        <td className="p-4 font-bold text-gray-800">João Silva</td>
                        <td className="p-4 text-center">R$ 2.200,00</td>
                        <td className="p-4 text-center text-green-600 font-bold">R$ 450,00</td>
                        <td className="p-4 text-center font-bold">R$ 2.650,00</td>
                        <td className="p-4 text-center"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Pendente</span></td>
                        <td className="p-4 text-right"><button className="text-blue-600 hover:underline">Auditar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const OpsCosts: React.FC = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-700">Custos Operacionais & Ativos</h3>
            <button className="flex items-center space-x-2 text-[#14B8A6] font-bold text-sm border border-[#14B8A6] px-3 py-1.5 rounded-lg hover:bg-teal-50">
                <ArrowDownTrayIcon className="w-4 h-4" />
                <span>Exportar CSV</span>
            </button>
        </div>
        <div className="p-4 grid gap-4">
            <div className="flex items-center justify-between p-3 border rounded-lg border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><CogIcon className="w-5 h-5"/></div>
                    <div>
                        <p className="font-bold text-gray-800">Frota de Veículos</p>
                        <p className="text-xs text-gray-500">Depreciação Mensal: R$ 1.200</p>
                    </div>
                </div>
                <span className="font-bold text-gray-800">Valor Atual: R$ 85.000</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><DocumentTextIcon className="w-5 h-5"/></div>
                    <div>
                        <p className="font-bold text-gray-800">Licenças de Software</p>
                        <p className="text-xs text-gray-500">Renovação: Dez/2024</p>
                    </div>
                </div>
                <span className="font-bold text-gray-800">Custo Anual: R$ 4.500</span>
            </div>
        </div>
    </div>
);

const FinanceiroTab: React.FC<{ readOnly?: boolean }> = ({ readOnly = false }) => {
    const [activeSubTab, setActiveSubTab] = useState<FinanceSubTab>('Fluxo de Caixa');

    return (
        <div className="relative space-y-6 pb-16">
            <div className="bg-white p-2 rounded-xl shadow-sm inline-flex space-x-1">
                {['Fluxo de Caixa', 'Holerites & Comissões', 'Custos Operacionais'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveSubTab(tab as FinanceSubTab)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${activeSubTab === tab ? 'bg-[#0B4F6C] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeSubTab === 'Fluxo de Caixa' && (
                <>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <KpiCard icon={<MoneyIcon className="w-5 h-5 text-white"/>} title="Contas a Receber" value="R$ 28.300" subValue="12 Faturas Vencidas" color="bg-teal-500" />
                        <KpiCard icon={<MoneyIcon className="w-5 h-5 text-white"/>} title="Contas a Pagar" value="R$ 15.500" subValue="7 Contas Pendentes" color="bg-red-500" />
                    </div>
                    <CashFlowChart />
                </>
            )}

            {activeSubTab === 'Holerites & Comissões' && <PayrollTable />}
            
            {activeSubTab === 'Custos Operacionais' && <OpsCosts />}

            {!readOnly && (
                <button className="fixed bottom-8 right-8 w-16 h-16 bg-[#0B4F6C] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-opacity-90 transition-transform hover:scale-110 z-40">
                    <PlusIcon className="w-8 h-8"/>
                </button>
            )}
        </div>
    );
};

export default FinanceiroTab;
