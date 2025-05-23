// darkmode script start
document.querySelector(".tumbler-wrapper").onclick = (_) => {
  if (!document.body.classList.contains("night-mode")) {
    setCookie("night-mode", "set", 30);
    document.querySelector("body").classList.add("night-mode");
  } else {
    setCookie("night-mode", "unset", 30);
    document.querySelector("body").classList.remove("night-mode");
  }
  updateToggleIcon();
};
if (getCookie("night-mode")) {
  if (getCookie("night-mode") == "set")
    document.querySelector("body").classList.add("night-mode");
} else {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    setCookie("night-mode", "true", 30);
    document.querySelector("body").classList.add("night-mode");
  }
}
updateToggleIcon();
// darkmode script end
function updateToggleIcon() {
  const isNight = document.body.classList.contains("night-mode");
  const toggleImg = document.querySelector(".mode-toggle-icon");
  if (!toggleImg) return;

  if (isNight) {
    toggleImg.src = "./assets/images/toggle_sun.png";
  } else {
    toggleImg.src = "./assets/images/toggle_moon.png";
  }
}
