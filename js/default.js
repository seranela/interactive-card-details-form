(() => {
let isValidHolder = false;
let isValidNumber = false;
let isValidExpiration = false;
let isValidCVC = false;

const mockHolder = document.getElementById('mock-card-holder');
const mockNumber = document.getElementById('mock-card-number');
const mockExpiration = document.getElementById('mock-card-expiration');
const mockCVC = document.getElementById('mock-card-cvc');

const errorHolderBlank = document.getElementById('card-holder-blank');
const errorNumberBlank = document.getElementById('card-number-blank');
const errorNumberInvalid = document.getElementById('card-number-invalid');
const errorExpirationBlank = document.getElementById('card-expiration-blank');
const errorExpirationInvalid = document.getElementById('card-expiration-invalid');
const errorCVCBlank = document.getElementById('card-cvc-blank');
const errorCVCInvalid = document.getElementById('card-cvc-invalid');

const formCard = document.getElementById('form-card');
const inputHolder = document.getElementById('card-holder');
const inputNumber = document.getElementById('card-number');
const inputExpirationMonth = document.getElementById('card-expiration-month');
const inputExpirationYear = document.getElementById('card-expiration-year');
const inputCVC = document.getElementById('card-cvc');
const buttonConfirm = document.getElementById('button-confirm');

function addLeadingZeros(str, targetLength) {
  return str.padStart(targetLength, '0');
}

function addTrailingZeros(str, targetLength) {
  return str.padEnd(targetLength, '0');
}

// Functions check for non-emptiness and validity based on pattern regular expressions.
// Detailed validation would be done server-side.

function isHolderValid() {
  // Strip whitespace
  if (inputHolder.value.replace(/\W/gi, '').trim() === '') {
    inputHolder.classList.add('input-invalid');
    errorHolderBlank.classList.add('error-message-show');
    return false;
  } else {
    inputHolder.classList.remove('input-invalid');
    errorHolderBlank.classList.remove('error-message-show');
    return true;
  }
}

function isNumberValid() {
  if (inputNumber.value.trim() === '') {
    inputNumber.classList.add('input-invalid');
    errorNumberBlank.classList.add('error-message-show');
    return false;
  } else {
    errorNumberBlank.classList.remove('error-message-show');

    if (inputNumber.validity.valid) {
      inputNumber.classList.remove('input-invalid');
      errorNumberInvalid.classList.remove('error-message-show');
      return true;
    } else {
      inputNumber.classList.add('input-invalid');
      errorNumberInvalid.classList.add('error-message-show');
      return false;
    }
  }
}

function isExpirationValid() {
  let valid = false;

  if (inputExpirationMonth.value.trim() === '') {
    inputExpirationMonth.classList.add('input-invalid');
    errorExpirationBlank.classList.add('error-message-show');
  } else {
    inputExpirationMonth.classList.remove('input-invalid');
    errorExpirationBlank.classList.remove('error-message-show');

    if (inputExpirationMonth.validity.valid) {
      inputExpirationMonth.classList.remove('input-invalid');
      errorExpirationInvalid.classList.remove('error-message-show');
      valid = true;
    } else {
      inputExpirationMonth.classList.add('input-invalid');
      errorExpirationInvalid.classList.add('error-message-show');
    }
  }

  if (inputExpirationYear.value.trim() === '') {
    inputExpirationYear.classList.add('input-invalid');
    errorExpirationBlank.classList.add('error-message-show');
  } else {
    inputExpirationYear.classList.remove('input-invalid');
    errorExpirationBlank.classList.remove('error-message-show');

    if (inputExpirationYear.validity.valid) {
      inputExpirationYear.classList.remove('input-invalid');
      errorExpirationInvalid.classList.remove('error-message-show');
      valid = true;
    } else {
      inputExpirationYear.classList.add('input-invalid');
      errorExpirationInvalid.classList.add('error-message-show');
    }
  }

  return valid;
}

function isCVCValid() {
  if (inputCVC.value.trim() === '') {
    inputCVC.classList.add('input-invalid');
    errorCVCBlank.classList.add('error-message-show');
    return false;
  } else {
    inputCVC.classList.remove('input-invalid');
    errorCVCBlank.classList.remove('error-message-show');
    
    if (inputCVC.validity.valid) {
      inputCVC.classList.remove('input-invalid');
      errorCVCInvalid.classList.remove('error-message-show');
      return true;
    } else {
      inputCVC.classList.add('input-invalid');
      errorCVCInvalid.classList.add('error-message-show');
      return false;
    }
  }
}

function updateValidateData(e) {
  switch (e.target.id) {
    case 'card-holder':
      mockHolder.innerHTML = e.target.value.trim();
      isHolderValid();
      break;

    case 'card-number':
      // Format input and mock card with spaces
      inputNumber.value = inputNumber.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').trim();
      // Pad mock card number with trailing zeros
      mockNumber.innerHTML = addTrailingZeros(inputNumber.value.replace(/\W/gi, ''), 16).replace(/(.{4})/g, '$1 ').trim();
      isNumberValid();
      break;

    case 'card-expiration-month':
    case 'card-expiration-year':
      // Pad numbers with leading zeros
      mockExpiration.innerHTML =
        addLeadingZeros(inputExpirationMonth.value.trim(), 2) + '/' +
        addLeadingZeros(inputExpirationYear.value.trim(), 2);
      isExpirationValid();
      break;

    case 'card-cvc':
      mockCVC.innerHTML = inputCVC.value.trim();
      isCVCValid();
      break;
  }
}

function validateData() {
  // Let all validation steps process
  isValidHolder = isHolderValid();
  isValidNumber = isNumberValid();
  isValidExpiration = isExpirationValid();
  isValidCVC = isCVCValid();
}

function onSubmit(e) {
  // Prevent page from reloading
  e.preventDefault();

  // Clear the form upon validation
  if (isValidHolder && isValidNumber && isValidExpiration && isValidCVC) {
    inputHolder.value = '';
    inputNumber.value = '';
    inputExpirationMonth.value = '';
    inputExpirationYear.value = '';
    inputCVC.value = '';

    // Hide form and show thank you confirmation
    formCard.classList.add('hidden');
    document.querySelector('.confirm-container').classList.remove('hidden');
  }
}

formCard.addEventListener('submit', onSubmit, false);
inputHolder.addEventListener('input', updateValidateData, false);
inputNumber.addEventListener('input', updateValidateData, false);
inputExpirationMonth.addEventListener('input', updateValidateData, false);
inputExpirationYear.addEventListener('input', updateValidateData, false);
inputCVC.addEventListener('input', updateValidateData, false);
buttonConfirm.addEventListener('click', validateData, false);
})();