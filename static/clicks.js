// Counts clicks on outbound links, email and the CV download as GoatCounter events.
// Anonymous: no cookies, no personal data. Does nothing if the counter is blocked.
(function () {
  function name(a) {
    var h = a.getAttribute('href') || '';
    if (h.indexOf('mailto:') === 0) return 'click-email';
    if (/aditya-soni-cv\.pdf$/.test(h)) return 'download-cv';
    if (a.hostname === location.hostname) return null;
    if (/linkedin\.com$/.test(a.hostname)) return 'click-linkedin';
    if (/github\.com$/.test(a.hostname)) return 'click-github' + (a.pathname.length > 12 ? a.pathname.replace(/\/$/, '') : '');
    return 'click-' + a.hostname;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || !window.goatcounter || !window.goatcounter.count) return;
    var n = name(a);
    if (n) window.goatcounter.count({ path: n, title: a.textContent.trim().slice(0, 60), event: true });
  });
})();
