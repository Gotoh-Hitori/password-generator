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

generateButton.addEventListener("click", generatePassword);

function generatePassword() {
  const length = Number(lengthSlider.value);
  const upper = uppercaseCheckbox.checked;
  const lower = lowercaseCheckbox.checked;
  const num = numbersCheckbox.checked;
  const sym = symbolsCheckbox.checked;

  if (!upper && !lower && !num && !sym) {
    alert("Please select at least one character type!");
    return;
  }

  let pool = "";
  if (upper) pool += uppercaseLetters;
  if (lower) pool += lowercaseLetters;
  if (num) pool += numberCharacters;
  if (sym) pool += symbolCharacters;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += pool[Math.floor(Math.random() * pool.length)];
  }

  passwordInput.value = password;
  updateStrength(password);
}

function updateStrength(password) {
  let score = 0;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[!@#$%^&*()-_=+\[\]{}|;:,.<>?/]/.test(password)) score += 1;
  if (password.length >= 8) score += 1;

  let percent = (score / 5) * 100;
  strengthBar.style.width = percent + "%";

  if (percent < 40) {
    strengthBar.style.backgroundColor = "#f87171"; // red
    strengthLabel.textContent = "Weak";
  } else if (percent < 80) {
    strengthBar.style.backgroundColor = "#fcd34d"; // yellow
    strengthLabel.textContent = "Medium";
  } else {
    strengthBar.style.backgroundColor = "#34d399"; // green
    strengthLabel.textContent = "Strong";
  }
}

// Copy to clipboard
copyButton.addEventListener("click", () => {
  if (!passwordInput.value) return;
  navigator.clipboard.writeText(passwordInput.value).then(() => {
    copyButton.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      copyButton.innerHTML = '<i class="far fa-clipboard"></i>';
    }, 1200);
  });
});

// Initial generate
window.addEventListener("DOMContentLoaded", generatePassword);
