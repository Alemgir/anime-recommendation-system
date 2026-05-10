import { useState, useEffect } from 'react'
import { getStartNode, getNextNode, validateDecisionTree } from './utils/decisionEngine'
import HeroSection from './components/HeroSection'
import QuestionCard from './components/QuestionCard'
import FinalQuestionCard from './components/FinalQuestionCard'
import ResultCard from './components/ResultCard'
import MatchingScreen from './components/MatchingScreen'
import './index.css'

function App() {
  const [appState, setAppState] = useState('hero'); // 'hero', 'question', 'finalQuestion', 'matching', 'result'
  const [currentNode, setCurrentNode] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  // Validate JSON tree on mount
  useEffect(() => {
    if (import.meta.env.DEV) {
      validateDecisionTree();
    }
  }, []);

  useEffect(() => {
    if (appState !== 'matching') return undefined;

    const timer = window.setTimeout(() => {
      setAppState('result');
    }, 5200);

    return () => window.clearTimeout(timer);
  }, [appState]);

  const handleStart = () => {
    const startNode = getStartNode();
    if (startNode) {
      setCurrentNode(startNode);
      setHistory([]);
      setAppState('question');
      setError(null);
    } else {
      setError("Karar ağacı başlatılamadı. JSON verisini kontrol edin.");
    }
  };

  const handleAnswer = (optionIndex) => {
    if (!currentNode) return;

    const option = currentNode.options[optionIndex];
    const nextNode = getNextNode(currentNode, optionIndex);

    if (!nextNode) {
      setError(`Sonraki düğüm bulunamadı: ${option.next}`);
      return;
    }

    const nextHistory = [...history, {
      nodeId: currentNode.id,
      question: currentNode.question,
      answer: option.label,
      nodeState: currentNode
    }];

    setHistory(nextHistory);

    setCurrentNode(nextNode);

    if (nextNode.type === 'result') {
      setAppState('finalQuestion');
    }
  };

  const handleFinalAnswer = (answer) => {
    setHistory(prev => [...prev, {
      nodeId: 'final_preference',
      question: 'Öneri seni nasıl yakalasın?',
      answer,
      nodeState: currentNode
    }]);
    setAppState('matching');
  };

  const handleBack = () => {
    if (history.length === 0) {
      setAppState('hero');
      setCurrentNode(null);
      return;
    }

    const newHistory = [...history];
    const lastItem = newHistory.pop();

    setHistory(newHistory);
    setCurrentNode(lastItem.nodeState);
    setAppState('question');
    setError(null);
  };

  const handleRestart = () => {
    setAppState('hero');
    setCurrentNode(null);
    setHistory([]);
    setError(null);
  };

  return (
    <div
      className={`relative bg-cover bg-center bg-fixed bg-no-repeat bg-dark-bg text-slate-200 transition-all duration-500 ${
        appState === 'hero' ? 'h-screen overflow-hidden' : 'min-h-screen overflow-y-auto'
      }`}
      style={{ backgroundImage: "url('/ani.png')" }}
    >
      {/* Dark overlay removed to make background image completely clear as requested */}

      {/* Glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none z-0"></div>

      <div className={`container mx-auto px-4 lg:px-8 py-6 relative z-10 flex flex-col ${
        appState === 'hero' ? 'h-full' : 'min-h-screen'
      }`}>
        {/* Header */}
        <header className="mb-4 lg:mb-8 flex items-center justify-between w-full">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleRestart}
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900/50 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            </div>
            <span className="font-bold text-2xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">Anime<span className="text-slate-400 font-light">Öneri</span> Sistemi</span>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-slate-600 transition-colors text-sm text-slate-300">
            Nasıl Çalışır?
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </button>
        </header>

        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-950/80 backdrop-blur-md border border-red-500/50 rounded-2xl p-5 flex items-start gap-4 text-red-200 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <svg className="w-7 h-7 shrink-0 mt-0.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <div>
              <h3 className="font-bold text-lg mb-1 text-red-400">Bir Hata Oluştu</h3>
              <p className="text-sm opacity-90 mb-4">{error}</p>
              <button onClick={handleRestart} className="px-5 py-2 bg-red-900/50 hover:bg-red-800 border border-red-700/50 rounded-xl transition-colors text-white font-bold shadow-sm">Ana Ekrana Dön</button>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col justify-center w-full">
          {!error && appState === 'hero' && (
            <HeroSection onStart={handleStart} />
          )}

          {!error && appState === 'question' && currentNode && (
            <QuestionCard
              node={currentNode}
              onAnswer={handleAnswer}
              onBack={handleBack}
              canGoBack={true}
              step={history.length + 1}
              history={history}
            />
          )}

          {!error && appState === 'finalQuestion' && currentNode && (
            <FinalQuestionCard
              onAnswer={handleFinalAnswer}
            />
          )}

          {!error && appState === 'matching' && currentNode && (
            <MatchingScreen history={history} />
          )}

          {!error && appState === 'result' && currentNode && (
            <ResultCard
              node={currentNode}
              history={history}
              onRestart={handleRestart}
            />
          )}
        </div>
      </div>

    </div>
  )
}

export default App
