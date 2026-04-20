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
  submit: string;
  back: string;
  next: string;
  confirm: string;
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
  footerContact: string;
  scanToContact: string;
  footerTagline: string;
  liveUpdate: string;
  help: string;
  statusReceived: string;
  statusProcessing: string;
  statusConfirmed: string;
  statusMsgReceived: string;
  statusMsgProcessing: string;
  statusMsgConfirmed: string;
  services: {
    id: string;
    title: string;
    shortDesc: string;
    longDesc: string;
    img: string;
    largeImg: string;
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
    submit: "पठाउनुहोस्",
    back: "पछाडि फर्कनुहोस्",
    next: "अगाडि बढ्नुहोस्",
    confirm: "बुकिङ कन्फर्म गर्नुहोस्",
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
    footerContact: "आजै सम्पर्क वा मेसेज गर्नुहोस्!",
    scanToContact: "SCAN TO CONTACT",
    footerTagline: "सम्पूर्ण कर्मकाण्ड एवं परामर्शको लागि हामीलाई मेसेज गर्नुहोस्। 🙏",
    liveUpdate: "लाइभ अपडेट (Live Update)",
    help: "मद्दत (Help)",
    statusReceived: "प्राप्त भयो (Received)",
    statusProcessing: "प्रक्रियामा (Processing)",
    statusConfirmed: "सुनिश्चित भयो (Confirmed)",
    statusMsgReceived: "हामीले तपाईँको अनुरोध प्राप्त गरेका छौँ।",
    statusMsgProcessing: "हाम्रा विद्वानहरूले तपाईँको समय तालिका समीक्षा गर्दै हुनुहुन्छ।",
    statusMsgConfirmed: "तपाईँको बुकिङ अहिले आधिकारिक रूपमा सुनिश्चित भएको छ!",
    services: [
      {
        id: "puja",
        title: "पूजा एवं अनुष्ठान",
        shortDesc: "गणपति पूजन, लक्ष्मी पूजन, शिव पूजन (रुद्राभिषेक), र नवग्रह पूजन।",
        longDesc: "वैदिक परम्परा अनुसार गरिने पूजा र अनुष्ठानले घरमा सकारात्मक ऊर्जा ल्याउँछ। हामी गणपति पूजन, महालक्ष्मी पूजन, रुद्राभिषेक, र नवग्रह शान्ति पूजा जस्ता विशेष अनुष्ठानहरू शास्त्रीय विधि र परम्परालाई पछ्याउँदै श्रद्धापूर्वक सम्पन्न गर्छौँ। हाम्रा अनुभवी पण्डितहरूले प्रत्येक मन्त्रको शुद्ध उच्चारण र कर्मकाण्डको मर्यादा कायम राख्दै तपाईँको आध्यात्मिक संकल्प पूरा गर्न मद्दत गर्नुहुन्छ।",
        img: "https://picsum.photos/seed/pooja/400/250",
        largeImg: "https://picsum.photos/seed/pooja-alt/800/500",
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
        img: "https://picsum.photos/seed/house/400/250",
        largeImg: "https://picsum.photos/seed/house-entry/800/500",
        testimonials: [
          { author: "हरि दाहाल", text: "नयाँ फ्ल्याटमा गृह प्रवेश पूजन धेरै राम्रोसँग भयो। धन्यवाद गुरु!", location: "भक्तपुर" }
        ]
      },
      {
        id: "scripture",
        title: "पाठ र पारायण",
        shortDesc: "सुन्दरकाण्ड, रामायण, गीता र भागवत पाठ।",
        longDesc: "पवित्र शास्त्रहरूको पाठ र वाचनले मनमा एकाग्रता र जीवनमा स्पष्टता ल्याउँछ। हामी सुन्दरकाण्ड पाठ, श्रीमद्भागवत सप्ताह, र गीता वाचन जस्ता सेवाहरू प्रदान गर्दछौँ। शास्त्रका गुह्य अर्थहरू स्पष्ट पार्दै गरिने वाचनले श्रोताको आध्यात्मिक स्तर वृद्धि गर्न सहयोग गर्दछ।",
        img: "https://picsum.photos/seed/scripture/400/250",
        largeImg: "https://picsum.photos/seed/scripture-study/800/500",
        testimonials: [
          { author: "कृष्ण सापकोटा", text: "श्रीमद्भागवत कथा वाचन धेरै नै प्रभावशाली थियो।", location: "चितवन" }
        ]
      },
      {
        id: "astrology",
        title: "ज्योतिष सेवा",
        shortDesc: "चिना हेर्ने, कुण्डली मिलान र मार्गदर्शन।",
        longDesc: "ग्रह र नक्षत्रको अध्ययन मार्फत तपाईँको जीवनको मार्गचित्र बुझ्न हामी मद्दत गर्दछौँ। जन्मकुण्डली निर्माण, विवाहका लागि गुण मिलान, र जीवनका कठिन मोडहरूमा उपर्युक्त ज्योतिषीय परामर्श हाम्रा विशेषज्ञहरूले प्रदान गर्नुहुन्छ। ग्रह दोष निवारणका लागि रत्न परामर्श र शान्ति स्वस्तिकका विधिहरू पनि हामी सुझाउँछौँ।",
        img: "https://picsum.photos/seed/astrology/400/250",
        largeImg: "https://picsum.photos/seed/astrology-map/800/500",
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
    submit: "Submit",
    back: "Go Back",
    next: "Next Step",
    confirm: "Confirm Booking",
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
    footerContact: "Contact or message us today!",
    scanToContact: "SCAN TO CONTACT",
    footerTagline: "Please message us for all rituals and consultations. 🙏",
    liveUpdate: "Live Update",
    help: "Help / FAQ",
    statusReceived: "Received",
    statusProcessing: "Processing",
    statusConfirmed: "Confirmed",
    statusMsgReceived: "We have received your request.",
    statusMsgProcessing: "Our practitioner is reviewing your schedule.",
    statusMsgConfirmed: "Your booking is now officially confirmed!",
    services: [
      {
        id: "puja",
        title: "Puja & Rituals",
        shortDesc: "Ganapati Pujan, Lakshmi Pujan, Shiva Pujan (Rudrabhishek), and Navagraha Pujan.",
        longDesc: "Pujas and rituals performed according to Vedic traditions bring positive energy to the home. We perform special rituals such as Ganapati Pujan, Mahalakshmi Pujan, Rudrabhishek, and Navagraha Shanti Puja with deep devotion, following classical methods and traditions. Our experienced Pandits help you fulfill your spiritual resolutions while maintaining clear pronunciation of every mantra and the dignity of the ritual.",
        img: "https://picsum.photos/seed/pooja/400/250",
        largeImg: "https://picsum.photos/seed/pooja-alt/800/500",
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
        img: "https://picsum.photos/seed/house/400/250",
        largeImg: "https://picsum.photos/seed/house-entry/800/500",
        testimonials: [
          { author: "Hari Dahal", text: "The Griha Pravesh worship in the new flat went very well. Thank you Guru!", location: "Bhaktapur" }
        ]
      },
      {
        id: "scripture",
        title: "Scripture Recitation",
        shortDesc: "Sundarkand, Ramayana, Gita, and Bhagwat recitation.",
        longDesc: "Reading and reciting sacred scriptures brings concentration to the mind and clarity to life. We provide services like Sundarkand पाठ, Shrimad Bhagwat Saptah, and Gita recitation. Narration done while clarifying the hidden meanings of the scriptures helps in increasing the spiritual level of the listener.",
        img: "https://picsum.photos/seed/scripture/400/250",
        largeImg: "https://picsum.photos/seed/scripture-study/800/500",
        testimonials: [
          { author: "Krishna Sapkota", text: "The Shrimad Bhagwat story narration was very effective.", location: "Chitwan" }
        ]
      },
      {
        id: "astrology",
        title: "Astrology Services",
        shortDesc: "Horoscope reading, chart matching, and guidance.",
        longDesc: "We help you understand the blueprint of your life through the study of planets and constellations. Our experts provide birth chart creation, matching qualities for marriage, and appropriate astrological advice at difficult turns in life. We also suggest methods for planetary defect removal, gemstone advice, and Shanti Swastika procedures.",
        img: "https://picsum.photos/seed/astrology/400/250",
        largeImg: "https://picsum.photos/seed/astrology-map/800/500",
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
