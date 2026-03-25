'use client';

import { useState } from 'react';

type PanelKey =
  | 'solution'
  | 'economic'
  | 'clients'
  | 'product'
  | 'sales'
  | 'positioning'
  | 'structure'
  | 'analytics'
  | 'strategy'
  | null;

export default function ResultsPage() {
  const [activePanel, setActivePanel] = useState<PanelKey>(null);

  return (
    <div className="min-h-screen bg-[#0b1d3a] text-white p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Revenue Snapshot — Diagnostic Output</h1>
        <p className="text-white/60 mt-2">Стратегическая диагностика вашей бизнес-модели</p>

        <div className="grid grid-cols-4 gap-4 mt-6">
          <Metric title="Лидов / мес" value="120" />
          <Metric title="Сделок / мес" value="34" />
          <Metric title="AOV" value="$2 300" />
          <Metric title="Маржа" value="42%" />
        </div>

        <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-xl font-semibold">Solution & Practice</h3>
          <p className="text-white/60 mt-2">Главный рычаг: увеличение среднего чека</p>
          <button
            onClick={() => setActivePanel('solution')}
            className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded-xl"
          >
            Открыть
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.key} className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="font-semibold">{card.title}</h4>
            <p className="text-white/60 text-sm mt-1">{card.summary}</p>
            <button
              onClick={() => setActivePanel(card.key as PanelKey)}
              className="mt-3 text-yellow-400 text-sm"
            >
              Open →
            </button>
          </div>
        ))}
      </div>

      {activePanel && (
        <div className="fixed top-0 right-0 w-[500px] h-full bg-[#0b1d3a] border-l border-white/10 p-6 overflow-y-auto">
          <button onClick={() => setActivePanel(null)} className="mb-4 text-white/50">
            Закрыть
          </button>

          {activePanel === 'solution' && <SolutionPanel />}
          {activePanel !== 'solution' && <SimplePanel title={activePanel || ''} />}
        </div>
      )}
    </div>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <p className="text-white/50 text-sm">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function SimplePanel({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-white/60 mt-2">Детальный анализ блока</p>
    </div>
  );
}

function SolutionPanel() {
  const [tab, setTab] = useState<'overview' | 'levers' | 'simulator' | 'jtbd'>('overview');

  return (
    <div>
      <h2 className="text-xl font-semibold">Solution & Practice</h2>

      <div className="flex gap-3 mt-4">
        {['overview', 'levers', 'simulator', 'jtbd'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-3 py-1 rounded-lg ${
              tab === t ? 'bg-yellow-400 text-black' : 'bg-white/10'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <p className="mt-4 text-white/70">
          Основной рост достигается через увеличение среднего чека.
        </p>
      )}

      {tab === 'levers' && (
        <div className="mt-4 space-y-2">
          <p>AOV ↑</p>
          <p>Pricing ↑</p>
        </div>
      )}

      {tab === 'simulator' && (
        <div className="mt-4">
          <p>Симуляция роста</p>
          <input type="range" min="0" max="20" className="w-full mt-2" />
        </div>
      )}

      {tab === 'jtbd' && (
        <p className="mt-4 text-white/70">
          Построить систему роста выручки.
        </p>
      )}
    </div>
  );
}

const cards = [
  { key: 'economic', title: 'Economic Rate', summary: 'Потери' },
  { key: 'clients', title: 'Clients & Flow', summary: 'Поток' },
  { key: 'product', title: 'Product', summary: 'Маржа' },
  { key: 'sales', title: 'Sales', summary: 'Конверсия' },
  { key: 'positioning', title: 'Positioning', summary: 'УТП' },
  { key: 'structure', title: 'Structure', summary: 'Команда' },
  { key: 'analytics', title: 'Analytics', summary: 'Данные' },
  { key: 'strategy', title: 'Strategy', summary: 'Цели' },
];
