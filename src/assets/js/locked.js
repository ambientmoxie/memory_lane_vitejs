export default function locked() {
  const lockedScreen = document.createElement("div");
  lockedScreen.classList.add("locked-screen");
  lockedScreen.innerHTML =
    "<p> This experiment is not optimized for mobile device. </p>";
  document.body.appendChild(lockedScreen);
}
