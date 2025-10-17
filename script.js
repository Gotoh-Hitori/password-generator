const passwordInput = document.getElementById('password');
const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const strengthLabel = document.getElementById('strength-label');
const strengthBar = document.querySelector('.strength-bar');

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+[]{}|;:,.<>?';

lengthInput.addEventListener('input', () => {
  lengthValue.textContent = lengthInput.value;
});

function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function generatePassword() {
  let charset = '';
  let requiredChars = '';

  if (uppercaseCheckbox.checked) {
    charset += UPPERCASE_CHARS;
    requiredChars += getRandomChar(UPPERCASE_CHARS);
  }
  if (lowercaseCheckbox.checked) {
    charset += LOWERCASE_CHARS;
    requiredChars += getRandomChar(LOWERCASE_CHARS);
  }
  if (numbersCheckbox.checked) {
    charset += NUMBER_CHARS;
    requiredChars += getRandomChar(NUMBER_CHARS);
  }
  if (symbolsCheckbox.checked) {
    charset += SYMBOL_CHARS;
    requiredChars += getRandomChar(SYMBOL_CHARS);
  }

  if (!charset) return '';

  let password = '';
  const length = parseInt(lengthInput.value);

  for (let i = requiredChars.length; i < length; i++) {
    password += getRandomChar(charset);
  }

  password = (password + requiredChars).split('').sort(() => Math.random() - 0.5).join('');
  return password;
}

function updateStrength(password) {
  let strength = 0;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  if (password.length >= 12) strength++;

  switch (strength) {
    case 0: case 1: case 2:
      strengthLabel.textContent = 'Weak';
      strengthBar.style.width = '25%';
      strengthBar.style.backgroundColor = '#f87171';
      break;
    case 3:
      strengthLabel.textContent = 'Medium';
      strengthBar.style.width = '50%';
      strengthBar.style.backgroundColor = '#fcd34d';
      break;
    case 4:
      strengthLabel.textContent = 'Strong';
      strengthBar.style.width = '75%';
      strengthBar.style.backgroundColor = '#34d399';
      break;
    case 5:
      strengthLabel.textContent = 'Very Strong';
      strengthBar.style.width = '100%';
      strengthBar.style.backgroundColor = '#10b981';
      break;
  }
}

generateBtn.addEventListener('click', () => {
  const pwd = generatePassword();
  passwordInput.value = pwd;
  updateStrength(pwd);
});

copyBtn.addEventListener('click', () => {
  if (!passwordInput.value) return;

  navigator.clipboard.writeText(passwordInput.value)
    .then(() => {
      copyBtn.classList.add('copied');

      setTimeout(() => {
        copyBtn.classList.remove('copied');
      }, 1000);
    })
    .catch(err => {
      console.error('复制失败:', err);
    });
});
