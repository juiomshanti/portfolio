// Shared behaviour: scroll-reveal + current year
document.documentElement.classList.add("js");
document.addEventListener("DOMContentLoaded", () => {
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })
    : null;
  document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
});

// Testimonials: show 3 lines by default, with a Read more / Show less toggle
document.addEventListener("DOMContentLoaded", async () => {
  const quotes = document.querySelectorAll(".quote blockquote");
  if (!quotes.length) return;
  try { await document.fonts.ready; } catch (_) {}
  quotes.forEach((bq, i) => {
    bq.id = bq.id || `quote-${i + 1}`;
    bq.classList.add("clamped");
    if (bq.scrollHeight <= bq.clientHeight + 1) { bq.classList.remove("clamped"); return; } // already short
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quote-toggle";
    btn.textContent = "Read more";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", bq.id);
    btn.addEventListener("click", () => {
      const open = bq.classList.toggle("clamped") === false;
      btn.textContent = open ? "Show less" : "Read more";
      btn.setAttribute("aria-expanded", String(open));
    });
    bq.after(btn);
  });
});
