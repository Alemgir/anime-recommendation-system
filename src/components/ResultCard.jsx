const getYoutubeId = (url) => {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes('youtu.be')) {
      return parsedUrl.pathname.replace('/', '');
    }

    return parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').pop();
  } catch {
    return url.split('/').pop()?.split('?')[0] || null;
  }
};

const getImageSrc = (src) => {
  if (!src) return '';
  return src;
};

const ResultCard = ({ node, history, onRestart }) => {
  if (!node || node.type !== 'result' || !node.anime) return null;

  const {
    title,
    genres,
    reason,
    description,
    image,
    link,
    trailerUrl,
    alternativeSuggestions,
  } = node.anime;

  const youtubeId = getYoutubeId(trailerUrl);
  const posterImage = getImageSrc(image);
  const trailerHref =
    trailerUrl ||
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      title + ' official trailer'
    )}`;

  return (
    <section className="relative isolate -mx-4 -my-6 min-h-screen overflow-hidden bg-[#070b12] text-white lg:-mx-8">
      {image && (
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-30 blur-md scale-105"
          style={{ backgroundImage: `url(${posterImage})` }}
        />
      )}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,11,18,0.98)_0%,rgba(7,11,18,0.92)_42%,rgba(7,11,18,0.66)_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[linear-gradient(180deg,rgba(34,211,238,0.16),transparent)]" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 md:px-8 lg:px-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Teste geri dön
          </button>

          <div className="hidden items-center gap-2 rounded-lg border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-200 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            Sonuç hazır
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-[minmax(280px,380px)_1fr] lg:items-center">
          <aside className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="overflow-hidden rounded-lg border border-white/12 bg-white/[0.06] shadow-2xl shadow-black/40">
              {image ? (
                <img
                  src={posterImage}
                  alt={title}
                  className="aspect-[3/4.35] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[3/4.35] items-center justify-center bg-slate-900 text-slate-400">
                  Görsel bulunamadı
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-3">
                <p className="text-2xl font-black text-cyan-100">98%</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-cyan-300">
                  Eşleşme
                </p>
              </div>
              <div className="rounded-lg border border-rose-300/20 bg-rose-300/10 p-3">
                <p className="text-2xl font-black text-rose-100">
                  {genres?.length || 0}
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-rose-300">
                  Tür
                </p>
              </div>
              <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-3">
                <p className="text-2xl font-black text-amber-100">
                  {history?.length || 0}
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-amber-300">
                  Seçim
                </p>
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.32em] text-cyan-300">
              Sana özel anime önerisi
            </p>

            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-normal text-white sm:text-6xl lg:text-7xl">
              {title}
            </h1>

            {genres && genres.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-sm font-semibold text-slate-200"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 gap-4 xl:grid-cols-[1fr_330px]">
              <section className="rounded-lg border border-white/10 bg-white/[0.07] p-5 shadow-xl shadow-black/25 backdrop-blur-xl md:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300 text-slate-950">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                  <h2 className="text-xl font-black text-white">Neden bu anime?</h2>
                </div>

                <p className="text-base leading-8 text-slate-200 md:text-lg">{reason}</p>

                {description && (
                  <p className="mt-5 border-l-2 border-cyan-300/70 pl-4 text-sm leading-7 text-slate-300 md:text-base">
                    {description}
                  </p>
                )}
              </section>

              {history && history.length > 0 && (
                <aside className="rounded-lg border border-white/10 bg-slate-950/55 p-5 backdrop-blur-xl">
                  <h2 className="text-sm font-black uppercase tracking-[0.24em] text-slate-300">
                    Tercihlerin
                  </h2>
                  <div className="mt-5 space-y-4">
                    {history.map((item, index) => (
                      <div key={`${item.nodeId}-${index}`} className="grid grid-cols-[28px_1fr] gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/8 text-xs font-black text-cyan-200">
                          {index + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs leading-5 text-slate-400">{item.question}</p>
                          <p className="mt-1 text-sm font-bold text-white">{item.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </aside>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-5 py-3.5 font-black text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                >
                  AniList'te İncele
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M7 17L17 7m0 0H8m9 0v9" />
                  </svg>
                </a>
              )}

              <a
                href={trailerHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/7 px-5 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:border-rose-300/40 hover:bg-rose-300/10 focus:outline-none focus:ring-2 focus:ring-rose-200/60"
              >
                Fragmanı İzle
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </a>

              <button
                onClick={onRestart}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/7 px-5 py-3.5 font-bold text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Yeniden Öneri Al
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M4 4v6h6M20 20v-6h-6M20 9A8 8 0 006.3 4.7L4 10m16 4l-2.3 5.3A8 8 0 014 15" />
                </svg>
              </button>
            </div>
          </main>
        </div>

        {trailerUrl && youtubeId && (
          <section
            className="mt-10 grid overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] lg:grid-cols-[minmax(0,1fr)_330px]"
          >
            <div className="aspect-video bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={`${title} fragmanı`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="flex flex-col justify-center p-5 md:p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-rose-300">
                Fragman
              </p>
              <h2 className="mt-3 text-2xl font-black text-white">{title} fragmanı</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Öneriyi seçmeden önce atmosferini doğrudan burada izleyebilirsin.
              </p>
              <a
                href={trailerHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg border border-rose-300/30 bg-rose-300/10 px-4 py-2.5 text-sm font-black text-rose-100 transition hover:bg-rose-300/20"
              >
                YouTube'da aç
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M7 17L17 7m0 0H8m9 0v9" />
                </svg>
              </a>
            </div>
          </section>
        )}

        {alternativeSuggestions && alternativeSuggestions.length > 0 && (
          <section className="mt-10 pb-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">
                  Listeye ekle
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">Benzer öneriler</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {alternativeSuggestions.map((alt) => (
                <article
                  key={alt.title}
                  className="group overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] transition hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-white/[0.09]"
                >
                  {alt.image && (
                    <img
                      src={getImageSrc(alt.image)}
                      alt={alt.title}
                      className="h-52 w-full object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-black text-white">{alt.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{alt.reason}</p>

                    {alt.link && (
                      <a
                        href={alt.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-black text-cyan-300 hover:text-cyan-100"
                      >
                        İncele
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M7 17L17 7m0 0H8m9 0v9" />
                        </svg>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default ResultCard;
