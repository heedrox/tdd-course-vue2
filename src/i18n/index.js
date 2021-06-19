import Vue from 'vue';
import VueI18n from 'vue-i18n';
import es from './locales/es';
import en from './locales/en';

Vue.use(VueI18n);

const messages = {
  es,
  en
};

const i18n = new VueI18n({
  locale: 'es', // set locale
  fallbackLocale: 'es',
  messages, // set locale messages
});

export default i18n;
