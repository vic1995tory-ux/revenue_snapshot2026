"use client";

type MetricCardProps = {
  label: string;
  value: string;
  hint?: string;
};

type SourceTagProps = {
  children: React.ReactNode;
};

type HorizontalScaleProps = {
  label: string;
  value: number; // 0-100
  leftLabel?: string;
  rightLabel?: string;
};

type VerticalLoadBarProps = {
  label: string;
  value: number; // 0-100
};

type TagProps = {
  children: React.ReactNode;
};

function MetricCard({ label, value, hint }: MetricCardProps) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-white/5 p-5 backdrop-blur-md">
      <div className="text-sm text-white/55">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
        {value}
      </div>
      {hint ? <div className="mt-2 text-sm text-white/45">{hint}</div> : null}
    </div>
  );
}

function SourceTag({ children }: SourceTagProps) {
  return (
    <span className="rounded-full border border-[#f7d237]/30 bg-[#f7d237]/10 px-3 py-1 text-xs font-medium text-[#ffe27a]">
      {children}
    </span>
  );
}

function Tag({ children }: TagProps) {
  return (
    <span className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-sm text-white/82">
      {children}
    </span>
  );
}

function HorizontalScale({
  label,
  value,
  leftLabel = "низкий",
  rightLabel = "высокий",
}: HorizontalScaleProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-4">
        <div className="text-sm text-white/78">{label}</div>
        <div className="text-sm text-white/46">{value}%</div>
      </div>

      <div className="relative h-4 overflow-hidden rounded-full bg-white/8">
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${value}%`,
            background:
              "linear-gradient(90deg, #f7d237 0%, #cdb846 35%, #4e5d94 70%, #0b1d3a 100%)",
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-white/35">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

function VerticalLoadBar({ label, value }: VerticalLoadBarProps) {
  return (
    <div className="flex min-w-[120px] flex-1 flex-col items-center gap-3">
      <div className="relative flex h-64 w-full max-w-[130px] items-end overflow-hidden rounded-[26px] border border-white/10 bg-white/6 p-3">
        <div
          className="w-full rounded-[18px]"
          style={{
            height: `${value}%`,
            background:
              "linear-gradient(180deg, #f7d237 0%, #b9af5d 28%, #576696 62%, #0b1d3a 100%)",
            boxShadow: "0 16px 40px rgba(11,29,58,0.45)",
          }}
        />
        <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/15 px-2 py-1 text-xs text-white/65">
          {value}%
        </div>
      </div>

      <div className="text-center text-sm text-white/78">{label}</div>
    </div>
  );
}

function DonutChart() {
  // 100 = все лиды
  // 8% conversion to payment
  // 92% loss before payment
  const size = 240;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const converted = 8;
  const lost = 92;

  const convertedLength = (converted / 100) * circumference;
  const lostLength = (lost / 100) * circumference;

  return (
    <div className="relative mx-auto h-[240px] w-[240px]">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id="lossGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7d237" />
            <stop offset="45%" stopColor="#8c8450" />
            <stop offset="100%" stopColor="#0b1d3a" />
          </linearGradient>
          <linearGradient id="convGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe27a" />
            <stop offset="100%" stopColor="#f7d237" />
          </linearGradient>
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#lossGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${lostLength} ${circumference}`}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#convGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${convertedLength} ${circumference}`}
          strokeDashoffset={-lostLength - 8}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xs uppercase tracking-[0.24em] text-white/42">
          lead → оплата
        </div>
        <div className="mt-2 text-4xl font-semibold text-white">5–10%</div>
        <div className="mt-2 text-sm text-white/45">конверсия в оплату</div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#07152b] text-white">
      <div
        className="pointer-events-none fixed inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(247,210,55,0.16), transparent 26%), radial-gradient(circle at 80% 12%, rgba(255,226,122,0.08), transparent 22%), radial-gradient(circle at 70% 80%, rgba(95,114,180,0.16), transparent 28%), linear-gradient(180deg, #0b1d3a 0%, #08162b 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 py-10 md:px-8 lg:px-10">
        <div className="mb-8 rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
          <div className="text-xs uppercase tracking-[0.28em] text-[#f7d237]">
            Results • Part 1
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            ECONOMIC RATE & GROWTH LIMIT
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-white/70 md:text-lg">
            Ниже — кодированная визуальная часть результатов для первых двух
            блоков. Структура уже подстроена под твой сценарий: цифры в рамке,
            круговая диаграмма по конверсии, шкалы перегруза, вертикальные
            столбцы зависимости от фаундера, теги по процессам и отдельные
            summary-блоки.
          </p>
        </div>

        <section className="space-y-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-[#f7d237]">
                01
              </div>
              <h2 className="mt-2 text-2xl font-semibold md:text-4xl">
                ECONOMIC RATE
              </h2>
              <p className="mt-3 max-w-3xl text-white/70">
                Экономика с упором на продуктовую трансформацию, но с
                недоиспользованным спросом и перегрузом системы.
              </p>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
            <div className="text-sm uppercase tracking-[0.22em] text-white/35">
              Executive Summary
            </div>
            <p className="mt-4 max-w-5xl text-base leading-7 text-white/76">
              Текущая модель сочетает консалтинг и продуктовые решения, однако
              бизнес теряет значительный объём выручки из-за ограничения по
              обработке и отсутствия масштабируемой системы конверсии.
            </p>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-[#f7d237]">
                    1.1
                  </div>
                  <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                    Спрос vs обработка
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  <SourceTag>Telegram</SourceTag>
                  <SourceTag>Органика</SourceTag>
                  <SourceTag>Личный бренд</SourceTag>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <MetricCard
                  label="Inbound"
                  value="120–180 / месяц"
                  hint="входящий поток лидов"
                />
                <MetricCard
                  label="Capacity"
                  value="20–40 / месяц"
                  hint="обработка командой"
                />
                <MetricCard
                  label="Demand Gap"
                  value="3–5x"
                  hint="разрыв между спросом и capacity"
                />
              </div>

              <div className="mt-6 space-y-4 text-base leading-7 text-white/76">
                <p>
                  Входящий спрос уже сформирован и идёт из нескольких касаний,
                  но текущая система не успевает превращать этот поток в выручку
                  с сопоставимой скоростью.
                </p>
                <p>
                  Основная проблема здесь не в генерации интереса, а в
                  ограниченной способности команды пропускать через себя этот
                  объём без потери качества и без задержек на ручных этапах.
                </p>
                <p className="text-white">
                  Вывод: перегруз системы → теряется 60–80% потенциальной
                  выручки.
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-[#f7d237]">
                1.2
              </div>
              <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                Конверсия
              </h3>

              <div className="mt-8">
                <DonutChart />
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <Tag>Сложность продукта</Tag>
                <Tag>Нет быстрого входа</Tag>
                <Tag>Ручная обработка</Tag>
                <Tag>Фильтр на этапе объяснения ценности</Tag>
              </div>

              <p className="mt-6 text-base leading-7 text-white/76">
                Основной отвал возникает до оплаты: пользователю требуется
                слишком долго понять формат, ценность и следующую точку входа.
                Из-за этого часть спроса не доходит до транзакции, хотя интерес
                к продукту уже есть.
              </p>

              <p className="mt-4 text-white">
                Вывод: потери в конверсии происходят на этапе входа.
              </p>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-2">
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-[#f7d237]">
                1.3
              </div>
              <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                Структура дохода
              </h3>

              <div className="mt-6 space-y-4 text-base leading-7 text-white/76">
                <p>
                  Основной объём дохода по-прежнему завязан на консалтинг и
                  стратегическую работу. Это даёт высокий средний чек, но делает
                  модель тяжёлой в операционном обслуживании и почти всегда
                  требует прямого участия фаундера.
                </p>
                <p>
                  Новые продукты — Snapshot как low-ticket entry point и
                  Calendar как mid-ticket уровень — уже создают зачаток
                  продуктовой лестницы, но пока не перетягивают на себя
                  значимую часть монетизации.
                </p>
                <p className="text-white">
                  Вывод: структура дохода смещена в сторону высокоёмкого
                  продукта, что ограничивает масштабирование.
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-[#f7d237]">
                1.4
              </div>
              <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                Удержание
              </h3>

              <div className="mt-6 space-y-4 text-base leading-7 text-white/76">
                <p>
                  Повторные продажи присутствуют: часть клиентов естественно
                  переходит из стратегической диагностики во внедрение и более
                  глубокую работу. Это подтверждает ценность основного оффера и
                  наличие доверия к результату.
                </p>
                <p>
                  При этом системного retention-слоя пока нет. У бизнеса не
                  закреплена регулярная модель повторного касания через подписку,
                  сервисную линейку, recurring-формат или стандартизированный
                  post-purchase маршрут.
                </p>
                <p className="text-white">
                  Вывод: основная потеря здесь — недораскрытый LTV.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-[#f7d237]/20 bg-[linear-gradient(180deg,rgba(247,210,55,0.08),rgba(255,255,255,0.04))] p-6 backdrop-blur-md md:p-8">
            <div className="text-xs uppercase tracking-[0.24em] text-[#f7d237]">
              Итоговый вывод по блоку
            </div>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <div className="text-sm text-white/45">Тип потерь</div>
                <div className="mt-2 text-lg font-medium text-white">
                  Processing constraint + conversion gap + retention gap
                </div>
              </div>
              <div>
                <div className="text-sm text-white/45">Главное ограничение</div>
                <div className="mt-2 text-lg font-medium text-white">
                  Бизнес упирается не в спрос, а в способность его обработать и
                  конвертировать.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 space-y-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.28em] text-[#f7d237]">
                02
              </div>
              <h2 className="mt-2 text-2xl font-semibold md:text-4xl">
                GROWTH LIMIT
              </h2>
              <p className="mt-3 max-w-3xl text-white/70">
                Рост ограничен перегрузом фаундера и отсутствием масштабируемой
                воронки.
              </p>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
            <div className="text-sm uppercase tracking-[0.22em] text-white/35">
              Key Conclusions
            </div>
            <p className="mt-4 max-w-5xl text-base leading-7 text-white/76">
              Ограничение роста находится не на уровне интереса рынка, а на
              уровне внутренней пропускной способности системы: спрос уже есть,
              но структура, процессы и управленческая нагрузка пока не дают
              перевести его в масштабируемую модель.
            </p>
          </div>

          <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-[#f7d237]">
                2.1
              </div>
              <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                Загрузка системы
              </h3>

              <div className="mt-8 space-y-7">
                <HorizontalScale label="Demand" value={88} />
                <HorizontalScale label="Capacity" value={26} />
              </div>

              <p className="mt-8 text-base leading-7 text-white/76">
                Система получает высокий уровень входящего интереса, но текущая
                операционная мощность остаётся заметно ниже. Из-за этого рост
                уже сейчас упирается в исполнение, а не в рынок.
              </p>

              <p className="mt-4 text-white">Вывод: система перегружена.</p>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-[#f7d237]">
                2.2
              </div>
              <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                Структура команды и зависимость от фаундера
              </h3>

              <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <VerticalLoadBar label="Стратегия" value={92} />
                <VerticalLoadBar label="Продажи" value={84} />
                <VerticalLoadBar label="Продукт" value={79} />
              </div>

              <p className="mt-8 text-base leading-7 text-white/76">
                Основные критичные функции по-прежнему тяготеют к фаундеру.
                Бизнес зависит от одного центра принятия решений и от одного
                носителя экспертизы сразу в нескольких точках создания выручки.
              </p>

              <p className="mt-4 text-white">
                Вывод: узкое место системы — фаундер.
              </p>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-[#f7d237]">
                2.3
              </div>
              <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                Процессы
              </h3>

              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>Маркетинг</Tag>
                <Tag>Продажи</Tag>
                <Tag>Продукт</Tag>
                <Tag>Ручные переходы</Tag>
                <Tag>Нет единой логики маршрута</Tag>
                <Tag>Нет стандартизированной воронки</Tag>
              </div>

              <div className="mt-6 space-y-4 text-base leading-7 text-white/76">
                <p>
                  Связка между маркетингом, продажами и продуктом существует, но
                  пока не собрана в одну предсказуемую систему. Каждый следующий
                  этап требует дополнительных ручных усилий и объяснений.
                </p>
                <p className="text-white">
                  Вывод: разрыв возникает в передаче лида в выручку.
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-[#f7d237]">
                2.4
              </div>
              <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                Каналы
              </h3>

              <div className="mt-6">
                <div className="text-sm text-white/45">Основной драйвер</div>
                <div className="mt-2 text-2xl font-semibold text-white">
                  Личный бренд / органика
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-medium text-[#ffe27a]">
                    Возможности
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-white/76">
                    <li>Высокое доверие к экспертности</li>
                    <li>Тёплый вход и короткий путь до интереса</li>
                    <li>Сильная органическая конверсия в диалог</li>
                    <li>Низкая стоимость первичного внимания</li>
                  </ul>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-medium text-[#ffe27a]">
                    Ограничения
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-white/76">
                    <li>Зависимость от видимости и энергии фаундера</li>
                    <li>Слабая масштабируемость без системы дистрибуции</li>
                    <li>Высокий риск просадки при выпадении канала</li>
                    <li>Трудно отделить бренд от операционной нагрузки</li>
                  </ul>
                </div>
              </div>

              <p className="mt-6 text-base leading-7 text-white/76">
                Канал силён как источник доверия и первичного спроса, но опасен
                как единственная опора роста. Пока бизнес не диверсифицирует
                систему привлечения, масштаб будет ограничен ресурсом одного
                человека.
              </p>
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-2">
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-md md:p-8">
              <div className="text-xs uppercase tracking-[0.22em] text-[#f7d237]">
                2.5
              </div>
              <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                Аналитика
              </h3>

              <div className="mt-6 space-y-4 text-base leading-7 text-white/76">
                <p>
                  Управление уже частично опирается на данные, но сквозной
                  системы, в которой в реальном времени видны unit-экономика,
                  загрузка, конверсия по этапам и эффективность каналов, пока
                  нет.
                </p>
                <p>
                  Из-за этого часть решений остаётся реактивной: проблема
                  распознаётся по напряжению внутри системы, а не по ранним
                  количественным сигналам.
                </p>
                <p className="text-white">
                  Вывод: решения принимаются в смешанной модели — между данными
                  и интуицией.
                </p>
              </div>
            </div>

            <div className="rounded-[30px] border border-[#f7d237]/20 bg-[linear-gradient(180deg,rgba(247,210,55,0.08),rgba(255,255,255,0.04))] p-6 backdrop-blur-md md:p-8">
              <div className="text-xs uppercase tracking-[0.24em] text-[#f7d237]">
                Итог блока
              </div>

              <div className="mt-5 space-y-5">
                <div>
                  <div className="text-sm text-white/45">
                    Главный bottleneck
                  </div>
                  <div className="mt-2 text-lg font-medium text-white">
                    Processing capacity + founder dependency
                  </div>
                </div>

                <div>
                  <div className="text-sm text-white/45">Тип ограничения</div>
                  <div className="mt-2 text-lg font-medium text-white">
                    Операционно-управленческое
                  </div>
                </div>

                <div>
                  <div className="text-sm text-white/45">
                    Где теряются деньги
                  </div>
                  <div className="mt-2 text-lg font-medium text-white">
                    Между входящим спросом и возможностью его обработать.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
