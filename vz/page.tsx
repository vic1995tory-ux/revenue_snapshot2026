"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  MapPin,
  Shield,
  Phone,
  Send,
  Download,
  ChevronDown,
  Users,
  HeartHandshake,
  Mountain,
  BedDouble,
  Utensils,
  Cross,
  BadgeCheck,
  Train,
  Plane,
  Video,
  CalendarDays,
  Clock3,
  Gift,
  Star,
  ArrowDown,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const brand = {
  bg: "#FFFDF8",
  cream: "#FFFDF8",
  blue: "#2E4A8B",
  gold: "#D6B65E",
  olive: "#8C9A5B",
  text: "#22304A",
  muted: "#64708A",
  line: "rgba(46,74,139,0.12)",
};

const navItems = [
  { label: "Локация", href: "#location" },
  { label: "Проживание", href: "#living" },
  { label: "Программа", href: "#highlights" },
  { label: "Цены", href: "#pricing" },
  { label: "Команда", href: "#team" },
  { label: "Вебинары", href: "#webinars" },
  { label: "FAQ", href: "#faq" },
];

const heroHighlights = [
  "Малые группы и внимательная среда",
  "Психолог в команде каждой смены",
  "Сопровождение детей из Москвы",
  "Развитие самостоятельности без перегруза",
  "Розыгрыш зимней смены на каждом сезоне",
];

const locationFacts = [
  {
    title: "Регион",
    text: "Горная природная локация с чистым воздухом и спокойной средой для отдыха и развития.",
    icon: Mountain,
  },
  {
    title: "Инфраструктура",
    text: "Комфортное размещение, оборудованная территория, логистика и организованные зоны активности.",
    icon: MapPin,
  },
  {
    title: "Безопасность",
    text: "Постоянный контроль взрослых, понятный режим дня, медицинское сопровождение и проверенная локация.",
    icon: Shield,
  },
  {
    title: "Среда",
    text: "Условия, в которых подростку проще раскрыться, быть включённым и выйти из привычного напряжения.",
    icon: Users,
  },
];

const livingCards = [
  {
    title: "Размещение",
    text: "Уютные комнаты, продуманное расселение по возрасту и динамике группы.",
    icon: BedDouble,
  },
  {
    title: "Питание",
    text: "Регулярное питание по режиму с базовым вниманием к комфорту и самочувствию ребёнка.",
    icon: Utensils,
  },
  {
    title: "Мед. сопровождение",
    text: "Контроль состояния и быстрый контакт с родителем при необходимости.",
    icon: Cross,
  },
  {
    title: "Контроль взрослых",
    text: "Кураторы, психолог и организаторы остаются включёнными в процесс на протяжении всей смены.",
    icon: BadgeCheck,
  },
];

const highlightCards = [
  {
    title: "Психологическая программа",
    text: "Смена строится не только вокруг отдыха, но и вокруг внутренней устойчивости подростка.",
  },
  {
    title: "Малые группы",
    text: "Комфортный формат, в котором ребёнка замечают и поддерживают, а не теряют в массе.",
  },
  {
    title: "Наставничество",
    text: "Подросток получает рядом взрослых, которым можно доверять и на которых можно опереться.",
  },
  {
    title: "Работа с уверенностью",
    text: "Форматы активности помогают прожить опыт самостоятельности, коммуникации и инициативы.",
  },
  {
    title: "Без гаджет-зависимости",
    text: "Фокус на реальном опыте, движении, общении и присутствии в моменте.",
  },
  {
    title: "Индивидуальное внимание",
    text: "Команда отслеживает адаптацию, участие и эмоциональное состояние каждого ребёнка.",
  },
];

const campCards = [
  {
    title: "Июльская смена",
    period: "12–21 июля",
    status: "Sold out",
    price: "Мест нет",
    description: "Первая смена полностью забронирована. Можно оставить заявку в лист ожидания.",
    featured: false,
  },
  {
    title: "Августовская смена",
    period: "2–11 августа",
    status: "Открыта бронь",
    price: "от 90 000 ₽",
    description: "Основной поток заявок. Подходит для родителей, которым важно заранее пройти знакомство и вебинары.",
    featured: true,
  },
  {
    title: "Конец августа",
    period: "18–27 августа",
    status: "Открыта бронь",
    price: "от 95 000 ₽",
    description: "Хороший вариант для тех, кто хочет спокойно подготовить ребёнка к осени через мягкий переход.",
    featured: false,
  },
];

const paymentRows = [
  {
    label: "Рассрочка",
    rows: [
      "100 000 ₽ до конца марта",
      "105 000 ₽ до конца апреля",
      "115 000 ₽ до конца мая",
    ],
  },
  {
    label: "В два транша",
    rows: [
      "95 000 ₽ до конца марта",
      "97 000 ₽ до конца апреля",
      "105 000 ₽ до конца мая",
    ],
  },
  {
    label: "Одним траншем",
    rows: [
      "85 000 ₽ до конца марта",
      "90 000 ₽ до конца апреля",
      "95 000 ₽ до конца мая",
    ],
  },
];

const offers = [
  {
    title: "Приведи друга",
    text: "20% скидки для каждого",
    price: "115 000 ₽ → 92 000 ₽",
    icon: Gift,
  },
  {
    title: "Скидка именинникам",
    text: "10% при бронировании и полной оплате в течение 7 дней со дня рождения",
    price: "105 000 ₽ → 94 500 ₽",
    icon: Star,
  },
  {
    title: "Постоянный клиент",
    text: "Лояльность от 3% до 10%, скидка накапливается с каждой поездкой и не сгорает",
    price: "По истории участия",
    icon: HeartHandshake,
  },
  {
    title: "Розыгрыш зимней смены",
    text: "На каждой смене проходит розыгрыш участия в следующем сезоне",
    price: "Спец. бонус",
    icon: Gift,
    featured: true,
  },
];

const team = [
  {
    name: "Фёдор",
    role: "Психолог программы",
    about: "Работает с подростками и родителями, помогает выстроить безопасную среду, доверие и устойчивую адаптацию.",
    accent: "Ведёт бесплатные вебинары",
    featured: true,
  },
  {
    name: "Кураторы смены",
    role: "Сопровождение и группа",
    about: "Поддерживают включённость подростков, следят за ритмом дня, коммуникацией и участием в программе.",
    accent: "Постоянно рядом",
  },
  {
    name: "Организаторы",
    role: "Логистика и координация",
    about: "Отвечают за системность, маршрут, заселение, коммуникацию с родителями и общий ход смены.",
    accent: "Проверенный процесс",
  },
];

const webinars = [
  {
    date: "Определяется с Фёдором",
    title: "Подростковая самостоятельность",
    text: "Как отличить здоровую самостоятельность от закрытости, сопротивления и утомления.",
    time: "19:00",
    meta: ["60 минут", "Zoom", "Материалы после встречи"],
    passed: false,
  },
  {
    date: "Определяется с Фёдором",
    title: "Границы и доверие",
    text: "Как сохранить контакт с подростком, не усиливая контроль и напряжение дома.",
    time: "19:00",
    meta: ["60 минут", "Zoom", "Q&A блок"],
    passed: false,
  },
  {
    date: "Определяется с Фёдором",
    title: "Подходит ли вашему ребёнку лагерь",
    text: "На какие сигналы родителю смотреть до принятия решения и как понять готовность ребёнка.",
    time: "19:00",
    meta: ["60 минут", "Zoom", "Запись доступна"],
    passed: true,
  },
];

const faq = [
  {
    q: "Безопасно ли это?",
    a: "Да. Важная часть проекта — это контролируемая среда, взрослая команда, проверенная локация, понятная логистика и прозрачная коммуникация с родителями.",
  },
  {
    q: "Что если ребёнок захочет домой?",
    a: "Команда мягко сопровождает адаптацию и сначала помогает прожить тревогу. Если ситуация требует отдельного решения, родители сразу включаются в коммуникацию.",
  },
  {
    q: "Можно ли связаться с ребёнком во время смены?",
    a: "Да, формат связи и правила контакта заранее проговариваются. Родитель понимает, как устроена коммуникация и кому писать по вопросам.",
  },
  {
    q: "Какие есть противопоказания?",
    a: "Ограничения обсуждаются индивидуально до бронирования. Это помогает честно оценить, подходит ли формат конкретному подростку.",
  },
  {
    q: "Как работает возврат?",
    a: "Условия бронирования, переноса и возврата прописываются в оферте и объясняются до оплаты. Для родителя всё должно быть прозрачно.",
  },
  {
    q: "Что брать с собой?",
    a: "Перед сменой семья получает подробный список вещей, рекомендации по одежде, дороге и базовой подготовке ребёнка.",
  },
];

function cls(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(" ");
}

function SectionTitle({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl space-y-3">
      {eyebrow ? (
        <div
          className="inline-flex rounded-full border px-3 py-1 text-xs font-medium tracking-[0.16em] uppercase"
          style={{ borderColor: brand.line, color: brand.blue }}
        >
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl" style={{ color: brand.text }}>
        {title}
      </h2>
      {text ? (
        <p className="max-w-2xl text-sm leading-7 md:text-base" style={{ color: brand.muted }}>
          {text}
        </p>
      ) : null}
    </div>
  );
}

function InfoBadge({ children, accent = "blue" }: { children: React.ReactNode; accent?: "blue" | "gold" | "olive" }) {
  const styles =
    accent === "gold"
      ? { backgroundColor: "rgba(214,182,94,0.18)", color: brand.text, borderColor: "rgba(214,182,94,0.34)" }
      : accent === "olive"
      ? { backgroundColor: "rgba(140,154,91,0.14)", color: brand.text, borderColor: "rgba(140,154,91,0.34)" }
      : { backgroundColor: "rgba(46,74,139,0.08)", color: brand.blue, borderColor: "rgba(46,74,139,0.18)" };

  return (
    <span className="inline-flex rounded-full border px-3 py-1 text-xs font-medium" style={styles}>
      {children}
    </span>
  );
}

function ContactForm({ title, compact = false }: { title: string; compact?: boolean }) {
  return (
    <Card className="overflow-hidden rounded-[28px] border-0 shadow-[0_20px_80px_rgba(34,48,74,0.08)]">
      <CardContent className={cls("p-6 md:p-8", compact && "p-5 md:p-6")}>
        <div className="mb-5 space-y-2">
          <h3 className="text-xl font-semibold" style={{ color: brand.text }}>
            {title}
          </h3>
          <p className="text-sm leading-6" style={{ color: brand.muted }}>
            Оставьте контакты, и мы свяжемся удобным для вас способом.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Имя и фамилия" className="h-11 rounded-2xl border-0 bg-[#F5F6F9]" />
          <Input placeholder="Количество детей" className="h-11 rounded-2xl border-0 bg-[#F5F6F9]" />
          <Input placeholder="Возраст ребёнка" className="h-11 rounded-2xl border-0 bg-[#F5F6F9]" />
          <Input placeholder="Телефон" className="h-11 rounded-2xl border-0 bg-[#F5F6F9]" />
          <Input placeholder="Email" className="h-11 rounded-2xl border-0 bg-[#F5F6F9]" />
          <Input placeholder="Telegram / VK / Max" className="h-11 rounded-2xl border-0 bg-[#F5F6F9]" />
        </div>

        {!compact ? (
          <Textarea
            placeholder="Удобный способ связи и короткий комментарий"
            className="mt-3 min-h-[112px] rounded-[22px] border-0 bg-[#F5F6F9]"
          />
        ) : null}

        <label className="mt-4 flex items-start gap-3 text-sm leading-6" style={{ color: brand.muted }}>
          <input type="checkbox" className="mt-1 h-4 w-4 rounded" />
          <span>Согласен(а) на обработку персональных данных</span>
        </label>

        <Button
          className="mt-5 h-11 w-full rounded-2xl text-sm font-medium"
          style={{ backgroundColor: brand.blue, color: "white" }}
        >
          Отправить заявку
        </Button>
      </CardContent>
    </Card>
  );
}

function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#22304A]/40 px-4 py-10 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="relative max-h-[90vh] w-full max-w-6xl overflow-auto rounded-[32px] bg-white shadow-[0_30px_120px_rgba(34,48,74,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-10 rounded-full border border-black/10 p-2 text-slate-500 transition hover:bg-slate-50"
              aria-label="Закрыть"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="border-b px-6 py-5 md:px-8" style={{ borderColor: brand.line }}>
              <h3 className="text-2xl font-semibold" style={{ color: brand.text }}>
                {title}
              </h3>
            </div>
            <div className="p-6 md:p-8">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function VoskhodLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroOpen, setHeroOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [escortOpen, setEscortOpen] = useState(true);

  const soldOutCount = useMemo(() => campCards.filter((item) => item.status === "Sold out").length, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: brand.bg }}>
      <header className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur-xl" style={{ borderColor: brand.line }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold text-white"
              style={{ backgroundColor: brand.blue }}
            >
              ВЗ
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: brand.text }}>
                Восходящая звезда
              </div>
              <div className="text-xs" style={{ color: brand.muted }}>
                Подростковые смены с психологической программой
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm transition hover:opacity-70"
                style={{ color: brand.text }}
              >
                {item.label}
              </a>
            ))}
            <a href="#" className="text-sm font-medium underline underline-offset-4" style={{ color: brand.blue }}>
              Договор оферты
            </a>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="outline" className="rounded-2xl border" style={{ borderColor: brand.line, color: brand.text }}>
              <Send className="mr-2 h-4 w-4" /> Telegram
            </Button>
            <Button variant="outline" className="rounded-2xl border" style={{ borderColor: brand.line, color: brand.text }}>
              VK
            </Button>
            <Button variant="outline" className="rounded-2xl border" style={{ borderColor: brand.line, color: brand.text }}>
              <Phone className="mr-2 h-4 w-4" /> +7 (000) 000-00-00
            </Button>
            <Button className="rounded-2xl" style={{ backgroundColor: brand.gold, color: brand.text }} onClick={() => setHeroOpen(true)}>
              Записаться
            </Button>
          </div>

          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="inline-flex rounded-2xl border p-2 lg:hidden"
            style={{ borderColor: brand.line, color: brand.text }}
            aria-label="Меню"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t lg:hidden"
              style={{ borderColor: brand.line }}
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:px-6">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="text-sm" style={{ color: brand.text }}>
                    {item.label}
                  </a>
                ))}
                <a href="#" className="text-sm underline underline-offset-4" style={{ color: brand.blue }}>
                  Договор оферты
                </a>
                <div className="grid gap-2 pt-2 sm:grid-cols-2">
                  <Button variant="outline" className="rounded-2xl">Telegram</Button>
                  <Button variant="outline" className="rounded-2xl">VK</Button>
                  <Button variant="outline" className="rounded-2xl sm:col-span-2">+7 (000) 000-00-00</Button>
                  <Button className="rounded-2xl sm:col-span-2" style={{ backgroundColor: brand.gold, color: brand.text }} onClick={() => setHeroOpen(true)}>
                    Записаться
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b" style={{ borderColor: brand.line }}>
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute left-[-8%] top-[-10%] h-[28rem] w-[28rem] rounded-full blur-3xl"
              style={{ background: "rgba(214,182,94,0.16)" }}
            />
            <div
              className="absolute right-[-6%] top-[10%] h-[24rem] w-[24rem] rounded-full blur-3xl"
              style={{ background: "rgba(140,154,91,0.12)" }}
            />
          </div>

          <div className="mx-auto grid min-h-[92vh] max-w-7xl items-stretch lg:grid-cols-2">
            <div className="flex items-center px-4 py-14 md:px-6 lg:px-8 lg:py-20">
              <div className="max-w-2xl">
                <div className="mb-5 flex flex-wrap gap-2">
                  <InfoBadge accent="blue">Психологическая программа</InfoBadge>
                  <InfoBadge accent="olive">Сопровождение из Москвы</InfoBadge>
                  <InfoBadge accent="gold">Розыгрыш зимней смены</InfoBadge>
                </div>

                <h1 className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl" style={{ color: brand.text }}>
                  Лагерь, в котором подросток не теряется, а раскрывается
                </h1>

                <p className="mt-6 max-w-xl text-base leading-8 md:text-lg" style={{ color: brand.muted }}>
                  Безопасная смена с живой командой, малым форматом групп и психологической опорой — чтобы ребёнок вернулся сильнее, спокойнее и увереннее.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {heroHighlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-[22px] border bg-white/80 px-4 py-3 backdrop-blur-sm"
                      style={{ borderColor: brand.line }}
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: brand.blue }} />
                      <span className="text-sm leading-6" style={{ color: brand.text }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button className="h-12 rounded-2xl px-6" style={{ backgroundColor: brand.blue, color: "white" }} onClick={() => setHeroOpen(true)}>
                    Получить консультацию
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 rounded-2xl px-6"
                    style={{ borderColor: brand.blue, color: brand.blue }}
                    onClick={() => setProgramOpen(true)}
                  >
                    <Download className="mr-2 h-4 w-4" /> Скачать программу
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap gap-6 text-sm" style={{ color: brand.muted }}>
                  <div>
                    <div className="text-2xl font-semibold" style={{ color: brand.text }}>85%</div>
                    <div>возвращаются повторно</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold" style={{ color: brand.text }}>200+</div>
                    <div>подростков прошли смены</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold" style={{ color: brand.text }}>{soldOutCount}</div>
                    <div>смена уже sold out</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative min-h-[420px] lg:min-h-full">
              <div className="absolute inset-4 lg:inset-6">
                <div className="grid h-full grid-cols-12 grid-rows-12 gap-4">
                  <div className="col-span-12 row-span-12 overflow-hidden rounded-[32px] lg:col-span-12">
                    <img
                      src="/camp-hero-main.jpg"
                      alt="Фото лагеря"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-5 left-5 max-w-xs rounded-[24px] border bg-white/82 p-4 backdrop-blur-xl" style={{ borderColor: brand.line }}>
                    <div className="mb-2 text-sm font-medium" style={{ color: brand.blue }}>
                      Каждая смена — шанс на следующий сезон
                    </div>
                    <p className="text-sm leading-6" style={{ color: brand.text }}>
                      На каждой смене проходит розыгрыш участия в зимней программе. Это поддерживает вовлечённость и создаёт ощущение продолжения пути.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="location" className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-[28px] shadow-[0_20px_80px_rgba(34,48,74,0.08)] sm:col-span-2">
                  <img src="/location-main.jpg" alt="Локация лагеря" className="h-[330px] w-full object-cover md:h-[420px]" />
                </div>
                <div className="overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(34,48,74,0.06)]">
                  <img src="/location-2.jpg" alt="Природа" className="h-48 w-full object-cover md:h-56" />
                </div>
                <div className="overflow-hidden rounded-[24px] shadow-[0_20px_60px_rgba(34,48,74,0.06)]">
                  <img src="/location-3.jpg" alt="Территория" className="h-48 w-full object-cover md:h-56" />
                </div>
              </div>

              <div className="overflow-hidden rounded-[28px] border bg-white" style={{ borderColor: brand.line }}>
                <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: brand.line }}>
                  <div>
                    <div className="text-sm font-medium" style={{ color: brand.blue }}>Карта локации</div>
                    <div className="text-xs" style={{ color: brand.muted }}>Встраивается через iframe Яндекс.Карт</div>
                  </div>
                  <InfoBadge accent="olive">Проверенная локация</InfoBadge>
                </div>
                <div className="flex h-[320px] items-center justify-center bg-[#EEF2F8] text-center text-sm leading-6" style={{ color: brand.muted }}>
                  Здесь разместите iframe карты с одним маркером региона
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <SectionTitle
                eyebrow="Локация смены"
                title="Место, которое снижает тревожность, а не усиливает её"
                text="Родителю важно понимать не только красоту локации, но и то, как организована среда: дорога, размещение, инфраструктура и ежедневная безопасность."
              />

              <div className="mt-8 grid gap-4">
                {locationFacts.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.title} className="rounded-[24px] border-0 shadow-[0_20px_70px_rgba(34,48,74,0.06)]">
                      <CardContent className="flex gap-4 p-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: "rgba(46,74,139,0.08)" }}>
                          <Icon className="h-5 w-5" style={{ color: brand.blue }} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold" style={{ color: brand.text }}>
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm leading-6" style={{ color: brand.muted }}>
                            {item.text}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-5 overflow-hidden rounded-[24px] border bg-white" style={{ borderColor: brand.line }}>
                <button
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  onClick={() => setEscortOpen((s) => !s)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ backgroundColor: "rgba(214,182,94,0.18)" }}>
                      <Plane className="h-4 w-4" style={{ color: brand.text }} />
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: brand.text }}>Сопровождение из Москвы</div>
                      <div className="text-sm" style={{ color: brand.muted }}>В дороге ребёнок не остаётся один</div>
                    </div>
                  </div>
                  <ChevronDown className={cls("h-5 w-5 transition", escortOpen && "rotate-180")} style={{ color: brand.text }} />
                </button>
                <AnimatePresence>
                  {escortOpen ? (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="grid gap-3 border-t px-5 py-5" style={{ borderColor: brand.line }}>
                        {[
                          "Встреча в аэропорту или на ЖД",
                          "Куратор на всём пути следования",
                          "Минивэны по 7 человек",
                          "Контроль до заселения",
                        ].map((line, index) => (
                          <div key={index} className="flex items-center gap-3 text-sm" style={{ color: brand.text }}>
                            {index % 2 === 0 ? <Plane className="h-4 w-4" /> : <Train className="h-4 w-4" />}
                            <span>{line}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        <section id="living" className="border-y py-16 md:py-20" style={{ borderColor: brand.line, backgroundColor: "rgba(255,255,255,0.5)" }}>
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Проживание и быт"
              title="Комфортные условия с контролем и вниманием к каждому ребёнку"
              text="Этот блок должен спокойно отвечать на важный вопрос родителя: где именно будет жить ребёнок, кто рядом и как организован быт."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {livingCards.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="h-full rounded-[28px] border-0 bg-white shadow-[0_22px_80px_rgba(34,48,74,0.06)]">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: "rgba(140,154,91,0.14)" }}>
                        <Icon className="h-5 w-5" style={{ color: brand.text }} />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold" style={{ color: brand.text }}>
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6" style={{ color: brand.muted }}>
                        {item.text}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="highlights" className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
            <div className="flex flex-col justify-center">
              <SectionTitle
                eyebrow="Хайлайты лагеря"
                title="Не просто отдых, а среда, в которой подросток учится быть опорой себе"
                text="Здесь важно показать не абстрактные обещания, а то, как именно устроена программа и почему родители ей доверяют."
              />

              <div className="mt-7 flex flex-wrap gap-3">
                <InfoBadge accent="gold">Психологическая программа</InfoBadge>
                <InfoBadge accent="blue">Малые группы</InfoBadge>
                <InfoBadge accent="olive">Индивидуальное внимание</InfoBadge>
                <InfoBadge accent="blue">Наставничество</InfoBadge>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button className="h-12 rounded-2xl px-6" style={{ backgroundColor: brand.blue, color: "white" }} onClick={() => setProgramOpen(true)}>
                  <Download className="mr-2 h-4 w-4" /> Скачать подробную программу
                </Button>
                <Button variant="outline" className="h-12 rounded-2xl px-6" style={{ borderColor: brand.line, color: brand.text }}>
                  <Video className="mr-2 h-4 w-4" /> Видео прошлых смен
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {highlightCards.map((item, index) => (
                <Card
                  key={item.title}
                  className={cls(
                    "rounded-[28px] border-0 shadow-[0_22px_80px_rgba(34,48,74,0.06)]",
                    index === 0 || index === 3 ? "md:-translate-y-2" : ""
                  )}
                >
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: "rgba(46,74,139,0.08)", color: brand.blue }}>
                      0{index + 1}
                    </div>
                    <h3 className="text-lg font-semibold" style={{ color: brand.text }}>
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6" style={{ color: brand.muted }}>
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="border-y py-16 md:py-20" style={{ borderColor: brand.line, background: "linear-gradient(180deg, rgba(46,74,139,0.03) 0%, rgba(214,182,94,0.06) 100%)" }}>
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Этапы продаж и раннее бронирование"
              title="Летние смены и прозрачные условия оплаты"
              text="Блок должен быть понятным, спокойным и редактируемым: без агрессивного давления, но с ясной логикой выбора и понятной выгодой раннего бронирования."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {campCards.map((item) => (
                <Card
                  key={item.title}
                  className={cls(
                    "overflow-hidden rounded-[30px] border-0 shadow-[0_24px_90px_rgba(34,48,74,0.08)]",
                    item.featured ? "lg:-translate-y-3" : ""
                  )}
                >
                  <CardContent className="p-0">
                    <div
                      className="p-6"
                      style={{ backgroundColor: item.featured ? brand.blue : "white", color: item.featured ? "white" : brand.text }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-sm opacity-80">{item.period}</div>
                          <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
                        </div>
                        <span
                          className="rounded-full px-3 py-1 text-xs font-medium"
                          style={{
                            backgroundColor: item.featured ? "rgba(255,255,255,0.14)" : item.status === "Sold out" ? "rgba(99,116,138,0.12)" : "rgba(46,74,139,0.08)",
                            color: item.featured ? "white" : brand.text,
                          }}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-8 text-4xl font-semibold">{item.price}</div>
                      <p className="mt-4 text-sm leading-6" style={{ color: item.featured ? "rgba(255,255,255,0.82)" : brand.muted }}>
                        {item.description}
                      </p>
                      <Button
                        className="mt-6 h-11 w-full rounded-2xl"
                        style={{ backgroundColor: item.featured ? "white" : brand.gold, color: brand.text }}
                      >
                        Оставить заявку
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 grid gap-5 xl:grid-cols-[1fr_0.9fr]">
              <div className="grid gap-4 md:grid-cols-3">
                {offers.map((offer) => {
                  const Icon = offer.icon;
                  return (
                    <Card
                      key={offer.title}
                      className="rounded-[26px] border-0 bg-white shadow-[0_20px_70px_rgba(34,48,74,0.06)]"
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ backgroundColor: offer.featured ? "rgba(214,182,94,0.18)" : "rgba(46,74,139,0.08)" }}>
                            <Icon className="h-5 w-5" style={{ color: brand.text }} />
                          </div>
                          {offer.featured ? <InfoBadge accent="gold">Выделить в дизайне</InfoBadge> : null}
                        </div>
                        <h4 className="mt-5 text-lg font-semibold" style={{ color: brand.text }}>{offer.title}</h4>
                        <p className="mt-2 text-sm leading-6" style={{ color: brand.muted }}>{offer.text}</p>
                        <div className="mt-4 text-sm font-medium" style={{ color: brand.blue }}>{offer.price}</div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card className="rounded-[30px] border-0 shadow-[0_24px_90px_rgba(34,48,74,0.08)]">
                <CardContent className="p-6 md:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold" style={{ color: brand.text }}>
                        Условия раннего бронирования
                      </h3>
                      <p className="mt-2 text-sm leading-6" style={{ color: brand.muted }}>
                        Цены и даты можно менять без перестройки всего блока.
                      </p>
                    </div>
                    <Button className="rounded-2xl" style={{ backgroundColor: brand.blue, color: "white" }} onClick={() => setPricingOpen(true)}>
                      Условия оплаты
                    </Button>
                  </div>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {paymentRows.map((column) => (
                      <div key={column.label} className="rounded-[24px] border p-4" style={{ borderColor: brand.line, backgroundColor: "#F9FAFC" }}>
                        <div className="mb-3 text-sm font-semibold" style={{ color: brand.blue }}>{column.label}</div>
                        <div className="space-y-2 text-sm leading-6" style={{ color: brand.text }}>
                          {column.rows.map((line) => (
                            <div key={line} className="rounded-2xl bg-white px-3 py-2">{line}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="team" className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 lg:py-24">
          <SectionTitle
            eyebrow="Команда"
            title="Главное в лагере — команда"
            text="Среда подростка формируется людьми. Поэтому здесь важно показать не только лица, но и ощущение надёжности, профессионализма и человеческого тепла."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {team.map((person) => (
              <Card
                key={person.name}
                className={cls(
                  "overflow-hidden rounded-[30px] border-0 shadow-[0_24px_90px_rgba(34,48,74,0.06)]",
                  person.featured ? "lg:-translate-y-3" : ""
                )}
              >
                <div className="h-72 w-full bg-[#EAEFF7]">
                  <img src="/team-placeholder.jpg" alt={person.name} className="h-full w-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold" style={{ color: brand.text }}>{person.name}</h3>
                      <p className="text-sm" style={{ color: brand.blue }}>{person.role}</p>
                    </div>
                    {person.featured ? <InfoBadge accent="gold">Ключевой спикер</InfoBadge> : null}
                  </div>
                  <p className="mt-4 text-sm leading-6" style={{ color: brand.muted }}>{person.about}</p>
                  <div className="mt-4 inline-flex rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: "rgba(140,154,91,0.14)", color: brand.text }}>
                    {person.accent}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <motion.a
            href="#webinars"
            whileHover={{ y: 2 }}
            className="mt-10 flex items-center justify-between rounded-[28px] border bg-white px-6 py-5 shadow-[0_20px_70px_rgba(34,48,74,0.05)]"
            style={{ borderColor: brand.line }}
          >
            <div>
              <div className="text-lg font-semibold" style={{ color: brand.text }}>
                Познакомьтесь с нашим психологом ближе на бесплатных вебинарах для родителей
              </div>
              <div className="mt-1 text-sm" style={{ color: brand.muted }}>
                Мягкий переход к следующему шагу, который усиливает доверие и помогает принять решение без давления.
              </div>
            </div>
            <ArrowDown className="h-5 w-5 shrink-0" style={{ color: brand.blue }} />
          </motion.a>
        </section>

        <section id="webinars" className="border-y py-16 md:py-20" style={{ borderColor: brand.line, backgroundColor: "rgba(255,255,255,0.55)" }}>
          <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Бесплатные вебинары"
              title="3 встречи, которые помогают понять, подходит ли вашему ребёнку формат лагеря"
              text="Этот блок снижает барьер покупки и усиливает экспертность. Он не должен быть тяжёлым — только понятным, тёплым и структурным."
            />

            <div className="mt-5">
              <InfoBadge accent="gold">При прохождении всех 3 вебинаров — скидка 5% на участие в смене</InfoBadge>
            </div>

            <div className="mt-10 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
              <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-3">
                {webinars.map((item) => (
                  <Card key={item.title} className="rounded-[28px] border-0 bg-white shadow-[0_20px_70px_rgba(34,48,74,0.06)]">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between gap-3">
                        <InfoBadge accent={item.passed ? "olive" : "blue"}>{item.passed ? "Запись доступна" : "Идёт запись"}</InfoBadge>
                        <div className="text-sm" style={{ color: brand.muted }}>{item.date}</div>
                      </div>
                      <h3 className="mt-5 text-xl font-semibold leading-7" style={{ color: brand.text }}>
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6" style={{ color: brand.muted }}>{item.text}</p>

                      <div className="mt-5 flex items-center gap-4 text-sm" style={{ color: brand.text }}>
                        <div className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> {item.time}</div>
                        <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Онлайн</div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.meta.map((tag) => (
                          <InfoBadge key={tag} accent="blue">{tag}</InfoBadge>
                        ))}
                      </div>

                      <Button className="mt-6 h-11 w-full rounded-2xl" style={{ backgroundColor: item.passed ? brand.olive : brand.blue, color: "white" }}>
                        {item.passed ? "Посмотреть запись" : "Записаться"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <ContactForm title="Записаться на вебинар" />
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-5xl px-4 py-16 md:px-6 lg:px-8 lg:py-24">
          <SectionTitle
            eyebrow="FAQ"
            title="Вопросы, которые родители задают чаще всего"
            text="Ответы здесь должны быть спокойными, прозрачными и не слишком длинными — чтобы снимать тревожность, а не усиливать её."
          />

          <div className="mt-10 space-y-4">
            {faq.map((item, index) => {
              const open = faqOpen === index;
              return (
                <div key={item.q} className="overflow-hidden rounded-[24px] border bg-white shadow-[0_14px_50px_rgba(34,48,74,0.04)]" style={{ borderColor: brand.line }}>
                  <button
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                    onClick={() => setFaqOpen(open ? null : index)}
                  >
                    <div className="text-base font-medium" style={{ color: brand.text }}>{item.q}</div>
                    <ChevronDown className={cls("h-5 w-5 shrink-0 transition", open && "rotate-180")} style={{ color: brand.blue }} />
                  </button>
                  <AnimatePresence>
                    {open ? (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="border-t px-5 pb-5 pt-0 text-sm leading-7" style={{ borderColor: brand.line, color: brand.muted }}>
                          <div className="pt-4">{item.a}</div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t" style={{ borderColor: brand.line, backgroundColor: "#F8FAFD" }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-semibold text-white" style={{ backgroundColor: brand.blue }}>
                ВЗ
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: brand.text }}>Восходящая звезда</div>
                <div className="text-xs" style={{ color: brand.muted }}>Подростковые смены с психологической программой</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7" style={{ color: brand.muted }}>
              Здесь в финале важно оставить ощущение структурности и прозрачности: контакты, юридическая информация и понятные способы связи.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: brand.blue }}>Контакты</h4>
              <div className="mt-4 space-y-3 text-sm" style={{ color: brand.text }}>
                <a href="tel:+70000000000" className="block">+7 (000) 000-00-00</a>
                <a href="#" className="block">Telegram</a>
                <a href="#" className="block">VK</a>
                <a href="mailto:hello@example.com" className="block">hello@example.com</a>
                <div>Реквизиты юрлица</div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: brand.blue }}>Юридическая информация</h4>
              <div className="mt-4 space-y-3 text-sm" style={{ color: brand.text }}>
                <a href="#" className="flex items-center gap-2">Политика конфиденциальности <ExternalLink className="h-3.5 w-3.5" /></a>
                <a href="#" className="flex items-center gap-2">Договор оферты <ExternalLink className="h-3.5 w-3.5" /></a>
                <a href="#" className="flex items-center gap-2">Правила использования <ExternalLink className="h-3.5 w-3.5" /></a>
                <a href="#" className="flex items-center gap-2">Обработка персональных данных <ExternalLink className="h-3.5 w-3.5" /></a>
                <a href="#" className="flex items-center gap-2">Cookie policy <ExternalLink className="h-3.5 w-3.5" /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Modal open={heroOpen} title="Получить консультацию" onClose={() => setHeroOpen(false)}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h4 className="text-2xl font-semibold" style={{ color: brand.text }}>
              Поможем понять, подходит ли вашему ребёнку формат смены
            </h4>
            <p className="mt-4 max-w-xl text-sm leading-7" style={{ color: brand.muted }}>
              Здесь можно разместить короткое пояснение к форме: как проходит знакомство, кто связывается, сколько времени занимает консультация и что получит родитель после заявки.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "Подберём подходящую смену",
                "Ответим на вопросы по безопасности и быту",
                "Расскажем о программе и формате адаптации",
                "Подскажем дальнейший шаг без давления",
              ].map((line) => (
                <div key={line} className="flex items-center gap-3 rounded-2xl bg-[#F7F9FC] px-4 py-3 text-sm" style={{ color: brand.text }}>
                  <CheckCircle2 className="h-4 w-4" style={{ color: brand.blue }} /> {line}
                </div>
              ))}
            </div>
          </div>
          <ContactForm title="Оставить контакты" compact />
        </div>
      </Modal>

      <Modal open={programOpen} title="Скачать подробную программу" onClose={() => setProgramOpen(false)}>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <h4 className="text-2xl font-semibold" style={{ color: brand.text }}>
              Полная программа смены отправляется после заявки
            </h4>
            <p className="mt-4 text-sm leading-7" style={{ color: brand.muted }}>
              Здесь логично запросить Telegram или другой удобный канал связи, чтобы менеджер или куратор отправил PDF и при необходимости ответил на дополнительные вопросы.
            </p>
            <div className="mt-6 rounded-[24px] border p-5" style={{ borderColor: brand.line, backgroundColor: "#F9FAFC" }}>
              <div className="text-sm font-medium" style={{ color: brand.blue }}>Что внутри PDF</div>
              <ul className="mt-3 space-y-2 text-sm leading-6" style={{ color: brand.text }}>
                <li>• Подробная программа по дням</li>
                <li>• Логика психологического блока</li>
                <li>• Формат проживания и сопровождения</li>
                <li>• Что получает подросток и родитель</li>
              </ul>
            </div>
          </div>
          <Card className="rounded-[28px] border-0 shadow-[0_20px_80px_rgba(34,48,74,0.08)]">
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold" style={{ color: brand.text }}>Куда отправить программу</h4>
              <div className="mt-5 grid gap-3">
                <Input placeholder="Имя и фамилия" className="h-11 rounded-2xl border-0 bg-[#F5F6F9]" />
                <Input placeholder="Telegram" className="h-11 rounded-2xl border-0 bg-[#F5F6F9]" />
                <Input placeholder="Телефон" className="h-11 rounded-2xl border-0 bg-[#F5F6F9]" />
                <Input placeholder="Email" className="h-11 rounded-2xl border-0 bg-[#F5F6F9]" />
              </div>
              <Button className="mt-5 h-11 w-full rounded-2xl" style={{ backgroundColor: brand.blue, color: "white" }}>
                Получить PDF
              </Button>
            </CardContent>
          </Card>
        </div>
      </Modal>

      <Modal open={pricingOpen} title="Условия оплаты" onClose={() => setPricingOpen(false)}>
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="grid gap-4 md:grid-cols-3">
              {paymentRows.map((column) => (
                <div key={column.label} className="rounded-[24px] border p-4" style={{ borderColor: brand.line, backgroundColor: "#F9FAFC" }}>
                  <div className="mb-3 text-sm font-semibold" style={{ color: brand.blue }}>{column.label}</div>
                  <div className="space-y-2 text-sm leading-6" style={{ color: brand.text }}>
                    {column.rows.map((line) => (
                      <div key={line} className="rounded-2xl bg-white px-3 py-2">{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[24px] border p-5 text-sm leading-7" style={{ borderColor: brand.line, color: brand.muted }}>
              Здесь дополнительно можно вынести условия бронирования, сумму невозвратного депозита, правила переноса участия и короткие пояснения по оплате.
            </div>
          </div>
          <ContactForm title="Связаться с куратором" compact />
        </div>
      </Modal>
    </div>
  );
}
