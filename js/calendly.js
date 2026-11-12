/**
 * Calendly "Book a call" popup
 *
 * Any link with a data-calendly attribute opens Calendly's scheduling popup.
 * Calendly's script is only downloaded the first time someone shows intent
 * (hover, focus or tap), so it adds nothing to the initial page load.
 *
 * Until CALENDLY_URL is set to a real link, the links keep their plain
 * mailto: href, so nothing breaks if this ships before the link is ready.
 */
(function () {
  // Your Calendly scheduling link, e.g. 'https://calendly.com/your-name/30min'
  var CALENDLY_URL = 'https://calendly.com/treasurengonyama';

  var configured = CALENDLY_URL.indexOf('YOUR-CALENDLY-LINK') === -1;
  if (!configured) return;

  // Match the popup to the site palette (applies on paid Calendly plans).
  var POPUP_URL = CALENDLY_URL +
    (CALENDLY_URL.indexOf('?') === -1 ? '?' : '&') +
    'hide_gdpr_banner=1&background_color=e8e4de&text_color=111111&primary_color=111111';

  var WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js';
  var WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css';
  var loader = null;

  function loadWidget() {
    if (loader) return loader;
    loader = new Promise(function (resolve, reject) {
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = WIDGET_CSS;
      document.head.appendChild(css);

      var js = document.createElement('script');
      js.src = WIDGET_JS;
      js.async = true;
      js.onload = function () { window.Calendly ? resolve() : reject(); };
      js.onerror = reject;
      document.head.appendChild(js);
    });
    return loader;
  }

  function openPopup() {
    var fallback = setTimeout(function () {
      // Calendly's script was blocked or too slow: open the page instead.
      window.open(CALENDLY_URL, '_blank', 'noopener');
    }, 5000);

    loadWidget().then(function () {
      clearTimeout(fallback);
      window.Calendly.initPopupWidget({ url: POPUP_URL });
    }, function () {
      clearTimeout(fallback);
      window.open(CALENDLY_URL, '_blank', 'noopener');
    });
  }

  function init() {
    var links = document.querySelectorAll('[data-calendly]');
    Array.prototype.forEach.call(links, function (link) {
      // Real URL on the link so middle-click / "open in new tab" still works.
      link.href = CALENDLY_URL;
      link.target = '_blank';
      link.rel = 'noopener';

      link.addEventListener('mouseenter', loadWidget, { once: true });
      link.addEventListener('focus', loadWidget, { once: true });
      link.addEventListener('touchstart', loadWidget, { once: true, passive: true });

      link.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
        e.preventDefault();
        openPopup();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
