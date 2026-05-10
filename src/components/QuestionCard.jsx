import { useState } from 'react';

const moodLabels = ['Evren', 'Ton', 'Tempo', 'Final'];

const optionStyles = [
  'border-cyan-300/35 bg-cyan-300/10 text-cyan-50 hover:bg-cyan-300/18',
  'border-rose-300/35 bg-rose-300/10 text-rose-50 hover:bg-rose-300/18',
  'border-amber-300/35 bg-amber-300/10 text-amber-50 hover:bg-amber-300/18',
  'border-emerald-300/35 bg-emerald-300/10 text-emerald-50 hover:bg-emerald-300/18',
];

const QuestionCard = ({ node, onAnswer, onBack, canGoBack, step, history = [] }) => {
  const [selection, setSelection] = useState({ nodeId: null, index: null });

  if (!node || node.type !== 'question') return null;

  const selectedIndex = selection.nodeId === node.id ? selection.index : null;
  const isChoosing = selectedIndex !== null;
  const profileTags = history.slice(-3).map((item) => item.answer);

  const handleSelect = (index) => {
    if (isChoosing) return;

    setSelection({ nodeId: node.id, index });
    window.setTimeout(() => onAnswer(index), 380);
  };

  return (
    <section className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-4xl items-center justify-center px-4 py-8">
      <div className="w-full">
        <div className="mb-8 grid grid-cols-4 gap-2">
          {moodLabels.map((label, index) => {
            const isActive = index + 1 <= step;

            return (
              <div key={label}>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isActive ? 'w-full bg-cyan-300' : 'w-0 bg-cyan-300'
                    }`}
                  />
                </div>
                <p className={`mt-2 text-center text-[10px] font-black uppercase tracking-[0.16em] ${
                  isActive ? 'text-cyan-200' : 'text-slate-600'
                }`}>
                  {label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-slate-950/72 p-6 shadow-2xl shadow-black/35 backdrop-blur-2xl md:p-9">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
              Soru {step} · Profilin şekilleniyor
            </p>
            <h1 className="mt-5 text-3xl font-black leading-tight text-white md:text-5xl">
              {node.question}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 md:text-base">
              Bir cevap seç, anime zevk haritanı biraz daha netleştirelim.
            </p>
          </div>

          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
            {node.options.map((option, index) => {
              const isSelected = selectedIndex === index;
              const isMuted = isChoosing && !isSelected;

              return (
                <button
                  key={option.label}
                  onClick={() => handleSelect(index)}
                  disabled={isChoosing}
                  className={`group inline-flex min-h-14 items-center justify-between gap-4 rounded-lg border px-5 py-3 text-left text-base font-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/50 sm:min-w-64 ${
                    optionStyles[index % optionStyles.length]
                  } ${
                    isSelected
                      ? 'scale-105 shadow-[0_0_28px_rgba(34,211,238,0.25)] ring-2 ring-cyan-200/60'
                      : 'hover:-translate-y-0.5'
                  } ${isMuted ? 'opacity-35' : 'opacity-100'}`}
                >
                  <span>{option.label}</span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                    isSelected
                      ? 'bg-white text-slate-950'
                      : 'bg-white/10 text-white/80 group-hover:bg-white/20'
                  }`}>
                    {isSelected ? (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mx-auto mt-9 flex max-w-3xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-5 sm:flex-row">
            <div className="min-h-9 text-center sm:text-left">
              {profileTags.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                  {profileTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-bold text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-medium text-slate-500">
                  İlk seçimden sonra zevk profilin burada belirecek.
                </p>
              )}
            </div>

            {canGoBack && (
              <button
                onClick={onBack}
                disabled={isChoosing}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-bold text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Geri
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionCard;
