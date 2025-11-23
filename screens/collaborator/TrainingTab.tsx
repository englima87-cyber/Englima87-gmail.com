
import React from 'react';
import AcademicCapIcon from '../../components/icons/AcademicCapIcon';
import ShieldCheckIcon from '../../components/icons/ShieldCheckIcon';
import ExclamationTriangleIcon from '../../components/icons/ExclamationTriangleIcon';
import DocumentTextIcon from '../../components/icons/DocumentTextIcon';
import { Course, CertificationStatus } from '../../types';

// --- Mock Data Baseado na Lista Detalhada ---

// I. CERTIFICAÇÕES OBRIGATÓRIAS (Compliance)
const certificationsData: CertificationStatus[] = [
    { 
        id: 'cert-001', name: 'NR 35 - Trabalho em Altura', type: 'Obrigatório', status: 'Válido', 
        expiryDate: '2025-12-01', progress: 100, duration: '8h' 
    },
    { 
        id: 'cert-002', name: 'NR 10 - Segurança em Eletricidade', type: 'Obrigatório', status: 'Expirando', 
        expiryDate: '2024-11-20', progress: 100, duration: '40h' // Vence em breve -> Alerta
    },
    {
        id: 'cert-003', name: 'Código de Conduta e Ética', type: 'Obrigatório', status: 'Válido',
        expiryDate: '2026-01-15', progress: 100, duration: '2h'
    }
];

// II. CURSOS DE APERFEIÇOAMENTO (Desenvolvimento)
const skillsCourses: Course[] = [
    { 
        id: 'skill-001', title: 'Diagnóstico em Sistemas Inverter', description: 'Análise de placas e falhas em compressores.', 
        duration: '16h', progress: 60, status: 'Em Andamento', thumbnail: 'https://i.imgur.com/5Q5Q5Q5.png' // Placeholder
    },
    { 
        id: 'skill-002', title: 'Instalação e Manutenção VRF', description: 'Dimensionamento e instalação de multi-split.', 
        duration: '24h', progress: 0, status: 'Disponível', thumbnail: 'https://i.imgur.com/6R6R6R6.png' 
    },
    { 
        id: 'skill-003', title: 'Técnicas de Brasagem', description: 'Solda e estanqueidade com nitrogênio.', 
        duration: '12h', progress: 100, status: 'Concluído', thumbnail: 'https://i.imgur.com/7S7S7S7.png'
    },
    {
        id: 'skill-004', title: 'Boas Práticas de PMOC', description: 'Legislação e normas ABNT para manutenção.',
        duration: '4h', progress: 30, status: 'Em Andamento', thumbnail: '#'
    }
];

const CertificationCard: React.FC<{ cert: CertificationStatus }> = ({ cert }) => {
    const isExpiring = cert.status === 'Expirando' || cert.status === 'Vencido';
    const daysToExpiry = Math.ceil((new Date(cert.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div className={`relative p-5 rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${isExpiring ? 'bg-yellow-50 border-yellow-200' : 'bg-white'}`}>
            {isExpiring && <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-400 blur-2xl opacity-20 rounded-full -mr-8 -mt-8"></div>}
            
            <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${isExpiring ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {isExpiring ? <ExclamationTriangleIcon className="w-6 h-6" /> : <ShieldCheckIcon className="w-6 h-6" />}
                    </div>
                    <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isExpiring ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                            {cert.status === 'Expirando' ? 'Renovação Necessária' : 'Certificado Válido'}
                        </span>
                        <h3 className="font-bold text-gray-800 text-base mt-1 leading-tight">{cert.name}</h3>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-end relative z-10">
                <div className="text-xs text-gray-500">
                    <p>Vence em: <span className="font-semibold text-gray-700">{cert.expiryDate.split('-').reverse().join('/')}</span></p>
                    {isExpiring && <p className="text-red-500 font-bold mt-1">Restam {daysToExpiry} dias</p>}
                </div>
                <button className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-sm ${isExpiring ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                    {isExpiring ? 'Renovar Agora' : 'Ver Certificado'}
                </button>
            </div>
        </div>
    );
};

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    const isCompleted = course.progress === 100;
    const isInProgress = course.progress > 0 && course.progress < 100;

    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
            <div>
                <div className="flex justify-between items-start mb-3">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                        <DocumentTextIcon className="w-6 h-6" />
                    </div>
                    {isCompleted && <span className="text-green-500"><ShieldCheckIcon className="w-5 h-5" /></span>}
                </div>
                <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">{course.title}</h4>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{course.description}</p>
            </div>

            <div>
                <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase mb-1">
                    <span>{course.duration}</span>
                    <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                    <div 
                        className={`h-1.5 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`} 
                        style={{ width: `${course.progress}%` }}
                    ></div>
                </div>
                <button className={`w-full py-2 rounded-lg text-xs font-bold transition-colors ${isInProgress ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}`}>
                    {isInProgress ? 'Continuar' : isCompleted ? 'Revisar' : 'Iniciar'}
                </button>
            </div>
        </div>
    );
};

const TrainingTab: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-[calc(100vh-64px)] rounded-t-[2.5rem] p-6 space-y-8 shadow-inner mt-4 pb-24">
            
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-[#0B4F6C]">Universidade ServicePro</h2>
                    <p className="text-sm text-gray-500">Capacitação e Compliance</p>
                </div>
                <div className="bg-[#0B4F6C] p-2 rounded-full text-white">
                    <AcademicCapIcon className="w-6 h-6" />
                </div>
            </div>

            {/* Certificações Obrigatórias */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
                        Obrigatórios & Compliance
                    </h3>
                </div>
                <div className="space-y-4">
                    {certificationsData.map(cert => (
                        <CertificationCard key={cert.id} cert={cert} />
                    ))}
                </div>
            </section>

            {/* Cursos de Aperfeiçoamento */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wider flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                        Aperfeiçoamento Técnico
                    </h3>
                    <button className="text-xs font-bold text-[#14B8A6] hover:underline">Ver Todos</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {skillsCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </section>

            {/* Banner RH */}
            <div className="bg-gradient-to-r from-[#0B4F6C] to-blue-900 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h4 className="font-bold text-lg mb-1">Plano de Carreira</h4>
                    <p className="text-xs text-blue-100 mb-3 max-w-[80%]">
                        Conclua os cursos de Inverter e VRF para se tornar elegível à promoção para Técnico Nível 2.
                    </p>
                    <button className="bg-white text-[#0B4F6C] px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors">
                        Saiba Mais
                    </button>
                </div>
                <AcademicCapIcon className="absolute -bottom-4 -right-4 w-24 h-24 text-white opacity-10" />
            </div>
        </div>
    );
};

export default TrainingTab;
