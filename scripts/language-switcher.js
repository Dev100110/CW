// Language Switcher for Clean Wings
class LanguageSwitcher {
  constructor() {
    this.currentLanguage = localStorage.getItem('cleanwings-language') || 'ru';
    this.translations = {};
    this.init();
  }

  async init() {
    await this.loadTranslations();
    this.setupEventListeners();
    this.setLanguage(this.currentLanguage);
  }

  async loadTranslations() {
    // Use inline translations to avoid CORS issues
    this.useInlineTranslations();
  }

  useInlineTranslations() {
    // Since we're using data attributes approach, we don't need to preload translations
    // The translations are stored directly in HTML data attributes
    this.translations = {
      ru: {},
      en: {}
    };
  }

  setupEventListeners() {
    // Header language buttons
    const headerButtons = document.querySelectorAll('.lang-btn');
    headerButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.getAttribute('data-lang');
        this.setLanguage(lang);
      });
    });

    // Footer language buttons
    const footerButtons = document.querySelectorAll('.lang-btn-footer');
    footerButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.getAttribute('data-lang');
        this.setLanguage(lang);
      });
    });
  }

  setLanguage(lang) {
    if (lang !== 'ru' && lang !== 'en') return;
    
    this.currentLanguage = lang;
    localStorage.setItem('cleanwings-language', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update button states
    this.updateButtonStates();
    
    // Update content
    this.updateContent();
    
    // Update meta tags
    this.updateMetaTags();
  }

  updateButtonStates() {
    // Header buttons
    const headerButtons = document.querySelectorAll('.lang-btn');
    headerButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLanguage);
    });

    // Footer buttons
    const footerButtons = document.querySelectorAll('.lang-btn-footer');
    footerButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === this.currentLanguage);
    });
  }

  updateContent() {
    // Get all elements with translation attributes
    const elementsWithTranslations = document.querySelectorAll('[data-ru][data-en]');
    
    elementsWithTranslations.forEach(element => {
      const translation = element.getAttribute(`data-${this.currentLanguage}`);
      if (translation) {
        // Handle different element types
        if (element.tagName === 'INPUT' && element.type === 'text') {
          element.placeholder = translation;
        } else if (element.tagName === 'META') {
          element.content = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Update form placeholders and options
    this.updateFormElements();
  }

  updateFormElements() {
    // Update select options
    const selects = document.querySelectorAll('select option[data-ru][data-en]');
    selects.forEach(option => {
      const translation = option.getAttribute(`data-${this.currentLanguage}`);
      if (translation) {
        option.textContent = translation;
      }
    });

    // Update input placeholders if they have translation attributes
    const inputs = document.querySelectorAll('input[data-ru][data-en]');
    inputs.forEach(input => {
      const translation = input.getAttribute(`data-${this.currentLanguage}`);
      if (translation) {
        input.placeholder = translation;
      }
    });
  }

  updateMetaTags() {
    // Update title
    const title = document.querySelector('title');
    if (title && title.hasAttribute(`data-${this.currentLanguage}`)) {
      title.textContent = title.getAttribute(`data-${this.currentLanguage}`);
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && metaDescription.hasAttribute(`data-${this.currentLanguage}`)) {
      metaDescription.content = metaDescription.getAttribute(`data-${this.currentLanguage}`);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    
    if (ogTitle) {
      const titleEl = document.querySelector('title');
      if (titleEl && titleEl.hasAttribute(`data-${this.currentLanguage}`)) {
        ogTitle.content = titleEl.getAttribute(`data-${this.currentLanguage}`);
      }
    }
    
    if (ogDescription) {
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl && descEl.hasAttribute(`data-${this.currentLanguage}`)) {
        ogDescription.content = descEl.getAttribute(`data-${this.currentLanguage}`);
      }
    }
  }

  // Public method to get current language
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Public method to get translation
  getTranslation(key) {
    return this.translations[this.currentLanguage]?.[key] || key;
  }
}

// Initialize language switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.languageSwitcher = new LanguageSwitcher();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LanguageSwitcher;
}