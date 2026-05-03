/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, MessageSquare, MapPin, Sparkles, Flower2, Search, Calendar as CalendarIcon, Home, BookOpen, Star, QrCode, 
  Moon, Sun, Orbit, Compass, Users, Activity, Share2, Check, Send, ChevronDown, HelpCircle, Mail, 
  Award, GraduationCap, Clock, CheckCircle, Bell, X, Info, Sunrise, Flame, ScrollText, Milestone, 
  Languages, ChevronLeft, ChevronRight, ArrowRight, Facebook, Twitter, Link, MessageCircle, User, AtSign, Bot
} from "lucide-react";
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  isSameMonth, isSameDay, eachDayOfInterval, parseISO, parse, getDay
} from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { QRCodeSVG } from "qrcode.react";
import { useTranslation, type Language } from "./lib/translations";
import { generateBlogArticle, spiritualChat, type ChatMessage } from "./services/geminiService";

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const LanguageSwitcher = () => {
  const { language, setLanguage, playClick } = useTranslation() as any;
  const { playClick: soundClick } = useSoundEffects();

  const toggleLanguage = () => {
    soundClick();
    setLanguage(language === 'ne' ? 'en' : 'ne');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-[60] bg-gold/20 backdrop-blur-md border border-gold/40 text-gold px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm shadow-lg hover:bg-gold/30 transition-all uppercase tracking-tighter"
    >
      <Languages size={18} />
      {language === 'ne' ? 'English' : 'नेपाली'}
    </motion.button>
  );
};

const SupportButton = () => {
  return (
    <motion.a
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      href="https://wa.me/9779847016421"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#128C7E] transition-colors group"
      aria-label="Contact Support"
    >
      <MessageSquare size={24} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold whitespace-nowrap">
        Support
      </span>
    </motion.a>
  );
};

const ChatAssistant = () => {
  const { t, language } = useTranslation() as any;
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<{role: 'user' | 'model', content: string}[]>([]);
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [history, setHistory] = React.useState<ChatMessage[]>([]);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { playClick, playSuccess, playError } = useSoundEffects();

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);
    playClick();

    try {
      const response = await spiritualChat(history, userMsg, language);
      setMessages(prev => [...prev, { role: 'model', content: response || "" }]);
      setHistory(prev => [
        ...prev, 
        { role: 'user', parts: [{ text: userMsg }] },
        { role: 'model', parts: [{ text: response || "" }] }
      ]);
      playSuccess();
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: (err as Error).message }]);
      playError();
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-28 right-8 z-50 bg-gradient-to-br from-saffron to-gold text-deep-brown p-4 rounded-full shadow-[0_10px_30px_rgba(244,196,48,0.4)] flex items-center justify-center border-2 border-[#fff7e6]/20"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a0f00]"
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-48 right-8 z-50 w-[90vw] max-w-[400px] h-[60vh] max-h-[600px] bg-[#1a0f00]/95 backdrop-blur-2xl border border-gold/30 rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-deep-brown to-black border-b border-gold/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gold/10 rounded-xl text-gold">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-gold font-bold text-sm tracking-tight">{t.chatAssistant}</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/20 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar"
            >
              {messages.length === 0 && (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-gold/5 rounded-full flex items-center justify-center mx-auto text-gold/20">
                    <LotusIcon size={40} />
                  </div>
                  <p className="text-gold/60 text-sm italic italic leading-relaxed px-4">
                    {t.chatGreeting}
                  </p>
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-gold/20 text-white border border-gold/20 mr-2 rounded-tr-none' 
                      : 'bg-white/5 text-white/80 border border-white/10 ml-2 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start ml-2"
                >
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 rounded-tl-none flex gap-1">
                    <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                    <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                    <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-6 bg-black/40 border-t border-white/10 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chatPlaceholder}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white text-sm focus:border-gold/50 outline-none transition-all placeholder:text-white/20"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!input.trim() || isTyping}
                className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
                  !input.trim() || isTyping ? 'bg-white/5 text-white/10' : 'bg-gold text-deep-brown shadow-lg'
                }`}
              >
                <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const LotusIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M12 17c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" />
    <path d="M12 15c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z" />
    <path d="M12 13c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z" />
  </svg>
);

const AIBlogGenerator = ({ onArticleGenerated }: { onArticleGenerated: (article: BlogArticle) => void }) => {
  const { t, language } = useTranslation() as any;
  const [topic, setTopic] = React.useState("");
  const [keywords, setKeywords] = React.useState("");
  const [targetLang, setTargetLang] = React.useState(language === 'ne' ? 'Nepali' : language === 'en' ? 'English' : 'Hindi');
  const [tone, setTone] = React.useState('Informative');
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    try {
      const article = await generateBlogArticle(topic, keywords, targetLang, tone);
      
      const newArticle: BlogArticle = {
        id: `ai-${Date.now()}`,
        category: "AI Generated",
        title: { ne: article.title, en: article.title },
        excerpt: { 
          ne: article.content.substring(0, 150) + "...", 
          en: article.content.substring(0, 150) + "..." 
        },
        content: { ne: [article.content], en: [article.content] },
        author: { ne: "Gemini AI", en: "Gemini AI" },
        date: new Date().toLocaleDateString(),
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800"
      };
      onArticleGenerated(newArticle);
      setTopic("");
      setKeywords("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-16 p-8 bg-white/5 border border-gold/20 rounded-[40px] shadow-2xl backdrop-blur-md">
      <div className="flex flex-col gap-6">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-gold flex items-center justify-center gap-3">
             <Sparkles className="text-saffron animate-pulse" /> {t.aiWriterTitle}
          </h2>
          <p className="text-white/60 mt-2">{t.aiWriterSubtitle}</p>
        </div>

        <div className="space-y-4">
          <input 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t.topicPlaceholder}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:border-gold/50 outline-none transition-all"
          />
          <input 
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder={t.keywordsPlaceholder}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 focus:border-gold/50 outline-none transition-all"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] text-gold uppercase tracking-widest pl-2">{t.selectLanguage}</label>
              <select 
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-gold/50 outline-none transition-all appearance-none"
              >
                <option value="Nepali" className="bg-deep-brown">नेपाली (Nepali)</option>
                <option value="English" className="bg-deep-brown">English</option>
                <option value="Hindi" className="bg-deep-brown">हिन्दी (Hindi)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-gold uppercase tracking-widest pl-2">{t.selectTone}</label>
              <select 
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-gold/50 outline-none transition-all appearance-none"
              >
                <option value="Informative" className="bg-deep-brown">{t.toneInformative}</option>
                <option value="Devotional" className="bg-deep-brown">{t.toneDevotional}</option>
                <option value="Philosophical" className="bg-deep-brown">{t.tonePhilosophical}</option>
              </select>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={isGenerating || !topic}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
              isGenerating || !topic ? "bg-white/5 text-white/20" : "bg-gradient-to-r from-saffron to-gold text-deep-brown shadow-xl hover:shadow-gold/20"
            }`}
          >
            {isGenerating ? (
              <>
                <Orbit className="animate-spin" size={20} />
                {t.generating}
              </>
            ) : (
              <>
                <Send size={20} />
                {t.generate}
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const CalendarView = ({ selectedDate, onSelect }: { selectedDate: string; onSelect: (date: string) => void }) => {
  const { language, t } = useTranslation() as any;
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [direction, setDirection] = React.useState(0);
  
  const daysOfWeek = language === 'ne' 
    ? ["आइत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"]
    : ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const gregMonthNames = language === 'ne'
    ? ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const nextMonth = () => {
    setDirection(1);
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const prevMonth = () => {
    setDirection(-1);
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setDirection(today > currentMonth ? 1 : -1);
    setCurrentMonth(today);
  };

  const parsedSelectedDate = selectedDate ? parseISO(selectedDate) : null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 w-full shadow-inner overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h3 className="text-white font-bold text-lg tracking-tight">
            {language === 'ne' ? `${gregMonthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}` : format(currentMonth, "MMMM yyyy")}
          </h3>
          <button 
            onClick={goToToday}
            className="text-[10px] text-gold/60 font-black uppercase tracking-widest hover:text-gold transition-colors text-left mt-1"
          >
            {language === 'ne' ? 'आजमा जानुहोस्' : 'Go to Today'}
          </button>
        </div>
        <div className="flex gap-2">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevMonth} 
            className="p-2 bg-white/5 hover:bg-gold/20 rounded-xl text-gold transition-colors border border-white/5"
          >
            <ChevronLeft size={18} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextMonth} 
            className="p-2 bg-white/5 hover:bg-gold/20 rounded-xl text-gold transition-colors border border-white/5"
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-3">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-[9px] uppercase font-black text-gold/30 tracking-[0.2em]">
            {day}
          </div>
        ))}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentMonth.toISOString()}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="grid grid-cols-7 gap-1.5"
          >
            {calendarDays.map((day, i) => {
              const isSelected = parsedSelectedDate && isSameDay(day, parsedSelectedDate);
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isToday = isSameDay(day, new Date());
              
              return (
                <motion.button
                  key={i}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelect(format(day, "yyyy-MM-dd"))}
                  className={`
                    aspect-square flex items-center justify-center rounded-xl text-sm font-bold transition-all relative
                    ${!isCurrentMonth ? 'text-white/10' : 'text-white/60'}
                    ${isSelected ? 'bg-gradient-to-br from-saffron to-gold text-deep-brown shadow-[0_0_20px_rgba(255,153,51,0.3)]' : 'hover:bg-white/10'}
                    ${isToday && !isSelected ? 'border-2 border-gold text-gold font-black' : ''}
                  `}
                >
                  {format(day, "d")}
                  {isToday && (
                    <div className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? 'bg-deep-brown/40' : 'bg-gold shadow-[0_0_5px_rgba(255,215,0,0.5)]'}`} />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const useSoundEffects = () => {
  const playSound = React.useCallback((url: string) => {
    const audio = new Audio(url);
    audio.volume = 0.4;
    audio.play().catch(err => console.log("Audio play blocked", err));
  }, []);

  return {
    playClick: () => playSound('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'),
    playSuccess: () => playSound('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'),
    playError: () => playSound('https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3'),
  };
};

const NotificationToast = ({ message, type, onClose }: { message: string, type: 'success' | 'error' | 'info', onClose: () => void }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="text-green-400" />,
    error: <X className="text-red-400" />,
    info: <Info className="text-blue-400" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: 20, x: "-50%" }}
      className="fixed bottom-10 left-1/2 z-[100] w-[90%] max-w-md bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-2xl"
    >
      <div className="bg-white/5 p-2 rounded-lg">
        {icons[type]}
      </div>
      <p className="text-white text-sm flex-1">{message}</p>
      <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
        <X size={18} />
      </button>
    </motion.div>
  );
};

const TermsModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-[#1a0f00] border border-gold/30 rounded-3xl overflow-hidden shadow-2xl p-8 md:p-12"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gold mb-6 tracking-tight">{t.termsTitle}</h2>
        
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar text-left">
          {t.termsContent.map((item, idx) => (
            <div key={idx} className="flex gap-3 text-white/80 leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-saffron mt-2.5 flex-shrink-0" />
              <p>{item}</p>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="mt-8 w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all"
        >
          {t.confirm}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  data, 
  t, 
  getFormattedDate, 
  getFormattedTime 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirm: () => void; 
  data: any; 
  t: any;
  getFormattedDate: (d: string) => string;
  getFormattedTime: (t: string) => string;
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-lg bg-[#1a0f00] border border-gold/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,215,0,0.1)] p-8 text-center"
      >
        <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center text-gold mx-auto mb-6">
          <Info size={32} />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">{t.confirmBookingTitle}</h2>
        <p className="text-white/60 mb-8 text-sm">{t.confirmBookingDesc}</p>

        <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left space-y-4 border border-white/5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gold/40 text-[10px] uppercase font-black tracking-widest mb-1">{t.service}</p>
              <p className="text-white font-bold">{data.service}</p>
            </div>
            <div>
              <p className="text-gold/40 text-[10px] uppercase font-black tracking-widest mb-1">{t.fullName}</p>
              <p className="text-white font-bold">{data.name}</p>
            </div>
            <div>
              <p className="text-gold/40 text-[10px] uppercase font-black tracking-widest mb-1">{t.date}</p>
              <p className="text-white font-bold">{getFormattedDate(data.date)}</p>
            </div>
            <div>
              <p className="text-gold/40 text-[10px] uppercase font-black tracking-widest mb-1">{t.time}</p>
              <p className="text-white font-bold">{getFormattedTime(data.time)}</p>
            </div>
          </div>
          <div className="pt-4 border-t border-white/5">
            <p className="text-gold/40 text-[10px] uppercase font-black tracking-widest mb-1">{t.phone} & {t.email}</p>
            <p className="text-white/80 text-sm font-medium">{data.phone} • {data.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onClose}
            className="py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all"
          >
            {t.cancel}
          </button>
          <button 
            onClick={onConfirm}
            className="py-4 bg-gradient-to-r from-gold to-saffron text-deep-brown rounded-xl font-bold transition-all shadow-lg"
          >
            {t.confirm}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BookingDetailModal = ({ isOpen, onClose, booking, onCancel }: { 
  isOpen: boolean; 
  onClose: () => void; 
  booking: any;
  onCancel?: (id: string) => void;
}) => {
  const { t, language } = useTranslation() as any;
  const [showConfirm, setShowConfirm] = React.useState(false);

  if (!isOpen || !booking) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg bg-[#1a0f00] border border-gold/30 rounded-3xl overflow-hidden shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {!showConfirm ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gold/10 rounded-2xl text-gold">
                    <ScrollText size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{t.bookingTitle}</h3>
                    <p className={`text-xs font-black uppercase tracking-widest ${booking.status === 'Cancelled' ? 'text-red-500' : 'text-gold/60'}`}>
                      {booking.status === 'Cancelled' ? (language === 'ne' ? 'रद्द गरिएको' : 'Cancelled') : t.statusConfirmed}
                    </p>
                  </div>
                </div>
                <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gold/40 uppercase font-black tracking-widest">{t.service}</label>
                    <p className="text-lg font-bold text-[#fff7e6]">{booking.service}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gold/40 uppercase font-black tracking-widest">{t.date}</label>
                    <p className="text-lg font-bold text-[#fff7e6]">{booking.date}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gold/40 uppercase font-black tracking-widest">{t.time}</label>
                    <p className="text-lg font-bold text-[#fff7e6]">{booking.time}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gold/40 uppercase font-black tracking-widest">{t.location || (language === 'ne' ? 'स्थान' : 'Location')}</label>
                    <p className="text-lg font-bold text-[#fff7e6]">{booking.location || (language === 'ne' ? 'हाम्रो केन्द्र' : 'Our Center')}</p>
                  </div>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                  <h4 className="text-gold text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Info size={14} /> {language === 'ne' ? 'महत्त्वपूर्ण जानकारी' : 'Important Information'}
                  </h4>
                  <ul className="space-y-2 text-sm text-white/60">
                    <li className="flex gap-2">
                      <span className="text-gold">•</span>
                      {language === 'ne' ? 'कृपया सेवा समय भन्दा १५ मिनेट अगाडि उपस्थित हुनुहोला।' : 'Please arrive 15 minutes before the service time.'}
                    </li>
                    <li className="flex gap-2">
                      <span className="text-gold">•</span>
                      {language === 'ne' ? 'आफ्ना आवश्यक सामग्रीहरू (कुण्डली, जन्म मिति आदि) तयार राख्नुहोला।' : 'Keep your necessary details (birth chart, dates) ready.'}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-white/5 border-t border-white/10 flex gap-4">
                <button 
                  onClick={onClose}
                  className="flex-1 py-4 bg-white/5 text-white rounded-2xl font-bold hover:bg-white/10 transition-all border border-white/10"
                >
                  {t.close}
                </button>
                {booking.status !== 'Cancelled' && onCancel && (
                  <button 
                    onClick={() => setShowConfirm(true)}
                    className="flex-1 py-4 bg-red-500/10 text-red-500 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                  >
                    {t.cancelBooking}
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 text-center"
            >
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                <X size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.cancelConfirmTitle}</h3>
              <p className="text-white/60 mb-8">{t.cancelConfirmMessage}</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-4 bg-white/5 text-white rounded-2xl font-bold hover:bg-white/10 transition-all border border-white/10"
                >
                  {t.cancel}
                </button>
                <button 
                  onClick={() => {
                    if (onCancel) onCancel(booking.id);
                    setShowConfirm(false);
                    onClose();
                  }}
                  className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-all shadow-xl shadow-red-500/20"
                >
                  {t.cancelBooking}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const UserProfile = ({ isOpen, onClose, userData, onUpdate }: { 
  isOpen: boolean; 
  onClose: () => void; 
  userData: any; 
  onUpdate: (data: any) => void;
}) => {
  const { t, language, setLanguage } = useTranslation() as any;
  const [editMode, setEditMode] = React.useState(false);
  const [formData, setFormData] = React.useState(userData);
  const [activeTab, setActiveTab] = React.useState<'info' | 'calendar' | 'history' | 'subscriptions' | 'settings'>('info');
  const [selectedBooking, setSelectedBooking] = React.useState<any>(null);

  const plans = [
    { id: 'basic', name: language === 'ne' ? 'साधारण (Basic)' : 'Basic', price: 'Free', icon: <Flower2 size={20} /> },
    { id: 'spiritual', name: language === 'ne' ? 'आध्यात्मिक (Spiritual)' : 'Spiritual', price: 'Rs. 500/mo', icon: <Orbit size={20} /> },
    { id: 'divine', name: language === 'ne' ? 'दिव्य (Divine)' : 'Divine', price: 'Rs. 2000/mo', icon: <Flame size={20} /> }
  ];

  if (!isOpen) return null;

  const handleCancelBooking = (bookingId: string) => {
    const updatedHistory = (userData.history || []).map((b: any) => 
      b.id === bookingId ? { ...b, status: 'Cancelled' } : b
    );
    onUpdate({ ...userData, history: updatedHistory });
    if (userData.onNotify) userData.onNotify(t.bookingCancelled, "info");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdate(formData);
    setEditMode(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-end"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-xl h-full bg-[#1a0f00] border-l border-gold/20 shadow-2xl flex flex-col"
      >
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gold tracking-tight">{t.profileTitle}</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-gold/20 overflow-hidden bg-white/5 flex items-center justify-center">
                {formData.photo ? (
                  <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Users size={48} className="text-gold/20" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-2 bg-saffron text-deep-brown rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
                <QrCode size={18} />
                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </label>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white">{userData.name || "Guest User"}</h3>
              <p className="text-gold/60 text-sm">{userData.email || "No email provided"}</p>
            </div>
          </div>

          <div className="flex gap-2 mb-8 bg-white/5 p-1 rounded-xl">
            {(['info', 'calendar', 'history', 'subscriptions', 'settings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab ? "bg-gold text-deep-brown" : "text-white/40 hover:text-white/60"
                }`}
              >
                {t[tab === 'info' ? 'personalInfo' : tab === 'calendar' ? 'calendar' : tab === 'history' ? 'bookingHistory' : tab === 'subscriptions' ? 'subscriptions' : 'accountSettings']}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'info' && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-gold text-xs font-black uppercase tracking-widest">{t.personalInfo}</h4>
                  {!editMode && (
                    <button onClick={() => setEditMode(true)} className="text-gold text-xs font-bold hover:underline flex items-center gap-1">
                      <Star size={12} /> {t.editProfile}
                    </button>
                  )}
                </div>

                <div className="grid gap-4">
                  {['name', 'email', 'phone'].map((key) => (
                    <div key={key} className="space-y-1">
                      <label className="text-[10px] text-gold/40 uppercase font-black">{t[key === 'email' ? 'email' : key === 'phone' ? 'phone' : 'fullName']}</label>
                      {editMode ? (
                        <input
                          type={key === 'email' ? 'email' : 'text'}
                          value={formData[key]}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold/50 outline-none"
                        />
                      ) : (
                        <p className="text-white font-medium pl-1">{userData[key] || "—"}</p>
                      )}
                    </div>
                  ))}
                </div>

                {editMode && (
                  <div className="flex gap-3 pt-4">
                    <button 
                      onClick={() => { setEditMode(false); setFormData(userData); }}
                      className="flex-1 py-3 bg-white/5 text-white rounded-xl font-bold hover:bg-white/10 transition-all"
                    >
                      {t.cancel}
                    </button>
                    <button 
                      onClick={handleSave}
                      className="flex-1 py-3 bg-gold text-deep-brown rounded-xl font-bold hover:shadow-lg hover:shadow-gold/20 transition-all"
                    >
                      {t.saveChanges}
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h4 className="text-gold text-xs font-black uppercase tracking-widest">{t.calendar}</h4>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col gap-4 min-h-[450px]">
                  <BigCalendar
                    localizer={localizer}
                    events={userData.history?.map((b: any) => ({
                      title: b.service,
                      start: new Date(b.date + 'T' + b.time),
                      end: new Date(new Date(b.date + 'T' + b.time).getTime() + 60 * 60 * 1000),
                      allDay: false,
                      resource: b
                    })) || []}
                    onSelectEvent={(event: any) => setSelectedBooking(event.resource)}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%', minHeight: '400px' }}
                    views={['month', 'week', 'day']}
                    className="spiritual-calendar"
                  />
                </div>
                <AnimatePresence>
                  {selectedBooking && (
                    <BookingDetailModal 
                      isOpen={!!selectedBooking} 
                      onClose={() => setSelectedBooking(null)} 
                      booking={selectedBooking}
                      onCancel={handleCancelBooking}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <h4 className="text-gold text-xs font-black uppercase tracking-widest">{t.bookingHistory}</h4>
                <div className="space-y-3">
                  {!userData.history || userData.history.length === 0 ? (
                    <div className="p-12 bg-white/5 rounded-3xl border border-dashed border-white/10 text-center">
                      <p className="text-white/40">{t.noHistory}</p>
                    </div>
                  ) : (
                    userData.history.map((booking: any) => (
                      <motion.button
                        key={booking.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedBooking(booking)}
                        className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between hover:bg-gold/5 transition-all text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${booking.status === 'Cancelled' ? 'bg-red-500/10 text-red-500' : 'bg-gold/10 text-gold'}`}>
                            <ScrollText size={20} />
                          </div>
                          <div>
                            <h5 className="font-bold text-white">{booking.service}</h5>
                            <p className="text-white/40 text-xs">{booking.date} • {booking.time}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          booking.status === 'Cancelled' ? 'bg-red-500/20 text-red-500' : 'bg-gold/10 text-gold'
                        }`}>
                          {booking.status === 'Cancelled' ? (language === 'ne' ? 'रद्द' : 'Cancelled') : (language === 'ne' ? 'निश्चित' : 'Confirmed')}
                        </div>
                      </motion.button>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'subscriptions' && (
              <motion.div
                key="subscriptions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-gold text-xs font-black uppercase tracking-widest">{t.subscriptions}</h4>
                  <div className="px-3 py-1 bg-gold/10 text-gold rounded-full text-[10px] font-black uppercase tracking-widest">
                    {t.active}
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-gold/10 to-saffron/5 rounded-3xl border border-gold/20 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gold/20 rounded-2xl text-gold">
                      <Star size={24} />
                    </div>
                    <div>
                      <p className="text-gold/40 text-[10px] font-black uppercase tracking-widest">{t.currentPlan}</p>
                      <h5 className="text-xl font-bold text-white">
                        {plans.find(p => p.id === (userData.plan || 'basic'))?.name}
                      </h5>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">{t.billingCycle}</p>
                    <p className="text-white font-bold">{t.monthly}</p>
                  </div>
                </div>

                <h4 className="text-gold text-xs font-black uppercase tracking-widest mt-8 mb-4">{t.availablePlans}</h4>
                <div className="grid gap-4">
                  {plans.map((plan) => {
                    const isCurrent = (userData.plan || 'basic') === plan.id;
                    return (
                      <div 
                        key={plan.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          isCurrent ? 'bg-gold/5 border-gold/40 shadow-lg shadow-gold/5' : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${isCurrent ? 'bg-gold text-deep-brown' : 'bg-white/10 text-gold/60'}`}>
                              {plan.icon}
                            </div>
                            <div>
                              <h5 className="font-bold text-white">{plan.name}</h5>
                              <p className="text-gold/60 text-xs font-bold">{plan.price}</p>
                            </div>
                          </div>
                          {!isCurrent && (
                            <button 
                              onClick={() => {
                                setFormData({ ...formData, plan: plan.id });
                                handleSave();
                              }}
                              className="px-6 py-2 bg-white/10 hover:bg-gold hover:text-deep-brown text-white text-xs font-bold rounded-xl transition-all"
                            >
                              {plan.id === 'basic' ? t.downgrade : t.upgrade}
                            </button>
                          )}
                          {isCurrent && (
                            <div className="flex items-center gap-2 text-gold text-xs font-bold">
                              <CheckCircle size={14} /> {t.active}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div>
                  <h4 className="text-gold text-xs font-black uppercase tracking-widest mb-4">{t.notifications}</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <Mail size={20} className="text-gold" />
                        <div>
                          <p className="text-white font-bold">{t.emailReminders}</p>
                          <p className="text-white/40 text-xs">{language === 'ne' ? 'पूजा र परामर्श अलर्टहरू' : 'Alerts for pujas and consultations'}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setFormData({ ...formData, emailNotif: !formData.emailNotif })}
                        className={`w-12 h-6 rounded-full relative transition-colors ${formData.emailNotif ? 'bg-gold' : 'bg-white/10'}`}
                      >
                        <motion.div 
                          animate={{ x: formData.emailNotif ? 24 : 4 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <Bell size={20} className="text-gold" />
                        <div>
                          <p className="text-white font-bold">{t.pushAlerts}</p>
                          <p className="text-white/40 text-xs">{language === 'ne' ? 'तत्काल लाइभ अपडेटहरू' : 'Instant live updates'}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setFormData({ ...formData, pushNotif: !formData.pushNotif })}
                        className={`w-12 h-6 rounded-full relative transition-colors ${formData.pushNotif ? 'bg-gold' : 'bg-white/10'}`}
                      >
                        <motion.div 
                          animate={{ x: formData.pushNotif ? 24 : 4 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-gold text-xs font-black uppercase tracking-widest mb-4">{t.preferences}</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <Languages size={20} className="text-gold" />
                        <div>
                          <p className="text-white font-bold">{t.languagePref}</p>
                          <p className="text-white/40 text-xs">{language === 'ne' ? 'नेपाली' : 'English'}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setLanguage(language === 'ne' ? 'en' : 'ne')}
                        className="text-gold text-xs font-bold hover:underline"
                      >
                        {language === 'ne' ? 'Switch to English' : 'नेपालीमा बदल्नुहोस्'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3">
                        <Sun size={20} className="text-gold" />
                        <div>
                          <p className="text-white font-bold">{t.themePref}</p>
                          <p className="text-white/40 text-xs">Spiritual Dark</p>
                        </div>
                      </div>
                      <div className="w-10 h-6 bg-gold/20 rounded-full relative">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-gold rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={handleSave}
                    className="w-full py-4 bg-gold text-deep-brown rounded-2xl font-bold hover:shadow-lg hover:shadow-gold/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={18} /> {t.saveChanges}
                  </button>
                </div>

                <button className="w-full py-4 border border-red-500/30 text-red-400 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-500/10 transition-all">
                  <Activity size={18} />
                  {t.logout}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProfileTrigger = ({ onClick, photo }: { onClick: () => void, photo: string | null }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed top-20 right-6 z-[60] w-12 h-12 bg-gold/20 backdrop-blur-md border border-gold/40 rounded-full flex items-center justify-center overflow-hidden shadow-lg hover:bg-gold/30 transition-all"
    >
      {photo ? (
        <img src={photo} alt="P" className="w-full h-full object-cover" />
      ) : (
        <Users size={24} className="text-gold" />
      )}
    </motion.button>
  );
};

const BookingSystem = ({ onNotify, onBookingComplete, liveStatus, onSubscribe, onResetStatus }: { 
  onNotify: (msg: string, type: 'success' | 'error' | 'info') => void,
  onBookingComplete: (booking: any) => void,
  liveStatus: { status: string, message: string } | null,
  onSubscribe: (data: { email: string, phone: string }) => void,
  onResetStatus: () => void
}) => {
  const { playClick, playSuccess, playError } = useSoundEffects();
  const { t, language } = useTranslation() as any;
  const [step, setStep] = React.useState(1);
  const [status, setStatus] = React.useState<"idle" | "checking" | "confirmed">("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [showTerms, setShowTerms] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [bookingData, setBookingData] = React.useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: ""
  });

  React.useEffect(() => {
    if (liveStatus?.status === "Confirmed" && status === "checking") {
      playSuccess();
      setStatus("confirmed");
      onNotify(t.statusMsgConfirmed, 'success');
      onBookingComplete({
        service: bookingData.service,
        date: bookingData.date,
        time: bookingData.time
      });
    }
  }, [liveStatus, status, playSuccess, bookingData, onBookingComplete]);

  const [preferences, setPreferences] = React.useState({
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12h"
  });

  const services = language === 'ne' ? [
    { title: "पूजा एवं अनुष्ठान", imageUrl: "https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&q=80&w=400" },
    { title: "गृह प्रवेश", imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=400" },
    { title: "ज्योतिष परामर्श", imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400" },
    { title: "वास्तु परामर्श", imageUrl: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=400" },
    { title: "जन्मकुण्डली निर्माण", imageUrl: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=400" },
    { title: "अन्य विशेष सेवा", imageUrl: "https://images.unsplash.com/photo-1518644730709-0835105d9daa?auto=format&fit=crop&q=80&w=400" }
  ] : [
    { title: "Pooja & Rituals", imageUrl: "https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&q=80&w=400" },
    { title: "Griha Pravesh", imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=400" },
    { title: "Astrology Consultation", imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400" },
    { title: "Vastu Consultation", imageUrl: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=400" },
    { title: "Birth Chart Creation", imageUrl: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=400" },
    { title: "Other Special Services", imageUrl: "https://images.unsplash.com/photo-1518644730709-0835105d9daa?auto=format&fit=crop&q=80&w=400" }
  ];

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    const now = new Date();
    
    if (currentStep === 1) {
      if (!bookingData.service) newErrors.service = t.selectService;
    }

    if (currentStep === 2) {
      if (!bookingData.date) {
        newErrors.date = t.date;
      } else {
        const selectedDate = new Date(bookingData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
          newErrors.date = t.invalidDate;
        }
      }

      if (!bookingData.time) {
        newErrors.time = t.time;
      } else if (bookingData.date) {
        // If date is today, check if time is in the past
        const selectedDateStr = bookingData.date;
        const todayStr = now.toISOString().split('T')[0];
        
        if (selectedDateStr === todayStr) {
          const [hours, minutes] = bookingData.time.split(':').map(Number);
          const currentHours = now.getHours();
          const currentMinutes = now.getMinutes();
          
          if (hours < currentHours || (hours === currentHours && minutes < currentMinutes)) {
            newErrors.time = t.invalidTime;
          }
        }
      }
    }
    
    if (currentStep === 3) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      // Supports international formats, spaces, dashes, plus sign, min 7 digits
      const phoneRegex = /^\+?(\d[\s-]?){7,15}\d$/;

      if (!bookingData.name || bookingData.name.trim().length < 2) {
        newErrors.name = t.fullName;
      }
      
      if (!bookingData.email) {
        newErrors.email = t.email;
      } else if (!emailRegex.test(bookingData.email)) {
        newErrors.email = t.invalidEmail;
      }

      if (!bookingData.phone) {
        newErrors.phone = t.phone;
      } else if (!phoneRegex.test(bookingData.phone)) {
        newErrors.phone = t.invalidPhone;
      }

      if (!acceptedTerms) {
        newErrors.terms = t.termsError;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      playError();
      setErrors(newErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  const getFormattedDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-");
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    switch (preferences.dateFormat) {
      case "MM/DD/YYYY": return `${m}/${d}/${y}`;
      case "YYYY-MM-DD": return dateStr;
      case "DD MMM YYYY": return `${d} ${monthNames[parseInt(m)-1]} ${y}`;
      case "DD/MM/YYYY":
      default: return `${d}/${m}/${y}`;
    }
  };

  const getFormattedTime = (timeStr: string) => {
    if (!timeStr) return "";
    if (preferences.timeFormat === "24h") return timeStr;
    
    let [h, m] = timeStr.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m < 10 ? '0'+m : m} ${ampm}`;
  };

  const handleBooking = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateStep(3)) return;
    
    if (!showConfirm) {
      setShowConfirm(true);
      playClick();
      return;
    }

    setShowConfirm(false);
    setStatus("checking");
    
    const finalData = {
      ...bookingData,
      formattedDate: getFormattedDate(bookingData.date),
      formattedTime: getFormattedTime(bookingData.time)
    };
    
    try {
      // Subscribe to updates via prop
      onSubscribe({ 
        email: bookingData.email,
        phone: bookingData.phone 
      });

      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...finalData,
          date: finalData.formattedDate, // Override with formatted for email
          time: finalData.formattedTime
        })
      });

      if (!response.ok) throw new Error("Failed to submit booking");

      const result = await response.json();
      setStatus("confirmed");
      // playSuccess will be called from WS update
      onNotify(result.message || (language === 'ne' ? "बुकिङ अनुरोध पठाइयो!" : "Booking request sent!"), "success");
    } catch (err) {
      console.error(err);
      setStatus("idle");
      playError();
      onNotify(language === 'ne' ? "प्राविधिक समस्याको कारण बुकिङ सफल हुन सकेन। कृपया पछि प्रयास गर्नुहोस्।" : "Booking failed due to technical issues. Please try again later.", "error");
    }
  };

  if (status === "confirmed") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-gradient-to-br from-black/60 to-deep-brown/40 backdrop-blur-2xl border border-gold/30 rounded-[40px] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden flex flex-col items-center gap-6 my-12"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Orbit size={150} className="text-gold" />
        </div>

        <div className="bg-gold/10 p-6 rounded-full text-gold mb-2 relative">
          <AnimatePresence mode="wait">
            {liveStatus?.status === "Confirmed" ? (
              <motion.div key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400">
                <CheckCircle size={64} />
              </motion.div>
            ) : (
              <motion.div key="loading" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                <Orbit size={64} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {liveStatus?.status === "Confirmed" ? t.bookingSuccess : t.liveUpdate}
          </h2>
          <p className="text-gold font-medium animate-pulse">
            {liveStatus ? (language === 'ne' ? liveStatus.message : liveStatus.message) : (language === 'ne' ? "अनुरोध प्रक्रियामा छ..." : "Request is being processed...")}
          </p>
        </div>

        {/* Real-time Status Tracker */}
        <div className="w-full max-w-md flex items-center justify-between mt-4 relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-white/10 z-0" />
          {['Received', 'Processing', 'Confirmed'].map((s, i) => {
            const isDone = liveStatus && ['Received', 'Processing', 'Confirmed'].indexOf(liveStatus.status) >= i;
            const isActive = liveStatus?.status === s;
            const label = language === 'ne' ? t[`status${s}`] : s;
            
            return (
              <div key={s} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${isDone ? "bg-gold border-gold text-deep-brown" : "bg-black border-white/20 text-white/20"}`}>
                  {isDone ? <Check size={18} strokeWidth={3} /> : <span className="text-xs font-bold">{i+1}</span>}
                  {isActive && <motion.div layoutId="active-ring" className="absolute -inset-2 border-2 border-gold rounded-full" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} />}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-tighter ${isDone ? "text-gold" : "text-white/20"}`}>{label}</span>
              </div>
            );
          })}
        </div>

        <div className="text-left bg-white/5 p-6 rounded-2xl border border-white/5 w-full max-w-sm mt-4">
          <p className="text-gold text-sm font-bold uppercase mb-4 text-center border-b border-white/10 pb-2">{t.bookingSummary}</p>
          <div className="space-y-2 text-white/80 text-sm">
            <p><span className="text-gold/50 text-xs uppercase">{t.service}:</span> {bookingData.service}</p>
            <p><span className="text-gold/50 text-xs uppercase">{t.date}:</span> {getFormattedDate(bookingData.date)}</p>
            <p><span className="text-gold/50 text-xs uppercase">{t.time}:</span> {getFormattedTime(bookingData.time)}</p>
            <p><span className="text-gold/50 text-xs uppercase">{t.fullName}:</span> {bookingData.name}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setStatus("idle"); setStep(1); onResetStatus(); }}
          className="mt-4 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition-colors"
        >
          {t.newBooking}
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      id="booking"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mt-20 mb-12 px-4"
    >
      <div className="flex flex-col items-center gap-4 mb-12 text-center">
        <div className="text-gold opacity-50"><CalendarIcon size={40} /></div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#fff7e6] tracking-tight">{t.bookingTitle}</h2>
        <p className="text-gold/80 italic font-medium">{t.bookingSubtitle}</p>
      </div>

      <div className="glass-card border-gold/20 p-8 md:p-12 rounded-[40px] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Orbit size={200} />
        </div>

        <form onSubmit={handleBooking} className="flex flex-col gap-8 relative z-10">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${step >= s ? "bg-gold text-deep-brown border-gold" : "bg-white/5 text-white/30 border-white/10"}`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-12 h-[2px] ${step > s ? "bg-gold" : "bg-white/10"}`} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-3">
                  <label className="text-gold text-xs font-bold uppercase tracking-widest pl-1">सेवा छनोट गर्नुहोस् (Select Service)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services.map((service) => (
                      <button
                        key={service.title}
                        type="button"
                        onClick={() => {
                          setBookingData({ ...bookingData, service: service.title });
                          if (errors.service) setErrors(prev => {
                            const next = { ...prev };
                            delete next.service;
                            return next;
                          });
                        }}
                        className={`text-left p-3 rounded-2xl border transition-all relative overflow-hidden group ${bookingData.service === service.title ? "bg-gold/20 border-gold text-white" : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"}`}
                      >
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform duration-300">
                            <img 
                              src={service.imageUrl} 
                              alt={service.title} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <span className="font-bold text-sm tracking-tight">{service.title}</span>
                          {bookingData.service === service.title && (
                            <div className="ml-auto flex items-center justify-center w-6 h-6 bg-gold rounded-full text-deep-brown">
                              <Check size={14} strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <div className={`absolute inset-0 bg-gradient-to-r from-gold/5 transition-opacity duration-300 ${bookingData.service === service.title ? "opacity-100" : "opacity-0"}`} />
                      </button>
                    ))}
                  </div>
                  {errors.service && <span className="text-red-400 text-[10px] pl-1 font-medium">{errors.service}</span>}
                </div>
                <div className="flex justify-end">
                   <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => { if (validateStep(1)) { playClick(); setStep(2); } }}
                    className="flex items-center gap-2 px-8 py-3 bg-gold text-deep-brown rounded-full font-bold"
                  >
                    अगाडि बढ्नुहोस्
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-4">
                    <label className="text-gold text-xs font-bold uppercase tracking-widest pl-1">{language === 'ne' ? 'उपयुक्त मिति (Preferred Date)' : 'Preferred Date'}</label>
                    <CalendarView 
                      selectedDate={bookingData.date}
                      onSelect={(date) => {
                        playClick();
                        setBookingData({ ...bookingData, date });
                        if (errors.date) setErrors(prev => {
                          const next = { ...prev };
                          delete next.date;
                          return next;
                        });
                      }}
                    />
                    {errors.date && <span className="text-red-400 text-[10px] pl-1 font-medium">{errors.date}</span>}
                    {bookingData.date && !errors.date && (
                      <div className="flex items-center gap-2 text-gold/60 text-sm font-medium pl-1 italic">
                        <Check size={14} />
                        {language === 'ne' ? 'छनोट गरिएको मिति:' : 'Selected Date:'} {getFormattedDate(bookingData.date)}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                      <label className="text-gold text-xs font-bold uppercase tracking-widest pl-1">{t.preferredTime}</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={20} />
                        <input 
                          required
                          type="time" 
                          value={bookingData.time}
                          onChange={(e) => {
                            setBookingData({ ...bookingData, time: e.target.value });
                            if (errors.time) setErrors(prev => {
                              const next = { ...prev };
                              delete next.time;
                              return next;
                            });
                          }}
                          className={`w-full bg-white/5 border rounded-xl pl-12 pr-4 py-4 text-white focus:border-gold/50 focus:outline-none ${errors.time ? 'border-red-500/50' : 'border-white/10'}`}
                        />
                      </div>
                      {errors.time && <span className="text-red-400 text-[10px] pl-1 font-medium">{errors.time}</span>}
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div className="flex flex-col gap-3">
                        <label className="text-gold text-xs font-bold uppercase tracking-widest pl-1">{t.dateFormat}</label>
                        <select 
                          value={preferences.dateFormat}
                          onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-gold/50 focus:outline-none appearance-none"
                        >
                          <option className="bg-deep-brown" value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option className="bg-deep-brown" value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option className="bg-deep-brown" value="YYYY-MM-DD">YYYY-MM-DD</option>
                          <option className="bg-deep-brown" value="DD MMM YYYY">DD MMM YYYY</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-3">
                        <label className="text-gold text-xs font-bold uppercase tracking-widest pl-1">{t.timeFormat}</label>
                        <select 
                          value={preferences.timeFormat}
                          onChange={(e) => setPreferences({ ...preferences, timeFormat: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-gold/50 focus:outline-none appearance-none"
                        >
                          <option className="bg-deep-brown" value="12h">{language === 'ne' ? '१२ घण्टा (AM/PM)' : '12-hour (AM/PM)'}</option>
                          <option className="bg-deep-brown" value="24h">{language === 'ne' ? '२४ घण्टा' : '24-hour'}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <button type="button" onClick={() => { playClick(); setStep(1); setErrors({}); }} className="text-gold underline font-medium">पछाडि फर्कनुहोस्</button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => { if (validateStep(2)) { playClick(); setStep(3); } }}
                    className="flex items-center gap-2 px-8 py-3 bg-gold text-deep-brown rounded-full font-bold"
                  >
                    अगाडि बढ्नुहोस्
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="flex flex-col gap-3">
                    <label className="text-gold text-xs font-bold uppercase tracking-widest pl-1">{t.fullName}</label>
                    <input 
                      required
                      type="text" 
                      placeholder={t.fullName}
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      className={`bg-white/5 border rounded-xl px-4 py-4 text-white focus:border-gold/50 focus:outline-none ${errors.name ? 'border-red-500/50' : 'border-white/10'}`}
                    />
                    {errors.name && <span className="text-red-400 text-[10px] pl-1 font-medium">{errors.name}</span>}
                  </div>
                   <div className="flex flex-col gap-3">
                    <label className="text-gold text-xs font-bold uppercase tracking-widest pl-1">{t.phone}</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="+977 98XXXXXXXX"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className={`bg-white/5 border rounded-xl px-4 py-4 text-white focus:border-gold/50 focus:outline-none ${errors.phone ? 'border-red-500/50' : 'border-white/10'}`}
                    />
                    {errors.phone && <span className="text-red-400 text-[10px] pl-1 font-medium">{errors.phone}</span>}
                  </div>
                  <div className="flex flex-col gap-3 md:col-span-2">
                    <label className="text-gold text-xs font-bold uppercase tracking-widest pl-1">{t.email}</label>
                    <input 
                      required
                      type="email" 
                      placeholder="example@gmail.com"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      className={`bg-white/5 border rounded-xl px-4 py-4 text-white focus:border-gold/50 focus:outline-none ${errors.email ? 'border-red-500/50' : 'border-white/10'}`}
                    />
                    {errors.email && <span className="text-red-400 text-[10px] pl-1 font-medium">{errors.email}</span>}
                  </div>
                  
                  <div className="flex flex-col gap-3 md:col-span-2 mt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox" 
                          checked={acceptedTerms}
                          onChange={(e) => {
                            playClick();
                            setAcceptedTerms(e.target.checked);
                            if (errors.terms) {
                              setErrors(prev => {
                                const next = { ...prev };
                                delete next.terms;
                                return next;
                              });
                            }
                          }}
                          className="peer appearance-none w-6 h-6 border-2 border-white/20 rounded-md checked:bg-gold checked:border-gold transition-all cursor-pointer"
                        />
                        <Check size={16} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-deep-brown opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      <span className="text-white/80 text-sm font-medium">
                        {t.termsAcceptance}{" "}
                        <button 
                          type="button" 
                          onClick={(e) => { e.preventDefault(); setShowTerms(true); }}
                          className="text-gold hover:underline font-bold"
                        >
                          {t.termsTitle}
                        </button>
                      </span>
                    </label>
                    {errors.terms && <span className="text-red-400 text-[10px] pl-1 font-medium">{errors.terms}</span>}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-6 pt-6 border-t border-white/10">
                  <button type="button" onClick={() => { playClick(); setStep(2); }} className="text-gold underline font-medium">{t.back}</button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === "checking"}
                    className="flex items-center gap-3 px-12 py-4 bg-gradient-to-r from-gold to-saffron text-deep-brown rounded-full font-bold text-lg shadow-xl"
                  >
                    {status === "checking" ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                        <Orbit size={24} />
                      </motion.div>
                    ) : (
                      <>
                        <CheckCircle size={22} />
                        {t.confirm}
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <AnimatePresence>
          {showTerms && <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />}
          {showConfirm && (
            <ConfirmationDialog 
              isOpen={showConfirm} 
              onClose={() => setShowConfirm(false)} 
              onConfirm={() => handleBooking()}
              data={bookingData}
              t={t}
              getFormattedDate={getFormattedDate}
              getFormattedTime={getFormattedTime}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  const { t, language } = useTranslation() as any;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-5xl mt-20 mb-12 px-4"
    >
      <div className="flex flex-col items-center gap-4 mb-12 text-center">
        <div className="text-gold opacity-50"><BookOpen size={40} /></div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#fff7e6] tracking-tight">{t.aboutTitle}</h2>
        <p className="text-gold/80 italic font-medium">{t.aboutSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-gold/20 to-saffron/20 blur-2xl rounded-full opacity-50" />
          <div className="relative glass-card border-gold/20 p-8 rounded-[40px] shadow-2xl overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10">
                <Flower2 size={120} />
             </div>
             <h3 className="text-2xl font-bold text-gold mb-6 flex items-center gap-3">
               <Award className="text-saffron" />
               {t.scholarIntro}
             </h3>
             <p className="text-[#fdf6e3] text-lg leading-relaxed mb-6">
               {t.scholarDesc}
             </p>
             <div className="space-y-4">
                {(language === 'ne' ? [
                  "शास्त्रोक्त विधिद्वारा पूजा एवं अनुष्ठान",
                  "फलित एवं सिद्धान्त ज्योतिषमा विशेषज्ञता",
                  "वास्तुशास्त्र एवं गृह दोष निवारण परामर्श",
                  "चिना एवं कुण्डली निर्माण र विश्लेषण"
                ] : [
                  "Rituals and Pujas according to scriptures",
                  "Expertise in predictive and basic astrology",
                  "Vastu and household defect consultation",
                  "Birth chart creation and analysis"
                ]).map((skill, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-saffron" />
                    <span>{skill}</span>
                  </div>
                ))}
             </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <div className="glass-card hover:bg-white/5 transition-colors border-gold/10 p-6 rounded-2xl flex gap-6 items-start">
            <div className="bg-saffron/20 p-4 rounded-xl text-saffron">
              <GraduationCap size={32} />
            </div>
            <div>
              <h4 className="text-gold font-bold text-xl mb-1">{t.deepExpertise}</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                {t.deepExpertiseDesc}
              </p>
            </div>
          </div>

          <div className="glass-card hover:bg-white/5 transition-colors border-gold/10 p-6 rounded-2xl flex gap-6 items-start">
            <div className="bg-gold/20 p-4 rounded-xl text-gold">
              <Star size={32} />
            </div>
            <div>
              <h4 className="text-gold font-bold text-xl mb-1">{t.reliability}</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                {t.reliabilityDesc}
              </p>
            </div>
          </div>

          <div className="glass-card hover:bg-white/5 transition-colors border-gold/10 p-6 rounded-2xl flex gap-6 items-start">
            <div className="bg-saffron/20 p-4 rounded-xl text-saffron">
              <Users size={32} />
            </div>
            <div>
              <h4 className="text-gold font-bold text-xl mb-1">{t.forEveryone}</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                {t.forEveryoneDesc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mt-16"
      >
        <motion.a
          href="#booking"
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 215, 0, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-12 py-6 bg-gradient-to-r from-saffron via-gold to-saffron text-deep-brown font-black uppercase tracking-[0.2em] rounded-[30px] shadow-2xl transition-all flex items-center gap-4 overflow-hidden text-lg"
        >
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <CalendarIcon size={24} />
          {t.bookConsultationCTA}
          <div className="w-10 h-10 bg-deep-brown/10 rounded-full flex items-center justify-center group-hover:bg-deep-brown/20 transition-colors">
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const { playClick, playSuccess } = useSoundEffects();
  const [isOpen, setIsOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleItemShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareContent = `प्रश्न: ${question}\nउत्तर: ${answer}`;
    if (navigator.share) {
      navigator.share({ title: "FAQ Share", text: shareContent });
      playClick();
    } else {
      navigator.clipboard.writeText(shareContent);
      setCopied(true);
      playSuccess();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleOpen = () => {
    playClick();
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gold/10 last:border-0 relative">
      <div className="flex items-center gap-2 absolute right-0 top-6 z-20">
         <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleItemShare}
          className="p-2 text-gold/40 hover:text-gold transition-colors"
          title="Share this FAQ"
        >
          {copied ? <Check size={18} /> : <Share2 size={18} />}
        </motion.button>
        <button 
          onClick={toggleOpen}
          className="p-2 text-gold focus:outline-none"
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown size={24} />
          </motion.div>
        </button>
      </div>

      <button 
        onClick={toggleOpen}
        className="w-full py-6 pr-20 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-lg md:text-xl font-bold text-white group-hover:text-gold transition-colors">{question}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/70 leading-relaxed text-base md:text-lg">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const { t } = useTranslation();
  const faqs = t.faqs;

  const fullFaqContent = faqs.map(f => `प्रश्न: ${f.question}\nउत्तर: ${f.answer}`).join("\n\n");

  return (
    <motion.div 
      id="faq-section"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl bg-black/30 backdrop-blur-sm border border-gold/10 rounded-3xl p-8 mb-12"
    >
      <div className="flex flex-col items-center gap-4 mb-4 text-center">
        <div className="text-gold opacity-50">
          <HelpCircle size={40} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#fff7e6] tracking-tight">{t.faqTitle}</h2>
        <p className="text-gold/80 italic">{t.faqSubtitle}</p>
      </div>

      <div className="flex justify-center mb-8">
        <CategoryShareButton 
          title="Full FAQ" 
          content={`Divine Dharmik Services - FAQ\n\n${fullFaqContent}`} 
        />
      </div>

      <div className="flex flex-col">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </motion.div>
  );
};

const ContactForm = () => {
  const { playClick, playSuccess, playError } = useSoundEffects();
  const { t, language } = useTranslation() as any;
  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newErrors.email = t.formErrors.emailRequired;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    // Phone validation
    const phoneRegex = /^\+?(\d[\s-]?){7,15}\d$/;
    if (!formData.phone) {
      newErrors.phone = t.formErrors.phoneRequired;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t.invalidPhone;
    }

    if (!formData.name || formData.name.trim().length < 2) newErrors.name = t.formErrors.nameRequired;
    if (!formData.subject || formData.subject.trim().length < 3) newErrors.subject = t.formErrors.subjectRequired;
    if (!formData.message || formData.message.trim().length < 10) newErrors.message = t.formErrors.messageTooShort;

    if (Object.keys(newErrors).length > 0) {
      playError();
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus("sending");
    playClick();
    
    // Simulate API call with "divine" delay
    setTimeout(() => {
      setStatus("success");
      playSuccess();
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      // Keep success message visible for a bit longer
      setTimeout(() => setStatus("idle"), 8000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl bg-black/40 backdrop-blur-2xl border border-gold/20 rounded-[40px] p-8 md:p-12 mb-24 shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group"
    >
      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-gold/20 transition-colors" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-saffron/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-saffron/20 transition-colors" />
      
      <div className="flex flex-col items-center gap-6 mb-12 text-center relative z-10">
        <motion.div 
          animate={{ rotate: status === 'sending' ? 360 : 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-saffron p-5 bg-saffron/10 rounded-full shadow-[0_0_30px_rgba(244,196,48,0.2)]"
        >
          {status === 'success' ? <CheckCircle size={40} className="text-green-400" /> : <MessageSquare size={40} />}
        </motion.div>
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-[#fff7e6] tracking-tight mb-4 drop-shadow-lg">
            {status === 'success' ? t.success : t.inquiryTitle}
          </h2>
          <p className="text-gold/80 italic text-lg max-w-2xl mx-auto">
            {status === 'success' ? t.messageSuccess : t.inquirySubtitle}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center py-12 text-center"
          >
            <div className="p-8 bg-green-500/10 rounded-[30px] border border-green-500/20 max-w-md">
              <p className="text-white text-xl font-medium leading-relaxed">
                {t.messageSuccess}
              </p>
              <motion.button
                onClick={() => setStatus('idle')}
                className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full text-sm font-bold transition-all"
              >
                {language === 'ne' ? 'अर्को मेसेज पठाउनुहोस्' : 'Send Another Message'}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.form 
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left relative z-10"
          >
            <div className="flex flex-col gap-3">
              <label className="text-gold text-[10px] font-black uppercase tracking-[0.2em] pl-1 opacity-60">{t.fullName}</label>
              <div className="relative group/input">
                <input 
                  required
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={language === 'ne' ? 'उदाहरण: राम प्रसाद' : 'e.g. John Doe'}
                  className={`w-full bg-white/5 border rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:border-gold/50 focus:outline-none transition-all shadow-inner focus:shadow-[0_0_20px_rgba(255,215,0,0.1)] ${errors.name ? 'border-red-500/50' : 'border-white/10 group-hover/input:border-white/20'}`}
                />
                <User size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20" />
              </div>
              {errors.name && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-400 text-[10px] pl-1 font-bold tracking-wide uppercase">{errors.name}</motion.span>}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-gold text-[10px] font-black uppercase tracking-[0.2em] pl-1 opacity-60">{t.email}</label>
              <div className="relative group/input">
                <input 
                  required
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className={`w-full bg-white/5 border rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:border-gold/50 focus:outline-none transition-all shadow-inner focus:shadow-[0_0_20px_rgba(255,215,0,0.1)] ${errors.email ? 'border-red-500/50' : 'border-white/10 group-hover/input:border-white/20'}`}
                />
                <AtSign size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20" />
              </div>
              {errors.email && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-400 text-[10px] pl-1 font-bold tracking-wide uppercase">{errors.email}</motion.span>}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-gold text-[10px] font-black uppercase tracking-[0.2em] pl-1 opacity-60">{t.phone}</label>
              <div className="relative group/input">
                <input 
                  required
                  name="phone"
                  type="tel" 
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+977 98XXXXXXXX"
                  className={`w-full bg-white/5 border rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:border-gold/50 focus:outline-none transition-all shadow-inner focus:shadow-[0_0_20px_rgba(255,215,0,0.1)] ${errors.phone ? 'border-red-500/50' : 'border-white/10 group-hover/input:border-white/20'}`}
                />
                <Phone size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20" />
              </div>
              {errors.phone && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-400 text-[10px] pl-1 font-bold tracking-wide uppercase">{errors.phone}</motion.span>}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-gold text-[10px] font-black uppercase tracking-[0.2em] pl-1 opacity-60">{t.subject}</label>
              <div className="relative group/input">
                <input 
                  required
                  name="subject"
                  type="text" 
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t.subject}
                  className={`w-full bg-white/5 border rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:border-gold/50 focus:outline-none transition-all shadow-inner focus:shadow-[0_0_20px_rgba(255,215,0,0.1)] ${errors.subject ? 'border-red-500/50' : 'border-white/10 group-hover/input:border-white/20'}`}
                />
                <HelpCircle size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20" />
              </div>
              {errors.subject && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-400 text-[10px] pl-1 font-bold tracking-wide uppercase">{errors.subject}</motion.span>}
            </div>

            <div className="flex flex-col gap-3 md:col-span-2">
              <label className="text-gold text-[10px] font-black uppercase tracking-[0.2em] pl-1 opacity-60">{t.message}</label>
              <textarea 
                required
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder={t.message}
                className={`w-full bg-white/5 border rounded-3xl px-5 py-4 text-white placeholder:text-white/10 focus:border-gold/50 focus:outline-none transition-all shadow-inner focus:shadow-[0_0_20px_rgba(255,215,0,0.1)] resize-none ${errors.message ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'}`}
              />
              {errors.message && <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-400 text-[10px] pl-1 font-bold tracking-wide uppercase">{errors.message}</motion.span>}
            </div>
            
            <div className="md:col-span-2 flex justify-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(244,196,48,0.3)" }}
                whileTap={{ scale: 0.95 }}
                disabled={status === "sending"}
                className={`group relative flex items-center gap-4 px-12 py-5 rounded-full font-black text-lg transition-all overflow-hidden ${
                  status === "sending" 
                    ? "bg-gold/40 text-deep-brown/40 cursor-not-allowed" 
                    : "bg-gradient-to-r from-saffron via-gold to-saffron text-deep-brown"
                }`}
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                {status === "sending" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Orbit size={24} />
                    </motion.div>
                    {t.sending}
                  </>
                ) : (
                  <>
                    <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    {t.submitNow}
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CategoryShareButton = ({ title, content }: { title: string; content: string }) => {
  const { language } = useTranslation() as any;
  const { playClick, playSuccess } = useSoundEffects();
  const [copied, setCopied] = React.useState(false);

  const handleShare = async () => {
    const shareData = {
      title: title,
      text: content,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        playClick();
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${content}\n\nLink: ${window.location.href}`);
        setCopied(true);
        playSuccess();
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="flex items-center gap-2 bg-gold/10 hover:bg-gold/20 text-gold px-4 py-2 rounded-full border border-gold/20 transition-colors text-sm font-bold uppercase tracking-wider"
    >
      {copied ? <Check size={16} /> : <Share2 size={16} />}
      {copied ? (language === 'ne' ? "कपी गरियो" : "COPIED") : (language === 'ne' ? "सेयर" : "SHARE")}
    </motion.button>
  );
};

const DecorativeElement = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const ServiceItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="flex items-center gap-3 p-3 rounded-lg border border-gold/10 bg-white/40 backdrop-blur-sm shadow-sm"
  >
    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-saffron/10 text-saffron">
      <Icon size={20} />
    </div>
    <p className="text-slate-800 font-medium text-sm md:text-base leading-snug">{text}</p>
  </motion.div>
);

const IncenseSmoke = () => (
  <div className="absolute bottom-0 left-[20%] z-0 pointer-events-none opacity-20">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: 0, opacity: 0, x: 0 }}
        animate={{ 
          y: -200, 
          opacity: [0, 0.5, 0],
          x: [0, i % 2 === 0 ? 20 : -20, 0]
        }}
        transition={{ 
          duration: 4 + i, 
          repeat: Infinity, 
          delay: i * 1.5,
          ease: "easeInOut"
        }}
        className="w-16 h-40 bg-gradient-to-t from-white/20 to-transparent blur-2xl rounded-full absolute bottom-0"
        style={{ left: `${i * 20}px` }}
      />
    ))}
  </div>
);

const FloatingPetals = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          x: Math.random() * 100 + "%", 
          y: -20, 
          rotate: 0, 
          opacity: 0 
        }}
        animate={{ 
          y: "110vh", 
          rotate: 360, 
          opacity: [0, 0.4, 0.4, 0],
          x: (Math.random() * 100) + (Math.sin(i) * 5) + "%"
        }}
        transition={{ 
          duration: 15 + Math.random() * 10, 
          repeat: Infinity, 
          delay: Math.random() * 20,
          ease: "linear"
        }}
        className="text-saffron opacity-20"
      >
        <Flower2 size={12 + Math.random() * 12} />
      </motion.div>
    ))}
  </div>
);

const DivineShimmer = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.4, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{ 
          duration: 3 + Math.random() * 4, 
          repeat: Infinity, 
          delay: Math.random() * 10,
          ease: "easeInOut"
        }}
        className="absolute w-1 h-1 bg-gold rounded-full blur-[1px]"
        style={{ 
          left: Math.random() * 100 + "%", 
          top: Math.random() * 100 + "%" 
        }}
      />
    ))}
  </div>
);

const DivineMandalaBackdrop = () => (
  <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      className="text-gold/5 opacity-[0.03]"
    >
      <Flower2 size={1200} strokeWidth={0.5} />
    </motion.div>
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
      className="absolute text-saffron/5 opacity-[0.02]"
    >
      <Orbit size={1500} strokeWidth={0.3} />
    </motion.div>
  </div>
);

const DiyaGlow = ({ className }: { className?: string }) => (
  <div className={className}>
    <motion.div
      animate={{ 
        scale: [1, 1.05, 0.98, 1.1, 1.02, 1],
        opacity: [0.5, 0.8, 0.6, 0.9, 0.7, 0.5],
        x: [0, 2, -1, 1, -2, 0],
        y: [0, -2, 1, -1, 2, 0],
      }}
      transition={{ 
        duration: 2.5, 
        repeat: Infinity,
        ease: "linear"
      }}
      className="w-14 h-14 bg-gradient-to-t from-saffron/80 via-gold/50 to-transparent blur-xl rounded-full"
    />
    <motion.div
      animate={{ 
        scale: [1, 1.2, 0.9, 1.3, 1.1, 1],
        opacity: [0.2, 0.4, 0.3, 0.5, 0.4, 0.2],
      }}
      transition={{ 
        duration: 3.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute inset-0 w-14 h-14 bg-saffron blur-2xl rounded-full"
    />
  </div>
);

const serviceIcons: Record<string, React.ReactNode> = {
  puja: <Flame size={24} />,
  house: <Home size={24} />,
  scripture: <ScrollText size={24} />,
  astrology: <Compass size={24} />,
};

interface BlogArticle {
  id: string;
  category: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  content: Record<Language, string[]>;
  author: Record<Language, string>;
  date: string;
  image: string;
}

const blogArticles: BlogArticle[] = [
  {
    id: "rudrabhishek-significance",
    category: "Rituals / पूजा",
    title: {
      ne: "रुद्राभिषेकको महत्व र विधि",
      en: "Significance and Procedure of Rudrabhishek"
    },
    excerpt: {
      ne: "भगवान शिवको पूजामा रुद्राभिषेकको विशेष स्थान छ। यसले ग्रह दोष निवारण र मनको शान्ति प्रदान गर्दछ।",
      en: "Rudrabhishek holds a special place in the worship of Lord Shiva. It provides relief from planetary defects and peace of mind."
    },
    content: {
      ne: [
        "रुद्राभिषेक भगवान शिवको प्रिय पूजा हो, जहाँ रुद्र सूक्तका मन्त्रहरूद्वारा शिवलिङ्गमा विभिन्न पवित्र द्रव्यहरूले अभिषेक गरिन्छ।",
        "यो पूजा विशेष गरी रोकिएका कामहरू सफल गराउन, रोगव्याधिको नाश गर्न र पारिवारिक सुख प्राप्तिको लागि गरिन्छ।",
        "अभिषेकका लागि जल, दूध, घ्यू, मह, दही र उखुको रस जस्ता पदार्थहरूको प्रयोग गरिन्छ, जसको छुट्टाछुट्टै आध्यात्मिक फल हुन्छ।",
        "यस अनुष्ठानले नकारात्मक ऊर्जालाई टाढा राख्दै घरमा सकारात्मकता र दिव्य आशीर्वाद ल्याउँदछ।"
      ],
      en: [
        "Rudrabhishek is a favored worship of Lord Shiva, where various sacred substances are used to bathe the Shivalinga while chanting Rudra Sukta mantras.",
        "This worship is especially performed to clear obstacles in work, eliminate diseases, and achieve familial happiness.",
        "Substances like water, milk, ghee, honey, curd, and sugarcane juice are used for the bath, each having its own unique spiritual fruit.",
        "This ritual keeps negative energy at bay and brings positivity and divine blessings to the home."
      ]
    },
    author: { ne: "विद्वान गुरु", en: "Vedic Scholar" },
    date: "2026-04-15",
    image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "vastu-peace",
    category: "Vastu / वास्तु",
    title: {
      ne: "घरमा सुख र शान्तिका लागि वास्तु सल्लाह",
      en: "Vastu Tips for Happiness and Peace at Home"
    },
    excerpt: {
      ne: "वास्तु शास्त्र अनुसार गरिएका साना परिवर्तनले तपाईँको घरको ऊर्जा र वातावरणमा ठूलो सकारात्मक प्रभाव पार्न सक्छ।",
      en: "Small changes made according to Vastu Shastra can have a huge positive impact on the energy and atmosphere of your home."
    },
    content: {
      ne: [
        "वास्तु शास्त्रले प्रकृति र घरको निर्माण बीच तालमेल मिलाउन मद्दत गर्दछ।",
        "मुख्य प्रवेशद्वार सधैँ सफा र उज्यालो हुनुपर्छ ताकि लक्ष्मीको आगमन सजिलो होस्।",
        "बेडरुम र भान्साकोठाको सही दिशाले स्वास्थ्य र समृद्धिलाई प्रत्यक्ष प्रभाव पार्छ।",
        "वास्तु दोष निवारणका लागि पिरामिड वा विशेष पूजनको पनि सहयोग लिन सकिन्छ।"
      ],
      en: [
        "Vastu Shastra helps in harmonizing nature with the construction of the home.",
        "The main entrance should always be clean and bright to facilitate the entry of Lakshmi.",
        "The correct direction of the bedroom and kitchen directly impacts health and prosperity.",
        "Remedies like pyramids or special worship can also be utilized to mitigate Vastu defects."
      ]
    },
    author: { ne: "ज्योतिष विज्ञ", en: "Astrology Expert" },
    date: "2026-04-10",
    image: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "mantra-benefits",
    category: "Wisdom / ज्ञान",
    title: {
      ne: "मन्त्र उच्चारणका वैज्ञानिक फाइदाहरू",
      en: "Scientific Benefits of Mantra Chanting"
    },
    excerpt: {
      ne: "मन्त्रको शक्ति केवल आध्यात्मिक मात्र नभई वैज्ञानिक रूपमा पनि प्रमाणित छ। यसले मस्तिष्क र शरीरलाई कसरी प्रभाव पार्छ भन्ने बारे जान्नुहोस्।",
      en: "The power of mantras is not just spiritual but also scientifically proven. Learn how it affects the brain and body."
    },
    content: {
      ne: [
        "मन्त्र उच्चारणले उत्पन्न हुने ध्वनि तरंगहरूले हाम्रो स्नायु प्रणालीमा शान्त प्रभाव पार्छ।",
        "यसले शरीरमा कोर्टिसोलको स्तर घटाउँदै तनाव कम गर्न मद्दत गर्दछ।",
        "मन्त्रको पुनरावृत्तिले एकाग्रता बढाउँछ र ध्यानको अवस्थामा सजिलै पुग्न सकिन्छ।",
        "संस्कृत मन्त्रहरूको विशिष्ट आवृत्तिले शरीरका ऊर्जा केन्द्रहरू (चक्रहरू) लाई सक्रिय गर्दछ।"
      ],
      en: [
        "The sound waves produced by mantra chanting have a calming effect on our nervous system.",
        "It helps reduce cortisol levels in the body, thereby decreasing stress.",
        "The repetition of mantras increases concentration and makes it easier to reach a meditative state.",
        "The specific frequency of Sanskrit mantras activates the body's energy centers (chakras)."
      ]
    },
    author: { ne: "योग गुरु", en: "Yoga Guru" },
    date: "2026-04-05",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
  }
];

const ArticleModal = ({ article, onClose, onNotify }: { article: BlogArticle; onClose: () => void; onNotify?: (msg: string, type: 'success' | 'error' | 'info') => void }) => {
  const { language, t } = useTranslation() as any;
  const [showShareOptions, setShowShareOptions] = React.useState(false);

  if (!article) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title[language as Language],
          text: article.excerpt[language as Language],
          url: window.location.href,
        });
        return;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') console.error(err);
      }
    }
    setShowShareOptions(!showShareOptions);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      if (onNotify) onNotify(t.linkCopied, "success");
      setShowShareOptions(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0f0a05]/95 backdrop-blur-xl"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#1a0f00] border border-gold/30 rounded-[40px] overflow-hidden shadow-2xl flex flex-col"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 bg-black/40 hover:bg-gold/40 text-white p-2 rounded-full transition-all border border-white/10"
        >
          <X size={24} />
        </button>

        <div className="absolute top-6 right-20 z-20 flex items-center gap-2">
          <button 
            onClick={handleShare}
            className="bg-black/40 hover:bg-gold/40 text-white p-2 rounded-full transition-all border border-white/10 flex items-center gap-2"
          >
            <Share2 size={24} />
          </button>
          
          <AnimatePresence>
            {showShareOptions && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-[#1a0f00] border border-gold/30 rounded-2xl p-2 shadow-2xl flex items-center gap-2"
              >
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(article.title[language as Language])}%20${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="p-2 hover:bg-white/5 rounded-xl transition-colors"
                >
                  <MessageCircle size={18} className="text-green-500" />
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="p-2 hover:bg-white/5 rounded-xl transition-colors"
                >
                  <Facebook size={18} className="text-blue-600" />
                </a>
                <button 
                  onClick={copyLink}
                  className="p-2 hover:bg-white/5 rounded-xl transition-colors"
                >
                  <Link size={18} className="text-gold" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="h-64 md:h-96 w-full relative">
            <img src={article.image} alt="Blog" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f00] to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-gold text-xs font-black uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full border border-gold/20 mb-4 inline-block">
                {article.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                {article.title[language as Language]}
              </h2>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-6 mb-10 pb-6 border-b border-white/10 text-white/40 text-sm">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gold" />
                <span>{t.author}: <b className="text-white/80">{article.author[language as Language]}</b></span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon size={16} className="text-gold" />
                <span>{t.publishedOn}: <b className="text-white/80">{article.date}</b></span>
              </div>
            </div>

            <div className="space-y-6 text-white/80 text-lg md:text-xl leading-relaxed">
              {article.content[language as Language].map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="mt-12 w-full py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
            >
              {language === 'ne' ? 'बन्द गर्नुहोस्' : 'CLOSE ARTICLE'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const BlogSection = ({ articles, onSelect, onNotify }: { articles: BlogArticle[], onSelect: (article: BlogArticle) => void, onNotify?: (msg: string, type: 'success' | 'error' | 'info') => void }) => {
  const { t, language } = useTranslation() as any;
  const [activeCategory, setActiveCategory] = React.useState(t.allCategories);
  const [sharingArticleId, setSharingArticleId] = React.useState<string | null>(null);

  const categories = [t.allCategories, ...Array.from(new Set(articles.map(a => a.category)))];
  const filteredArticles = activeCategory === t.allCategories 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  const handleShare = async (e: React.MouseEvent, article: any) => {
    e.stopPropagation();
    
    // Use native share if available (primarily for mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title[language as Language],
          text: article.excerpt[language as Language],
          url: window.location.href,
        });
        return;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error("Share error:", err);
        } else {
          return; // User cancelled
        }
      }
    }

    // Fallback for desktop: toggle custom menu
    setSharingArticleId(sharingArticleId === article.id ? null : article.id);
  };

  const copyLink = async (e: React.MouseEvent | React.FocusEvent, url: string) => {
    if ('stopPropagation' in e) e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      if (onNotify) onNotify(t.linkCopied, "success");
      setSharingArticleId(null);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="w-full max-w-6xl mt-24 px-4">
      <div className="flex flex-col items-center gap-4 mb-12 text-center">
        <div className="text-gold opacity-50"><ScrollText size={40} /></div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#fff7e6] tracking-tight">
          {t.blogTitle}
        </h2>
        <p className="text-gold/80 italic font-medium">{t.blogSubtitle}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
              activeCategory === cat ? "bg-gold border-gold text-deep-brown" : "bg-white/5 border-white/10 text-white/40 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={article.id}
                onClick={() => onSelect(article)}
                className="group flex flex-col bg-white/5 border border-white/5 rounded-[32px] overflow-hidden hover:border-gold/30 transition-all cursor-pointer hover:shadow-2xl hover:shadow-gold/5"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={article.image} alt="Blog" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] text-deep-brown bg-gold font-black uppercase tracking-tighter px-2 py-0.5 rounded">
                      {article.category}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => handleShare(e, article)}
                    className={`absolute top-4 right-4 p-2 bg-black/40 hover:bg-gold/40 text-white rounded-full backdrop-blur-md border border-white/10 transition-all ${sharingArticleId === article.id ? 'opacity-100 bg-gold/40 border-gold/50' : 'opacity-0 group-hover:opacity-100'}`}
                    title="Share"
                  >
                    <Share2 size={16} />
                  </button>

                  <AnimatePresence>
                    {sharingArticleId === article.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="absolute top-16 right-4 p-2 bg-[#1a0f00] border border-gold/30 rounded-2xl shadow-2xl z-50 flex flex-col gap-1 min-w-[140px]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a 
                          href={`https://wa.me/?text=${encodeURIComponent(article.title[language as Language])}%20${encodeURIComponent(window.location.href)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-xl transition-colors text-xs text-white/80"
                        >
                          <MessageCircle size={14} className="text-green-500" /> WhatsApp
                        </a>
                        <a 
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-xl transition-colors text-xs text-white/80"
                        >
                          <Facebook size={14} className="text-blue-600" /> Facebook
                        </a>
                        <a 
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title[language as Language])}&url=${encodeURIComponent(window.location.href)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-xl transition-colors text-xs text-white/80"
                        >
                          <Twitter size={14} className="text-sky-500" /> Twitter
                        </a>
                        <button 
                          onClick={(e) => copyLink(e, window.location.href)}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-xl transition-colors text-xs text-white/80 w-full text-left"
                        >
                          <Link size={14} className="text-gold" /> {t.shareArticle}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors line-clamp-2">
                    {article.title[language as Language]}
                  </h3>
                  <p className="text-sm text-white/60 line-clamp-3 leading-relaxed">
                    {article.excerpt[language as Language]}
                  </p>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                    <span className="text-[10px] text-white/30 font-bold uppercase">{article.date}</span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={(e) => handleShare(e, article)}
                        className="md:hidden text-white/40 hover:text-gold p-2"
                      >
                        <Share2 size={16} />
                      </button>
                      <button className="text-gold text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {t.readMore} <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-white/20">
              <p>{t.noArticles}</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ServiceModal = ({ service, onClose }: { service: any; onClose: () => void }) => {
  const { language } = useTranslation() as any;
  if (!service) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0f0a05]/95 backdrop-blur-xl"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#1a0f00] border border-gold/30 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(255,153,51,0.2)] flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 bg-black/40 hover:bg-gold/40 text-white p-2 rounded-full transition-all border border-white/10 hover:border-gold/50"
        >
          <X size={24} />
        </button>

        <div className="w-full md:w-[45%] h-64 md:h-auto relative overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            src={service.imageUrl} 
            alt={service.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f00] via-transparent to-transparent md:bg-gradient-to-r" />
          <div className="absolute bottom-8 left-8 right-8 md:hidden">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-saffron text-deep-brown rounded-2xl shadow-lg">
                  {serviceIcons[service.id]}
                </div>
                <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">{service.title}</h2>
             </div>
          </div>
        </div>

        <div className="w-full md:w-[55%] p-8 md:p-14 overflow-y-auto custom-scrollbar flex flex-col gap-8">
          <div className="hidden md:flex items-center gap-6">
            <div className="p-4 bg-saffron/10 text-saffron rounded-[24px] border border-saffron/20 shadow-inner">
              {serviceIcons[service.id]}
            </div>
            <h2 className="text-4xl font-extrabold text-[#fff7e6] tracking-tight">{service.title}</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-2 text-gold/40">
              <div className="h-[1px] w-8 bg-gold/20" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black">{language === 'ne' ? 'विवरण' : 'DETAILS'}</span>
              <div className="h-[1px] flex-1 bg-gold/20" />
            </div>
            <p className="text-[#fdf6e3]/90 text-lg md:text-xl leading-relaxed font-medium">
              {service.longDesc}
            </p>
          </div>

          {service.testimonials && service.testimonials.length > 0 && (
            <div className="space-y-6 mt-4">
               <div className="flex items-center gap-2 text-gold/40">
                <div className="h-[1px] w-8 bg-gold/20" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black">{language === 'ne' ? 'प्रतिक्रियाहरू' : 'TESTIMONIALS'}</span>
                <div className="h-[1px] flex-1 bg-gold/20" />
              </div>
              <div className="grid gap-4">
                {service.testimonials.map((test: any, i: number) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="bg-white/5 p-6 rounded-[28px] border border-white/5 relative group hover:border-gold/20 transition-all"
                  >
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} className="text-gold" fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-[#fdf6e3]/80 italic mb-4 leading-relaxed">"{test.text}"</p>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xs">
                          {test.author[0]}
                        </div>
                        <span className="font-bold text-gold/90">{test.author}</span>
                      </div>
                      {test.location && <span className="text-xs text-white/30 font-medium">{test.location}</span>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="mt-4 w-full py-5 bg-gradient-to-r from-saffron to-gold text-deep-brown font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:shadow-gold/20 transition-all text-sm"
          >
             {language === 'ne' ? 'बन्द गर्नुहोस्' : 'CLOSE DETAILS'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const { t, language } = useTranslation() as any;
  const [notification, setNotification] = React.useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);
  const [selectedService, setSelectedService] = React.useState<any | null>(null);
  const [selectedArticle, setSelectedArticle] = React.useState<BlogArticle | null>(null);
  const [articles, setArticles] = React.useState<BlogArticle[]>(blogArticles);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [liveBookingStatus, setLiveBookingStatus] = React.useState<{ status: string, message: string } | null>(null);
  const [wsSubscriber, setWsSubscriber] = React.useState<{ email?: string, phone?: string } | null>(null);
  const [userProfile, setUserProfile] = React.useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('user_profile') : null;
    return saved ? JSON.parse(saved) : {
      name: "",
      email: "",
      phone: "",
      photo: null,
      history: [],
      preferences: {
        theme: "dark",
        language: "ne"
      }
    };
  });

  const wsRef = React.useRef<WebSocket | null>(null);

  React.useEffect(() => {
    // Determine WebSocket URL based on current environment
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const host = window.location.host;
    const wsUrl = `${protocol}//${host}`;

    const connectWS = () => {
      const socket = new WebSocket(wsUrl);
      
      socket.onopen = () => {
        console.log("Global WebSocket connected");
        wsRef.current = socket;
        
        // Subscribe if we have user info
        const sub = wsSubscriber || { email: userProfile.email, phone: userProfile.phone };
        if (sub.email || sub.phone) {
          socket.send(JSON.stringify({ type: "subscribe", email: sub.email, phone: sub.phone }));
        }
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "status_update") {
            setLiveBookingStatus({ status: data.status, message: data.message });
          } else if (data.type === "reminder") {
            setNotification({ 
              message: `${t.reminderTitle}: ${data.message}`, 
              type: 'info' 
            });
            // Also play a subtle sound if possible, or just the toast
          }
        } catch (e) {
          console.error("WS Global Parse Error:", e);
        }
      };

      socket.onclose = () => {
        console.log("Global WebSocket disconnected, retrying in 5s...");
        setTimeout(connectWS, 5000);
      };

      socket.onerror = (err) => {
        console.error("Global WebSocket Error:", err);
      };
    };

    connectWS();

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [userProfile.email, userProfile.phone, wsSubscriber, t.reminderTitle]);

  React.useEffect(() => {
    localStorage.setItem('user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  const handleNotify = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
  };

  const handleBookingComplete = (newBooking: any) => {
    setUserProfile((prev: any) => ({
      ...prev,
      history: [newBooking, ...prev.history].slice(0, 50)
    }));
  };

  return (
    <div className="min-h-screen bg-deep-brown flex flex-col items-center justify-center p-4 md:p-12 overflow-hidden font-sans relative">
      <LanguageSwitcher />
      <SupportButton />
      <ChatAssistant />
      <AnimatePresence>
        {notification && (
          <NotificationToast 
            message={notification.message} 
            type={notification.type} 
            onClose={() => setNotification(null)} 
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedService && (
          <ServiceModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal 
            article={selectedArticle} 
            onClose={() => setSelectedArticle(null)} 
            onNotify={handleNotify}
          />
        )}
      </AnimatePresence>

      <ProfileTrigger onClick={() => setIsProfileOpen(true)} photo={userProfile.photo} />
      
      <AnimatePresence>
        {isProfileOpen && (
          <UserProfile 
            isOpen={isProfileOpen} 
            onClose={() => setIsProfileOpen(false)} 
            userData={userProfile}
            onUpdate={(data) => setUserProfile(data)}
          />
        )}
      </AnimatePresence>

      <IncenseSmoke />
      <FloatingPetals />
      <DivineShimmer />
      <DivineMandalaBackdrop />
      
      {/* Background Atmosphere Layers */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#ff9933_0%,#4a2c0a_60%,#1a0f00_100%)] opacity-40" />
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold rounded-full blur-[140px] opacity-10" />
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-pattern-lines opacity-10 pointer-events-none" />

        {/* Floating Light Rays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white opacity-5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "circOut" }}
        className="relative z-10 w-full max-w-5xl h-full flex flex-col items-center justify-between py-8 md:py-16 text-center"
      >
        {/* Top: Spiritual Symbol */}
        <div className="flex flex-col items-center gap-6 mb-12">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-b from-gold to-saffron flex items-center justify-center shadow-[0_0_50px_rgba(255,153,51,0.6)] border-2 border-white/20"
          >
            <span className="text-5xl md:text-6xl font-bold text-deep-brown drop-shadow-lg font-spiritual">ॐ</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gold tracking-[0.4em] text-sm md:text-base font-bold uppercase"
          >
            {t.navTitle}
          </motion.div>
        </div>

        {/* Middle: Main Text Content */}
        <div className="flex flex-col gap-10 max-w-4xl px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#fff7e6] leading-tight drop-shadow-2xl">
            {t.heroTitle}
          </h1>

          {/* Section: Special Services Grid */}
          <div className="flex flex-col gap-6 mt-4">
            <div className="flex items-center justify-between">
              <div className="h-[1px] flex-1 bg-saffron/30" />
              <div className="px-4">
                <CategoryShareButton 
                  title={language === 'ne' ? "धार्मिक सेवाहरू" : "Religious Services"} 
                  content={language === 'ne' ? 
                    "ॐ नमो भगवते वासुदेवाय 🙏\nतपाईँको सुख, शान्ति र समृद्धिको लागि हामी सम्पूर्ण कर्मकाण्ड र ज्योतिषीय परामर्श सेवा प्रदान गर्दछौँ।\nसेवाहरू: पूजा अनुष्ठान, गृह प्रवेश, पाठ पारायण, अध्यात्मिक समाधान।\nसम्पर्क: +977 9847016421" :
                    "Om Namo Bhagavate Vasudevaya 🙏\nWe provide full ritual and astrological services for your peace and prosperity.\nServices: Puja, Griha Pravesh, Recitations, Spiritual Solutions.\nContact: +977 9847016421"} 
                />
              </div>
              <div className="h-[1px] flex-1 bg-saffron/30" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-y border-saffron/30 py-12">
              {t.services.map((service: any, idx: number) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedService(service)}
                  className="group relative flex flex-col gap-4 bg-white/5 p-6 rounded-[32px] border border-white/5 hover:border-gold/20 transition-all overflow-hidden cursor-pointer shadow-xl hover:shadow-gold/5"
                >
                  <div className="relative h-40 overflow-hidden rounded-2xl mb-2">
                    <img 
                      src={service.imageUrl} 
                      alt={service.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 scale-105 group-hover:scale-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-brown via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 left-4 p-2.5 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-saffron group-hover:bg-saffron group-hover:text-deep-brown transition-all duration-300">
                      {serviceIcons[service.id]}
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gold/20 backdrop-blur-md rounded-full border border-gold/40 text-[8px] text-gold font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                      {language === 'ne' ? 'थप जानकारी' : 'VIEW DETAILS'}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gold font-bold text-xl flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed opacity-80 text-[#fdf6e3]">
                      {service.shortDesc}
                    </p>
                  </div>
                </motion.div>
              ))}

              <p className="italic text-gold opacity-80 text-xl text-center md:col-span-2 mt-4 font-medium">
                {t.footerTagline}
              </p>
            </div>
        </div>
        </div>

        {/* New: About Us Section */}
        <AboutUs />

        {/* New: Blog Section */}
        <div className="w-full max-w-6xl mt-24">
          <AIBlogGenerator onArticleGenerated={(newArt) => {
            setArticles(prev => [newArt, ...prev]);
            handleNotify(t.generatedSuccess, "success");
          }} />
        </div>
        <BlogSection 
          articles={articles}
          onSelect={(article) => setSelectedArticle(article)} 
          onNotify={handleNotify} 
        />

        {/* New Section: Astrology Services */}
        <div className="w-full max-w-4xl mt-12 mb-4 px-4">
          <div className="flex flex-col items-center gap-4 mb-4 text-center">
            <div className="text-gold opacity-50"><Orbit size={40} /></div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#fff7e6] tracking-tight">
              {language === 'ne' ? 'विस्तृत ज्योतिष सेवा (Astrology Services)' : 'Detailed Astrology Services'}
            </h2>
            <p className="text-gold/80 italic font-medium">{language === 'ne' ? 'तपाईँको भविष्यको मार्गदर्शन र ग्रह दोष निवारणको लागि' : 'For your future guidance and planetary defect removal'}</p>
          </div>

          <div className="flex justify-center mb-10">
            <CategoryShareButton 
              title={language === 'ne' ? 'ज्योतिष सेवा' : 'Astrology Services'} 
              content={language === 'ne' ? 
                "विस्तृत ज्योतिष सेवा 🙏\nसेवाहरू: जन्मकुण्डली विश्लेषण, भविष्यवाणी, वास्तु परामर्श, वैवाहिक मिलान, ग्रह निवारण, प्रश्न कुण्डली।\nशास्त्रोक्त विधिद्वारा परामर्शको लागि सम्पर्क गर्नुहोस्।\nसम्पर्क: +977 9847016421" :
                "Detailed Astrology Services 🙏\nServices: Birth Chart Analysis, Predictions, Vastu Consultation, Matrimonial Matching, Planetary Remedies, Prashna Kundali.\nContact for scriptural consultation.\nContact: +977 9847016421"} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(language === 'ne' ? [
              { icon: Moon, title: "जन्मकुण्डली विश्लेषण", desc: "ग्रहहरूको स्थितिको विस्तृत अध्ययन र त्यसको प्रभाव।" },
              { icon: Sun, title: "भविष्यवाणी", desc: "करियर, स्वास्थ्य र जीवनका महत्वपूर्ण मोडहरूको बारेमा।" },
              { icon: Compass, title: "वास्तु परामर्श", desc: "घर वा व्यवसायमा सुख-शान्तिका लागि वास्तु सल्लाह।" },
              { icon: Users, title: "वैवाहिक मिलान", desc: "विवाहका लागि गुण र दोषहरूको गहिरो विश्लेषण।" },
              { icon: Activity, title: "ग्रह दोष निवारण", desc: "शान्ति स्वस्ति र उपयुक्त रत्नहरूको परामर्श।" },
              { icon: MessageSquare, title: "प्रश्न कुण्डली", desc: "तपाईँका तत्कालका जिज्ञासाहरूको ज्योतिषीय समाधान।" }
            ] : [
              { icon: Moon, title: "Birth Chart Analysis", desc: "Detailed study of planetary positions and their influence." },
              { icon: Sun, title: "Future Predictions", desc: "Insights into career, health, and important life milestones." },
              { icon: Compass, title: "Vastu Consultation", desc: "Advice for peace and prosperity in home or business." },
              { icon: Users, title: "Matrimonial Matching", desc: "Deep analysis of qualities for marriage compatibility." },
              { icon: Activity, title: "Planetary Remedies", desc: "Consultation for Shanti Swasti and appropriate gemstones." },
              { icon: MessageSquare, title: "Prashna Kundali", desc: "Astrological solutions for your immediate queries." }
            ]).map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-black/30 border border-gold/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-black/50 transition-colors"
              >
                <div className="text-saffron mb-4 bg-saffron/10 p-3 rounded-full">
                  <item.icon size={28} />
                </div>
                <h4 className="text-gold font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-white/70 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 glass-card rounded-2xl flex flex-col md:flex-row items-center justify-center gap-6 border-gold/20">
            <div className="flex items-center gap-4 text-gold">
              <CalendarIcon size={32} />
              <div className="text-left">
                <p className="font-bold text-lg">{language === 'ne' ? 'परामर्श लिनको लागि:' : 'For Consultation:'}</p>
                <p className="text-sm opacity-80">{language === 'ne' ? 'आफ्नो जन्म मिति, समय र स्थान साथै राख्नुहोला।' : 'Please keep your date, time and place of birth ready.'}</p>
              </div>
            </div>
            <div className="hidden md:block w-[1px] h-12 bg-gold/20" />
            <p className="text-white font-medium text-center md:text-left">
              {language === 'ne' ? 'व्हाट्सएप मार्फत सिधै मेसेज गरी आफ्नो समय सुनिश्चित गर्न सक्नुहुन्छ।' : 'You can ensure your time by messaging directly via WhatsApp.'}
            </p>
          </div>
        </div>

        {/* New: Contact Form Section */}
        <ContactForm />

        {/* New: FAQ Section */}
        <FAQSection />

        {/* New: Booking System Section */}
        <BookingSystem 
          onNotify={handleNotify} 
          onBookingComplete={handleBookingComplete} 
          liveStatus={liveBookingStatus}
          onSubscribe={(data) => setWsSubscriber(data)}
          onResetStatus={() => setLiveBookingStatus(null)}
        />

        {/* Bottom: Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-4xl glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] mt-12 gap-8"
        >
          <div className="text-center md:text-left flex-1">
            <p className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-2 px-1">{t.footerContact}</p>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <a 
                  href="https://wa.me/9779847016421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl md:text-4xl font-bold tracking-tight text-white hover:text-gold transition-colors"
                >
                  +977 9847016421
                </a>
                <span className="bg-green-600 text-[11px] px-3 py-1 rounded-full text-white font-bold tracking-wider uppercase">WhatsApp</span>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-2 bg-white p-3 rounded-2xl shadow-xl border-4 border-gold/20"
          >
            <QRCodeSVG 
              value="https://wa.me/9779847016421"
              size={90}
              level="H"
              includeMargin={false}
              fgColor="#1a0f00"
            />
            <div className="flex items-center gap-1 text-[10px] text-deep-brown font-black uppercase tracking-tight">
              <QrCode size={12} strokeWidth={3} />
              {t.scanToContact}
            </div>
          </motion.div>
          
          <div className="text-center md:text-right md:border-l border-white/10 md:pl-8 flex-1">
            <p className="text-base opacity-80 max-w-[280px] leading-relaxed mx-auto md:ml-auto">
              {t.footerTagline}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Assets */}
      <div className="absolute top-10 left-10 w-48 h-48 opacity-10 blur-[1px] mix-blend-overlay pointer-events-none hidden lg:block" 
           style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/mandala-ornament.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
      <div className="absolute top-10 right-10 w-48 h-48 opacity-10 blur-[1px] mix-blend-overlay pointer-events-none rotate-90 hidden lg:block" 
           style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/mandala-ornament.png')", backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />

      {/* Side Diyas */}
      <div className="fixed bottom-12 left-12 w-24 h-24 opacity-60 pointer-events-none hidden md:block">
        <div className="relative w-full h-full">
          <div className="absolute bottom-0 w-full h-10 bg-gradient-to-b from-saffron to-[#4a2c0a] rounded-b-full border-t border-gold/20" />
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-t from-gold to-transparent rounded-full shadow-[0_-15px_30px_#ffd700]" />
        </div>
      </div>

      <div className="fixed bottom-12 right-12 w-24 h-24 opacity-60 pointer-events-none hidden md:block scale-x-[-1]">
        <div className="relative w-full h-full">
          <div className="absolute bottom-0 w-full h-10 bg-gradient-to-b from-saffron to-[#4a2c0a] rounded-b-full border-t border-gold/20" />
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-t from-gold to-transparent rounded-full shadow-[0_-15px_30px_#ffd700]" />
        </div>
      </div>
    </div>
  );
}

const styles = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
