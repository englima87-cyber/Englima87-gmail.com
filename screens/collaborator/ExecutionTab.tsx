
import React, { useState } from 'react';
import CameraIcon from '../../components/icons/CameraIcon';
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon';
import PlusIcon from '../../components/icons/PlusIcon';

type ExecutionSubTab = 'Check-in' | 'Execução' | 'Comunicação';

interface ChecklistItem {
    label: string;
    checked: boolean;
    issue?: boolean;
}

interface Material {
    id: number;
    label: string;
    unitPrice: number;
    quantity: number;
}

const initialChecklist: ChecklistItem[] = [
    { label: "Verificação do Local de Instalação", checked: true },
    { label: "Fixação das Unidades (Int/Ext)", checked: true },
    { label: "Conexão das Tubulações", checked: true },
    { label: "Verificação de Conexões Elétricas", checked: true },
    { label: "Teste de Pressão e Vácuo", checked: false },
    { label: "Teste Funcional Completo", checked: false, issue: true },
];

const initialMaterials: Material[] = [
    { id: 1, label: "Cabo Elétrico PP 3x2,5mm (m)", unitPrice: 15.50, quantity: 5 },
    { id: 2, label: "Suporte Condensadora 400mm", unitPrice: 45.00, quantity: 1 },
    { id: 3, label: "Fita PVC Branca (un)", unitPrice: 8.00, quantity: 0 },
    { id: 4, label: "Gás R410A (kg)", unitPrice: 120.00, quantity: 0 },
];

const ExecutionTab: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ExecutionSubTab>('Execução');
    const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
    const [materials, setMaterials] = useState<Material[]>(initialMaterials);
    
    // Estados para o Modal de Adicionar Material
    const [isAddMaterialOpen, setIsAddMaterialOpen] = useState(false);
    const [newMaterialName, setNewMaterialName] = useState('');
    const [newMaterialPrice, setNewMaterialPrice] = useState('');

    const tabs: ExecutionSubTab[] = ['Check-in', 'Execução', 'Comunicação'];

    const toggleChecklistItem = (index: number) => {
        const newChecklist = [...checklist];
        newChecklist[index].checked = !newChecklist[index].checked;
        setChecklist(newChecklist);
    };

    // Simulação de função para registrar no Firestore
    const logMaterialUsageToFirestore = (materialId: number, name: string, quantity: number, unitCost: number) => {
        const record = {
            collection: 'os_materiais',
            action: 'update_or_create',
            payload: {
                service_order_id: 'OS-4528', // Vínculo com a OS atual
                material_id: materialId,
                material_name: name,
                quantity_used: quantity,
                unit_cost: unitCost,
                total_cost: quantity * unitCost,
                timestamp: new Date().toISOString()
            }
        };
        console.log("🔥 [Firestore Mock] Registro em 'os_materiais':", record);
    };

    const updateQuantity = (id: number, delta: number) => {
        setMaterials(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(0, item.quantity + delta);
                if (newQuantity !== item.quantity) {
                    // Registra a alteração simulando envio ao Firestore com ID da OS
                    logMaterialUsageToFirestore(item.id, item.label, newQuantity, item.unitPrice);
                }
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const handleAddMaterial = () => {
        if (!newMaterialName || !newMaterialPrice) return;

        const price = parseFloat(newMaterialPrice.replace(',', '.'));
        if (isNaN(price)) return;

        const newId = Math.max(...materials.map(m => m.id), 0) + 1;
        const initialQty = 1;
        
        const newMaterial: Material = {
            id: newId,
            label: newMaterialName,
            unitPrice: price,
            quantity: initialQty
        };

        // Registra o novo material usado no Firestore
        logMaterialUsageToFirestore(newId, newMaterialName, initialQty, price);

        setMaterials([...materials, newMaterial]);
        setNewMaterialName('');
        setNewMaterialPrice('');
        setIsAddMaterialOpen(false);
    };

    const handleFinalizeService = () => {
        // Gera o relatório de consumo com ID, Quantidade e Custo Unitário para cálculo de lucro da OS
        const materialUsageReport = materials
            .filter(m => m.quantity > 0)
            .map(m => ({
                serviceOrderId: 'OS-4528',
                materialId: m.id,
                name: m.label,
                quantityUsed: m.quantity,
                unitCost: m.unitPrice,
                totalCost: m.quantity * m.unitPrice
            }));

        const totalServiceMaterialCost = materialUsageReport.reduce((acc, item) => acc + item.totalCost, 0);

        console.log(">>> REGISTRO DE CUSTOS DA OS (Consolidado) <<<");
        console.log(materialUsageReport);
        
        alert(`Serviço Finalizado!\n\nDados de materiais sincronizados com a coleção 'os_materiais' para a OS-4528.\nCusto total de insumos: R$ ${totalServiceMaterialCost.toFixed(2)}`);
    };

    const totalMaterialCost = materials.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);

    return (
        <div className="bg-[#0B4F6C] min-h-[calc(100vh-64px)] rounded-t-[2.5rem] text-white shadow-[0_-10px_40px_rgba(0,0,0,0.3)] mt-4 relative z-10">
            <header className="bg-[#0f4157] rounded-t-[2.5rem] p-6 sticky top-[64px] z-10 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <button className="text-white/80 hover:text-white transition-colors">
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <h1 className="font-bold text-lg tracking-wide">Execução de Serviço</h1>
                    <div className="w-6"></div>
                </div>
                <nav className="flex justify-between bg-[#092b3a] rounded-xl p-1">
                    {tabs.map(tab => (
                        <button 
                            key={tab} 
                            onClick={() => setActiveTab(tab)} 
                            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all duration-300 ${activeTab === tab ? 'bg-[#14B8A6] text-white shadow-md' : 'text-white/50 hover:text-white/80'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </header>
            
            <div className="p-6 space-y-6 pb-24">
                {/* Checklist Section */}
                <div className="bg-[#12344D] p-5 rounded-2xl border border-white/5 shadow-lg">
                    <h3 className="font-bold mb-4 text-lg text-[#14B8A6] flex items-center">
                        <span className="w-2 h-2 bg-[#14B8A6] rounded-full mr-2"></span>
                        Checklist Padrão
                    </h3>
                    <div className="space-y-4">
                        {checklist.map((item, index) => (
                             <div key={index} className="flex items-start justify-between group">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <div 
                                        onClick={() => toggleChecklistItem(index)}
                                        className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${item.checked ? 'bg-[#14B8A6] border-[#14B8A6]' : 'border-gray-400 bg-transparent'}`}
                                    >
                                        {item.checked && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                    </div>
                                    <span className={`text-sm ${item.checked ? 'text-white font-medium' : 'text-white/60'}`}>{item.label}</span>
                                </label>
                                <div className="flex items-center space-x-3">
                                    {item.issue && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                                    <button className="text-white/40 hover:text-white transition-colors">
                                        <CameraIcon className="w-5 h-5"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Materials Section */}
                <div className="bg-[#12344D] p-5 rounded-2xl border border-white/5 shadow-lg">
                     <div className="flex justify-between items-end mb-4">
                         <h3 className="font-bold text-lg text-[#14B8A6] flex items-center">
                            <span className="w-2 h-2 bg-[#14B8A6] rounded-full mr-2"></span>
                            Materiais Utilizados
                         </h3>
                         <div className="text-right">
                             <p className="text-xs text-white/50 uppercase tracking-wider">Total Estimado</p>
                             <p className="text-xl font-bold text-white">R$ {totalMaterialCost.toFixed(2).replace('.', ',')}</p>
                         </div>
                     </div>
                     
                     <div className="space-y-3">
                        {materials.map((item) => (
                             <div key={item.id} className="bg-[#0B4F6C]/50 p-3 rounded-xl border border-white/5">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-sm font-medium text-white">{item.label}</span>
                                    <span className="text-xs text-white/60">R$ {item.unitPrice.toFixed(2)}/un</span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center bg-[#092b3a] rounded-lg p-1">
                                        <button 
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="w-8 h-8 flex items-center justify-center bg-white/5 rounded hover:bg-white/10 transition-colors text-white"
                                        >
                                            -
                                        </button>
                                        <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="w-8 h-8 flex items-center justify-center bg-[#14B8A6] rounded hover:bg-[#0d9488] transition-colors text-white"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="text-sm font-bold text-[#14B8A6]">
                                        R$ {(item.quantity * item.unitPrice).toFixed(2).replace('.', ',')}
                                    </p>
                                </div>
                            </div>
                        ))}
                     </div>
                     
                     <button 
                        onClick={() => setIsAddMaterialOpen(true)}
                        className="mt-4 w-full py-3 border border-dashed border-white/30 rounded-lg text-white/50 text-sm font-semibold hover:bg-white/5 hover:text-white hover:border-white/50 transition-all flex items-center justify-center space-x-2"
                     >
                        <PlusIcon className="w-5 h-5" />
                        <span>Adicionar Material Extra</span>
                     </button>
                </div>

                <button 
                    onClick={handleFinalizeService}
                    className="w-full bg-[#14B8A6] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#0d9488] transition-all transform active:scale-95"
                >
                    Finalizar Tarefa e Assinar
                </button>
            </div>

            {/* Modal Adicionar Material */}
            {isAddMaterialOpen && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white text-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-fade-in-up">
                        <h3 className="text-xl font-bold text-[#0B4F6C] mb-4">Adicionar Material</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Nome do Item</label>
                                <input 
                                    type="text" 
                                    value={newMaterialName}
                                    onChange={(e) => setNewMaterialName(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-[#14B8A6] outline-none text-sm"
                                    placeholder="Ex: Tubo de Cobre 1/4"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Preço Unitário (R$)</label>
                                <input 
                                    type="number" 
                                    value={newMaterialPrice}
                                    onChange={(e) => setNewMaterialPrice(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-[#14B8A6] outline-none text-sm"
                                    placeholder="0,00"
                                />
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-8">
                            <button 
                                onClick={() => setIsAddMaterialOpen(false)}
                                className="flex-1 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleAddMaterial}
                                className="flex-1 py-3 rounded-xl font-bold text-white bg-[#14B8A6] hover:bg-[#0d9488] transition-colors shadow-lg"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExecutionTab;
