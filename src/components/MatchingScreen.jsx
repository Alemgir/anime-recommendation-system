import { useEffect, useState } from 'react';

const matchingDuration = 5200;

const analysisSteps = [
  'Seçimlerin okunuyor',
  'Mood haritan çıkarılıyor',
  'Görsel tempo eşleşiyor',
  'En güçlü öneri kilitleniyor',
];

const MatchingScreen = ({ history }) => {
  const [progress, setProgress] = useState(0);
  const latestChoice = history?.[history.length - 1]?.answer;
  const activeStep = Math.min(
    analysisSteps.length - 1,
    Math.floor((progress / 100) * analysisSteps.length)
  );

  useEffect(() => {
    const fps = 60;
    const totalFrames = (matchingDuration / 1000) * fps;
    let frame = 0;

    const progressInterval = window.setInterval(() => {
      frame += 1;
      setProgress(Math.min((frame / totalFrames) * 100, 100));

      if (frame >= totalFrames) {
        window.clearInterval(progressInterval);
      }
    }, 1000 / fps);

    return () => window.clearInterval(progressInterval);
  }, []);

  return (
    <section className="flex min-h-[72vh] w-full items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-white/10 bg-slate-950/78 p-6 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl md:p-10">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-slate-950">
            <span className="text-lg font-black text-cyan-200">{Math.round(progress)}%</span>
          </div>
        </div>

        <p className="mt-8 text-xs font-black uppercase tracking-[0.32em] text-cyan-300">
          Son eşleşme
        </p>
        <h1 className="mt-4 text-3xl font-black leading-tight text-white md:text-5xl">
          En iyi eşleşme hazırlanıyor
        </h1>

        {latestChoice && (
          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-400">
            Son sinyal: <span className="font-black text-white">{latestChoice}</span>
          </p>
        )}

        <div className="mt-8 overflow-hidden rounded-full bg-white/10 p-1">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-rose-300 transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
          {analysisSteps.map((label, index) => (
            <div
              key={label}
              className={`rounded-lg border px-3 py-4 transition ${
                index <= activeStep
                  ? 'border-cyan-300/35 bg-cyan-300/10 text-white'
                  : 'border-white/10 bg-white/[0.03] text-slate-500'
              }`}
            >
              <span className="mx-auto block h-1.5 w-8 rounded-full bg-current opacity-70" />
              <p className="mt-3 text-xs font-black leading-5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MatchingScreen;
