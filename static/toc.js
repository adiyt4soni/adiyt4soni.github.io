// Highlights the "On this page" item for the section in view. Without JS the menu is a plain list of links.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"));
  if (!links.length || !("IntersectionObserver" in window)) return;
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
  var sections = Object.keys(byId).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  function setCurrent(id) {
    links.forEach(function (a) { a.removeAttribute("aria-current"); });
    var a = byId[id];
    if (!a) return;
    a.setAttribute("aria-current", "true");
    var list = a.closest("ol");
    if (list && list.scrollWidth > list.clientWidth) {  // keep the active chip visible on small screens
      list.scrollLeft = a.parentNode.offsetLeft - 16;
    }
  }
  var visible = {};
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting; });
    for (var i = 0; i < sections.length; i++) {
      if (visible[sections[i].id]) { setCurrent(sections[i].id); return; }
    }
  }, { rootMargin: "-15% 0px -65% 0px" });
  sections.forEach(function (s) { io.observe(s); });
})();
