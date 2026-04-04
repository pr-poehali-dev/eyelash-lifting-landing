import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/c0acc915-0e9f-4049-ab0a-4182d48e0214/files/03d47b44-17ee-42d4-a2c0-5ecfadc86850.jpg";
const BROW_IMAGE = "https://cdn.poehali.dev/projects/c0acc915-0e9f-4049-ab0a-4182d48e0214/files/26ae7a9e-7269-4bf8-96f0-882932d5b501.jpg";
const TOOLS_IMAGE = "https://cdn.poehali.dev/projects/c0acc915-0e9f-4049-ab0a-4182d48e0214/files/9ac1edfb-1f90-4058-beaa-e92eb5cac7ba.jpg";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, inView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const accepted = localStorage.getItem("cookie_accepted");
    if (!accepted) setVisible(true);
  }, []);
  if (!visible) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 glass rounded-2xl p-4 shadow-2xl animate-fade-up">
      <p className="text-sm text-[#c4b89a] leading-relaxed mb-3">
        Сайт использует Яндекс.Метрику — российский сервис аналитики. Продолжая использовать сайт, вы соглашаетесь с{" "}
        <a href="#privacy" className="text-[#D4AF37] underline">Политикой обработки ПДн</a>.
      </p>
      <button
        onClick={() => { localStorage.setItem("cookie_accepted", "1"); setVisible(false); }}
        className="bg-gradient-gold text-[#0F0B0D] text-sm font-semibold px-5 py-2 rounded-xl hover:opacity-90 transition-opacity"
      >
        Принять
      </button>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#services", label: "Услуги" },
    { href: "#cases", label: "Работы" },
    { href: "#about", label: "Обо мне" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Записаться" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? "glass-dark shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-display text-xl font-semibold">
          <span className="text-gradient-gold">Anna</span>
          <span className="text-[#F5EDD8] ml-1">Beauty</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-[#c4b89a] hover:text-[#D4AF37] transition-colors duration-200">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden md:inline-flex items-center gap-2 bg-gradient-gold text-[#0F0B0D] text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all hover:scale-105">
          <Icon name="Calendar" size={16} />
          Записаться
        </a>
        <button className="md:hidden text-[#D4AF37]" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden glass-dark border-t border-[#D4AF37]/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="text-[#c4b89a] hover:text-[#D4AF37] transition-colors py-1">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Анна — бровист визажист" className="w-full h-full object-cover object-top opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0B0D] via-[#0F0B0D]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0B0D] via-transparent to-[#0F0B0D]/30" />
      </div>
      <div className="absolute top-20 right-1/3 w-96 h-96 rounded-full bg-[#C9607A]/10 blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-[#D4AF37]/8 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 opacity-0 animate-fade-up" style={{ animationFillMode: "forwards" }}>
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-xs text-[#D4AF37] font-medium tracking-wider uppercase">Ростов-на-Дону · Принимаю записи</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-light leading-[1.05] mb-6 opacity-0 animate-fade-up animate-delay-100" style={{ animationFillMode: "forwards" }}>
            Бровист<br />
            <span className="text-gradient-main font-semibold italic">& Визажист</span><br />
            <span className="text-[#F5EDD8]">Анна</span>
          </h1>

          <p className="text-lg text-[#c4b89a] leading-relaxed mb-10 max-w-lg opacity-0 animate-fade-up animate-delay-200" style={{ animationFillMode: "forwards" }}>
            Подчёркиваю природную красоту бровей и создаю образы, которые хочется повторять снова и снова. Более 5 лет опыта, сотни счастливых клиенток.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up animate-delay-300" style={{ animationFillMode: "forwards" }}>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-[#0F0B0D] font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 glow-gold text-base">
              <Icon name="Sparkles" size={20} />
              Записаться онлайн
            </a>
            <a href="#cases" className="inline-flex items-center justify-center gap-2 glass text-[#F5EDD8] font-medium px-8 py-4 rounded-2xl hover:border-[#D4AF37]/40 transition-all text-base">
              <Icon name="Images" size={20} />
              Посмотреть работы
            </a>
          </div>

          <div className="flex gap-8 mt-14 opacity-0 animate-fade-up animate-delay-400" style={{ animationFillMode: "forwards" }}>
            {[
              { value: "500+", label: "клиенток" },
              { value: "5 лет", label: "опыта" },
              { value: "4.9 ★", label: "рейтинг" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-semibold text-[#D4AF37]">{s.value}</div>
                <div className="text-xs text-[#8a7a6a] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs text-[#8a7a6a] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </div>
    </section>
  );
}

function Stats() {
  const { ref, inView } = useInView(0.3);
  const c1 = useCounter(500, inView);
  const c2 = useCounter(5, inView);
  const c3 = useCounter(98, inView);
  const c4 = useCounter(150, inView);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-luxury" />
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="section-divider absolute bottom-0 left-0 right-0" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { count: c1, suffix: "+", label: "довольных клиенток", icon: "Heart" },
            { count: c2, suffix: " лет", label: "профессионального опыта", icon: "Award" },
            { count: c3, suffix: "%", label: "возвращаются снова", icon: "RefreshCw" },
            { count: c4, suffix: "+", label: "работ в портфолио", icon: "Images" },
          ].map((s, i) => (
            <div key={i} className={`text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#D4AF37]/10 mb-4">
                <Icon name={s.icon} size={22} className="text-[#D4AF37]" />
              </div>
              <div className="font-display text-4xl md:text-5xl font-semibold text-gradient-gold">
                {s.count}{s.suffix}
              </div>
              <div className="text-sm text-[#8a7a6a] mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { ref, inView } = useInView(0.1);
  const services = [
    { icon: "✨", title: "Ламинирование бровей", desc: "Придаёт форму, фиксирует волоски, делает взгляд выразительнее. Эффект держится 4–6 недель.", price: "от 1 500 ₽", tag: "Хит" },
    { icon: "〰️", title: "Коррекция бровей", desc: "Идеальная форма с учётом строения лица. Восковая или нитевая техника.", price: "от 600 ₽", tag: null },
    { icon: "🎨", title: "Окрашивание бровей", desc: "Хна или краска. Натуральный результат, который подчёркивает взгляд на несколько недель.", price: "от 800 ₽", tag: null },
    { icon: "💄", title: "Макияж дневной", desc: "Свежий образ для офиса, встречи или особого случая. Натуральная красота.", price: "от 2 500 ₽", tag: null },
    { icon: "💍", title: "Макияж вечерний", desc: "Яркий, стойкий образ для торжества, ресторана или фотосессии.", price: "от 3 500 ₽", tag: "Популярно" },
    { icon: "👰", title: "Свадебный образ", desc: "Брови + макияж + пробный сеанс. Незабываемый образ в самый важный день.", price: "от 6 000 ₽", tag: "Комплекс" },
  ];

  return (
    <section id="services" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs text-[#D4AF37] tracking-[0.3em] uppercase mb-4 block">Услуги</span>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
            Что я <span className="text-gradient-gold italic font-semibold">предлагаю</span>
          </h2>
          <p className="text-[#8a7a6a] max-w-md mx-auto">Каждая процедура — это внимание к деталям и результат, который вам понравится</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div key={i}
              className={`group glass rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all duration-500 hover:-translate-y-1 relative ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              {s.tag && (
                <span className="absolute top-4 right-4 text-xs bg-gradient-gold text-[#0F0B0D] font-semibold px-3 py-1 rounded-full">
                  {s.tag}
                </span>
              )}
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-display text-xl font-semibold text-[#F5EDD8] mb-2">{s.title}</h3>
              <p className="text-sm text-[#8a7a6a] leading-relaxed mb-4">{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-[#D4AF37] font-semibold">{s.price}</span>
                <a href="#contact" className="text-xs text-[#8a7a6a] hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                  Записаться <Icon name="ArrowRight" size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-10 transition-all duration-700 delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a href="#contact" className="inline-flex items-center gap-2 bg-gradient-rose text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-all hover:scale-105 glow-rose">
            <Icon name="Calendar" size={18} />
            Записаться на консультацию
          </a>
        </div>
      </div>
    </section>
  );
}

function Cases() {
  const { ref, inView } = useInView(0.1);
  const [active, setActive] = useState(0);

  const cases = [
    {
      title: "Свадебный образ",
      problem: "Невеста хотела выглядеть естественно, но торжественно",
      solution: "Ламинирование + коррекция бровей, лёгкий глэм-макияж",
      result: "Образ продержался 14 часов, невеста была в восторге",
      emoji: "👰",
    },
    {
      title: "Деловая женщина",
      problem: "Разные по форме брови, неуверенность во внешности",
      solution: "3 сеанса ламинирования + коррекция + обучение укладке",
      result: "Брови стали симметричными, клиентка отметила рост уверенности",
      emoji: "💼",
    },
    {
      title: "Выпускной вечер",
      problem: "Нужен был стойкий яркий макияж для танцев и фото",
      solution: "Стойкие техники + вечерний макияж с акцентом на взгляд",
      result: "Макияж простоял весь вечер, фото разлетелись по соцсетям",
      emoji: "🎓",
    },
  ];

  return (
    <section id="cases" className="py-24 relative bg-[#0A080A]" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs text-[#C9607A] tracking-[0.3em] uppercase mb-4 block">Кейсы</span>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
            Реальные <span className="text-gradient-rose italic font-semibold">результаты</span>
          </h2>
        </div>

        <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex gap-3 justify-center mb-10 flex-wrap">
            {cases.map((c, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${active === i ? "bg-gradient-rose text-white glow-rose" : "glass text-[#8a7a6a] hover:text-[#F5EDD8]"}`}>
                <span>{c.emoji}</span> {c.title}
              </button>
            ))}
          </div>

          <div className="glass rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "Задача", text: cases[active].problem, color: "text-[#8a7a6a]", icon: "HelpCircle" },
                { label: "Решение", text: cases[active].solution, color: "text-[#D4AF37]", icon: "Lightbulb" },
                { label: "Результат", text: cases[active].result, color: "text-[#C9607A]", icon: "Star" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 mb-3">
                    <Icon name={item.icon} size={18} className={item.color} />
                  </div>
                  <div className="text-xs tracking-widest uppercase mb-2 text-[#8a7a6a]">{item.label}</div>
                  <p className="text-sm text-[#c4b89a] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <a href="#contact" className="inline-flex items-center gap-2 bg-gradient-gold text-[#0F0B0D] font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all hover:scale-105 text-sm">
                <Icon name="Sparkles" size={16} />
                Хочу такой же результат
              </a>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 mt-12 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="aspect-square rounded-2xl overflow-hidden">
            <img src={BROW_IMAGE} alt="Работы бровиста" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="aspect-square rounded-2xl overflow-hidden col-span-1 md:col-span-2">
            <img src={TOOLS_IMAGE} alt="Инструменты визажиста" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  const { ref, inView } = useInView(0.1);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    { q: "Какой повод вас привёл?", options: ["Свадьба / торжество", "Ежедневный уход", "Хочу изменить образ", "Подарок себе"] },
    { q: "Что вас больше всего беспокоит?", options: ["Форма бровей", "Макияж занимает много времени", "Хочу стойкий результат", "Просто хочу обновить образ"] },
    { q: "Как вы предпочитаете записываться?", options: ["WhatsApp / Telegram", "Звонок", "Онлайн-форма", "Социальные сети"] },
    { q: "Когда вам удобно прийти?", options: ["Будни утром", "Будни вечером", "Выходные", "Гибкий график"] },
  ];

  const result = () => {
    const a = answers[0];
    if (a?.includes("Свадьба")) return { service: "Свадебный образ (брови + макияж)", price: "от 6 000 ₽", tip: "Рекомендуем сделать пробный сеанс за 2 недели до события." };
    if (a?.includes("Ежедневный")) return { service: "Ламинирование бровей", price: "от 1 500 ₽", tip: "Экономит до 15 минут каждое утро." };
    if (a?.includes("Хочу изменить")) return { service: "Коррекция + окрашивание", price: "от 1 400 ₽", tip: "Лучший старт для обновления образа." };
    return { service: "Консультация + коррекция бровей", price: "от 600 ₽", tip: "Подберём идеальную форму под ваши черты лица." };
  };

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (step < questions.length - 1) setStep(step + 1);
    else setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setSubmitted(true);
  };

  const reset = () => {
    setStep(0); setAnswers([]); setShowForm(false);
    setSubmitted(false); setName(""); setPhone(""); setConsent(false);
  };

  return (
    <section id="quiz" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A0F14]/50 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs text-[#D4AF37] tracking-[0.3em] uppercase mb-4 block">Подбор услуги</span>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
            Что вам <span className="text-gradient-gold italic font-semibold">подойдёт?</span>
          </h2>
          <p className="text-[#8a7a6a] max-w-md mx-auto">4 вопроса — и я подберу идеальную услугу именно для вас</p>
        </div>

        <div className={`max-w-xl mx-auto transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="glass rounded-3xl p-8 md:p-10">
            {!showForm && !submitted && (
              <>
                <div className="flex gap-2 mb-8">
                  {questions.map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-gradient-gold" : "bg-white/10"}`} />
                  ))}
                </div>
                <p className="text-xs text-[#8a7a6a] mb-2">Вопрос {step + 1} из {questions.length}</p>
                <h3 className="font-display text-2xl font-semibold text-[#F5EDD8] mb-6">{questions[step].q}</h3>
                <div className="flex flex-col gap-3">
                  {questions[step].options.map((opt) => (
                    <button key={opt} onClick={() => handleAnswer(opt)}
                      className="w-full text-left px-5 py-3.5 rounded-xl border border-white/10 text-[#c4b89a] hover:border-[#D4AF37]/50 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all text-sm">
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}

            {showForm && !submitted && (
              <>
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl p-5 mb-6">
                  <div className="text-xs text-[#D4AF37] tracking-widest uppercase mb-2">Ваша рекомендация</div>
                  <div className="font-display text-xl font-semibold text-[#F5EDD8] mb-1">{result().service}</div>
                  <div className="text-[#D4AF37] font-semibold mb-2">{result().price}</div>
                  <p className="text-xs text-[#8a7a6a]">{result().tip}</p>
                </div>
                <h3 className="font-display text-xl font-semibold text-[#F5EDD8] mb-5">Записаться на приём</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input value={name} onChange={e => setName(e.target.value)} required
                    placeholder="Ваше имя" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F5EDD8] placeholder-[#8a7a6a] text-sm focus:outline-none focus:border-[#D4AF37]/50" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} required type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#F5EDD8] placeholder-[#8a7a6a] text-sm focus:outline-none focus:border-[#D4AF37]/50" />
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5 accent-[#D4AF37]" />
                    <span className="text-xs text-[#8a7a6a] leading-relaxed">
                      Я даю согласие на обработку персональных данных согласно <a href="#privacy" className="text-[#D4AF37] underline">Политике конфиденциальности</a>
                    </span>
                  </label>
                  <button type="submit" disabled={!consent}
                    className="w-full bg-gradient-gold text-[#0F0B0D] font-semibold py-3.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                    Получить запись
                  </button>
                </form>
                <button onClick={reset} className="w-full text-center text-xs text-[#8a7a6a] hover:text-[#D4AF37] transition-colors mt-3">
                  Пройти заново
                </button>
              </>
            )}

            {submitted && (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🌟</div>
                <h3 className="font-display text-2xl font-semibold text-[#D4AF37] mb-2">Отлично, {name}!</h3>
                <p className="text-[#c4b89a] text-sm leading-relaxed">Свяжусь с вами в ближайшее время для подтверждения записи.</p>
                <button onClick={reset} className="mt-6 text-xs text-[#8a7a6a] hover:text-[#D4AF37] transition-colors">Начать заново</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, inView } = useInView(0.1);
  const certs = [
    "Международный сертификат по ламинированию бровей",
    "Курс по архитектуре бровей, Москва 2024",
    "Продвинутый курс по вечернему макияжу 2025",
    "Сертификат по нарощённым ресницам",
  ];

  return (
    <section id="about" className="py-24 relative bg-[#0A080A]" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`relative transition-all duration-1000 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#D4AF37]/20 to-[#C9607A]/20 blur-xl" />
              <img src={HERO_IMAGE} alt="Анна — бровист визажист" className="relative z-10 w-full aspect-[3/4] object-cover object-top rounded-3xl" />
              <div className="absolute bottom-6 -right-4 z-20 glass rounded-2xl p-4 shadow-xl">
                <div className="text-[#D4AF37] font-display text-2xl font-bold">5+</div>
                <div className="text-xs text-[#8a7a6a]">лет опыта</div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <span className="text-xs text-[#D4AF37] tracking-[0.3em] uppercase mb-4 block">Обо мне</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
              Привет, я <span className="text-gradient-gold italic font-semibold">Анна</span>
            </h2>
            <p className="text-[#c4b89a] leading-relaxed mb-4">
              Бровист и визажист с 5-летним опытом работы в Ростове-на-Дону. Моя страсть — подчёркивать природную красоту каждой клиентки, помогать им чувствовать себя уверенно и великолепно.
            </p>
            <p className="text-[#c4b89a] leading-relaxed mb-8">
              Работаю только с проверенными профессиональными материалами. Постоянно повышаю квалификацию, слежу за трендами 2025–2026 в индустрии красоты.
            </p>
            <div className="space-y-3">
              <div className="text-xs text-[#8a7a6a] tracking-widest uppercase mb-4">Сертификаты & образование</div>
              {certs.map((cert, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={10} className="text-[#D4AF37]" />
                  </div>
                  <span className="text-sm text-[#c4b89a]">{cert}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a href="#contact" className="inline-flex items-center gap-2 bg-gradient-gold text-[#0F0B0D] font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all hover:scale-105 text-sm">
                <Icon name="MessageCircle" size={16} />
                Написать мне
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const { ref, inView } = useInView(0.1);
  const reviews = [
    { name: "Мария К.", text: "Анна — волшебница! Брови выглядят идеально, форма идеально подошла к моему лицу. Уже записалась снова!", rating: 5, service: "Ламинирование бровей" },
    { name: "Екатерина Л.", text: "Делала свадебный макияж. Просто восхитительно! Стоял весь день, фото получились нереальные.", rating: 5, service: "Свадебный образ" },
    { name: "Алина С.", text: "Давно мечтала о красивых бровях. После коррекции у Анны — не узнаю себя в хорошем смысле!", rating: 5, service: "Коррекция бровей" },
    { name: "Юлия П.", text: "Профессионализм на высшем уровне. Объяснила как ухаживать дома, всегда на связи. Рекомендую всем!", rating: 5, service: "Окрашивание" },
  ];

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs text-[#C9607A] tracking-[0.3em] uppercase mb-4 block">Отзывы</span>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
            Что говорят <span className="text-gradient-rose italic font-semibold">клиентки</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-1">{[1,2,3,4,5].map(i => <span key={i} className="text-[#D4AF37]">★</span>)}</div>
            <span className="text-[#D4AF37] font-semibold">4.9</span>
            <span className="text-[#8a7a6a] text-sm">· Яндекс Карты</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <div key={i}
              className={`glass rounded-2xl p-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-semibold text-[#F5EDD8]">{r.name}</div>
                  <div className="text-xs text-[#8a7a6a] mt-0.5">{r.service}</div>
                </div>
                <div className="flex gap-0.5">
                  {Array(r.rating).fill(0).map((_, j) => <span key={j} className="text-[#D4AF37] text-sm">★</span>)}
                </div>
              </div>
              <p className="text-sm text-[#c4b89a] leading-relaxed italic">"{r.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const { ref, inView } = useInView(0.1);
  const faqs = [
    { q: "Сколько держится ламинирование бровей?", a: "Эффект ламинирования сохраняется 4–6 недель в зависимости от типа волос и ухода. Для поддержания результата рекомендуется специальное масло для бровей." },
    { q: "Как подготовиться к процедуре?", a: "Никакой специальной подготовки не требуется. Приходите с чистым лицом без макияжа. Если вы принимаете препараты для разжижения крови — сообщите заранее." },
    { q: "Больно ли делать коррекцию бровей?", a: "Процедура практически безболезненна. Используется воск или нить — по вашему предпочтению. Многие клиентки засыпают прямо во время сеанса!" },
    { q: "Можно ли приходить с ребёнком?", a: "Конечно! Постараюсь создать комфортную атмосферу. Лучше уточнить при записи, чтобы я подготовила удобное место." },
    { q: "Как записаться на приём?", a: "Записаться можно через форму на сайте, по телефону или в мессенджерах. Отвечаю быстро — в течение 15 минут в рабочее время." },
    { q: "Делаете ли вы выездной макияж?", a: "Да, выезд на дом или в фотостудию возможен. Стоимость уточняется индивидуально в зависимости от удалённости." },
  ];

  return (
    <section id="faq" className="py-24 relative bg-[#0A080A]" ref={ref}>
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-4xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-xs text-[#D4AF37] tracking-[0.3em] uppercase mb-4 block">FAQ</span>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-4">
            Частые <span className="text-gradient-gold italic font-semibold">вопросы</span>
          </h2>
        </div>
        <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="glass rounded-2xl border-0 px-6 overflow-hidden">
                <AccordionTrigger className="text-[#F5EDD8] font-medium text-left hover:text-[#D4AF37] hover:no-underline py-5 transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#c4b89a] text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, inView } = useInView(0.1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-xs text-[#C9607A] tracking-[0.3em] uppercase mb-4 block">Запись</span>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-6">
              Записаться <span className="text-gradient-rose italic font-semibold">онлайн</span>
            </h2>
            <p className="text-[#c4b89a] leading-relaxed mb-10">Оставьте заявку — отвечу в течение 15 минут и подберём удобное время</p>
            <div className="space-y-6">
              {[
                { icon: "MapPin", label: "Адрес", value: "Ростов-на-Дону", sub: "Адрес уточняется при записи" },
                { icon: "Clock", label: "Часы работы", value: "Пн–Сб: 10:00–20:00", sub: "Вс: по договорённости" },
                { icon: "MessageCircle", label: "Мессенджеры", value: "WhatsApp, Telegram", sub: "Ответ в течение 15 минут" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8a7a6a] mb-0.5">{item.label}</div>
                    <div className="text-[#F5EDD8] font-medium">{item.value}</div>
                    <div className="text-xs text-[#8a7a6a]">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="glass rounded-3xl p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <h3 className="font-display text-2xl font-semibold text-[#F5EDD8] mb-2">Оставить заявку</h3>
                  <input value={name} onChange={e => setName(e.target.value)} required
                    placeholder="Ваше имя"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[#F5EDD8] placeholder-[#8a7a6a] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} required type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[#F5EDD8] placeholder-[#8a7a6a] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors" />
                  <textarea value={message} onChange={e => setMessage(e.target.value)}
                    placeholder="Какая услуга вас интересует? (необязательно)" rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-[#F5EDD8] placeholder-[#8a7a6a] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none" />
                  <label className="flex items-start gap-3 cursor-pointer mt-1">
                    <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-0.5 accent-[#D4AF37]" />
                    <span className="text-xs text-[#8a7a6a] leading-relaxed">
                      Я даю согласие на обработку персональных данных согласно{" "}
                      <a href="#privacy" className="text-[#D4AF37] underline">Политике конфиденциальности</a>
                    </span>
                  </label>
                  <button type="submit" disabled={!consent}
                    className="w-full bg-gradient-rose text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] glow-rose">
                    Записаться на приём
                  </button>
                </form>
              ) : (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">💫</div>
                  <h3 className="font-display text-2xl font-semibold text-[#D4AF37] mb-2">Заявка принята!</h3>
                  <p className="text-[#c4b89a] text-sm">Свяжусь с вами в течение 15 минут для подтверждения записи.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrivacySection() {
  return (
    <section id="privacy" className="py-16 bg-[#080608] border-t border-[#D4AF37]/10">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display text-3xl font-semibold text-[#F5EDD8] mb-6">Политика обработки персональных данных</h2>
        <div className="space-y-4 text-sm text-[#8a7a6a] leading-relaxed">
          <p><span className="text-[#c4b89a]">Оператор:</span> Индивидуальный предприниматель Анна, г. Ростов-на-Дону.</p>
          <p><span className="text-[#c4b89a]">Цели сбора данных:</span> Обработка заявок на услуги, запись клиентов, связь по вопросам оказания услуг.</p>
          <p><span className="text-[#c4b89a]">Перечень данных:</span> Имя, номер телефона, сведения об интересующих услугах.</p>
          <p><span className="text-[#c4b89a]">Срок хранения:</span> 3 года с момента последнего обращения.</p>
          <p><span className="text-[#c4b89a]">Локализация:</span> Данные хранятся на серверах в Российской Федерации (Яндекс.Облако).</p>
          <p><span className="text-[#c4b89a]">Права субъекта:</span> Вы вправе запросить доступ, исправление или удаление своих данных через форму на сайте или по телефону.</p>
          <p><span className="text-[#c4b89a]">Передача третьим лицам:</span> Данные не передаются третьим лицам без вашего согласия.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#080608] border-t border-[#D4AF37]/10 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="font-display text-2xl font-semibold mb-3">
              <span className="text-gradient-gold">Anna</span>
              <span className="text-[#F5EDD8] ml-1">Beauty</span>
            </div>
            <p className="text-xs text-[#8a7a6a] leading-relaxed max-w-xs">
              Профессиональный бровист и визажист в Ростове-на-Дону. Ваша красота — моя работа.
            </p>
          </div>
          <div>
            <div className="text-xs text-[#8a7a6a] tracking-widest uppercase mb-4">Услуги</div>
            <div className="space-y-2">
              {["Ламинирование бровей", "Коррекция бровей", "Макияж", "Свадебный образ"].map(s => (
                <a key={s} href="#services" className="block text-sm text-[#c4b89a] hover:text-[#D4AF37] transition-colors">{s}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#8a7a6a] tracking-widest uppercase mb-4">Правовая информация</div>
            <div className="space-y-2">
              <a href="#privacy" className="block text-sm text-[#c4b89a] hover:text-[#D4AF37] transition-colors">Политика конфиденциальности</a>
              <a href="#privacy" className="block text-sm text-[#c4b89a] hover:text-[#D4AF37] transition-colors">Согласие на обработку ПДн</a>
            </div>
          </div>
        </div>
        <div className="section-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8a7a6a]">© 2026 Анна — бровист визажист. Ростов-на-Дону.</p>
          <p className="text-xs text-[#8a7a6a]">Разработка сайта — @kheps</p>
        </div>
      </div>
    </footer>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen bg-[#0F0B0D]">
      <CookieBanner />
      <Header />
      <Hero />
      <Stats />
      <Services />
      <Cases />
      <Calculator />
      <About />
      <Reviews />
      <FAQ />
      <Contact />
      <PrivacySection />
      <Footer />
    </div>
  );
};

export default Index;