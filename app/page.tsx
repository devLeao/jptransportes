'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: '01',
    title: 'Locação de Vans e Ônibus',
    subtitle: 'Frota disponível para empresas, eventos e viagens.',
    description:
      'Locação de veículos para deslocamentos pontuais, fretamento, excursões e operações completas de transporte com conforto e segurança.',
    photos: [
      '/servicos/locacao-1.jpg',
      '/servicos/locacao-2.jpg',
      '/servicos/locacao-3.jpg',
    ],
    items: [
      'Vans para grupos menores',
      'Ônibus para viagens e excursões',
      'Atendimento para empresas e eventos',
      'Conforto, segurança e pontualidade',
    ],
  },
  {
    id: '02',
    title: 'Excursões e Passeios',
    subtitle: 'Experiências organizadas com mais conforto.',
    description:
      'Transporte para turismo, passeios e viagens em grupo com organização, comodidade e apoio para diferentes roteiros.',
    photos: [
      '/servicos/excursoes-1.jpg',
      '/servicos/excursoes-2.jpg',
      '/servicos/excursoes-3.jpg',
    ],
    items: [
      'Passeios turísticos',
      'Viagens bate-volta',
      'Grupos fechados e excursões',
      'Roteiros personalizados',
    ],
  },
  {
    id: '03',
    title: 'Transfer para Aeroportos',
    subtitle: 'Agilidade do embarque ao destino.',
    description:
      'Serviço de transfer com carro e van para aeroportos, com foco em pontualidade, praticidade e uma experiência mais tranquila.',
    photos: [
      '/servicos/aeroporto-1.mp4',
      '/servicos/aeroporto-2.jpg',
      '/servicos/aeroporto-3.jpg',
    ],
    items: [
      'Transfer individual e em grupo',
      'Carros e vans',
      'Atendimento executivo',
      'Embarque e desembarque com segurança',
    ],
  },
  {
    id: '04',
    title: 'Eventos e Viagens em Grupo',
    subtitle: 'Logística pensada para grandes deslocamentos.',
    description:
      'Soluções para shows, casamentos, eventos corporativos, grupos religiosos, confraternizações e viagens especiais.',
    photos: [
      '/servicos/eventos-1.jpg',
      '/servicos/eventos-2.jpg',
      '/servicos/eventos-3.jpg',
    ],
    items: [
      'Eventos corporativos e sociais',
      'Shows e viagens em grupo',
      'Transporte para grupos fechados',
      'Planejamento logístico personalizado',
    ],
  },
  {
    id: '05',
    title: 'Transporte Escolar e Empresarial',
    subtitle: 'Rotina com responsabilidade e organização.',
    description:
      'Operações recorrentes com foco em confiança, segurança e compromisso com horários para empresas e instituições.',
    photos: [
      '/servicos/escolar-1.mp4',
      '/servicos/escolar-2.jpg',
      '/servicos/escolar-3.jpg',
    ],
    items: [
      'Fretamento escolar',
      'Fretamento empresarial',
      'Rotas organizadas',
      'Compromisso com horários',
    ],
  },
  {
    id: '06',
    title: 'Transporte Executivo',
    subtitle: 'Atendimento mais sofisticado para clientes exigentes.',
    description:
      'Uma proposta voltada para executivos, empresas e clientes que valorizam discrição, conforto e alto padrão no atendimento.',
    photos: [
      '/servicos/executivo-1.mp4',
      '/servicos/executivo-2.mp4',
      '/servicos/executivo-3.jpg',
    ],
    items: [
      'Atendimento premium',
      'Conforto e discrição',
      'Ideal para reuniões, aeroportos e eventos',
      'Experiência refinada de transporte',
    ],
  },
];

const fleet = [
  {
    name: 'Van Executiva',
    category: 'Executivo',
    image: '/servicos/van-executiva.jpg',
    capacity: 'Até 15 passageiros',
    description:
      'Ideal para transfers, viagens curtas, atendimento executivo e grupos menores com mais conforto.',
  },
  {
    name: 'Micro-ônibus',
    category: 'Grupo',
    image: '/servicos/micro-onibus.jpg',
    capacity: 'Até 30 passageiros',
    description:
      'Ótima opção para eventos, excursões e operações de transporte com grupos médios.',
  },
  {
    name: 'Ônibus de Viagem',
    category: 'Turismo',
    image: '/servicos/onibus-viagem.jpg',
    capacity: 'Até 46 passageiros',
    description:
      'Perfeito para excursões, turismo, fretamento e viagens em grupo com mais estrutura.',
  },
  {
    name: 'Carro Executivo',
    category: 'Premium',
    image: '/frota/carro-executivo.jpg',
    capacity: 'Até 4 passageiros',
    description:
      'Atendimento discreto e sofisticado para executivos, aeroportos e deslocamentos privativos.',
  },
];

export default function Home() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [activeService, setActiveService] = useState(0);
  const [activePhoto, setActivePhoto] = useState(0);

  const currentService = useMemo(() => services[activeService], [activeService]);

  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-animate',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.95, stagger: 0.1, ease: 'power3.out' }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setActivePhoto(0);
  }, [activeService]);

  useEffect(() => {
    const totalPhotos = currentService.photos.length;

    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % totalPhotos);
    }, 3800);

    return () => clearInterval(interval);
  }, [currentService.photos]);

  const nextService = () => {
    setActiveService((prev) => (prev + 1) % services.length);
    setActivePhoto(0);
  };

  const prevService = () => {
    setActiveService((prev) => (prev - 1 + services.length) % services.length);
    setActivePhoto(0);
  };

  return (
    <div
      ref={pageRef}
      className="relative bg-white dark:bg-zinc-950 transition-colors duration-500"
    >
      <Navbar />

      <section
        id="inicio"
        className="relative min-h-[100svh] md:min-h-screen overflow-hidden flex items-center pt-20 md:pt-20"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-black/55 dark:bg-black/65 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/75 via-black/45 to-black/30 dark:from-black/90 dark:via-black/70 dark:to-black/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
          <h2 className="text-[34vw] md:text-[20vw] font-black text-white/[0.04] leading-none uppercase tracking-tighter italic">
            JP
          </h2>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center py-4 md:py-10">
            <div className="hero-animate flex items-center justify-center gap-3 mb-4 md:mb-5">
              <div className="w-8 md:w-12 h-[3px] bg-red-700" />
              <span className="text-red-300 dark:text-red-400 text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em]">
                BH & Região
              </span>
              <div className="w-8 md:w-12 h-[3px] bg-red-700" />
            </div>

            <img
              src="/logobranca.png"
              alt="JP Transportes e Viagens"
              className="hero-animate mx-auto w-[92px] sm:w-[110px] md:w-[155px] object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)] mb-4 md:mb-6"
            />

            <h1 className="hero-animate text-[2rem] leading-[0.9] sm:text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter">
              Transporte,
              <br />
              conforto e
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-200 dark:from-red-500 dark:to-red-300">
                confiança.
              </span>
            </h1>

            <p className="hero-animate text-white/80 text-[13px] sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium mt-4 md:mt-6">
              Soluções em viagens, fretamento, transfers, eventos e transporte executivo
              com a experiência que a JP entrega em cada trajeto.
            </p>

            <div className="hero-animate flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 md:gap-5 pt-5 md:pt-7">
              <a
                href="#contato"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-bold px-7 py-3.5 md:px-10 md:py-5 rounded-xl md:rounded-sm transition-all shadow-2xl shadow-red-900/40 uppercase text-[11px] tracking-widest active:scale-95"
              >
                Solicitar orçamento
              </a>

              <a
                href="#frota"
                className="group inline-flex items-center justify-center gap-4 text-white font-bold text-[11px] uppercase tracking-widest"
              >
                <span className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  →
                </span>
                Ver frota
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="solucoes"
        className="relative py-20 md:py-32 bg-white dark:bg-zinc-950 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-zinc-900/10 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 md:mb-20 gap-8">
            <div className="max-w-2xl text-left relative">
              <h2 className="text-sm font-black text-red-700 uppercase tracking-[0.3em] mb-4">
                O que fazemos
              </h2>
              <p className="text-3xl sm:text-5xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-[0.95]">
                Soluções completas em <br />
                <span className="text-zinc-400">logística executiva</span>
              </p>
            </div>

            <p className="text-zinc-500 dark:text-zinc-400 max-w-md text-sm md:text-base font-medium border-l-2 border-red-700 pl-5 leading-relaxed">
              Transporte inteligente projetado para quem valoriza segurança, organização e
              uma boa experiência.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <div className="group relative bg-white/95 dark:bg-zinc-900/50 p-8 md:p-12 border border-zinc-100 dark:border-zinc-800 hover:border-red-700 dark:hover:border-red-700 transition-all duration-500 shadow-sm hover:shadow-2xl rounded-[24px]">
              <div className="text-red-700 mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 origin-left inline-block">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="2"></line><line x1="15" y1="22" x2="15" y2="2"></line></svg>
              </div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase mb-4 tracking-tight">
                Corporativo
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                Logística para empresas com foco em pontualidade, organização e alto padrão de atendimento.
              </p>
            </div>

            <div className="group relative bg-white/95 dark:bg-zinc-900/50 p-8 md:p-12 border border-zinc-100 dark:border-zinc-800 hover:border-red-700 dark:hover:border-red-700 transition-all duration-500 shadow-sm hover:shadow-2xl rounded-[24px]">
              <div className="text-red-700 mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 origin-left inline-block">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase mb-4 tracking-tight">
                Artistas & Eventos
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                Transporte confortável e bem planejado para eventos, produções, shows e deslocamentos especiais.
              </p>
            </div>

            <div className="group relative bg-white/95 dark:bg-zinc-900/50 p-8 md:p-12 border border-zinc-100 dark:border-zinc-800 hover:border-red-700 dark:hover:border-red-700 transition-all duration-500 shadow-sm hover:shadow-2xl rounded-[24px]">
              <div className="text-red-700 mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500 origin-left inline-block">
                <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"></path></svg>
              </div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase mb-4 tracking-tight">
                Turismo VIP
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                Viagens de lazer e negócios com estrutura, conforto e um padrão mais premium de atendimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="servicos"
        className="relative py-20 md:py-28 bg-white dark:bg-zinc-950 overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-14">
            <div className="max-w-2xl">
              <h2 className="text-sm font-black text-red-700 uppercase tracking-[0.3em] mb-4">
                Serviços
              </h2>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-[0.95]">
                Mais destaque visual para cada atendimento
              </h3>
            </div>

            <p className="max-w-md text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-medium border-l-2 border-red-700 pl-5">
              A imagem vira protagonista e o conteúdo entra de forma leve, deixando o serviço muito mais bonito de explorar.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_0.55fr] gap-6 md:gap-8 items-stretch">
            <div className="relative min-h-[520px] sm:min-h-[620px] md:min-h-[720px] rounded-[28px] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-black">
              {currentService.photos.map((photo, index) => {
                const isVideo =
                  photo.endsWith('.mp4') ||
                  photo.endsWith('.webm') ||
                  photo.endsWith('.ogg');

                return (
                  <div
                    key={`${currentService.id}-${photo}-${index}`}
                    className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out ${
                      activePhoto === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    {isVideo ? (
                      <video
                        src={photo}
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={photo}
                        alt={currentService.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                );
              })}

              <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-transparent to-black/18 pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-28 md:h-44 bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-28 sm:h-32 md:h-72 bg-gradient-to-t from-black/90 via-black/55 to-transparent pointer-events-none" />

              <div className="relative z-20 flex h-full flex-col justify-between p-3 sm:p-7 md:p-12">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="max-w-4xl">
                    <span className="text-white/75 text-[11px] sm:text-sm md:text-base font-black tracking-[0.35em] uppercase">
                      {currentService.id} / 06
                    </span>

                    <div className="w-14 md:w-16 h-[3px] bg-red-700 mt-3 md:mt-5 mb-3 md:mb-5" />

                    <h4 className="text-[1.5rem] leading-[0.95] sm:text-4xl md:text-6xl font-black text-white uppercase tracking-tighter max-w-5xl">
                      {currentService.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={prevService}
                      className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/20 text-white hover:bg-white hover:text-black transition-all active:scale-95 touch-manipulation"
                      aria-label="Serviço anterior"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={nextService}
                      className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/20 text-white hover:bg-white hover:text-black transition-all active:scale-95 touch-manipulation"
                      aria-label="Próximo serviço"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className="w-full">
                  <div className="max-w-3xl rounded-[18px] bg-gradient-to-t from-black/88 via-black/62 to-transparent p-2.5 sm:p-5 md:p-6">
                    <p className="text-red-400 font-bold uppercase tracking-[0.16em] md:tracking-[0.22em] text-[10px] sm:text-[11px] md:text-sm mb-2 md:mb-4">
                      {currentService.subtitle}
                    </p>

                    <p className="text-white/90 text-[11px] sm:text-sm md:text-lg leading-relaxed max-w-3xl line-clamp-3 sm:line-clamp-none">
                      {currentService.description}
                    </p>

                    <div className="mt-3 md:mt-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-5">
                      <div className="flex items-center gap-3">
                        {currentService.photos.map((_, index) => (
                          <button
                            type="button"
                            key={`${currentService.id}-dot-${index}`}
                            onClick={() => setActivePhoto(index)}
                            className={`h-2.5 rounded-full transition-all active:scale-95 touch-manipulation ${
                              activePhoto === index
                                ? 'w-10 bg-red-600'
                                : 'w-2.5 bg-white/45 hover:bg-white/75'
                            }`}
                            aria-label={`Foto ${index + 1}`}
                          />
                        ))}
                      </div>

                      <a
                        href="#contato"
                        className="inline-flex w-full sm:w-auto items-center justify-center bg-red-700 hover:bg-red-800 text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-sm transition-all shadow-2xl shadow-red-900/40 uppercase text-[11px] tracking-widest active:scale-95"
                      >
                        Solicitar orçamento
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50/95 dark:bg-zinc-900/50 p-5 sm:p-6 md:p-8 flex flex-col justify-between backdrop-blur-sm">
              <div>
                <span className="text-zinc-500 dark:text-white/60 text-[11px] font-black uppercase tracking-[0.35em] mb-6 block">
                  Detalhes do serviço
                </span>

                <ul className="space-y-4">
                  {currentService.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-4 text-zinc-700 dark:text-white/90 text-sm md:text-base leading-relaxed border-b border-zinc-200 dark:border-white/10 pb-4"
                    >
                      <span className="mt-2 w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3 mt-8 md:mt-10">
                {services.map((service, index) => (
                  <button
                    type="button"
                    key={service.id}
                    onClick={() => {
                      setActiveService(index);
                      setActivePhoto(0);
                    }}
                    className={`text-left rounded-2xl border px-4 py-4 transition-all active:scale-[0.99] touch-manipulation ${
                      activeService === index
                        ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-black dark:border-white'
                        : 'bg-white dark:bg-white/5 text-zinc-800 dark:text-white border-zinc-200 dark:border-white/10 hover:border-red-700'
                    }`}
                  >
                    <span className="block text-[10px] font-black uppercase tracking-[0.25em] opacity-70">
                      {service.id}
                    </span>
                    <span className="block mt-2 text-xs md:text-sm font-bold leading-tight">
                      {service.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="frota"
        className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#5a0f16] via-[#7b1118] to-[#2a0609] dark:from-zinc-950 dark:via-[#22060a] dark:to-black"
      >
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-white/5 dark:bg-red-700/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[35%] h-[35%] bg-black/25 blur-[140px] rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-14">
            <div className="max-w-2xl">
              <h2 className="text-sm font-black text-white uppercase tracking-[0.3em] mb-4">
                Frota
              </h2>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.95]">
                Veículos disponíveis para cada necessidade
              </h3>
            </div>

            <p className="max-w-md text-white/80 text-sm md:text-base leading-relaxed font-medium border-l-2 border-white pl-5">
              Uma apresentação mais forte da estrutura da empresa para reforçar segurança, confiança e capacidade de atendimento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {fleet.map((vehicle) => (
              <article
                key={vehicle.name}
                className="overflow-hidden rounded-[24px] border border-white/10 bg-white/95 dark:bg-zinc-950/85 backdrop-blur-sm shadow-2xl"
              >
                <div className="relative h-60 md:h-64 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-red-700 text-white text-[10px] font-black uppercase tracking-[0.25em] px-3 py-2 rounded-full">
                    {vehicle.category}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-red-700 text-[11px] font-black uppercase tracking-[0.25em] mb-3">
                    {vehicle.capacity}
                  </p>
                  <h4 className="text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                    {vehicle.name}
                  </h4>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {vehicle.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contato"
        className="relative py-20 md:py-28 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] gap-8 md:gap-10 items-start">
            <div className="max-w-2xl">
              <h2 className="text-sm font-black text-red-700 uppercase tracking-[0.3em] mb-4">
                Contato
              </h2>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-[0.95]">
                Vamos planejar seu trajeto
              </h3>
              <p className="mt-5 md:mt-6 text-zinc-500 dark:text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed">
                Solicite um orçamento para excursões, fretamento, transfer, transporte executivo e viagens em grupo com atendimento rápido e personalizado.
              </p>

              <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-zinc-50 dark:bg-zinc-900/40">
                  <p className="text-[11px] font-black uppercase tracking-[0.25em] text-red-700 mb-2">
                    Atendimento
                  </p>
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                    Resposta rápida para viagens, eventos, aeroporto e fretamento.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-zinc-50 dark:bg-zinc-900/40">
                  <p className="text-[11px] font-black uppercase tracking-[0.25em] text-red-700 mb-2">
                    Cobertura
                  </p>
                  <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
                    Vespasiano, BH e região, com atendimentos sob demanda.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5 sm:p-6 md:p-8 shadow-sm">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                <div className="md:col-span-1">
                  <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    placeholder="Seu nome"
                    className="w-full h-14 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white outline-none focus:border-red-700 transition-colors"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
                    Telefone
                  </label>
                  <input
                    type="text"
                    placeholder="(31) 99999-9999"
                    className="w-full h-14 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white outline-none focus:border-red-700 transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    placeholder="seuemail@gmail.com"
                    className="w-full h-14 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white outline-none focus:border-red-700 transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
                    Serviço desejado
                  </label>
                  <select className="w-full h-14 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white outline-none focus:border-red-700 transition-colors">
                    <option>Selecione um serviço</option>
                    <option>Locação de Vans e Ônibus</option>
                    <option>Excursões e Passeios</option>
                    <option>Transfer para Aeroportos</option>
                    <option>Eventos e Viagens em Grupo</option>
                    <option>Transporte Escolar/Empresarial</option>
                    <option>Transporte Executivo</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Descreva sua necessidade..."
                    className="w-full px-4 py-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white outline-none focus:border-red-700 transition-colors resize-none"
                  />
                </div>

                <div className="md:col-span-2 flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-bold px-8 py-4 rounded-xl md:rounded-sm transition-all shadow-xl uppercase text-[11px] tracking-widest active:scale-95"
                  >
                    Enviar solicitação
                  </button>

                  <a
                    href="#"
                    className="w-full sm:w-auto inline-flex items-center justify-center border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white px-8 py-4 rounded-xl md:rounded-sm uppercase text-[11px] tracking-widest font-bold hover:border-red-700 transition-colors"
                  >
                    Falar no WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-zinc-950 text-white border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <img
                src="/logobranca.png"
                alt="JP Transportes e Viagens"
                className="h-10 w-auto object-contain mb-5"
              />
              <p className="text-sm leading-relaxed text-white/65 max-w-xs">
                Transporte, fretamento e viagens com conforto, segurança e profissionalismo.
              </p>
            </div>

            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-red-500 mb-4">
                Navegação
              </h4>
              <div className="space-y-3 text-sm text-white/70">
                <a href="#inicio" className="block hover:text-white transition-colors">Início</a>
                <a href="#solucoes" className="block hover:text-white transition-colors">Soluções</a>
                <a href="#servicos" className="block hover:text-white transition-colors">Serviços</a>
                <a href="#frota" className="block hover:text-white transition-colors">Frota</a>
                <a href="#contato" className="block hover:text-white transition-colors">Contato</a>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-red-500 mb-4">
                Serviços
              </h4>
              <div className="space-y-3 text-sm text-white/70">
                <p>Locação de Vans e Ônibus</p>
                <p>Excursões e Passeios</p>
                <p>Transfer para Aeroportos</p>
                <p>Eventos e Viagens em Grupo</p>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-red-500 mb-4">
                Contato
              </h4>
              <div className="space-y-3 text-sm text-white/70">
                <p>JP Transportes e Viagens</p>
                <p>Vespasiano - MG</p>
                <p>(31) 99999-9999</p>
                <p>contato@jptransportes.com.br</p>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.18em] text-white/40 leading-relaxed">
              © 2026 JP Transportes e Viagens. Todos os direitos reservados.
            </p>
            <p className="text-[11px] md:text-xs uppercase tracking-[0.18em] text-white/40 leading-relaxed">
              Desenvolvido com foco em performance e conversão
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}