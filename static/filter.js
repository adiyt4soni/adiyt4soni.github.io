// Archive search and filters. Progressive: without JS the full list is shown and the form stays hidden.
(function () {
  var form = document.querySelector("form[data-enhance]");
  var list = document.querySelector("[data-list]");
  if (!form || !list) return;
  var entries = Array.prototype.slice.call(list.querySelectorAll(".entry"));
  var q = form.querySelector("#q"), cat = form.querySelector("#cat"), st = form.querySelector("#st");
  var count = document.querySelector("[data-count]"), empty = document.querySelector("[data-empty]");
  var total = entries.length;
  form.hidden = false;

  function norm(s) { return (s || "").toLowerCase(); }
  entries.forEach(function (e) { e._text = norm(e.textContent); });

  function apply() {
    var terms = norm(q.value).split(/\s+/).filter(Boolean);
    var shown = 0;
    entries.forEach(function (e) {
      var ok = (!cat.value || e.dataset.category === cat.value) &&
               (!st.value || e.dataset.status === st.value) &&
               terms.every(function (t) { return e._text.indexOf(t) !== -1; });
      e.hidden = !ok;
      if (ok) shown++;
    });
    count.textContent = shown === total ? total + " entries" : shown + " of " + total + " entries";
    empty.hidden = shown !== 0;
  }

  form.addEventListener("input", apply);
  form.addEventListener("change", apply);
  form.addEventListener("submit", function (ev) { ev.preventDefault(); });
  form.addEventListener("reset", function () { setTimeout(apply, 0); });
  document.querySelector("[data-clear]").addEventListener("click", function () { form.reset(); q.focus(); });
})();
