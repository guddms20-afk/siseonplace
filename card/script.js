document.addEventListener("DOMContentLoaded", () => {
  const revealItems = [...document.querySelectorAll(".reveal")];

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px" });

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 55, 260)}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  const saveButton = document.querySelector(".save-contact");
  const toast = document.querySelector(".toast");
  let toastTimer;

  const showToast = () => {
    if (!toast) return;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    toast.textContent = isIOS
      ? "연락처가 열리면 ‘새로운 연락처 생성’을 눌러 저장해 주세요."
      : "연락처 파일을 열었어요. 화면 안내에 따라 저장해 주세요.";

    clearTimeout(toastTimer);
    toast.classList.add("show");
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3800);
  };

  saveButton?.addEventListener("click", showToast);
});
