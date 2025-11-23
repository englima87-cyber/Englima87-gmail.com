
import React from 'react';
import BriefcaseIcon from '../../components/icons/BriefcaseIcon';
import MoneyIcon from '../../components/icons/MoneyIcon';
import TechnicianIcon from '../../components/icons/TechnicianIcon';
import TeamPerformanceChart from '../../components/charts/TeamPerformanceChart';
import ServiceTypesCard from '../../components/charts/ServiceTypesCard';
import ExclamationTriangleIcon from '../../components/icons/ExclamationTriangleIcon';
import BellAlertIcon from '../../components/icons/BellAlertIcon';
import { SystemAlert } from '../../types';

const KpiCard: React.FC<{ icon: React.ReactNode, title: string, value: string, color: string }> = ({ icon, title, value, color }) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

// Mock de Alertas Automáticos
const systemAlerts: SystemAlert[] = [
    { id: '1', type: 'warranty', message: 'Garantia Prestes a Vencer: Split Sala (Cliente: Maria Oliveira)', severity: 'medium', date: 'Vence em 15 dias' },
    { id: '2', type: 'contract', message: 'Renovação de Contrato: Empresa ABC Ltda', severity: 'high', date: 'Vence em 5 dias' },
    { id: '3', type: 'stock', message: 'Estoque Baixo: Gás R410A (3 unidades restantes)', severity: 'high', date: 'Hoje' },
];

const AlertsPanel: React.FC = () => (
    <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-yellow-400">
        <h3 className="font-bold text-gray-700 mb-3 flex items-center">
            <BellAlertIcon className="w-5 h-5 mr-2 text-yellow-500" />
            Alertas do Sistema
        </h3>
        <div className="space-y-2">
            {systemAlerts.map(alert => (
                <div key={alert.id} className={`p-3 rounded-lg flex justify-between items-center ${alert.severity === 'high' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'}`}>
                    <div className="flex items-center space-x-2">
                        <ExclamationTriangleIcon className="w-4 h-4" />
                        <span className="text-sm font-semibold">{alert.message}</span>
                    </div>
                    <span className="text-xs font-bold bg-white/50 px-2 py-1 rounded">{alert.date}</span>
                </div>
            ))}
        </div>
    </div>
);

const DashboardTab: React.FC = () => {
  return (
    <div className="space-y-6">
        <AlertsPanel />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KpiCard icon={<BriefcaseIcon className="w-6 h-6 text-white"/>} title="Trabalhos Abertos" value="15" color="bg-blue-400" />
            <KpiCard icon={<MoneyIcon className="w-6 h-6 text-white"/>} title="Faturamento (Mês)" value="R$ 12,500" color="bg-teal-500" />
            <KpiCard icon={<TechnicianIcon className="w-6 h-6 text-white"/>} title="Técnicos Disponíveis" value="7" color="bg-[#0B4F6C]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TeamPerformanceChart />
            <ServiceTypesCard />
        </div>
    </div>
  );
};

export default DashboardTab;
