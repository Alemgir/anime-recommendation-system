const HeroSection = ({ onStart }) => {
  return (
    <div className="w-full flex flex-col items-start justify-center pt-10 pb-20 animate-fade-in relative z-10 min-h-[60vh] px-0">

      <div className="flex flex-col items-start text-left max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-white leading-[1.1]">
          Senin <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">Anime</span><br />Evrenin Burada
        </h1>

        <div className="flex flex-col items-start gap-4 w-full mt-40">
          <button
            onClick={onStart}
            className="group relative px-12 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 font-bold text-xl rounded-full overflow-hidden transition-all hover:scale-110 focus:outline-none shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)] w-full sm:w-auto flex items-center justify-center gap-3 border border-cyan-400/50 animate-bounce"
            style={{ animationDuration: '3s' }}
          >
            <span className="text-white">Şimdi Keşfet</span>
            <svg className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
