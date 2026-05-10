import { useState } from 'react';

const finalOptions = [
  'Daha sürükleyici olsun',
  'Daha duygusal olsun',
  'Daha şaşırtıcı olsun',
  'Daha rahat izlenen olsun',
];

const FinalQuestionCard = ({ onAnswer }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const isChoosing = selectedIndex !== null;

  const handleSelect = (index) => {
    if (isChoosing) return;

    setSelectedIndex(index);
    window.setTimeout(() => onAnswer(finalOptions[index]), 420);
  };

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center px-4 py-8">
      <div className="relative w-full overflow-hidden rounded-lg border border-cyan-300/18 bg-slate-950/80 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl animate-slide-up md:p-9">
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/14 blur-3xl" />

        <div className="relative mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10">
          <span className="absolute h-full w-full animate-ping rounded-full border border-cyan-300/25" />
          <svg className="relative h-7 w-7 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M5 3v4M3 5h4m10-2v4m-2-2h4M6 17v4m-2-2h4m8-3 2 2m0 0 2-2m-2 2v-6" />
          </svg>
        </div>

        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
          Final dokunuş
        </div>

        <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">
          İzlerken en çok ne hissetmek istersin?
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-400 md:text-base">
          Son cevabın önerinin atmosferini biraz daha keskinleştirecek.
        </p>

        <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-3">
          {finalOptions.map((option, index) => {
            const isSelected = selectedIndex === index;
            const isMuted = isChoosing && !isSelected;

            return (
              <button
                key={option}
                onClick={() => handleSelect(index)}
                disabled={isChoosing}
                className={`rounded-lg border px-4 py-3 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-cyan-300/50 ${
                  isSelected
                    ? 'scale-105 border-cyan-200 bg-cyan-300 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.28)]'
                    : 'border-white/10 bg-white/[0.06] text-white hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-white/[0.09]'
                } ${isMuted ? 'opacity-35' : 'opacity-100'}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FinalQuestionCard;
