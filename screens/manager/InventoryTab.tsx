import React, { useState } from 'react';
import { InventoryItem } from '../../types';
import SearchIcon from '../../components/icons/SearchIcon';
import PlusIcon from '../../components/icons/PlusIcon';
import TruckIcon from '../../components/icons/TruckIcon';
import ExclamationTriangleIcon from '../../components/icons/ExclamationTriangleIcon';
import CubeTransparentIcon from '../../components/icons/CubeTransparentIcon';

// Data Seeding: Materiais usados na Execução de Serviço + Itens Críticos
const inventoryData: InventoryItem[] = [
    { id: 1, name: 'Gás Refrigerante R410A (Botija 11kg)', sku: 'GAS-410', category: 'Químicos', quantity: 4, minLevel: 10, unitCost: 650.00, status: 'Baixo' },
    { id: 2, name: 'Cabo Elétrico PP 3x2,5mm (Rolo 100m)', sku: 'CAB-PP-325', category: 'Elétrica', quantity: 15, minLevel: 10, unitCost: 450.00, status: 'Disponível' },
    { id: 3, name: 'Suporte Condensadora 400mm (Par)', sku: 'SUP-EXT-400', category: 'Instalação', quantity: 2, minLevel: 15, unitCost: 35.00, status: 'Crítico' },
    { id: 4, name: 'Fita PVC Branca (Un)', sku: 'FIT-PVC-BR', category: 'Acabamento', quantity: 45, minLevel: 20, unitCost: 8.00, status: 'Disponível' },
    { id: 5, name: 'Capacitor de Partida 35uF', sku: 'CAP-35UF', category: 'Elétrica', quantity: 8, minLevel: 5, unitCost: 25.00, status: 'Disponível' },
    { id: 6, name: 'Tubo de Cobre 1/4" (Metro)', sku: 'TUB-COB-14', category: 'Instalação', quantity: 100, minLevel: 50, unitCost: 22.00, status: 'Disponível' },
    { id: 7, name: 'Tubo de Cobre 3/8" (Metro)', sku: 'TUB-COB-38', category: 'Instalação', quantity: 80, minLevel: 50, unitCost: 38.00, status: 'Disponível' },
];

const InventoryTab: React.FC = () => {
    const [items, setItems] = useState<InventoryItem[]>(inventoryData);
    const [searchTerm, setSearchTerm] = useState('');

    const totalValue = items.reduce((acc, item) => acc + (item.quantity * item.unitCost), 0);
    const lowStockCount = items.filter(i => i.status !== 'Disponível').length;

    return (
        <div className="space-y-6 pb-20">
            {/* Dashboard de Estoque */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4 border-l-4 border-[#0B4F6C]">
                    <div className="p-3 bg-blue-50 rounded-full text-[#0B4F6C]">
                        <CubeTransparentIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Valor em Estoque</p>
                        <p className="text-xl font-bold text-gray-800">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4 border-l-4 border-orange-500">
                    <div className="p-3 bg-orange-50 rounded-full text-orange-500">
                        <ExclamationTriangleIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Alertas de Reposição</p>
                        <p className="text-xl font-bold text-gray-800">{lowStockCount} Itens</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4 border-l-4 border-teal-500">
                    <div className="p-3 bg-teal-50 rounded-full text-teal-500">
                        <TruckIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Pedidos em Trânsito</p>
                        <p className="text-xl font-bold text-gray-800">3</p>
                    </div>
                </div>
            </div>

            {/* Controles e Filtros */}
            <div className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-96">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Buscar por nome, SKU ou categoria..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-teal-500 focus:border-teal-500 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium text-sm">
                        <TruckIcon className="w-4 h-4" />
                        <span>Fornecedores</span>
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-[#0B4F6C] text-white rounded-lg hover:bg-[#093e54] font-medium text-sm shadow-md">
                        <PlusIcon className="w-4 h-4" />
                        <span>Novo Item</span>
                    </button>
                </div>
            </div>

            {/* Tabela de Itens */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                                <th className="p-4 font-bold">Item / SKU</th>
                                <th className="p-4 font-bold">Categoria</th>
                                <th className="p-4 font-bold text-center">Qtd.</th>
                                <th className="p-4 font-bold">Custo Un.</th>
                                <th className="p-4 font-bold">Status</th>
                                <th className="p-4 font-bold text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase())).map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4">
                                        <p className="font-bold text-gray-800">{item.name}</p>
                                        <p className="text-xs text-gray-500 font-mono">{item.sku}</p>
                                    </td>
                                    <td className="p-4 text-gray-600">{item.category}</td>
                                    <td className="p-4 text-center">
                                        <span className="font-bold text-gray-800 block">{item.quantity}</span>
                                        <span className="text-[10px] text-gray-400">Min: {item.minLevel}</span>
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        R$ {item.unitCost.toFixed(2)}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                                            item.status === 'Disponível' ? 'bg-green-100 text-green-700' :
                                            item.status === 'Baixo' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-red-100 text-red-700 animate-pulse'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-teal-600 hover:text-teal-800 font-bold text-xs border border-teal-200 px-3 py-1 rounded hover:bg-teal-50">Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InventoryTab;