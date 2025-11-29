/* Small interactive behavior:
   - mobile nav toggle
   - smooth scroll for internal links
   - video modal open/close
   - contact form stub
*/
document.addEventListener("DOMContentLoaded", function () {
  // Year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Mobile nav
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");
  navToggle &&
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", (!expanded).toString());
      navList.style.display = expanded ? "none" : "flex";
    });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        if (navList) navList.style.display = "none";
      }
    });
  });

  // Video modal
  const modal = document.getElementById("videoModal");
  const modalWrapper = document.getElementById("modalVideoWrapper");
  const modalClose = document.getElementById("modalClose");

  function openModal(src = "") {
    if (!modal) return;
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    modalWrapper.innerHTML = `
    <iframe 
      src="${src}" 
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  `;
  }

  // Close modal and stop video
  function closeModal() {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modalWrapper.innerHTML = "";
  }

  // Click to open video
  document.querySelectorAll(".video-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const src = thumb.getAttribute("data-video-src");
      // if (!src) return alert("Missing video URL");
      openModal(src);
    });
  });

  // Close modal events
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
});
