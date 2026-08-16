// PWA registration for GitHub Pages:
// https://markivansilvino0-design.github.io/finance-tracker/
(() => {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js", { scope: "./" })
      .then(reg => {
        console.log("Finance Tracker PWA service worker registered:", reg.scope);
        reg.update();
      })
      .catch(err => console.error("PWA service worker registration failed:", err));
  });
})();
