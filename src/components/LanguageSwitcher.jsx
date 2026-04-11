import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const currentLanguage = i18n.language.split('-')[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white text-sm font-bold backdrop-blur-md"
      >
        <Languages size={18} />
        <span className="uppercase">{currentLanguage}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 p-1"
          >
            <button
              onClick={() => toggleLanguage('en')}
              className={`w-full px-4 py-2 text-left text-sm font-bold rounded-xl transition-colors ${
                currentLanguage === 'en' ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              English
            </button>
            <button
              onClick={() => toggleLanguage('fr')}
              className={`w-full px-4 py-2 text-left text-sm font-bold rounded-xl transition-colors ${
                currentLanguage === 'fr' ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Français
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
