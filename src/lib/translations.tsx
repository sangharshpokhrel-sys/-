/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export type Language = 'ne' | 'en';

interface TranslationSchema {
  navTitle: string;
  heroTitle: string;
  bookingTitle: string;
  bookingSubtitle: string;
  selectService: string;
  preferredDate: string;
  preferredTime: string;
  dateFormat: string;
  timeFormat: string;
  fullName: string;
  phone: string;
  email: string;
  invalidEmail: string;
  invalidPhone: string;
  invalidDate: string;
  invalidTime: string;
  submit: string;
  back: string;
  next: string;
  confirm: string;
  confirmBookingTitle: string;
  confirmBookingDesc: string;
  cancel: string;
  bookingSuccess: string;
  bookingSummary: string;
  newBooking: string;
  service: string;
  date: string;
  time: string;
  aboutTitle: string;
  aboutSubtitle: string;
  scholarIntro: string;
  scholarDesc: string;
  deepExpertise: string;
  deepExpertiseDesc: string;
  reliability: string;
  reliabilityDesc: string;
  forEveryone: string;
  forEveryoneDesc: string;
  faqTitle: string;
  faqSubtitle: string;
  inquiryTitle: string;
  inquirySubtitle: string;
  subject: string;
  message: string;
  submitNow: string;
  sending: string;
  success: string;
  messageSuccess: string;
  formErrors: {
    nameRequired: string;
    emailRequired: string;
    phoneRequired: string;
    subjectRequired: string;
    messageRequired: string;
    messageTooShort: string;
  };
  termsTitle: string;
  termsAcceptance: string;
  termsError: string;
  termsContent: string[];
  profileTitle: string;
  personalInfo: string;
  bookingHistory: string;
  accountSettings: string;
  preferences: string;
  editProfile: string;
  saveChanges: string;
  uploadPhoto: string;
  noHistory: string;
  calendar: string;
  languagePref: string;
  themePref: string;
  logout: string;
  cancelBooking: string;
  cancelConfirmTitle: string;
  cancelConfirmMessage: string;
  bookingCancelled: string;
  subscriptions: string;
  currentPlan: string;
  availablePlans: string;
  upgrade: string;
  downgrade: string;
  active: string;
  billingCycle: string;
  monthly: string;
  yearly: string;
  notifications: string;
  emailReminders: string;
  pushAlerts: string;
  blogTitle: string;
  blogSubtitle: string;
  readMore: string;
  allCategories: string;
  category: string;
  author: string;
  publishedOn: string;
  noArticles: string;
  share: string;
  shareArticle: string;
  linkCopied: string;
  footerContact: string;
  scanToContact: string;
  footerTagline: string;
  chatAssistant: string;
  chatPlaceholder: string;
  chatGreeting: string;
  liveUpdate: string;
  help: string;
  statusReceived: string;
  statusProcessing: string;
  statusConfirmed: string;
  statusMsgReceived: string;
  statusMsgProcessing: string;
  statusMsgConfirmed: string;
  reminderTitle: string;
  reminderMsg: string;
  aiWriterTitle: string;
  aiWriterSubtitle: string;
  topicPlaceholder: string;
  keywordsPlaceholder: string;
  selectLanguage: string;
  selectTone: string;
  generate: string;
  generating: string;
  generatedSuccess: string;
  toneInformative: string;
  toneDevotional: string;
  tonePhilosophical: string;
  bookConsultationCTA: string;
  estimatedDuration: string;
  faqs: { question: string; answer: string }[];
  services: {
    id: string;
    title: string;
    shortDesc: string;
    longDesc: string;
    duration: string;
    img: string;
    largeImg: string;
    imageUrl: string;
    testimonials: { author: string; text: string; location?: string }[];
  }[];
}

export const translations: Record<Language, TranslationSchema> = {
  ne: {
    navTitle: "ॐ नमो भगवते वासुदेवाय 🙏",
    heroTitle: "तपाईँको जीवनमा सुख, शान्ति र समृद्धिको लागि हामी सम्पूर्ण कर्मकाण्ड र ज्योतिषीय परामर्श सेवा प्रदान गर्दछौँ।",
    bookingTitle: "अनलाइन बुकिङ (Booking System)",
    bookingSubtitle: "तपाईँको शुभ समय र सेवा सुनिश्चित गर्नुहोस्",
    selectService: "सेवा छनोट गर्नुहोस् (Select Service)",
    preferredDate: "उपयुक्त मिति (Preferred Date)",
    preferredTime: "उपयुक्त समय (Preferred Time)",
    dateFormat: "मिति ढाँचा (Date Format)",
    timeFormat: "समय ढाँचा (Time Format)",
    fullName: "नाम (Full Name)",
    phone: "फोन नम्बर (Phone Number)",
    email: "इमेल (Email Address)",
    invalidEmail: "कृपया मान्य इमेल ठेगाना हाल्नुहोस्।",
    invalidPhone: "कृपया मान्य फोन नम्बर हाल्नुहोस्।",
    invalidDate: "भविष्यको मिति छान्नुहोस्।",
    invalidTime: "अमान्य समय, कृपया पुन: जाँच गर्नुहोस्।",
    submit: "पठाउनुहोस्",
    back: "पछाडि फर्कनुहोस्",
    next: "अगाडि बढ्नुहोस्",
    confirm: "बुकिङ कन्फर्म गर्नुहोस्",
    confirmBookingTitle: "विवरणहरू रुजु गर्नुहोस्",
    confirmBookingDesc: "कृपया बुकिङ सम्पन्न गर्नु अघि एक पटक आफ्नो विवरणहरू जाँच गर्नुहोस्।",
    cancel: "रद्द गर्नुहोस्",
    bookingSuccess: "बुकिङ अनुरोध सफल भयो!",
    bookingSummary: "सारांश (Booking Summary)",
    newBooking: "नयाँ बुकिङ गर्नुहोस्",
    service: "सेवा",
    date: "मिति",
    time: "समय",
    aboutTitle: "हाम्रो परिचय (About Us)",
    aboutSubtitle: "शास्त्रोक्त परम्परा र वैदिक ज्ञानको संरक्षण",
    scholarIntro: "विद्वान परिचय",
    scholarDesc: "हामी विगत लामो समयदेखि वैदिक सनातन धर्मको संरक्षण र प्रचार-प्रसारमा समर्पित छौँ। हाम्रा मुख्य विद्वानहरू संस्कृत विश्वविद्यालयबाट प्रशिक्षित र कर्मकाण्डमा दख्खल राख्ने अनुभवी ब्राह्मणहरू हुनुहुन्छ।",
    deepExpertise: "गहिरो ज्ञान (Deep Expertise)",
    deepExpertiseDesc: "हाम्रो विद्याशालाका गुरुहरू वेद, पुराण र ज्योतिष शास्त्रमा गहिरो ज्ञान राख्नुहुन्छ, जसले तपाईँको हरेक कर्मलाई अर्थपूर्ण बनाउँदछ।",
    reliability: "विश्वसनीयता (Reliability)",
    reliabilityDesc: "हामी परम्परागत मर्यादालाई कायम राख्दै आधुनिक समयमा पनि शास्त्रसम्मत बाटो देखाउन सधैँ तत्पर छौँ।",
    forEveryone: "हरेकका लागि (For Everyone)",
    forEveryoneDesc: "चाहे साना पूजा हुन् वा ठूला महायज्ञ, हामी सबै प्रकारका आध्यात्मिक आवश्यकताहरूको लागि मार्गदर्शक हौँ।",
    faqTitle: "सोधिएका प्रश्नहरू (FAQ)",
    faqSubtitle: "हाम्रा सेवाहरूबारे केही सामान्य जिज्ञासाहरू",
    inquiryTitle: "सम्पर्क फारम (Inquiry Form)",
    inquirySubtitle: "हामीलाई आफ्नो जिज्ञासा वा सेवाको बारेमा मेसेज छोड्नुहोस्।",
    subject: "विषय (Subject)",
    message: "सन्देश (Message)",
    submitNow: "पठाउनुहोस् (Submit Now)",
    sending: "पठाउँदैछ...",
    success: "सफलतापूर्वक पठाइयो!",
    messageSuccess: "तपाईँको सन्देश प्राप्त भएको छ। हामी छिट्टै तपाईँलाई सम्पर्क गर्नेछौँ।",
    formErrors: {
      nameRequired: "कृपया आफ्नो पूरा नाम लेख्नुहोस्।",
      emailRequired: "कृपया आफ्नो इमेल ठेगाना लेख्नुहोस्।",
      phoneRequired: "कृपया आफ्नो फोन नम्बर लेख्नुहोस्।",
      subjectRequired: "कृपया विषय उल्लेख गर्नुहोस्।",
      messageRequired: "कृपया आफ्नो सन्देश लेख्नुहोस्।",
      messageTooShort: "सन्देश कम्तिमा १० अक्षरको हुनुपर्दछ।"
    },
    termsTitle: "सेवाका सर्त र नियमहरू (Terms & Conditions)",
    termsAcceptance: "म सेवाका सर्त र नियमहरूसँग सहमत छु।",
    termsError: "कृपया अगाडि बढ्नका लागि सर्तहरू स्वीकार गर्नुहोस्।",
    termsContent: [
      "प्रदान गरिएका सेवाहरू शास्त्रोक्त विधि र परम्परामा आधारित छन्।",
      "बुकिङ गरिएको समय विद्वान गुरुहरूको उपलब्धता अनुसार परिवर्तन हुन सक्छ।",
      "सेवा शुल्क (दक्षिण) सेवाको प्रकृति र आवश्यक सामग्री अनुसार निर्धारण गरिनेछ।",
      "हामी तपाईँको गोप्य विवरणहरूको पूर्ण सुरक्षित राख्ने प्रतिबद्धता गर्दछौँ।",
      "विशेष परिस्थितिमा बुकिङ रद्द गर्नुपरेमा २४ घण्टा अगावै जानकारी दिनुपर्नेछ।"
    ],
    profileTitle: "प्रयोगकर्ता प्रोफाइल",
    personalInfo: "व्यक्तिगत विवरण",
    bookingHistory: "बुकिङ इतिहास",
    accountSettings: "खाता सेटिङहरू",
    preferences: "प्राथमिकताहरू",
    editProfile: "प्रोफाइल सम्पादन गर्नुहोस्",
    saveChanges: "परिवर्तनहरू बचत गर्नुहोस्",
    uploadPhoto: "फोटो अपलोड गर्नुहोस्",
    noHistory: "अझै कुनै बुकिङ इतिहास छैन।",
    calendar: "क्यालेन्डर (Calendar)",
    languagePref: "भाषा प्राथमिकता",
    themePref: "विषयवस्तु (Theme)",
    logout: "लगआउट",
    cancelBooking: "बुकिङ रद्द गर्नुहोस्",
    cancelConfirmTitle: "बुकिङ रद्द गर्ने हो?",
    cancelConfirmMessage: "के तपाईँ निश्चित हुनुहुन्छ कि तपाईँ यो बुकिङ रद्द गर्न चाहनुहुन्छ? यो प्रक्रिया फिर्ता गर्न सकिने छैन।",
    bookingCancelled: "बुकिङ सफलतापूर्वक रद्द गरियो।",
    subscriptions: "सदस्यता (Subscriptions)",
    currentPlan: "हालको सदस्यता",
    availablePlans: "उपलब्ध योजनाहरू",
    upgrade: "अपग्रेड गर्नुहोस्",
    downgrade: "डाउनग्रेड गर्नुहोस्",
    active: "सक्रिय",
    billingCycle: "भुक्तानी चक्र",
    monthly: "मासिक",
    yearly: "वार्षिक",
    notifications: "सूचनाहरू (Notifications)",
    emailReminders: "इमेल रिमाइन्डरहरू",
    pushAlerts: "पुस अलर्टहरू (Push Alerts)",
    blogTitle: "आध्यात्मिक ज्ञान (Spiritual Blog)",
    blogSubtitle: "वैदिक सनातन धर्म र आध्यात्मिक ज्ञानका लेखहरू",
    readMore: "थप पढ्नुहोस्",
    allCategories: "सबै विधा",
    category: "विधा",
    author: "लेखक",
    publishedOn: "प्रकाशित मिति",
    noArticles: "अहिले कुनै लेखहरू उपलब्ध छैनन्।",
    share: "सेयर (Share)",
    shareArticle: "लेख सेयर गर्नुहोस्",
    linkCopied: "लिङ्क कपी गरियो!",
    footerContact: "आजै सम्पर्क वा मेसेज गर्नुहोस्!",
    scanToContact: "SCAN TO CONTACT",
    footerTagline: "सम्पूर्ण कर्मकाण्ड एवं परामर्शको लागि हामीलाई मेसेज गर्नुहोस्। 🙏",
    chatAssistant: "आध्यात्मिक गुरु (AI Assistant)",
    chatPlaceholder: "आफ्नो जिज्ञासा यहाँ सोध्नुहोस्...",
    chatGreeting: "नमस्ते! म तपाईँको आध्यात्मिक सहायक हुँ। तपाईँलाई आज कुन कुरामा मद्दत चाहिन्छ?",
    liveUpdate: "लाइभ अपडेट (Live Update)",
    help: "मद्दत (Help)",
    statusReceived: "प्राप्त भयो (Received)",
    statusProcessing: "प्रक्रियामा (Processing)",
    statusConfirmed: "सुनिश्चित भयो (Confirmed)",
    statusMsgReceived: "हामीले तपाईँको अनुरोध प्राप्त गरेका छौँ।",
    statusMsgProcessing: "हाम्रा विद्वानहरूले तपाईँको समय तालिका समीक्षा गर्दै हुनुहुन्छ।",
    statusMsgConfirmed: "तपाईँको बुकिङ अहिले आधिकारिक रूपमा सुनिश्चित भएको छ!",
    reminderTitle: "बुकिङ सम्झाउनी (Reminder)",
    reminderMsg: "तपाईँको {{service}} बुकिङ भोलि {{time}} मा छ। कृपया तयारी अवस्थामा रहनुहोला।",
    aiWriterTitle: "AI लेख रचना (AI Content Creator)",
    aiWriterSubtitle: "आध्यात्मिक र धार्मिक लेखहरू जेमिनी AI मार्फत तुरुन्तै तयार पार्नुहोस्।",
    topicPlaceholder: "लेखको मुख्य विषय यहाँ लेख्नुहोस्...",
    keywordsPlaceholder: "मुख्य शब्दहरू (Keywords) हाल्नुहोस्...",
    selectLanguage: "लेखन भाषा छनोट गर्नुहोस्",
    selectTone: "लेखन शैली (Tone) छनोट गर्नुहोस्",
    generate: "लेख तयार पार्नुहोस्",
    generating: "लेख तयार हुँदैछ...",
    generatedSuccess: "लेख सफलतापूर्वक तयार भयो!",
    toneInformative: "जानकारीमूलक (Informative)",
    toneDevotional: "भक्तिमूलक (Devotional)",
    tonePhilosophical: "दार्शनिक (Philosophical)",
    bookConsultationCTA: "परामर्श वा सेवा बुक गर्नुहोस्",
    estimatedDuration: "अनुमानित समय",
    faqs: [
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
      },
      {
        question: "ज्योतिष सत्र (Consultation) कसरी बुक गर्ने?",
        answer: "तपाईँले हाम्रो अनलाइन बुकिङ प्रणालीबाट 'ज्योतिष परामर्श' छनोट गरेर वा ह्वाट्सएप/फोन मार्फत सिधै सम्पर्क गरेर आफ्नो समय बुक गर्न सक्नुहुन्छ।"
      },
      {
        question: "प्रश्न कुण्डली भनेको के हो?",
        answer: "प्रश्न कुण्डली ज्योतिषको एक विशेष पद्धति हो जुन व्यक्तिको जन्म विवरण नहुँदा प्रयोग गरिन्छ। यसमा प्रश्न सोधिएको समयको आधारमा ग्रहहरूको गणना गरी सटीक समाधान निकालिन्छ।"
      },
      {
        question: "सेवाको समयावधि कति हुन्छ?",
        answer: "पूजा वा परामर्शको प्रकृति अनुसार समयावधि फरक हुन्छ। सामान्य पूजा वा ज्योतिष परामर्श १-२ घण्टाको हुन्छ भने ठूला अनुष्ठानहरू धेरै दिनसम्म चल्न सक्छन्।"
      },
      {
        question: "भुक्तानीका माध्यमहरू के के हुन्?",
        answer: "हामीले डिजिटल वालेट (eSewa, Khalti), बैंक ट्रान्सफर र नगद भुक्तानी पनि स्वीकार गर्दछौँ। अनलाइन बुकिङ गर्दा तपाईँले आफ्नो सुविधा अनुसार छनौट गर्न सक्नुहुन्छ।"
      },
      {
        question: "विशिष्ट समस्याका लागि आध्यात्मिक मार्गदर्शन कसरी प्राप्त गर्ने?",
        answer: "तपाईँले 'ज्योतिष परामर्श' बुक गरेर वा सिधै ह्वाट्सएप मार्फत आफ्नो समस्या राख्न सक्नुहुन्छ। हामी तपाईँको कुण्डली विश्लेषण गरेर उचित शास्त्रोक्त उपाय, मन्त्र वा पूजाको सल्लाह दिनेछौँ।"
      }
    ],
    services: [
      {
        id: "puja",
        title: "पूजा एवं अनुष्ठान",
        shortDesc: "गणपति पूजन, लक्ष्मी पूजन, शिव पूजन (रुद्राभिषेक), र नवग्रह पूजन।",
        longDesc: "वैदिक परम्परा अनुसार गरिने पूजा र अनुष्ठानले घरमा सकारात्मक ऊर्जा ल्याउँछ। हामी गणपति पूजन, महालक्ष्मी पूजन, रुद्राभिषेक, र नवग्रह शान्ति पूजा जस्ता विशेष अनुष्ठानहरू शास्त्रीय विधि र परम्परालाई पछ्याउँदै श्रद्धापूर्वक सम्पन्न गर्छौँ। हाम्रा अनुभवी पण्डितहरूले प्रत्येक मन्त्रको शुद्ध उच्चारण र कर्मकाण्डको मर्यादा कायम राख्दै तपाईँको आध्यात्मिक संकल्प पूरा गर्न मद्दत गर्नुहुन्छ।",
        duration: "१-२ घण्टा",
        img: "https://picsum.photos/seed/pooja/400/250",
        largeImg: "https://picsum.photos/seed/pooja-alt/800/500",
        imageUrl: "https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&q=80&w=800",
        testimonials: [
          { author: "राम प्रसाद", text: "हामीले घरमा रुद्राभिषेक गराएका थियौँ, गुरुहरूको मन्त्रोच्चारण र विधि अति नै चित्तबुझ्दो थियो।", location: "काठमाडौँ" },
          { author: "सीता देवी", text: "लक्ष्मी पूजाको अवसरमा गरिएको अनुष्ठानले घरमा शान्ति महसुस भयो।", location: "ललितपुर" }
        ]
      },
      {
        id: "house",
        title: "गृह प्रवेश",
        shortDesc: "वास्तु शान्ति सहितको नयाँ घरको पूजन।",
        longDesc: "नयाँ घरमा प्रवेश गर्दा वास्तु पुरुष र कुल देवताको आशीर्वाद प्राप्त गर्नु अनिवार्य मानिन्छ। हामी वास्तु शान्ति, कलश यात्रा, र अग्नि स्थापन सहितको पूर्ण गृह प्रवेश विधि सम्पन्न गर्छौँ। यसले तपाईँको निवासमा सुख, शान्ति र स्थिरता सुनिश्चित गर्दछ। वास्तु दोष निवारणका लागि विशेष उपायहरू र हवन पनि यसै अन्तर्गत गरिन्छ।",
        duration: "३-४ घण्टा",
        img: "https://picsum.photos/seed/house/400/250",
        largeImg: "https://picsum.photos/seed/house-entry/800/500",
        imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800",
        testimonials: [
          { author: "हरि दाहाल", text: "नयाँ फ्ल्याटमा गृह प्रवेश पूजन धेरै राम्रोसँग भयो। धन्यवाद गुरु!", location: "भक्तपुर" }
        ]
      },
      {
        id: "scripture",
        title: "पाठ र पारायण",
        shortDesc: "सुन्दरकाण्ड, रामायण, गीता र भागवत पाठ।",
        longDesc: "पवित्र शास्त्रहरूको पाठ र वाचनले मनमा एकाग्रता र जीवनमा स्पष्टता ल्याउँछ। हामी सुन्दरकाण्ड पाठ, श्रीमद्भागवत सप्ताह, र गीता वाचन जस्ता सेवाहरू प्रदान गर्दछौँ। शास्त्रका गुह्य अर्थहरू स्पष्ट पार्दै गरिने वाचनले श्रोताको आध्यात्मिक स्तर वृद्धि गर्न सहयोग गर्दछ।",
        duration: "२-५ घण्टा",
        img: "https://picsum.photos/seed/scripture/400/250",
        largeImg: "https://picsum.photos/seed/scripture-study/800/500",
        imageUrl: "https://images.unsplash.com/photo-1544924462-8321041f021c?auto=format&fit=crop&q=80&w=800",
        testimonials: [
          { author: "कृष्ण सापकोटा", text: "श्रीमद्भागवत कथा वाचन धेरै नै प्रभावशाली थियो।", location: "चितवन" }
        ]
      },
      {
        id: "astrology",
        title: "ज्योतिष सेवा",
        shortDesc: "चिना हेर्ने, कुण्डली मिलान र मार्गदर्शन।",
        longDesc: "ग्रह र नक्षत्रको अध्ययन मार्फत तपाईँको जीवनको मार्गचित्र बुझ्न हामी मद्दत गर्दछौँ। जन्मकुण्डली निर्माण, विवाहका लागि गुण मिलान, र जीवनका कठिन मोडहरूमा उपर्युक्त ज्योतिषीय परामर्श हाम्रा विशेषज्ञहरूले प्रदान गर्नुहुन्छ। ग्रह दोष निवारणका लागि रत्न परामर्श र शान्ति स्वस्तिकका विधिहरू पनि हामी सुझाउँछौँ।",
        duration: "४५-६० मिनेट",
        img: "https://picsum.photos/seed/astrology/400/250",
        largeImg: "https://picsum.photos/seed/astrology-map/800/500",
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
        testimonials: [
          { author: "अनिता गुरुङ", text: "कुण्डली विश्लेषण धेरै सटीक लाग्यो, बताएका उपायहरूले मलाई फाइदा भयो।", location: "पोखरा" }
        ]
      }
    ]
  },
  en: {
    navTitle: "Om Namo Bhagavate Vasudevaya 🙏",
    heroTitle: "We provide complete ritual and astrological consultation services for peace, happiness, and prosperity in your life.",
    bookingTitle: "Online Booking System",
    bookingSubtitle: "Ensure your auspicious time and service",
    selectService: "Select Service",
    preferredDate: "Preferred Date",
    preferredTime: "Preferred Time",
    dateFormat: "Date Format",
    timeFormat: "Time Format",
    fullName: "Full Name",
    phone: "Phone Number",
    email: "Email Address",
    invalidEmail: "Please enter a valid email address.",
    invalidPhone: "Please enter a valid phone number.",
    invalidDate: "Please select a future date.",
    invalidTime: "Invalid time, please check again.",
    submit: "Submit",
    back: "Go Back",
    next: "Next Step",
    confirm: "Confirm Booking",
    confirmBookingTitle: "Confirm Your Details",
    confirmBookingDesc: "Please review your booking details before final submission.",
    cancel: "Cancel",
    bookingSuccess: "Booking Request Successful!",
    bookingSummary: "Booking Summary",
    newBooking: "Make New Booking",
    service: "Service",
    date: "Date",
    time: "Time",
    aboutTitle: "About Us",
    aboutSubtitle: "Preservation of Scriptural Traditions and Vedic Knowledge",
    scholarIntro: "Scholar Introduction",
    scholarDesc: "We have been dedicated to the preservation and promotion of Vedic Sanatan Dharma for a long time. Our main scholars are trained from Sanskrit Universities and are experienced Brahmins with expertise in rituals.",
    deepExpertise: "Deep Expertise",
    deepExpertiseDesc: "The Gurus of our Vidyashala have deep knowledge of Vedas, Puranas, and Astrology, making your every action meaningful.",
    reliability: "Reliability",
    reliabilityDesc: "We are always ready to show the scriptural path even in modern times while maintaining traditional dignity.",
    forEveryone: "For Everyone",
    forEveryoneDesc: "Whether small pujas or large Mahayajnas, we are guides for all types of spiritual needs.",
    faqTitle: "Frequently Asked Questions (FAQ)",
    faqSubtitle: "Some common queries about our services",
    inquiryTitle: "Inquiry Form",
    inquirySubtitle: "Leave us a message about your query or service.",
    subject: "Subject",
    message: "Message",
    submitNow: "Submit Now",
    sending: "Sending...",
    success: "Sent Successfully!",
    messageSuccess: "Your message has been received. We will contact you soon.",
    formErrors: {
      nameRequired: "Please enter your full name.",
      emailRequired: "Please enter your email address.",
      phoneRequired: "Please enter your phone number.",
      subjectRequired: "Please specify a subject.",
      messageRequired: "Please enter your message.",
      messageTooShort: "Message must be at least 10 characters long."
    },
    termsTitle: "Terms & Conditions",
    termsAcceptance: "I agree to the Terms & Conditions.",
    termsError: "Please accept the terms and conditions to proceed.",
    termsContent: [
      "The services provided are based on scriptural methods and traditions.",
      "The booked time may change depending on the availability of the scholars.",
      "Service fees (Dakshina) will be determined according to the nature of the service and required materials.",
      "We are committed to keeping your private details completely secure.",
      "If you need to cancel a booking in special circumstances, you must inform us 24 hours in advance."
    ],
    profileTitle: "User Profile",
    personalInfo: "Personal Information",
    bookingHistory: "Booking History",
    accountSettings: "Account Settings",
    preferences: "Preferences",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    uploadPhoto: "Upload Photo",
    noHistory: "No booking history yet.",
    calendar: "Calendar",
    languagePref: "Language Preference",
    themePref: "Theme Preference",
    logout: "Logout",
    cancelBooking: "Cancel Booking",
    cancelConfirmTitle: "Cancel Booking?",
    cancelConfirmMessage: "Are you sure you want to cancel this booking? This action cannot be undone.",
    bookingCancelled: "Booking cancelled successfully.",
    subscriptions: "Subscriptions",
    currentPlan: "Current Plan",
    availablePlans: "Available Plans",
    upgrade: "Upgrade",
    downgrade: "Downgrade",
    active: "Active",
    billingCycle: "Billing Cycle",
    monthly: "Monthly",
    yearly: "Yearly",
    notifications: "Notifications",
    emailReminders: "Email Reminders",
    pushAlerts: "Push Alerts",
    blogTitle: "Spiritual Blog",
    blogSubtitle: "Articles on Vedic Sanatan Dharma and Spiritual Knowledge",
    readMore: "Read More",
    allCategories: "All Categories",
    category: "Category",
    author: "Author",
    publishedOn: "Published On",
    noArticles: "No articles available at the moment.",
    share: "Share",
    shareArticle: "Share Article",
    linkCopied: "Link copied to clipboard!",
    footerContact: "Contact or message us today!",
    scanToContact: "SCAN TO CONTACT",
    footerTagline: "Please message us for all rituals and consultations. 🙏",
    chatAssistant: "Spiritual Guru (AI Assistant)",
    chatPlaceholder: "Ask your spiritual query here...",
    chatGreeting: "Namaste! I am your spiritual assistant. How can I help you today?",
    liveUpdate: "Live Update",
    help: "Help / FAQ",
    statusReceived: "Received",
    statusProcessing: "Processing",
    statusConfirmed: "Confirmed",
    statusMsgReceived: "We have received your request.",
    statusMsgProcessing: "Our practitioner is reviewing your schedule.",
    statusMsgConfirmed: "Your booking is now officially confirmed!",
    reminderTitle: "Upcoming Booking Reminder",
    reminderMsg: "Your {{service}} booking is tomorrow at {{time}}. Please be prepared.",
    aiWriterTitle: "AI Spiritual Writer",
    aiWriterSubtitle: "Generate spiritual and religious articles instantly with Gemini AI.",
    topicPlaceholder: "Enter the main topic of the article...",
    keywordsPlaceholder: "Enter keywords (comma separated)...",
    selectLanguage: "Select Language",
    selectTone: "Select Tone",
    generate: "Generate Article",
    generating: "Generating Article...",
    generatedSuccess: "Article generated successfully!",
    toneInformative: "Informative",
    toneDevotional: "Devotional",
    tonePhilosophical: "Philosophical",
    bookConsultationCTA: "Book Your Consultation",
    estimatedDuration: "Estimated Duration",
    faqs: [
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
      },
      {
        question: "How can I book an astrology session?",
        answer: "You can book directly through our online booking system by selecting 'Astrology Consultation' or contact us via WhatsApp/Phone for a personalized schedule."
      },
      {
        question: "What is Prashna Kundali?",
        answer: "Prashna Kundali is a branch of astrology used when a person does not know their exact birth details. It is based on the planetary positions at the exact time the question is asked to provide guidance."
      },
      {
        question: "What is the duration of services?",
        answer: "The duration varies by ritual or consultation. Standard pujas and astrological consultations are typically 1-2 hours, while larger ceremonies can span multiple days."
      },
      {
        question: "What payment methods are accepted?",
        answer: "We accept digital wallets (eSewa, Khalti), bank transfers, and cash payments. You can choose the most convenient method during the booking process."
      },
      {
        question: "How can I get spiritual guidance for specific problems?",
        answer: "You can book an 'Astrology Consultation' or message us directly via WhatsApp. We will analyze your birth chart or personal situation to recommend specific spiritual remedies, mantras, or rituals."
      }
    ],
    services: [
      {
        id: "puja",
        title: "Puja & Rituals",
        shortDesc: "Ganapati Pujan, Lakshmi Pujan, Shiva Pujan (Rudrabhishek), and Navagraha Pujan.",
        longDesc: "Pujas and rituals performed according to Vedic traditions bring positive energy to the home. We perform special rituals such as Ganapati Pujan, Mahalakshmi Pujan, Rudrabhishek, and Navagraha Shanti Puja with deep devotion, following classical methods and traditions. Our experienced Pandits help you fulfill your spiritual resolutions while maintaining clear pronunciation of every mantra and the dignity of the ritual.",
        duration: "1-2 Hours",
        img: "https://picsum.photos/seed/pooja/400/250",
        largeImg: "https://picsum.photos/seed/pooja-alt/800/500",
        imageUrl: "https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&q=80&w=800",
        testimonials: [
          { author: "Ram Prasad", text: "We had Rudrabhishek performed at home; the Gurus' mantra chanting and method were very satisfying.", location: "Kathmandu" },
          { author: "Sita Devi", text: "The ritual performed during Lakshmi Puja brought peace to the house.", location: "Lalitpur" }
        ]
      },
      {
        id: "house",
        title: "Griha Pravesh",
        shortDesc: "New home worship including Vastu Shanti.",
        longDesc: "When entering a new home, it is considered essential to seek the blessings of Vastu Purusha and the family deity. We complete the full Griha Pravesh procedure including Vastu Shanti, Kalash Yatra, and Agni Sthapan. This ensures happiness, peace, and stability in your residence. Special remedies for Vastu defects and Havan are also performed under this.",
        duration: "3-4 Hours",
        img: "https://picsum.photos/seed/house/400/250",
        largeImg: "https://picsum.photos/seed/house-entry/800/500",
        imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800",
        testimonials: [
          { author: "Hari Dahal", text: "The Griha Pravesh worship in the new flat went very well. Thank you Guru!", location: "Bhaktapur" }
        ]
      },
      {
        id: "scripture",
        title: "Scripture Recitation",
        shortDesc: "Sundarkand, Ramayana, Gita, and Bhagwat recitation.",
        longDesc: "Reading and reciting sacred scriptures brings concentration to the mind and clarity to life. We provide services like Sundarkand पाठ, Shrimad Bhagwat Saptah, and Gita recitation. Narration done while clarifying the hidden meanings of the scriptures helps in increasing the spiritual level of the listener.",
        duration: "2-5 Hours",
        img: "https://picsum.photos/seed/scripture/400/250",
        largeImg: "https://picsum.photos/seed/scripture-study/800/500",
        imageUrl: "https://images.unsplash.com/photo-1544924462-8321041f021c?auto=format&fit=crop&q=80&w=800",
        testimonials: [
          { author: "Krishna Sapkota", text: "The Shrimad Bhagwat story narration was very effective.", location: "Chitwan" }
        ]
      },
      {
        id: "astrology",
        title: "Astrology Services",
        shortDesc: "Horoscope reading, chart matching, and guidance.",
        longDesc: "We help you understand the blueprint of your life through the study of planets and constellations. Our experts provide birth chart creation, matching qualities for marriage, and appropriate astrological advice at difficult turns in life. We also suggest methods for planetary defect removal, gemstone advice, and Shanti Swastika procedures.",
        duration: "45-60 Minutes",
        img: "https://picsum.photos/seed/astrology/400/250",
        largeImg: "https://picsum.photos/seed/astrology-map/800/500",
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
        testimonials: [
          { author: "Anita Gurung", text: "The chart analysis felt very accurate, and the suggested remedies benefited me.", location: "Pokhara" }
        ]
      }
    ]
  }
};

const LanguageContext = React.createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
}>({
  language: 'ne',
  setLanguage: () => {},
  t: translations.ne,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = React.useState<Language>('ne');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => React.useContext(LanguageContext);
