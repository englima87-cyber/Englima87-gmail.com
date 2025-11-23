
import React, { useState } from 'react';
import Logo from '../components/Logo';
import ISOCertificationIcon from '../components/icons/ISOCertificationIcon';
import InstallationIcon from '../components/icons/InstallationIcon';
import LeafIcon from '../components/icons/LeafIcon';
import CogIcon from '../components/icons/CogIcon';
import ClipboardDocumentCheckIcon from '../components/icons/ClipboardDocumentCheckIcon';
import PhoneIcon from '../components/icons/PhoneIcon';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import AIChatWidget from '../components/AIChatWidget';
import BriefcaseIcon from '../components/icons/BriefcaseIcon';

interface WebsiteScreenProps {
  onClientLogin: () => void;
  onCorporateAccess: () => void;
}

const Header: React.FC<{onOpenClientLogin: () => void, onCorporateAccess: () => void}> = ({ onOpenClientLogin, onCorporateAccess }) => (
  <header className="bg-[#0B4F6C] text-white sticky top-0 z-40 shadow-sm backdrop-blur-sm bg-opacity-95 h-14 flex items-center">
    <div className="max-w-6xl mx-auto px-4 w-full flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer flex-shrink-0" onClick={() => window.scrollTo(0,0)}>
            <Logo className="w-6 h-6" color="#14B8A6"/>
            <h1 className="text-base md:text-lg font-bold tracking-tight hidden xs:block">Service<span className="text-[#14B8A6]">Pro</span></h1>
        </div>
        
        <nav className="hidden md:flex space-x-5 text-xs font-medium items-center uppercase tracking-wide">
            <a href="#inicio" className="hover:text-[#14B8A6] transition-colors duration-200">Início</a>
            <a href="#qualidade" className="hover:text-[#14B8A6] transition-colors duration-200">Qualidade</a>
            <a href="#servicos" className="hover:text-[#14B8A6] transition-colors duration-200">Serviços</a>
        </nav>

        <div className="flex items-center space-x-2">
            <button 
                onClick={onCorporateAccess} 
                className="flex items-center gap-1.5 text-gray-300 hover:text-white text-[10px] font-semibold uppercase tracking-wider border border-white/20 px-2.5 py-1.5 rounded hover:bg-white/10 transition-all whitespace-nowrap"
            >
                <BriefcaseIcon className="w-3 h-3" />
                <span>Corporativo</span>
            </button>
            
            <button 
                onClick={onOpenClientLogin} 
                className="bg-[#14B8A6] hover:bg-[#0d9488] text-white px-3 py-1.5 rounded text-[10px] md:text-xs font-bold transition-all shadow-sm transform hover:scale-105 flex items-center gap-1.5 whitespace-nowrap"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <span>Área do Cliente</span>
            </button>
        </div>
    </div>
  </header>
);

const HeroSection: React.FC<{onScrollToQuote: () => void, onOpenChat: () => void}> = ({ onScrollToQuote, onOpenChat }) => (
  <section id="inicio" className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-12 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-6 items-center relative z-10">
          <div className="text-left space-y-4 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B4F6C] leading-tight">
                  Climatização de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14B8A6] to-teal-600">Alta Performance</span>.
              </h2>
              <p className="text-sm text-gray-600 max-w-md leading-relaxed">
                  Gestão certificada por padrões internacionais de qualidade. Controle total da manutenção dos seus ativos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center pt-2">
                  <button onClick={onScrollToQuote} className="w-full sm:w-auto bg-[#14B8A6] text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow hover:bg-[#0d9488] transition-all transform hover:-translate-y-0.5">
                      Solicitar Orçamento
                  </button>
                  
                  <div 
                    onClick={onOpenChat} 
                    className="group flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-full hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-gray-100"
                  >
                     <div className="relative">
                        <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-[#0B4F6C] to-[#14B8A6]">
                            <img 
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
                                alt="Sofia" 
                                className="w-full h-full rounded-full object-cover border border-white"
                            />
                        </div>
                        <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 border border-white rounded-full animate-pulse"></span>
                     </div>
                     <div className="text-left">
                        <p className="text-[#0B4F6C] font-bold text-xs group-hover:text-[#14B8A6]">Falar com Especialista</p>
                        <p className="text-gray-500 text-[9px]">Sofia (IA) • Online</p>
                     </div>
                  </div>
              </div>
          </div>
          <div className="relative hidden md:flex justify-center">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#14B8A6] to-blue-500 rounded-full blur-xl opacity-10"></div>
              <img src="https://i.imgur.com/8Q0jA1g.png" alt="App" className="relative z-10 w-full max-w-[240px] rounded-xl shadow-lg border-4 border-white transform rotate-[-1deg]" />
          </div>
      </div>
  </section>
);

const QualitySection: React.FC = () => (
    <section id="qualidade" className="bg-white py-6 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 md:mb-0">Certificações:</span>
            <div className="flex flex-wrap justify-center gap-6">
                {[
                    { icon: <ISOCertificationIcon className="w-5 h-5 text-[#0284c7]" />, title: "ISO 9001", desc: "Qualidade", link: "#iso9001" },
                    { icon: <LeafIcon className="w-5 h-5 text-[#16a34a]" />, title: "ISO 14001", desc: "Ambiental", link: "#iso14001" },
                    { icon: <ISOCertificationIcon className="w-5 h-5 text-[#ea580c]" />, title: "ISO 45001", desc: "Segurança", link: "#iso45001" }
                ].map((item, idx) => (
                    <a 
                        key={idx} 
                        href={item.link}
                        className="flex items-center space-x-2 group cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                        title={`Saiba mais sobre ${item.title}`}
                    >
                        <div className="p-1.5 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                            {item.icon}
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-bold text-gray-700 leading-none group-hover:text-[#0B4F6C]">{item.title}</p>
                            <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wide">{item.desc}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </section>
);

const ServiceCard: React.FC<{icon: React.ReactNode, title: string, subtitle: string, desc: string, buttonText: string}> = ({icon, title, subtitle, desc, buttonText}) => (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all flex flex-col items-center text-center border border-gray-100 h-full">
        <div className="mb-2 p-2 bg-gray-50 rounded-lg">
            {icon}
        </div>
        <h3 className="text-sm font-bold text-[#0B4F6C] leading-tight">{title}</h3>
        <h4 className="text-xs font-medium text-[#14B8A6] mb-2">{subtitle}</h4>
        <p className="text-gray-500 text-[10px] mb-3 flex-grow leading-snug px-1">{desc}</p>
        <button className="w-full bg-white text-[#14B8A6] border border-[#14B8A6] px-3 py-1.5 rounded-md font-bold text-[10px] hover:bg-[#14B8A6] hover:text-white transition-all uppercase">
            {buttonText}
        </button>
    </div>
);

const ServicesSection: React.FC = () => (
    <section id="servicos" className="py-10 px-4 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto">
             <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold text-[#0B4F6C] mb-2">Serviços Especializados</h2>
                <p className="text-gray-600 text-xs">Soluções completas para climatização.</p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ServiceCard icon={<InstallationIcon className="w-6 h-6 text-[#0B4F6C]"/>} title="Instalação" subtitle="de Sistemas" desc="Garantia de fábrica e rigor técnico." buttonText="Saiba Mais"/>
                <ServiceCard icon={<LeafIcon className="w-6 h-6 text-[#14B8A6]"/>} title="Manutenção" subtitle="Preventiva" desc="Qualidade do ar e economia." buttonText="Ver Planos"/>
                <ServiceCard icon={<CogIcon className="w-6 h-6 text-[#0B4F6C]"/>} title="Manutenção" subtitle="Corretiva" desc="Reparos ágeis com garantia." buttonText="Solicitar"/>
                <ServiceCard icon={<ClipboardDocumentCheckIcon className="w-6 h-6 text-[#14B8A6]"/>} title="Consultoria" subtitle="e Projetos" desc="Projetos personalizados." buttonText="Contato"/>
             </div>
        </div>
    </section>
);

const AboutAndClientsSection: React.FC = () => (
    <section id="sobre" className="bg-[#1e293b] py-10 px-4 text-white">
        <div className="max-w-5xl mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-end mb-6 border-b border-gray-700 pb-4 gap-4">
                <div>
                    <span className="text-[#14B8A6] font-bold text-[10px] tracking-wider uppercase block">Sobre a ServicePro</span>
                    <h2 className="text-2xl font-bold text-white">Nossa História</h2>
                </div>
                <div className="flex gap-2">
                    <span className="text-xs text-gray-400 font-medium">Missão • Visão • Valores</span>
                </div>
             </div>
             <div className="grid md:grid-cols-2 gap-8">
                <div className="text-xs text-gray-300 leading-relaxed space-y-2">
                    <p>Fundada para elevar o padrão do mercado, unimos expertise técnica e tecnologia.</p>
                    <p>Transparência é nossa chave. Nossa plataforma permite acompanhar cada passo.</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h3 className="text-xs font-bold text-white mb-2 flex items-center"><span className="bg-[#14B8A6] w-1 h-3 mr-2 rounded-full"></span>Depoimentos</h3>
                    <div className="flex items-start space-x-3">
                         <img src="https://i.pravatar.cc/150?img=5" alt="Cliente" className="w-8 h-8 rounded-full border border-[#14B8A6]" />
                         <div>
                             <p className="text-gray-300 italic text-[10px] mb-1">"O acompanhamento pelo app é incrível."</p>
                             <p className="font-bold text-white text-[10px]">Renata Souza <span className="text-[#14B8A6] font-normal">- TechCorp</span></p>
                         </div>
                    </div>
                </div>
             </div>
        </div>
    </section>
);

const QuoteSection: React.FC<{id: string}> = ({ id }) => (
    <section id={id} className="py-10 px-4 bg-white">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-gray-100">
            <div className="md:w-5/12 p-6 bg-[#0B4F6C] text-white flex flex-col justify-center">
                <h2 className="text-xl font-bold mb-2">Orçamento Rápido</h2>
                <p className="text-blue-100 text-xs mb-4">Receba uma estimativa em minutos.</p>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs">
                        <PhoneIcon className="w-4 h-4 text-[#14B8A6]" />
                        <span>(11) 3456-7890</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                        <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                        <span>(11) 98888-1234</span>
                    </div>
                </div>
            </div>
            <div className="md:w-7/12 p-6 bg-gray-50">
                <form className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <input type="text" className="w-full px-3 py-2 rounded border border-gray-200 text-xs focus:ring-1 focus:ring-[#14B8A6] outline-none" placeholder="Nome" />
                        <input type="email" className="w-full px-3 py-2 rounded border border-gray-200 text-xs focus:ring-1 focus:ring-[#14B8A6] outline-none" placeholder="Email" />
                    </div>
                    <select className="w-full px-3 py-2 rounded border border-gray-200 text-xs text-gray-500 focus:ring-1 focus:ring-[#14B8A6] outline-none">
                        <option>Selecione o Serviço</option>
                        <option>Instalação</option>
                        <option>Manutenção</option>
                    </select>
                    <textarea className="w-full px-3 py-2 rounded border border-gray-200 text-xs focus:ring-1 focus:ring-[#14B8A6] outline-none h-16 resize-none" placeholder="Mensagem (Opcional)"></textarea>
                    <button type="button" className="w-full bg-[#0B4F6C] text-white font-bold py-2.5 rounded hover:bg-[#093e54] text-xs shadow">Solicitar Orçamento</button>
                </form>
            </div>
        </div>
    </section>
);

const WorkWithUsSection: React.FC = () => (
    <section className="py-10 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-center">
            <div className="order-2 md:order-1">
                <div className="inline-block bg-[#14B8A6]/10 text-[#14B8A6] font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wide mb-2">Carreiras</div>
                <h2 className="text-2xl font-extrabold text-[#0B4F6C] mb-2">Trabalhe Conosco</h2>
                <p className="text-gray-600 text-xs mb-4 leading-relaxed">
                    Oferecemos tecnologia de ponta com nosso App de **RH Digital**. Acesse holerites, benefícios e treinamentos.
                </p>
                <button className="bg-[#0B4F6C] text-white px-4 py-2 rounded font-bold hover:bg-[#093e54] transition-colors shadow text-xs">
                    Ver Vagas
                </button>
            </div>
            <div className="order-1 md:order-2 relative h-40 rounded-xl overflow-hidden shadow">
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Equipe" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0B4F6C] opacity-20"></div>
            </div>
        </div>
    </section>
);

const AppDownloadSection: React.FC = () => (
    <section className="bg-[#0B4F6C] py-8 px-4 text-center">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-2">Baixe o App</h2>
            <p className="text-blue-100 mb-4 text-xs">Gerencie tudo pelo celular.</p>
            <div className="flex justify-center gap-3">
                <button className="flex items-center bg-black text-white px-3 py-1.5 rounded hover:bg-gray-900 border border-gray-700 shadow">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/></svg>
                    <div className="text-left">
                        <div className="text-[8px] leading-none text-gray-400">Baixar na</div>
                        <div className="text-xs font-bold font-sans">App Store</div>
                    </div>
                </button>
                <button className="flex items-center bg-black text-white px-3 py-1.5 rounded hover:bg-gray-900 border border-gray-700 shadow">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                    <div className="text-left">
                        <div className="text-[8px] leading-none text-gray-400">DISPONÍVEL NO</div>
                        <div className="text-xs font-bold font-sans">Google Play</div>
                    </div>
                </button>
            </div>
        </div>
    </section>
);

const Footer: React.FC<{onCorporateAccess: () => void}> = ({ onCorporateAccess }) => (
    <footer className="bg-[#021821] text-white py-6 px-4 border-t border-gray-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
                 <Logo className="w-5 h-5" color="gray" />
                 <div><span className="font-bold text-sm text-white">ServicePro</span></div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-[10px] text-gray-400 font-medium">
                <a href="#" className="hover:text-[#14B8A6]">Termos</a>
                <a href="#" className="hover:text-[#14B8A6]">Privacidade</a>
                <a href="#" className="hover:text-[#14B8A6]">Contato</a>
                <button onClick={onCorporateAccess} className="hover:text-[#14B8A6] flex items-center gap-1">
                    <BriefcaseIcon className="w-3 h-3" /> Corporativo
                </button>
            </div>
            <p className="text-[10px] text-gray-600">&copy; 2024 ServicePro.</p>
        </div>
    </footer>
);

const ClientLoginModal: React.FC<{isOpen: boolean, onClose: () => void, onLogin: () => void}> = ({isOpen, onClose, onLogin}) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === '123') {
            onLogin();
        } else {
            setError('Senha incorreta. Tente novamente.');
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-teal-100 text-[#14B8A6] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Acesso do Cliente</h2>
                    <p className="text-gray-500 mt-1">Digite sua senha de acesso para visualizar seus serviços.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => {setPassword(e.target.value); setError('')}}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#14B8A6] focus:border-transparent outline-none text-center text-lg tracking-widest"
                            placeholder="Senha"
                            autoFocus
                        />
                        {error && <p className="text-red-500 text-xs mt-2 text-center font-bold">{error}</p>}
                    </div>
                    <button type="submit" className="w-full bg-[#14B8A6] text-white font-bold py-3 rounded-xl hover:bg-[#0d9488] transition-colors shadow-lg">
                        Entrar
                    </button>
                </form>
                
                <p className="text-center mt-6 text-xs text-gray-400">
                    Não tem senha? Entre em contato com o suporte.
                </p>
            </div>
        </div>
    );
}

const WebsiteScreen: React.FC<WebsiteScreenProps> = ({ onClientLogin, onCorporateAccess }) => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const scrollToQuote = () => {
        const element = document.getElementById('orcamento');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-[#14B8A6] selection:text-white relative">
      <Header onOpenClientLogin={() => setIsLoginModalOpen(true)} onCorporateAccess={onCorporateAccess} />
      <main>
        <HeroSection onScrollToQuote={scrollToQuote} onOpenChat={() => setIsChatOpen(true)} />
        <QualitySection />
        <ServicesSection />
        <WorkWithUsSection />
        <AboutAndClientsSection />
        <QuoteSection id="orcamento" />
        <AppDownloadSection />
      </main>
      <Footer onCorporateAccess={onCorporateAccess} />
      
      {!isChatOpen && (
        <button onClick={() => setIsChatOpen(true)} className="fixed bottom-8 right-8 z-50 group transition-transform hover:scale-105 focus:outline-none">
            <div className="relative">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full p-1 bg-gradient-to-tr from-[#0B4F6C] to-[#14B8A6] shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="Sofia Especialista" className="w-full h-full rounded-full object-cover border-2 border-white" />
                </div>
                <span className="absolute bottom-1 right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
            </div>
        </button>
      )}
      
      <AIChatWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} onNavigateToQuote={scrollToQuote} />
      <ClientLoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={onClientLogin} />
    </div>
  );
};

export default WebsiteScreen;
