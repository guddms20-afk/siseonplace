document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 55, 260)}ms`;
    observer.observe(item);
  });

  const saveButton = document.querySelector(".save-contact");
  const toast = document.querySelector(".toast");
  let toastTimer;
  saveButton?.addEventListener("click", () => {
    clearTimeout(toastTimer);
    toast.classList.add("show");
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3600);
  });
});