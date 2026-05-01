'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import Image from 'next/image';

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
      '/servicos/frotajp.mp4',
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
      '/servicos/executivo-3.mp4',
    ],
    items: [
      'Atendimento premium',
      'Conforto e discrição',
      'Ideal para reuniões, aeroportos e eventos',
      'Experiência refinada de transporte',
    ],
  },
];

type FleetPhoto = {
  label: string;
  src: string;
  fallback?: string;
  type?: 'image' | 'video';
};

type FleetVehicle = {
  name: string;
  category: string;
  capacity: string;
  description: string;
  photos: FleetPhoto[];
};

const fleet: FleetVehicle[] = [
  {
    name: 'Ônibus preto Mercedes',
    category: 'Rodoviário',
    capacity: '55 lugares',
    description:
      'Ônibus executivo para viagens, excursões e fretamento de grupos grandes com conforto e segurança.',
    photos: [
      { label: 'Externa', src: '/frota/onibuspretomercedes.png' },
      { label: 'Interna', src: '/frota/internaonibuspretomercedes.jpeg' },
    ],
  },
  {
    name: 'Ônibus Volvo',
    category: 'Rodoviário',
    capacity: '53 lugares',
    description:
      'Veículo amplo para rotas corporativas, turismo e viagens com atendimento estruturado para grupos.',
    photos: [
      { label: 'Externa', src: '/frota/onibusvolvo.jpeg' },
      { label: 'Interna', src: '/frota/onibusvolvointerna.jpeg' },
    ],
  },
  {
    name: 'Ônibus Marcopolo DD',
    category: 'Double deck',
    capacity: '52 lugares',
    description:
      'Modelo double deck indicado para viagens de longa distância, turismo e operações premium em grupo.',
    photos: [
      { label: 'Externa', src: '/frota/dd.jpeg' },
      { label: 'Interna', src: '/frota/internodd.jpeg' },
    ],
  },
  {
    name: 'Ônibus Marcopolo LD',
    category: 'Low driver',
    capacity: '52 lugares',
    description:
      'Opção rodoviária confortável para excursões, fretamento e deslocamentos planejados com alta capacidade.',
    photos: [
      { label: 'Externa', src: '/frota/ld.jpeg' },
      { label: 'Interna', src: '/frota/internold.jpeg' },
    ],
  },
  {
    name: 'Comil Campione DD',
    category: 'Double deck',
    capacity: '52 lugares',
    description:
      'Frota double deck para viagens especiais, turismo e eventos que pedem mais presença e estrutura.',
    photos: [
      { label: 'Externa', src: '/frota/dd.jpeg' },
      { label: 'Interna', src: '/frota/internodd.jpeg' },
    ],
  },
  {
    name: 'Van 313 Mercedes',
    category: 'Van executiva',
    capacity: '25 lugares',
    description:
      'Van versátil para transfers, eventos, empresas e grupos menores que precisam de agilidade.',
    photos: [
      { label: 'Externa', src: '/frota/van313.jpeg' },
    ],
  },
  {
    name: 'Van 415 Mercedes',
    category: 'Van executiva',
    capacity: '28 lugares',
    description:
      'Ideal para grupos médios, transporte empresarial, passeios e deslocamentos com mais flexibilidade.',
    photos: [
      { label: 'Externa', src: '/frota/van415.jpeg' },
      { label: 'Interna', src: '/frota/van415interna.jpeg' },
    ],
  },
  {
    name: 'Van 515 Mercedes',
    category: 'Van executiva',
    capacity: '32 lugares',
    description:
      'Van de maior capacidade para operações em grupo, fretamento e viagens curtas com conforto.',
    photos: [
      { label: 'Externa', src: '/frota/van515.jpeg' },
      { label: 'Interna', src: '/frota/van515interna.jpeg' },
    ],
  },
  {
    name: 'Carro privado',
    category: 'Executivo',
    capacity: 'Até 4 passageiros',
    description:
      'Atendimento privativo para executivos, aeroportos e deslocamentos discretos com mais conforto.',
    photos: [
      { label: 'Externa', src: '/frota/carroprivado.mp4', type: 'video' },
      { label: 'Interna', src: '/frota/privadointerno.jpeg' },
    ],
  },
];

function FleetCard({ vehicle }: { vehicle: FleetVehicle }) {
  const [activePhoto, setActivePhoto] = useState(0);
  const currentPhoto = vehicle.photos[activePhoto];
  const isVideo = currentPhoto.type === 'video' || currentPhoto.src.endsWith('.mp4');

  return (
    <article className="group h-full overflow-hidden rounded-[22px] border border-white/10 bg-white/95 dark:bg-zinc-950/85 backdrop-blur-sm shadow-xl shadow-black/20 transition-all duration-500 hover:border-white/25 hover:shadow-2xl hover:shadow-black/30">
      <div className="relative h-[300px] sm:h-[360px] lg:h-[430px] overflow-hidden bg-zinc-900">
        {isVideo ? (
          <video
            key={currentPhoto.src}
            src={currentPhoto.src}
            className="h-full w-full object-cover transition-[filter] duration-500 group-hover:brightness-105"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <Image
            key={currentPhoto.src}
            src={currentPhoto.src}
            alt={`${vehicle.name} - foto ${currentPhoto.label.toLowerCase()}`}
            fill
            sizes="(min-width: 1280px) 600px, (min-width: 1024px) 540px, (min-width: 640px) 460px, 82vw"
            draggable={false}
            className="h-full w-full object-cover transition-[filter] duration-500 group-hover:brightness-105"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute top-4 left-4 bg-red-700 text-white text-[10px] font-black uppercase tracking-[0.22em] px-3 py-2 rounded-full shadow-lg shadow-black/20">
          {vehicle.category}
        </div>
      </div>

      <div className="p-4 md:p-5">
        <div className={`relative z-20 mb-4 grid gap-2 ${
          vehicle.photos.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
        }`}>
          {vehicle.photos.map((photo, index) => (
            <button
              type="button"
              key={photo.label}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={() => setActivePhoto(index)}
              className={`min-h-11 rounded-xl border px-3 text-[10px] font-black uppercase tracking-[0.14em] transition-all ${
                activePhoto === index
                  ? 'border-red-700 bg-red-700 text-white shadow-lg shadow-red-900/20'
                  : 'border-zinc-300 bg-white text-zinc-950 hover:border-red-700 hover:bg-red-50 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-zinc-950'
              }`}
            >
              {vehicle.photos.length === 1
                ? `Somente ${photo.label.toLowerCase()}`
                : `Ver ${photo.label.toLowerCase()}`}
            </button>
          ))}
        </div>

        <p className="text-red-700 text-[11px] font-black uppercase tracking-[0.25em] mb-3">
          {vehicle.capacity}
        </p>
        <h4 className="text-lg md:text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
          {vehicle.name}
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {vehicle.description}
        </p>
      </div>
    </article>
  );
}

function FleetCarousel() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  });

  const scrollFleet = (direction: 'prev' | 'next') => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    const cardWidth = carousel.querySelector('article')?.clientWidth ?? 360;
    carousel.scrollBy({
      left: direction === 'next' ? cardWidth + 24 : -(cardWidth + 24),
      behavior: 'smooth',
    });
  };

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;

    if ((event.target as HTMLElement).closest('button, a, input, textarea, select')) {
      return;
    }

    const carousel = carouselRef.current;

    if (!carousel) return;

    dragState.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: carousel.scrollLeft,
    };

    carousel.setPointerCapture(event.pointerId);
    carousel.classList.add('cursor-grabbing');
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const carousel = carouselRef.current;

    if (!carousel || !dragState.current.isDragging) return;

    event.preventDefault();
    const walk = (event.clientX - dragState.current.startX) * 1.15;
    carousel.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    dragState.current.isDragging = false;
    carousel.releasePointerCapture(event.pointerId);
    carousel.classList.remove('cursor-grabbing');
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-[#5a0f16] to-transparent dark:from-zinc-950 md:w-20" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-[#2a0609] to-transparent dark:from-black md:w-20" />

      <button
        type="button"
        onClick={() => scrollFleet('prev')}
        className="absolute left-2 top-[42%] z-20 hidden h-16 w-16 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-white text-3xl font-black text-zinc-950 shadow-2xl shadow-black/30 transition-all hover:scale-105 hover:bg-red-700 hover:text-white md:grid xl:-left-8"
        aria-label="Ver veículo anterior"
      >
        ←
      </button>

      <button
        type="button"
        onClick={() => scrollFleet('next')}
        className="absolute right-2 top-[42%] z-20 hidden h-16 w-16 -translate-y-1/2 place-items-center rounded-full border border-white/50 bg-white text-3xl font-black text-zinc-950 shadow-2xl shadow-black/30 transition-all hover:scale-105 hover:bg-red-700 hover:text-white md:grid xl:-right-8"
        aria-label="Ver próximo veículo"
      >
        →
      </button>

      <div
        ref={carouselRef}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={(event) => {
          if (dragState.current.isDragging) {
            endDrag(event);
          }
        }}
        className="fleet-carousel flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-6 select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {fleet.map((vehicle) => (
          <div
            key={vehicle.name}
            className="min-w-[82vw] snap-center sm:min-w-[460px] lg:min-w-[540px] xl:min-w-[600px]"
          >
            <FleetCard vehicle={vehicle} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center md:justify-start">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/65">
          Arraste para ver a frota completa
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [activeService, setActiveService] = useState(0);
  const [activePhoto, setActivePhoto] = useState(0);

  const currentService = useMemo(() => services[activeService], [activeService]);
  const currentServicePhoto = currentService.photos[activePhoto] ?? currentService.photos[0];
  const currentServicePhotoIsVideo =
    currentServicePhoto.endsWith('.mp4') ||
    currentServicePhoto.endsWith('.webm') ||
    currentServicePhoto.endsWith('.ogg');

  useEffect(() => {
    if (!pageRef.current) return;

    const sections = pageRef.current.querySelectorAll<HTMLElement>('.section-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-visible');

          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touchPrimary = window.matchMedia('(pointer: coarse)').matches;

    if (reducedMotion || touchPrimary) return;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let animationFrame = 0;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const syncScrollPosition = () => {
      if (!animationFrame) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    const animateScroll = () => {
      currentY += (targetY - currentY) * 0.075;
      window.scrollTo(0, currentY);

      if (Math.abs(targetY - currentY) > 0.4) {
        animationFrame = requestAnimationFrame(animateScroll);
      } else {
        currentY = targetY;
        animationFrame = 0;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      event.preventDefault();
      targetY = Math.min(maxScroll(), Math.max(0, targetY + event.deltaY * 0.68));

      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animateScroll);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', syncScrollPosition, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', syncScrollPosition);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

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
      <section
        id="inicio"
        className="relative min-h-[calc(92svh-5rem)] md:min-h-[calc(100vh-5rem)] overflow-hidden flex items-start md:items-center"
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
          <div className="max-w-4xl mx-auto text-center pt-16 pb-10 sm:pt-20 md:py-10 md:-translate-y-2 lg:-translate-y-4">
            <div className="hero-animate flex items-center justify-center gap-3 mb-4 md:mb-5">
              <div className="w-9 md:w-12 h-[3px] bg-red-700" />
              <span className="text-red-300 dark:text-red-400 text-[10px] md:text-[11px] font-black uppercase tracking-[0.32em]">
                BH & Região
              </span>
              <div className="w-9 md:w-12 h-[3px] bg-red-700" />
            </div>

            <Image
              src="/logobranca.png"
              alt="JP Transportes e Viagens"
              width={155}
              height={63}
              priority
              className="hero-animate mx-auto w-[98px] sm:w-[112px] md:w-[155px] object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)] mb-4 md:mb-6"
            />

            <h1 className="hero-animate text-[clamp(2.55rem,11.4vw,4rem)] leading-[0.88] sm:text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter">
              Transporte,
              <br />
              conforto e
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-200 dark:from-red-500 dark:to-red-300">
                confiança.
              </span>
            </h1>

            <p className="hero-animate text-white/85 text-[15px] sm:text-base md:text-lg max-w-[34rem] md:max-w-2xl mx-auto leading-relaxed font-semibold md:font-medium mt-4 md:mt-6">
              Soluções em viagens, fretamento, transfers, eventos e transporte executivo
              com a experiência que a JP entrega em cada trajeto.
            </p>

            <div className="hero-animate flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3 md:gap-5 pt-6 md:pt-7">
              <a
                href="#contato"
                className="w-[min(88%,320px)] sm:w-auto inline-flex items-center justify-center bg-red-700 hover:bg-red-800 text-white font-bold px-7 py-3.5 md:px-10 md:py-5 rounded-xl md:rounded-sm transition-all shadow-2xl shadow-red-900/40 uppercase text-[10px] md:text-[11px] tracking-widest active:scale-95"
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
        className="section-reveal relative py-20 md:py-32 bg-zinc-50 dark:bg-zinc-950 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-zinc-900/10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-white/10" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="reveal-item flex flex-col md:flex-row justify-between md:items-end mb-12 md:mb-16 gap-8">
            <div className="max-w-2xl text-left relative">
              <h2 className="text-sm font-black text-red-700 uppercase tracking-[0.3em] mb-4">
                O que fazemos
              </h2>
              <p className="text-3xl sm:text-5xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-[0.95]">
                Soluções completas em <br />
                <span className="text-zinc-600 dark:text-zinc-400">logística executiva</span>
              </p>
            </div>

            <p className="text-zinc-500 dark:text-zinc-400 max-w-md text-sm md:text-base font-medium border-l-2 border-red-700 pl-5 leading-relaxed">
              Transporte inteligente projetado para quem valoriza segurança, organização e
              uma boa experiência.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
            <div className="reveal-item group relative overflow-hidden rounded-[22px] border border-zinc-200 bg-zinc-50/80 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-red-700 hover:bg-white hover:shadow-2xl hover:shadow-zinc-950/10 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-700 via-red-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="mb-8 inline-grid h-14 w-14 place-items-center rounded-2xl border border-zinc-200 bg-white text-red-700 shadow-sm transition-colors duration-500 group-hover:border-red-700 group-hover:bg-red-700 group-hover:text-white dark:border-zinc-800 dark:bg-zinc-950">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="9" y2="2"></line><line x1="15" y1="22" x2="15" y2="2"></line></svg>
              </div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase mb-4 tracking-tight">
                Corporativo
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                Logística para empresas com foco em pontualidade, organização e alto padrão de atendimento.
              </p>
            </div>

            <div className="reveal-item group relative overflow-hidden rounded-[22px] border border-zinc-200 bg-zinc-50/80 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-red-700 hover:bg-white hover:shadow-2xl hover:shadow-zinc-950/10 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-700 via-red-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="mb-8 inline-grid h-14 w-14 place-items-center rounded-2xl border border-zinc-200 bg-white text-red-700 shadow-sm transition-colors duration-500 group-hover:border-red-700 group-hover:bg-red-700 group-hover:text-white dark:border-zinc-800 dark:bg-zinc-950">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase mb-4 tracking-tight">
                Artistas & Eventos
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                Transporte confortável e bem planejado para eventos, produções, shows e deslocamentos especiais.
              </p>
            </div>

            <div className="reveal-item group relative overflow-hidden rounded-[22px] border border-zinc-200 bg-zinc-50/80 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-red-700 hover:bg-white hover:shadow-2xl hover:shadow-zinc-950/10 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/80">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-700 via-red-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="mb-8 inline-grid h-14 w-14 place-items-center rounded-2xl border border-zinc-200 bg-white text-red-700 shadow-sm transition-colors duration-500 group-hover:border-red-700 group-hover:bg-red-700 group-hover:text-white dark:border-zinc-800 dark:bg-zinc-950">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"></path></svg>
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
        className="section-reveal relative py-20 md:py-28 bg-zinc-50 dark:bg-zinc-950 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-white/10" />
        <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-red-700/10 blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="reveal-item flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-14">
            <div className="max-w-2xl">
              <h2 className="text-sm font-black text-red-700 uppercase tracking-[0.3em] mb-4">
                Serviços
              </h2>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-[0.95]">
                Operação completa para cada tipo de viagem
              </h3>
            </div>

            <p className="max-w-md text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-medium border-l-2 border-red-700 pl-5">
              Do planejamento ao deslocamento, cada serviço combina frota adequada, organização de rota e atendimento claro para o passageiro.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-8 items-start">
            <div className="reveal-item">
              <div className="relative h-[340px] sm:h-[400px] md:h-[460px] xl:h-[500px] rounded-[24px] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-black shadow-2xl shadow-zinc-950/10">
                {currentServicePhotoIsVideo ? (
                  <video
                    key={currentServicePhoto}
                    src={currentServicePhoto}
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <Image
                    key={currentServicePhoto}
                    src={currentServicePhoto}
                    alt={currentService.title}
                    fill
                    sizes="(min-width: 1280px) 720px, (min-width: 768px) 58vw, 100vw"
                    className="object-cover"
                  />
                )}

                <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 p-4 sm:p-6">
                  <div>
                    <span className="text-white/75 text-[10px] sm:text-xs font-black tracking-[0.35em] uppercase">
                      {currentService.id} / 06
                    </span>
                    <h4 className="mt-3 max-w-3xl text-[1.35rem] leading-[0.95] sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter drop-shadow-2xl">
                      {currentService.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={prevService}
                      className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/35 bg-black/25 text-white backdrop-blur-md hover:bg-white hover:text-black transition-all active:scale-95 touch-manipulation"
                      aria-label="Serviço anterior"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={nextService}
                      className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/35 bg-black/25 text-white backdrop-blur-md hover:bg-white hover:text-black transition-all active:scale-95 touch-manipulation"
                      aria-label="Próximo serviço"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/12 pointer-events-none" />
                <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2">
                  {currentService.photos.map((_, index) => (
                    <button
                      type="button"
                      key={`${currentService.id}-dot-${index}`}
                      onClick={() => setActivePhoto(index)}
                      className="grid h-7 w-7 place-items-center rounded-full transition-all active:scale-95 touch-manipulation"
                      aria-label={`Foto ${index + 1}`}
                    >
                      <span
                        className={`h-2.5 rounded-full transition-all ${
                          activePhoto === index
                            ? 'w-5 bg-red-600'
                            : 'w-2.5 bg-white/70 hover:bg-white'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900/60">
                <p className="text-red-700 font-black uppercase tracking-[0.22em] text-[11px] mb-3">
                  {currentService.subtitle}
                </p>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed">
                  {currentService.description}
                </p>

                <a
                  href="#contato"
                  className="mt-5 inline-flex w-full sm:w-auto items-center justify-center bg-red-700 hover:bg-red-800 text-white font-bold px-6 py-3 rounded-xl md:rounded-sm transition-all shadow-lg shadow-red-900/20 uppercase text-[10px] tracking-widest active:scale-95"
                >
                  Solicitar orçamento
                </a>
              </div>
            </div>

            <div className="reveal-item flex flex-col gap-6">
              <div className="rounded-[28px] border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/60 p-5 sm:p-6 md:p-8 backdrop-blur-sm shadow-xl shadow-zinc-950/5">
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

              <div className="flex min-h-[210px] items-center justify-center p-8">
                <Image
                  src="/logopreta.png"
                  alt="JP Transportes e Viagens"
                  width={275}
                  height={112}
                  className="h-28 w-auto object-contain dark:hidden"
                />
                <Image
                  src="/logobranca.png"
                  alt="JP Transportes e Viagens"
                  width={275}
                  height={112}
                  className="hidden h-28 w-auto object-contain dark:block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="frota"
        className="section-reveal relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#5a0f16] via-[#7b1118] to-[#2a0609] dark:from-zinc-950 dark:via-[#22060a] dark:to-black"
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

          <FleetCarousel />
        </div>
      </section>

      <section
        id="contato"
        className="section-reveal relative py-20 md:py-28 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800"
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
                  <label htmlFor="name" className="block text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
                    Nome
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    className="w-full h-14 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white outline-none focus:border-red-700 transition-colors"
                  />
                </div>

                <div className="md:col-span-1">
                  <label htmlFor="phone" className="block text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
                    Telefone
                  </label>
                  <input
                    id="phone"
                    type="text"
                    placeholder="(31) 99999-9999"
                    className="w-full h-14 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white outline-none focus:border-red-700 transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="seuemail@gmail.com"
                    className="w-full h-14 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white outline-none focus:border-red-700 transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="service" className="block text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
                    Serviço desejado
                  </label>
                  <select id="service" className="w-full h-14 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white outline-none focus:border-red-700 transition-colors">
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
                  <label htmlFor="message" className="block text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
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
          <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">
            <div className="flex flex-col items-center sm:items-start">
              <Image
                src="/logobranca.png"
                alt="JP Transportes e Viagens"
                width={98}
                height={40}
                className="mb-5 h-10 w-auto object-contain"
              />
              <p className="max-w-xs text-sm leading-relaxed text-white/65">
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

          <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.18em] text-white/60 leading-relaxed">
              © 2026 JP Transportes e Viagens. Todos os direitos reservados.
            </p>
            <p className="text-[11px] md:text-xs uppercase tracking-[0.18em] text-white/60 leading-relaxed">
              Site desenvolvido por{' '}
              <a
                href="https://devleaoagencia.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-400 transition-colors"
              >
                DevLeão
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
