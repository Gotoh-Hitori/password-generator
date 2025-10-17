const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthLabel = document.getElementById("strength-label");

const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

generateButton.addEventListener("click", makePassword);

function makePassword() {
  const length = Number(lengthSlider.value);
  const includeUppercase = uppercaseCheckbox.checked;
  const includeLowercase = lowercaseCheckbox.checked;
  const includeNumbers = numbersCheckbox.checked;
  const includeSymbols = symbolsCheckbox.checked;

  if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
    alert("请至少选择一种字符类型！");
    return;
  }

  const newPassword = createRandomPassword(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  );

  passwordInput.value = newPassword;
  updateStrengthMeter(newPassword);
}

function createRandomPassword(length, upper, lower, nums, syms) {
  let allChars = "";
  if (upper) allChars += uppercaseLetters;
  if (lower) allChars += lowercaseLetters;
  if (nums) allChars += numberCharacters;
  if (syms) allChars += symbolCharacters;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }
  return password;
}

function updateStrengthMeter(password) {
  const len = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNum = /[0-9]/.test(password);
  const hasSym = /[!@#$%^&*()-_=+\[\]{}|;:,.<>?]/.test(password);

  let score = 0;
  score += Math.min(len * 2, 40);
  if (hasUpper) score += 15;
  if (hasLower) score += 15;
  if (hasNum) score += 15;
  if (hasSym) score += 15;
  if (len < 8) score = Math.min(score, 40);

  const safeScore = Math.max(5, Math.min(100, score));
  strengthBar.style.width = safeScore + "%";

  let text = "";
  let color = "";
  if (score < 40) {
    color = "#fc8181";
    text = "弱";
  } else if (score < 70) {
    color = "#fbd38d";
    text = "中";
  } else {
    color = "#68d391";
    text = "强";
  }

  strengthBar.style.backgroundColor = color;
  strengthLabel.textContent = text;
}

window.addEventListener("DOMContentLoaded", makePassword);

copyButton.addEventListener("click", () => {
  if (!passwordInput.value) return;
  navigator.clipboard
    .writeText(passwordInput.value)
    .then(() => showCopySuccess())
    .catch((err) => console.error("无法复制:", err));
});

function showCopySuccess() {
  copyButton.classList.remove("far", "fa-copy");
  copyButton.classList.add("fas", "fa-check");
  copyButton.style.color = "#48bb78";

  setTimeout(() => {
    copyButton.classList.remove("fas", "fa-check");
    copyButton.classList.add("far", "fa-copy");
    copyButton.style.color = "";
  }, 1500);
}
