const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const angle = document.getElementById("angle");
const preview = document.getElementById("preview");
const cssCode = document.getElementById("cssCode");
const copyBtn = document.getElementById("copyBtn");
const randomBtn = document.getElementById("randomBtn");
const saveBtn = document.getElementById("saveBtn");
const savedGradients = document.getElementById("savedGradients");

function updateGradient(c1 = color1.value, c2 = color2.value, ang = angle.value) {
  const gradient = `linear-gradient(${ang}deg, ${c1}, ${c2})`;
  preview.style.background = gradient;
  cssCode.textContent = `background: ${gradient};`;

  color1.value = c1;
  color2.value = c2;
  angle.value = ang;
}

function getRandomColor() {
  return `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, "0")}`;
}

function randomizeGradient() {
  const c1 = getRandomColor();
  const c2 = getRandomColor();
  const ang = Math.floor(Math.random() * 361);
  updateGradient(c1, c2, ang);
}

function copyCSS() {
  navigator.clipboard.writeText(cssCode.textContent);
  copyBtn.textContent = "Copied!";
  setTimeout(() => copyBtn.textContent = "📋 Copy CSS", 1500);
}

function saveGradient() {
  const gradient = preview.style.background;
  let saved = JSON.parse(localStorage.getItem("gradients") || "[]");
  if (!saved.includes(gradient)) {
    saved.push(gradient);
    localStorage.setItem("gradients", JSON.stringify(saved));
    renderSavedGradients();
  }
}

function renderSavedGradients() {
  savedGradients.innerHTML = "";
  const saved = JSON.parse(localStorage.getItem("gradients") || "[]");
  saved.forEach(gradient => {
    const swatch = document.createElement("div");
    swatch.classList.add("swatch");
    swatch.style.background = gradient;
    swatch.addEventListener("click", () => {
      const match = gradient.match(/linear-gradient\((\d+)deg, (#[0-9a-fA-F]{6}), (#[0-9a-fA-F]{6})\)/);
      if (match) {
        updateGradient(match[2], match[3], match[1]);
      }
    });
    savedGradients.appendChild(swatch);
  });
}

[randomBtn, saveBtn, copyBtn].forEach(btn => btn.addEventListener("click", () => {
  if (btn === randomBtn) randomizeGradient();
  if (btn === saveBtn) saveGradient();
  if (btn === copyBtn) copyCSS();
}));

[color1, color2, angle].forEach(input => input.addEventListener("input", () => {
  updateGradient();
}));

// Init
updateGradient();
renderSavedGradients();
