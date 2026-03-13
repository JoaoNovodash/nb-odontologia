"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const WA_LINK =
  "https://wa.me/5531982663937?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20na%20N%26B%20Odontologia.";

const treatments = [
  {
    name: "Implantes",
    desc: "Dentes fixos com aparência e função natural. A solução definitiva para dentes perdidos.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <rect x="16" y="2" width="8" height="20" rx="4" fill="currentColor" opacity="0.15" />
        <rect x="17.5" y="2" width="5" height="22" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 24h12l-2 14H16L14 24z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 28h12M14 32h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Protocolos",
    desc: "Dentadura fixa sobre implantes — sorria com segurança e conforto definitivo.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path d="M8 22c0 8 4 14 12 14s12-6 12-14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 20c0-2 1.5-4 4-4s4 2 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 20c0-2 1.5-4 4-4s4 2 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 20c0-2 1.5-4 4-4s4 2 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="20" cy="10" rx="12" ry="6" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
  },
  {
    name: "Facetas",
    desc: "Porcelana ou resina para transformar seu sorriso com leveza e naturalidade.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path d="M12 8h16l-4 24H16L12 8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 8h16l-4 24H16L12 8z" fill="currentColor" opacity="0.08" />
        <path d="M15 14h10M14 20h12M15 26h10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <path d="M26 4l2 2-2 2M14 4l-2 2 2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Tratamento de Canal",
    desc: "Endodontia sem dor. Preservamos seu dente natural com técnica e cuidado.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path d="M14 4h12c2 0 4 2 4 6 0 3-2 5-2 5l2 21H22l-2-12-2 12h-8l2-21s-2-2-2-5c0-4 2-6 4-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 4h12c2 0 4 2 4 6 0 3-2 5-2 5l2 21H22l-2-12-2 12h-8l2-21s-2-2-2-5c0-4 2-6 4-6z" fill="currentColor" opacity="0.06" />
        <path d="M20 16v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Próteses",
    desc: "Próteses fixas, removíveis e sobre implantes com estética e funcionalidade.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path d="M8 16c0-4.4 3.6-8 8-8h8c4.4 0 8 3.6 8 8v4c0 8-4 16-12 16S8 28 8 20v-4z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 16c0-4.4 3.6-8 8-8h8c4.4 0 8 3.6 8 8v4c0 8-4 16-12 16S8 28 8 20v-4z" fill="currentColor" opacity="0.07" />
        <path d="M13 18v8M17 17v10M21 17v10M27 18v8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Dentística Estética",
    desc: "Restaurações, remoção de cárie e harmonização estética do sorriso.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="12" fill="currentColor" opacity="0.06" />
        <path d="M14 20c0 3.3 2.7 6 6 6s6-2.7 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="17" r="1.5" fill="currentColor" />
        <circle cx="24" cy="17" r="1.5" fill="currentColor" />
        <path d="M28 10l4-4M12 10l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Cirurgias Orais",
    desc: "Extrações simples e complexas de siso com segurança e pós-operatório confortável.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path d="M8 32l20-20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 12l2-4 2 2-4 2z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
        <circle cx="26" cy="28" r="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="26" cy="28" r="6" fill="currentColor" opacity="0.1" />
        <path d="M26 25v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Ortodontia",
    desc: "Aparelhos fixos e alinhadores para um sorriso alinhado e saudável.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path d="M8 22c4-8 20-8 24 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="11" y="20" width="4" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="18" y="19" width="4" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="25" y="20" width="4" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <path d="M15 22.5h3M22 22.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Dor Orofacial & Bruxismo",
    desc: "Placas miorrelaxantes e tratamento da dor para sua qualidade de vida.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="14" fill="currentColor" opacity="0.05" />
        <path d="M16 26h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="19" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="24" cy="19" r="2" fill="currentColor" opacity="0.5" />
        <path d="M14 14c1-2 11-2 12 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Urgências",
    desc: "Atendimento prioritário para emergências. Estamos aqui quando você mais precisa.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="15" fill="currentColor" opacity="0.07" />
        <path d="M20 12v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="20" cy="27" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

const features = [
  "Equipamentos modernos e esterilizados",
  "Ambiente climatizado e confortável",
  "Atendimento humanizado e sem julgamentos",
  "Equipe treinada para cuidar de você",
  "Localização de fácil acesso em BH",
];

const testimonials = [
  {
    text: "Tinha muito medo de dentista e a Dra. Nicole me deixou completamente à vontade no tratamento de canal. Não senti nada! Recomendo de olhos fechados.",
    name: "Mariana S.",
    detail: "Paciente há 3 anos",
  },
  {
    text: "Fiz meus implantes com a Dra. Bianca e o resultado foi incrível. Finalmente posso sorrir com confiança novamente. Atendimento impecável do início ao fim.",
    name: "Roberto M.",
    detail: "Implante em 2023",
  },
  {
    text: "Fiz facetas de porcelana e me apaixonei pelo resultado. As meninas são muito atenciosas e profissionais. O consultório é lindo e muito bem equipado!",
    name: "Carla F.",
    detail: "Facetas em 2024",
  },
];

const faqs = [
  {
    q: "O tratamento de canal dói?",
    a: "Com a anestesia local moderna e a técnica adequada, o tratamento de canal não dói. A maioria dos nossos pacientes se surpreende com o conforto do procedimento. A Dra. Nicole é especialista em tornar essa experiência o mais tranquila possível.",
  },
  {
    q: "Quanto tempo leva para fazer um implante?",
    a: "O processo completo geralmente leva entre 3 a 6 meses, incluindo o período de osseointegração — quando o implante se une ao osso. A cirurgia em si é rápida e feita com anestesia local. Cada caso é avaliado individualmente pela Dra. Bianca.",
  },
  {
    q: "Vocês atendem por plano de saúde?",
    a: "Atendemos de forma particular. Trabalhamos com parcelamento facilitado para que você possa investir no seu sorriso com tranquilidade. Entre em contato pelo WhatsApp e vamos encontrar a melhor opção para o seu caso.",
  },
  {
    q: "Como agendar uma consulta?",
    a: "É simples! Basta clicar em qualquer botão 'Agendar' nesta página e enviar uma mensagem para nós no WhatsApp. Nossa equipe responde rapidamente e encontra o melhor horário para você.",
  },
  {
    q: "Atendem urgências odontológicas?",
    a: "Sim! Se você estiver com dor forte, fratura ou qualquer emergência, entre em contato pelo WhatsApp e faremos o possível para te atender o mais rápido possível.",
  },
];

const beforeAfterImages = Array.from({ length: 21 }, (_, i) => ({
  src: `/antes-depois/Antes-depois-${i + 1}.jpeg`,
  alt: `Resultado ${i + 1}`,
}));

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.553 4.1 1.522 5.827L.057 23.07a.75.75 0 00.918.918l5.243-1.465A11.942 11.942 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.727 9.727 0 01-4.962-1.36l-.356-.211-3.69 1.031 1.031-3.69-.211-.356A9.727 9.727 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}

/* ── Gallery Carousel ─────────────────────────────── */
function GalleryCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api, onSelect]);

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {images.map((img, i) => (
            <CarouselItem key={i} className="pl-3 md:basis-1/2 lg:basis-1/3">
              <div
                className="overflow-hidden rounded-2xl"
                style={{ aspectRatio: "4/3" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="hidden sm:flex -left-5 border-0 shadow-md"
          style={{ background: "#2C3E3A", color: "white" }}
        />
        <CarouselNext
          className="hidden sm:flex -right-5 border-0 shadow-md"
          style={{ background: "#2C3E3A", color: "white" }}
        />
      </Carousel>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-6">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: current === i ? "20px" : "6px",
              height: "6px",
              background: current === i ? "#8ECFC0" : "rgba(44,62,58,0.2)",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Treatment Carousel ───────────────────────────── */
type Treatment = { name: string; desc: string; icon: React.ReactNode };

function TreatmentCarousel({ items, className = "" }: { items: Treatment[]; className?: string }) {
  return (
    <div className={className}>
      <Carousel
        opts={{ align: "start", loop: false }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {items.map((t) => (
            <CarouselItem key={t.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="treatment-card h-full">
                <div style={{ color: "#8ECFC0" }}>{t.icon}</div>
                <h3
                  className="mt-4"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    color: "#2C3E3A",
                  }}
                >
                  {t.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6b7c78" }}>
                  {t.desc}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex justify-end gap-2 mt-4">
          <CarouselPrevious
            className="static translate-y-0 border-0 shadow-sm"
            style={{ background: "rgba(142,207,192,0.18)", color: "#2C3E3A" }}
          />
          <CarouselNext
            className="static translate-y-0 border-0 shadow-sm"
            style={{ background: "#8ECFC0", color: "#2C3E3A" }}
          />
        </div>
      </Carousel>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", color: "#2C3E3A" }}>

      {/* ── Navbar ──────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(142,207,192,0.2)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
          <a href="#" className="flex items-center flex-shrink-0">
            <Image
              src="/logo/Logo NB.png"
              alt="N&B Odontologia"
              width={50}
              height={17}
              className="object-contain"
              priority
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: "Tratamentos", href: "#tratamentos" },
              { label: "Sobre nós", href: "#sobre-nos" },
              { label: "Antes & Depois", href: "#antes-depois" },
              { label: "Contato", href: "#contato" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors"
                style={{ color: "#2C3E3A", textDecoration: "none" }}
                onMouseOver={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#6db8a8")}
                onMouseOut={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#2C3E3A")}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsAppIcon size={16} />
              Agendar consulta
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            style={{ color: "#2C3E3A", background: "none", border: "none", cursor: "pointer" }}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden px-6 py-5 space-y-4"
            style={{ background: "white", borderTop: "1px solid rgba(142,207,192,0.15)" }}
          >
            {[
              { label: "Tratamentos", href: "#tratamentos" },
              { label: "Sobre nós", href: "#sobre-nos" },
              { label: "Antes & Depois", href: "#antes-depois" },
              { label: "Contato", href: "#contato" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium"
                style={{ color: "#2C3E3A", textDecoration: "none" }}
              >
                {item.label}
              </a>
            ))}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex mt-2">
              <WhatsAppIcon size={16} />
              Agendar consulta
            </a>
          </div>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{ background: "linear-gradient(135deg, #F4F9F7 0%, #EDF5F3 55%, #E8F3F7 100%)" }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute pointer-events-none animate-float"
          style={{
            top: "8%", right: "3%",
            width: "480px", height: "480px",
            background: "radial-gradient(circle, rgba(142,207,192,0.2) 0%, rgba(168,200,216,0.08) 65%, transparent 100%)",
            borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "0", left: "-8%",
            width: "340px", height: "340px",
            background: "radial-gradient(circle, rgba(168,200,216,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
          {/* Left: copy */}
          <div>
            <span className="section-tag animate-fade-up">
              Odontologia de excelência em Contagem
            </span>

            <h1
              className="animate-fade-up-delay-1 mt-6 text-balance"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
                fontWeight: 600,
                color: "#2C3E3A",
                lineHeight: 1.06,
              }}
            >
              O seu sorriso{" "}
              <em style={{ color: "#6db8a8", fontStyle: "italic" }}>merece</em>
              <br />
              o melhor cuidado
            </h1>

            <p
              className="animate-fade-up-delay-2 mt-6 leading-relaxed"
              style={{ fontSize: "1.05rem", color: "#4a6460", maxWidth: "480px" }}
            >
              Especialistas em implantes, próteses e tratamento de canal, cirurgia odontológica e ortodontia. Cuidado humanizado,
              tecnologia avançada e resultados que transformam vidas — desde a primeira consulta.
            </p>

            <div className="animate-fade-up-delay-3 mt-10 flex flex-wrap gap-4">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <WhatsAppIcon />
                Agendar pelo WhatsApp
              </a>
              <a href="#antes-depois" className="btn-secondary">
                Ver tratamentos
              </a>
            </div>

            {/* Mini stats */}
            <div
              className="animate-fade-up-delay-4 mt-10 flex flex-wrap gap-7 pt-8"
              style={{ borderTop: "1px solid rgba(142,207,192,0.25)" }}
            >
              {[
                ["500+", "Pacientes satisfeitos"],
                ["10+", "Anos de experiência"],
                ["100%", "Atendimento humanizado"],
              ].map(([num, label]) => (
                <div key={num}>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "1.9rem",
                      fontWeight: 600,
                      color: "#8ECFC0",
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#6b7c78" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: clinic photo */}
          <div className="relative animate-scale-in hidden md:flex justify-center">
            <div
              className="relative w-full max-w-md"
              style={{
                borderRadius: "40% 60% 55% 45% / 45% 50% 50% 55%",
                overflow: "hidden",
                aspectRatio: "4/5",
                boxShadow: "0 40px 80px rgba(44,62,58,0.14)",
              }}
            >
              <Image
                src="/images/smile.webp"
                alt="Consultório N&B Odontologia"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-2 -left-4 px-5 py-3 rounded-2xl shadow-lg flex items-center gap-3"
              style={{ background: "white", border: "1px solid rgba(142,207,192,0.3)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "#8ECFC0", color: "#2C3E3A" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold" style={{ color: "#2C3E3A" }}>Avaliação gratuita</p>
                <p className="text-xs" style={{ color: "#6b7c78" }}>Marque sua consulta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quem Somos ──────────────────────────────── */}
      <section id="sobre-nos" className="py-24" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-tag justify-center">Quem somos</span>
            <h2
              className="mt-5"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
                fontWeight: 600,
                color: "#2C3E3A",
                lineHeight: 1.1,
              }}
            >
              Duas especialistas,
              <br />
              um cuidado completo
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "#6b7c78", lineHeight: 1.75 }}>
              Irmãs, dentistas e apaixonadas pela odontologia. Nicole e Bianca unem suas especialidades
              para oferecer tratamento completo em um único consultório.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Dra. Nicole Rezende Gonçalves",
                cro: "CRO-MG 53004 · Endodontista",
                bio: "Especialista em Endodontia, Nicole é referência em tratamento de canal com técnica precisa e atendimento humanizado. Seu trabalho alivia a dor e preserva seus dentes naturais com máxima segurança e conforto.",
                badge: "Tratamento de Canal",
                img: "/images/DraNicole.webp",
                accent: "#8ECFC0",
                accentText: "#6db8a8",
              },
              {
                name: "Dra. Bianca Rezende Gonçalves",
                cro: "CRO-MG 53040 · Especialista em Prótese e Implantes",
                bio: "Especialista em Prótese Dentária e Implantodontia, Bianca devolve sorrisos completos e funcionais. Com olhar estético refinado, transforma o sorriso de seus pacientes com implantes e próteses de alta qualidade.",
                badge: "Implantes & Próteses",
                img: "/images/DraBianca.webp",
                accent: "#A8C8D8",
                accentText: "#7aaec4",
              },
            ].map((dr) => (
              <div
                key={dr.name}
                className="rounded-3xl overflow-hidden"
                style={{
                  border: `1.5px solid ${dr.accent}55`,
                  boxShadow: "0 8px 32px rgba(44,62,58,0.07)",
                }}
              >
                <div className="relative" style={{ aspectRatio: "3/2" }}>
                  <Image src={dr.img} alt={dr.name} fill className="object-cover" style={{ objectPosition: "center 10%" }} />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(44,62,58,0.45) 0%, transparent 55%)",
                    }}
                  />
                  <div className="absolute bottom-4 left-5">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: dr.accent, color: "#2C3E3A" }}
                    >
                      {dr.badge}
                    </span>
                  </div>
                </div>
                <div className="p-7">
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "1.7rem",
                      fontWeight: 600,
                      color: "#2C3E3A",
                    }}
                  >
                    {dr.name}
                  </h3>
                  <p
                    className="text-xs font-semibold mt-1 tracking-widest uppercase"
                    style={{ color: dr.accentText }}
                  >
                    {dr.cro}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: "#6b7c78" }}>
                    {dr.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Destaque Siso ─────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "#2C3E3A" }}>
        {/* Decorative elements */}
        <div
          className="absolute top-0 right-0 w-96 h-96 opacity-10"
          style={{
            background: "radial-gradient(circle, #8ECFC0 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 opacity-10"
          style={{
            background: "radial-gradient(circle, #A8C8D8 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left — content */}
            <div>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{ background: "rgba(142,207,192,0.15)", color: "#8ECFC0" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Destaque
              </span>

              <h2
                className="mt-6"
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                }}
              >
                Cirurgia de{" "}
                <em style={{ color: "#8ECFC0", fontStyle: "italic" }}>Siso</em>
              </h2>

              <p
                className="mt-5 leading-relaxed"
                style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.7)", maxWidth: "480px" }}
              >
                Extrações de sisos inclusos, semi-inclusos ou erupcionados com segurança e conforto.
                Procedimento realizado com técnica minimamente invasiva e
                acompanhamento pós-operatório completo.
              </p>

              {/* Sedation highlight */}
              <div
                className="mt-5 flex items-start gap-3 rounded-2xl px-5 py-4"
                style={{
                  background: "linear-gradient(135deg, rgba(142,207,192,0.1) 0%, rgba(168,200,216,0.1) 100%)",
                  border: "1px solid rgba(142,207,192,0.2)",
                }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                  style={{ background: "rgba(142,207,192,0.15)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8ECFC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.5 5.5C19 7 20.5 9 21 11c-2.5.5-5-.5-7-2.5S10.5 4 11 1.5c2 .5 4 2 5.5 3.5z" />
                    <path d="M1 21c0 0 4.5-8 13-8" />
                    <path d="M11 13c0 3.5 2 7 2 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#8ECFC0" }}>
                    Opção de cirurgia com sedação
                  </p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Faça a cirurgia dormindo, com total conforto e segurança. Contamos com equipe de
                    médicos anestesiologistas para garantir um procedimento tranquilo do início ao fim.
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "shield", text: "Procedimento seguro e planejado" },
                  { icon: "clock", text: "Recuperação rápida e orientada" },
                  { icon: "heart", text: "Atendimento humanizado e acolhedor" },
                  { icon: "zap", text: "Técnica minimamente invasiva" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                      style={{ background: "rgba(142,207,192,0.12)" }}
                    >
                      {item.icon === "shield" && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8ECFC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      )}
                      {item.icon === "clock" && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8ECFC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                      )}
                      {item.icon === "heart" && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8ECFC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      )}
                      {item.icon === "zap" && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8ECFC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      )}
                    </div>
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <WhatsAppIcon />
                  Agendar avaliação de siso
                </a>
              </div>
            </div>

            {/* Right — visual card */}
            <div className="relative hidden md:block">
              <div
                className="relative rounded-3xl overflow-hidden p-10 text-center"
                style={{
                  background: "linear-gradient(145deg, rgba(142,207,192,0.08) 0%, rgba(168,200,216,0.08) 100%)",
                  border: "1px solid rgba(142,207,192,0.15)",
                }}
              >
                {/* Large tooth icon */}
                <div className="mx-auto mb-8" style={{ width: "120px", height: "120px" }}>
                  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="60" cy="60" r="56" fill="rgba(142,207,192,0.08)" stroke="rgba(142,207,192,0.2)" strokeWidth="1.5" />
                    <path
                      d="M60 28c-7.5 0-13.5 2.5-17.5 7-4.5 5-5 11.5-4 18 1 5.5 3 11 4.5 16.5 1.5 6 2.5 12 4 18 .8 3.2 2 5.5 4.5 5.5s3.5-2 4.5-5.5c1-4 1.5-8 2.5-12h3c1 4 1.5 8 2.5 12 1 3.5 2 5.5 4.5 5.5s3.7-2.3 4.5-5.5c1.5-6 2.5-12 4-18 1.5-5.5 3.5-11 4.5-16.5 1-6.5.5-13-4-18-4-4.5-10-7-17.5-7z"
                      fill="rgba(142,207,192,0.15)"
                      stroke="#8ECFC0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Quick FAQ */}
                <div className="space-y-4 text-left">
                  {[
                    { q: "Quando devo extrair o siso?", a: "Quando há dor, infecção recorrente, falta de espaço ou risco de danos aos dentes vizinhos." },
                    { q: "O procedimento dói?", a: "A cirurgia é feita com anestesia local e você não sente dor. Orientamos todo o pós-operatório para máximo conforto." },
                    { q: "Quanto tempo leva a recuperação?", a: "Em média 5 a 7 dias, seguindo corretamente as orientações pós-cirúrgicas." },
                  ].map((item) => (
                    <div
                      key={item.q}
                      className="rounded-xl p-4"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(142,207,192,0.1)" }}
                    >
                      <p className="text-sm font-semibold" style={{ color: "#8ECFC0" }}>{item.q}</p>
                      <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating accent dot */}
              <div
                className="absolute -top-3 -right-3 w-14 h-14 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #8ECFC0, #A8C8D8)",
                  opacity: 0.25,
                  filter: "blur(8px)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Tratamentos ─────────────────────────────── */}
      <section id="tratamentos" className="py-24" style={{ background: "#F4F9F7" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-tag justify-center">Tratamentos</span>
            <h2
              className="mt-5"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
                fontWeight: 600,
                color: "#2C3E3A",
                lineHeight: 1.1,
              }}
            >
              Tudo que o seu sorriso precisa,
              <br />
              em um só lugar
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "#6b7c78", lineHeight: 1.75 }}>
              Do tratamento de canal ao implante, das facetas ao aparelho — cuidado odontológico
              completo para toda a família.
            </p>
          </div>

          <TreatmentCarousel items={treatments.slice(0, 5)} />
          <TreatmentCarousel items={treatments.slice(5)} className="mt-4" />

          <div className="mt-12 text-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsAppIcon />
              Fale conosco pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Antes & Depois ──────────────────────────── */}
      <section id="antes-depois" className="py-24" style={{ background: "white" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-tag justify-center">Resultados reais</span>
            <h2
              className="mt-5"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
                fontWeight: 600,
                color: "#2C3E3A",
                lineHeight: 1.1,
              }}
            >
              Transformações que
              <br />
              falam por si mesmas
            </h2>
            <p className="mt-4 max-w-xl mx-auto" style={{ color: "#6b7c78", lineHeight: 1.75 }}>
              Cada sorriso tem uma história. Veja alguns dos nossos casos e imagine o que podemos
              fazer pelo seu.
            </p>
          </div>

          <GalleryCarousel images={beforeAfterImages} />

          <div className="mt-14 text-center">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsAppIcon />
              Quero minha transformação
            </a>
          </div>
        </div>
      </section>

      {/* ── Nossa Estrutura ─────────────────────────── */}
      <section className="py-24" style={{ background: "#EDF5F3" }}>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Bento grid — 3 photos */}
          <div
            className="order-2 md:order-1 grid gap-3"
            style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "240px 200px" }}
          >
            {/* Left: tall, spans both rows */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ gridRow: "1 / 3", boxShadow: "0 8px 24px rgba(44,62,58,0.1)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/espaco/space-1.jpeg" alt="Espaço N&B" className="w-full h-full object-cover" />
            </div>
            {/* Top right */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 8px 24px rgba(44,62,58,0.1)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/espaco/space-2.jpeg" alt="Espaço N&B" className="w-full h-full object-cover" />
            </div>
            {/* Bottom right */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 8px 24px rgba(44,62,58,0.08)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/espaco/space-3.jpeg" alt="Espaço N&B" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <span className="section-tag">Nossa estrutura</span>
            <h2
              className="mt-5"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)",
                fontWeight: 600,
                color: "#2C3E3A",
                lineHeight: 1.1,
              }}
            >
              Um ambiente pensado
              <br />
              para o seu conforto
            </h2>
            <p className="mt-5 leading-relaxed" style={{ color: "#6b7c78" }}>
              Nosso consultório foi projetado para que você se sinta acolhido desde a recepção.
              Ambiente climatizado, equipamentos de última geração e uma equipe atenta a cada detalhe.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: "#8ECFC0" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="#2C3E3A"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: "#4a6460" }}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Agendar visita
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Depoimentos ─────────────────────────────── */}
      <section className="py-24" style={{ background: "#2C3E3A" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span
              className="section-tag justify-center"
              style={{ color: "#8ECFC0" }}
            >
              Confiança &amp; resultados
            </span>
            <h2
              className="mt-5"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "clamp(2.4rem, 4vw, 4rem)",
                fontWeight: 600,
                color: "white",
                lineHeight: 1.1,
              }}
            >
              Pacientes que voltam
              <br />
              a sorrir
            </h2>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-6 mb-14 pb-14"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            {[
              ["500+", "Pacientes satisfeitos"],
              ["10+", "Anos de experiência clínica"],
              ["100%", "Atendimento humanizado"],
            ].map(([num, label]) => (
              <div key={num} className="text-center">
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                    fontWeight: 600,
                    color: "#8ECFC0",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </p>
                <p className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl p-7"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(142,207,192,0.18)",
                }}
              >
                <div className="flex gap-0.5 mb-5" style={{ color: "#8ECFC0" }}>
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                    style={{ background: "#8ECFC0", color: "#2C3E3A" }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "white" }}>
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {t.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ───────────────────────────────── */}
      <section
        id="contato"
        className="py-28 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #8ECFC0 0%, #A8C8D8 100%)",
        }}
      >
        {/* Decorative circle */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-20%", right: "-5%",
            width: "400px", height: "400px",
            background: "rgba(255,255,255,0.12)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-30%", left: "-5%",
            width: "350px", height: "350px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "50%",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6">
          <span className="section-tag justify-center" style={{ color: "rgba(44,62,58,0.7)" }}>
            Agende sua consulta
          </span>
          <h2
            className="mt-5"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
              fontWeight: 600,
              color: "#2C3E3A",
              lineHeight: 1.06,
            }}
          >
            Seu sorriso começa com
            <br />
            uma{" "}
            <em style={{ fontStyle: "italic", color: "white" }}>mensagem</em>
          </h2>
          <p className="mt-5 leading-relaxed" style={{ color: "rgba(44,62,58,0.7)", fontSize: "1.05rem" }}>
            Entre em contato agora pelo WhatsApp, tire suas dúvidas e marque sua avaliação.
            É rápido, fácil e sem compromisso.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-sm px-7 py-4 rounded-full transition-all"
              style={{
                background: "#2C3E3A",
                color: "white",
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(44,62,58,0.22)",
              }}
            >
              <WhatsAppIcon />
              Falar no WhatsApp agora
            </a>
            <a
              href="tel:+5531999999999"
              className="inline-flex items-center gap-2 font-medium text-sm px-7 py-4 rounded-full transition-all"
              style={{
                background: "transparent",
                color: "#2C3E3A",
                textDecoration: "none",
                border: "1.5px solid rgba(44,62,58,0.3)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.67 19.79 19.79 0 01.07 4.05 2 2 0 012.06 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              Ligar para o consultório
            </a>
          </div>

          <p className="mt-8 text-xs" style={{ color: "rgba(44,62,58,0.55)" }}>
            Respondemos em até 1 hora · Seg–Sex 8h–18h · Sáb 8h–13h
          </p>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#F4F9F7" }}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-tag justify-center">Dúvidas frequentes</span>
            <h2
              className="mt-5"
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)",
                fontWeight: 600,
                color: "#2C3E3A",
                lineHeight: 1.1,
              }}
            >
              Perguntas que
              <br />
              mais recebemos
            </h2>
          </div>

          <div>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderTop: i === 0 ? "1px solid rgba(44,62,58,0.1)" : undefined,
                  borderBottom: "1px solid rgba(44,62,58,0.1)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-6"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <span className="text-sm font-medium leading-snug" style={{ color: "#2C3E3A" }}>
                    {faq.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: openFaq === i ? "#8ECFC0" : "rgba(142,207,192,0.2)",
                      color: "#2C3E3A",
                      transition: "all 0.2s ease",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="6" y1="2" x2="6" y2="10" />
                      <line x1="2" y1="6" x2="10" y2="6" />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="pb-5 pr-12">
                    <p className="text-sm leading-relaxed" style={{ color: "#6b7c78" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer style={{ background: "#2C3E3A" }} className="pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12 pb-12"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Brand */}
            <div>
              <Image
                src="/logo/Logo NB.png"
                alt="N&B Odontologia"
                width={130}
                height={44}
                className="object-contain brightness-0 invert"
              />
              <p
                className="mt-4 text-sm leading-relaxed max-w-xs"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Cuidado odontológico completo e humanizado em Contagem. Da prevenção à
                reabilitação, estamos com você.
              </p>
            </div>

            {/* Specialists */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Especialistas
              </p>
              <p className="text-sm mb-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                Dra. Nicole Rezende Gonçalves ·{" "}
                <span style={{ color: "#8ECFC0" }}>CRO-MG 53004</span>
              </p>
              <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.65)" }}>
                Dra. Bianca Rezende Gonçalves ·{" "}
                <span style={{ color: "#A8C8D8" }}>CRO-MG 53040</span>
              </p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "0.85rem" }}>
                <WhatsAppIcon size={15} />
                Agendar consulta
              </a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
              © {new Date().getFullYear()} N&amp;B Odontologia · Todos os direitos reservados
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
              Contagem, Minas Gerais
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
