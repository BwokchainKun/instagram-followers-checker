//   BWOKCHAINKUN >_<
 const langSwitch = document.getElementById('langSwitch');
  const highlight = langSwitch.querySelector('.lang-highlight');
  const options = langSwitch.querySelectorAll('.lang-option');

  function setLang(lang) {
    localStorage.setItem('lang', lang);
    highlight.style.transform = lang === 'en' ? 'translateX(60px)' : 'translateX(0)';
    
    if (typeof updateLanguage === 'function') updateLanguage(lang);
  }

  options.forEach(option => {
    option.addEventListener('click', () => {
      const lang = option.getAttribute('data-lang');
      setLang(lang);
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'id';
    setLang(savedLang);
  });