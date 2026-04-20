/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, MessageSquare, MapPin, Sparkles, Flower2, Search, Calendar, Home, BookOpen, Star, QrCode, 
  Moon, Sun, Orbit, Compass, Users, Activity, Share2, Check, Send, ChevronDown, HelpCircle, Mail, 
  Award, GraduationCap, Clock, CheckCircle, Bell, X, Info, Sunrise, Flame, ScrollText, Milestone, 
  Languages, ChevronLeft, ChevronRight 
} from "lucide-react";
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  isSameMonth, isSameDay, eachDayOfInterval, parseISO 
} from "date-fns";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "./lib/translations";

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
  const { t } = useTranslation() as any;
  const { playClick } = useSoundEffects();

  const scrollToFAQ = () => {
    playClick();
    const element = document.getElementById('faq-section');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToFAQ}
      className="fixed top-6 left-6 z-[60] bg-saffron/20 backdrop-blur-md border border-saffron/40 text-saffron px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm shadow-lg hover:bg-saffron/30 transition-all uppercase tracking-tighter"
    >
      <HelpCircle size={18} />
      {t.help}
    </motion.button>
  );
};

const CalendarView = ({ selectedDate, onSelect }: { selectedDate: string; onSelect: (date: string) => void }) => {
  const { language } = useTranslation() as any;
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
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

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const parsedSelectedDate = selectedDate ? parseISO(selectedDate) : null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 w-full shadow-inner">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold text-lg tracking-tight">
          {language === 'ne' ? `${gregMonthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}` : format(currentMonth, "MMMM yyyy")}
        </h3>
        <div className="flex gap-3">
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

      <div className="grid grid-cols-7 gap-1.5">
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
                ${isToday && !isSelected ? 'border border-gold/30 text-gold' : ''}
              `}
            >
              {format(day, "d")}
              {isToday && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-gold rounded-full" />}
            </motion.button>
          );
        })}
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

const BookingSystem = ({ onNotify }: { onNotify: (msg: string, type: 'success' | 'error' | 'info') => void }) => {
  const { playClick, playSuccess, playError } = useSoundEffects();
  const { t, language } = useTranslation();
  const [step, setStep] = React.useState(1);
  const [status, setStatus] = React.useState<"idle" | "checking" | "confirmed">("idle");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [bookingData, setBookingData] = React.useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: ""
  });

  const [preferences, setPreferences] = React.useState({
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12h"
  });

  const services = language === 'ne' ? [
    "पूजा एवं अनुष्ठान",
    "गृह प्रवेश",
    "ज्योतिष परामर्श",
    "वास्तु परामर्श",
    "जन्मकुण्डली निर्माण",
    "अन्य विशेष सेवा"
  ] : [
    "Pooja & Rituals",
    "Griha Pravesh",
    "Astrology Consultation",
    "Vastu Consultation",
    "Birth Chart Creation",
    "Other Special Services"
  ];

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (step === 3) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[\d\s-]{7,15}$/;

      if (!bookingData.name) newErrors.name = t.fullName;
      
      if (!bookingData.email) {
        newErrors.email = t.email;
      } else if (!emailRegex.test(bookingData.email)) {
        newErrors.email = t.email;
      }

      if (!bookingData.phone) {
        newErrors.phone = t.phone;
      } else if (!phoneRegex.test(bookingData.phone)) {
        newErrors.phone = t.phone;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      playError();
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    
    setStatus("checking");
    
    const finalData = {
      ...bookingData,
      formattedDate: getFormattedDate(bookingData.date),
      formattedTime: getFormattedTime(bookingData.time)
    };
    
    try {
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
      playSuccess();
      onNotify(result.message || (language === 'ne' ? "बुकिङ सफल भयो!" : "Booking successful!"), "success");
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
        className="w-full max-w-2xl bg-gradient-to-br from-green-900/40 to-black/60 backdrop-blur-2xl border border-green-500/30 rounded-[40px] p-12 text-center shadow-2xl relative overflow-hidden flex flex-col items-center gap-6 my-12"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CheckCircle size={150} className="text-green-400" />
        </div>
        <div className="bg-green-500/20 p-6 rounded-full text-green-400 mb-4">
          <CheckCircle size={64} />
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">बुकिङ अनुरोध सफल भयो!</h2>
        <div className="text-left bg-white/5 p-6 rounded-2xl border border-white/5 w-full max-w-sm">
          <p className="text-gold text-sm font-bold uppercase mb-4 text-center border-b border-white/10 pb-2">सारांश (Booking Summary)</p>
          <div className="space-y-2 text-white/80">
            <p><span className="text-gold/50 text-xs uppercase">सेवा:</span> {bookingData.service}</p>
            <p><span className="text-gold/50 text-xs uppercase">मिति:</span> {getFormattedDate(bookingData.date)}</p>
            <p><span className="text-gold/50 text-xs uppercase">समय:</span> {getFormattedTime(bookingData.time)}</p>
            <p><span className="text-gold/50 text-xs uppercase">नाम:</span> {bookingData.name}</p>
          </div>
        </div>
        <p className="text-white/60 text-lg leading-relaxed max-w-md">
          {t.footerTagline}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setStatus("idle"); setStep(1); }}
          className="mt-4 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium transition-colors"
        >
          {t.newBooking}
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mt-20 mb-12 px-4"
    >
      <div className="flex flex-col items-center gap-4 mb-12 text-center">
        <div className="text-gold opacity-50"><Calendar size={40} /></div>
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
                        key={service}
                        type="button"
                        onClick={() => setBookingData({ ...bookingData, service })}
                        className={`text-left p-4 rounded-xl border transition-all ${bookingData.service === service ? "bg-gold/20 border-gold text-gold" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"}`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                   <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    disabled={!bookingData.service}
                    onClick={() => { playClick(); setStep(2); }}
                    className="flex items-center gap-2 px-8 py-3 bg-gold text-deep-brown rounded-full font-bold disabled:opacity-30"
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
                      }}
                    />
                    {bookingData.date && (
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
                          onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white focus:border-gold/50 focus:outline-none"
                        />
                      </div>
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
                  <button type="button" onClick={() => { playClick(); setStep(1); }} className="text-gold underline font-medium">पछाडि फर्कनुहोस्</button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    disabled={!bookingData.date || !bookingData.time}
                    onClick={() => { playClick(); setStep(3); }}
                    className="flex items-center gap-2 px-8 py-3 bg-gold text-deep-brown rounded-full font-bold disabled:opacity-30"
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
  const { t, language } = useTranslation();
  const faqs = language === 'ne' ? [
    {
      question: "पूजा वा अनुष्ठानको लागि के के तयारी गर्नुपर्छ?",
      answer: "पूजाको प्रकृति अनुसार तयारी फरक हुन्छ। सामान्यतः पूजा सामग्रीको सूची हामी उपलब्ध गराउँछौँ। तपाईँले पूजा गर्ने स्थानको सरसफाइ र आसनको व्यवस्था गर्नुपर्ने हुन्छ। थप जानकारीको लागि हामीलाई मेसेज गर्न सक्नुहुन्छ।"
    },
    {
      question: "ज्योतिष परामर्शको लागि कुन कुन विवरण आवश्यक पर्छ?",
      answer: "सटीक विश्लेषणको लागि तपाईँको सही जन्म मिति, जन्म समय (मिनेटसम्म) र जन्म स्थान आवश्यक पर्छ। यदि समय यकिन छैन भने हामी 'प्रश्न कुण्डली' मार्फत पनि परामर्श दिन सक्छौँ।"
    },
    {
      question: "के वास्तु शान्ति वा गृह प्रवेशको लागि तपाईँहरू घरमै आउनुहुन्छ?",
      answer: "हो, हामी विशेष कर्मकाण्ड र वास्तु शान्तिको लागि तपाईँको स्थानमै पुगेर शास्त्रोक्त विधिद्वारा सेवा प्रदान गर्दछौँ। दूरी अनुसार अग्रिम बुकिङ र समय निर्धारण गर्नुपर्ने हुन्छ।"
    },
    {
      question: "सेवाको शुल्क कसरी निर्धारण गरिन्छ?",
      answer: "सेवाको प्रकार, पूजाको समयावधि र आवश्यक सामग्री अनुसार शुल्क फरक हुन्छ। हामी पारदर्शी र उचित दक्षिण सेवाको लागि प्रतिबद्ध छौँ। विस्तृत जानकारीको लागि सिधै सम्पर्क गर्न सक्नुहुन्छ।"
    },
    {
      question: "बुक गरेको कति समयमा सेवा उपलब्ध हुन्छ?",
      answer: "सामान्यतः २-३ दिन अगावै बुकिङ गर्दा राम्रो हुन्छ। तर आकस्मिक पूजा वा परामर्शको लागि हामी विशेष समय मिलाउने प्रयास गर्दछौँ।"
    }
  ] : [
    {
      question: "What preparations are needed for puja or rituals?",
      answer: "Preparations vary by ritual. We generally provide a list of materials. You'll need to clean the area and arrange seating. Message us for more info."
    },
    {
      question: "What details are needed for astrology consultation?",
      answer: "For accurate analysis, your correct birth date, time (to the minute), and birth place are required. If time is uncertain, we can consult via 'Prashna Kundali'."
    },
    {
      question: "Do you visit houses for Vastu Shanti or Griha Pravesh?",
      answer: "Yes, we visit your location for special rituals and Vastu Shanti. Advance booking and time scheduling are required depending on distance."
    },
    {
      question: "How are the service fees determined?",
      answer: "Fees vary by service type, duration, and required materials. We are committed to transparent and reasonable Dakshina. Contact us directly for details."
    },
    {
      question: "How long after booking is the service available?",
      answer: "Generally, it's best to book 2-3 days in advance. However, we try to accommodate urgent rituals or consultations on special request."
    }
  ];

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
  const { t } = useTranslation();
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = t.email;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t.email;
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{7,15}$/;
    if (!formData.phone) {
      newErrors.phone = t.phone;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t.phone;
    }

    if (!formData.name) newErrors.name = t.fullName;
    if (!formData.subject) newErrors.subject = t.subject;
    if (!formData.message) newErrors.message = t.message;

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
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      playSuccess();
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user typing
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl bg-black/40 backdrop-blur-xl border border-gold/20 rounded-3xl p-8 mb-12 shadow-2xl"
    >
      <div className="flex flex-col items-center gap-4 mb-8 text-center">
        <div className="text-saffron p-3 bg-saffron/10 rounded-full">
          <MessageSquare size={32} />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#fff7e6] tracking-tight">{t.inquiryTitle}</h2>
        <p className="text-gold/80 italic">{t.inquirySubtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="flex flex-col gap-2">
          <label className="text-gold text-xs font-bold uppercase tracking-widest pl-1">{t.fullName}</label>
          <input 
            required
            name="name"
            type="text" 
            value={formData.name}
            onChange={handleChange}
            placeholder={t.fullName}
            className={`bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-gold/50 focus:outline-none transition-colors ${errors.name ? 'border-red-500/50' : 'border-white/10'}`}
          />
          {errors.name && <span className="text-red-400 text-[10px] pl-1 font-medium">{errors.name}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gold text-xs font-bold uppercase tracking-widest pl-1">{t.email}</label>
          <input 
            required
            name="email"
            type="email" 
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className={`bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-gold/50 focus:outline-none transition-colors ${errors.email ? 'border-red-500/50' : 'border-white/10'}`}
          />
          {errors.email && <span className="text-red-400 text-[10px] pl-1 font-medium">{errors.email}</span>}
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-gold text-xs font-bold uppercase tracking-widest pl-1">{t.phone}</label>
          <input 
            required
            name="phone"
            type="tel" 
            value={formData.phone}
            onChange={handleChange}
            placeholder="+977 98XXXXXXXX"
            className={`bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-gold/50 focus:outline-none transition-colors ${errors.phone ? 'border-red-500/50' : 'border-white/10'}`}
          />
          {errors.phone && <span className="text-red-400 text-[10px] pl-1 font-medium">{errors.phone}</span>}
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-gold text-xs font-bold uppercase tracking-widest pl-1">{t.subject}</label>
          <input 
            required
            name="subject"
            type="text" 
            value={formData.subject}
            onChange={handleChange}
            placeholder={t.subject}
            className={`bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-gold/50 focus:outline-none transition-colors ${errors.subject ? 'border-red-500/50' : 'border-white/10'}`}
          />
          {errors.subject && <span className="text-red-400 text-[10px] pl-1 font-medium">{errors.subject}</span>}
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-gold text-xs font-bold uppercase tracking-widest pl-1">{t.message}</label>
          <textarea 
            required
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder={t.message}
            className={`bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-gold/50 focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500/50' : 'border-white/10'}`}
          />
          {errors.message && <span className="text-red-400 text-[10px] pl-1 font-medium">{errors.message}</span>}
        </div>
        
        <div className="md:col-span-2 flex justify-center mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status === "sending" || status === "success"}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl ${
              status === "success" 
                ? "bg-green-600 text-white" 
                : "bg-gradient-to-r from-gold to-saffron text-deep-brown"
            }`}
          >
            {status === "idle" && (
              <>
                <Send size={20} />
                {t.submitNow}
              </>
            )}
            {status === "sending" && (
              <>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Orbit size={20} />
              </motion.div>
              <span>{t.sending}</span>
              </>
            )}
            {status === "success" && (
              <>
                <Check size={20} />
                {t.success}
              </>
            )}
          </motion.button>
        </div>
      </form>
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
            src={service.largeImg} 
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

  const handleNotify = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
  };

  return (
    <div className="min-h-screen bg-deep-brown flex flex-col items-center justify-center p-4 md:p-12 overflow-hidden font-sans relative">
      <LanguageSwitcher />
      <SupportButton />
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
                      src={service.img} 
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
              <Calendar size={32} />
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
        <BookingSystem onNotify={handleNotify} />

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
