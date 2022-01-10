// Assignment code here
// TODO: Prompt for length
// TODO: Prompt for uppercase
// TODO: Prompt for lowercase
// TODO: Prompt for Numeric
// TODO: Prompt for Special Characters.
// TODO: Validation should be length of 8-128 characters and at least one character type.
// TODO: Validations are passed then write the password to the page.

// Get references to the #generate element
const generateBtn = document.querySelector('#generate');
const passwordText = document.querySelector('#password');
const special =
const numbers = '0123456789';
const patterns = {
  isLower: /[a-z]/,
  isUpper: /[A-Z]/,
  isSpecial: new RegExp(`[${special}]`),
  isNumeric: /[0-9]/
}

class PasswordGenerator {
  constructor(isLower, isUpper, isSpecial, isNumeric, length) {
    this.isLower = isLower;
    this.isUpper = isUpper;
    this.isSpecial = isSpecial;
    this.isNumeric = isNumeric;
    this.length = length;
    this.password = this.newPassword();
  }

  get characters() {
    let characters = '';
    characters += this.isLower ? this.getLetters() : '';
    characters += this.isUpper ? this.getLetters(true) : '';
    characters += this.isSpecial ? this.getSpecial() : '';
    characters += this.isNumeric ? this.getNumeric() : '';

    return characters;
  }

  newPassword() {
    let password = '';

  }

  getLetters(isUpper = false) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    return isUpper ? letters.toUpperCase() : letters;
  }

  getSpecial() {
    return ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  }

  getNumeric() {
    return '01234567890';
  }


}

function getCharacters(isLower, isUpper, isSpecial, isNumeric) {
  let includedCharacters = '';
  if(isLower) {
    includedCharacters += letters;
  }
  if(isUpper) {
    includedCharacters += letters.toUpperCase();
  }
  if(isSpecial) {
    includedCharacters += special;
  }
  if(isNumeric) {
    includedCharacters += numbers
  }

  return includedCharacters;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generatePassword(characters, length) {
  let returnMe = '';

  for(let i = 0; i < length; i++) {
    returnMe += characters[randomNumber(0, characters.length - 1)];
  }

  if(!passwordCheck(returnMe, isLower, isUpper, ))
  return returnMe;
}

function createPassword(isLower, isUpper, isSpecial, isNumeric, length) {
  let characters = getCharacters(isLower, isUpper, isSpecial, isNumeric);
  let password = generatePassword(characters, length, isLower, isUpper, isSpecial, isNumeric);


}

// Write password to the #password input
function writePassword() {
  const length = prompt('How long would you like the password to be?  (8-128)');
  const isLower = confirm('Would you like to include lowercase characters?');
  const isUpper = confirm('Would you like to include uppercase characters?');
  const isSpecial = confirm('Would you like to include special characters?');
  const isNumeric = confirm('Would you like to include numerical characters?');

  if(length < 8 || length > 128) {
    alert(`The password length must be between 8 and 128 characters.  ${length} is not valid`);
    return writePassword();
  }

  passwordText.value = createPassword(isLower, isUpper, isSpecial, isNumeric, length);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
