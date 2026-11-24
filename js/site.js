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
