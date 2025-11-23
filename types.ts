
export interface TeamPerformanceData {
  name: string;
  performance: number;
}

export interface ServiceTypeData {
  name: string;
  value: number;
  color: string;
}

// --- I. SEGURANÇA E RECURSOS HUMANOS ---

export interface TimeBank {
    balance: number; // Saldo em horas (pode ser negativo)
    workedHoursMonth: number;
    overtime50: number;
    overtime100: number;
    negativeHours: number;
    lastUpdated: string;
}

export interface TimeRecord {
    id: string;
    type: 'Entrada' | 'Saída';
    timestamp: string;
    location: string;
    synced: boolean;
}

export interface Vacation {
    status: 'Acquisitivo' | 'Agendado' | 'Em Gozo' | 'Vencido';
    periodStart?: string;
    periodEnd?: string;
    daysAvailable: number;
}

export interface User {
    uid: string;
    name: string;
    email: string;
    role: 'manager' | 'collaborator' | 'client' | 'viewer';
    branchId: string; // filial_id: Para filtros de Múltiplas Filiais
    details?: string;
    img: string;
    active: boolean;
    activityStatus?: 'Ativo' | 'Férias' | 'Afastado' | 'Folga'; // Status operacional
    registrationId?: string; // Matrícula para Login
    phone?: string; // Contato
    password?: string; // Senha individual (Mock para protótipo)
    certifications?: { // Essencial para Alertas e Bloqueio
        nr35_expiry?: string; // ISO Date String
        nr10_expiry?: string; // ISO Date String
    };
    timeBank?: TimeBank; // Dados de Banco de Horas
    vacation?: Vacation; // Dados de Férias
}

export interface Payslip {
    id: string;
    collaboratorId: string; // Restrição de leitura (Security Rules)
    referenceMonth: string; // "2025-10"
    type: 'Mensal' | '13º Salário' | 'Férias' | 'Adiantamento';
    baseSalary: number;
    calculatedCommission: number;
    totalNet: number;
    pdfUrl: string;
}

export interface OperationalCost {
    id: string;
    type: 'depreciacao' | 'certificacao' | 'licenca';
    assetName: string;
    purchaseValue: number;
    dueDate: string; // Para Alertas Preditivos
}

// --- II. CLIENTES E CONTRATOS ---

export interface Contract {
    id: string;
    clientId: string;
    title: string;
    status: 'Ativo' | 'Vencido' | 'Pendente';
    startDate: string;
    endDate: string;
    recurringValue: number; // Para Fluxo de Caixa
    maintenanceFrequency: 'Mensal' | 'Bimestral' | 'Trimestral' | 'Semestral' | 'Anual'; // Para Cloud Function agendar OS
    pdfUrl: string;
    prerogatives: string[]; // Exclusões de escopo
}

export interface Equipment {
    id: string;
    name: string;
    brand: string;
    model: string;
    serialNumber: string;
    installationDate: string;
    lastMaintenance?: string;
    warrantyExpiration?: string; // Data de vencimento da garantia
}

export interface Client {
    id: string;
    name: string;
    img: string;
    active: boolean;
    branch: string; // filial_id
    contractStatus: 'ativo' | 'inativo' | 'pendente';
    contactPerson?: string;
    email?: string;
    phone?: string;
    address?: string;
    contracts?: Contract[];
    equipment?: Equipment[];
}

// --- III. LOGÍSTICA E PROCESSOS ---

export interface InventoryItem {
    id: number; // ou sku string
    sku: string; // Document ID
    name: string;
    category: string;
    quantity: number;
    minLevel: number; // nivel_minimo: Dispara Alerta
    unitCost: number; // custo_unitario: Para cálculo de Custo Real da OS
    status: 'Disponível' | 'Baixo' | 'Crítico';
}

export interface ProcedureStep {
    label: string;
    required: boolean;
}

export interface LaborEstimate {
    serviceType: string; // Ex: "INST_SPLIT_9K"
    estimatedHours: number; // Para KPI
    techniciansRequired: number;
}

export interface SystemAlert {
    id: string;
    type: 'warranty' | 'contract' | 'stock' | 'certification';
    message: string;
    severity: 'low' | 'medium' | 'high';
    date: string;
}

// --- IV. TRANSAÇÃO E OPERAÇÃO ---

export interface ServiceOrder {
    id: string;
    clientId: string;
    collaboratorId: string;
    status: 'pendente' | 'em_rota' | 'em_servico' | 'concluida';
    checkInTime?: string; // Timestamp
    checkOutTime?: string; // Timestamp
    realMaterialCost: number; // Calculado via baixa de estoque
    feedbackScore?: boolean; // Sim/Não
}

export interface FinancialTransaction {
    id: string;
    serviceOrderId?: string;
    type: 'receber' | 'pagar' | 'depreciacao';
    value: number;
    dueDate: string;
}

// --- V. TREINAMENTOS E AGENDAMENTO (NOVOS) ---

export interface CertificationStatus {
    id: string;
    name: string;
    type: 'Obrigatório';
    status: 'Válido' | 'Expirando' | 'Vencido';
    expiryDate: string;
    progress: number;
    duration: string;
}

export interface Course {
    id: string;
    title: string;
    description: string;
    duration: string;
    progress: number; // 0 a 100
    status: 'Disponível' | 'Em Andamento' | 'Concluído';
    thumbnail: string;
}

export interface SmartAssignment {
    technicianId: string;
    technicianName: string;
    matchScore: number; // % de adequação (IA)
    reason: string; // Ex: "Certificação VRF + Proximidade"
    distance: string;
}
