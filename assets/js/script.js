// Assignment code here

/**
 * @var generateBtn
 * @type {Element}
 * @define reference to the button that generates the password
 */
const generateBtn = document.querySelector('#generate');

/**
 * @var passwordText
 * @type {Element}
 * @define reference to the element that will display the password.
 */
const passwordText = document.querySelector('#password');

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * @define A class to easily contain and access all password generating code.
 */
class PasswordGenerator {
  /**
   * Constructor for the class.
   * @param {boolean} isLower Lowercase is in use.
   * @param {boolean} isUpper Uppercase is in use.
   * @param {boolean} isSpecial Special characters are in use.
   * @param {boolean} isNumeric Numbers are in use.
   * @param {number} length How long the password will be.
   */
  constructor(isLower, isUpper, isSpecial, isNumeric, length) {
    this.isLower = isLower;
    this.isUpper = isUpper;
    this.isSpecial = isSpecial;
    this.isNumeric = isNumeric;
    this.length = length;
    this.characters = '';
    this.password = '';

    this.getCharacters();
    this.newPassword();
  }

  /**
   * A method to get all characters that are needed.
   */
  getCharacters() {
    this.characters = '';
    this.characters += this.isLower ? this.getLetters() : '';
    this.characters += this.isUpper ? this.getLetters(true) : '';
    this.characters += this.isSpecial ? this.getSpecial() : '';
    this.characters += this.isNumeric ? this.getNumeric() : '';
  }

  /**
   * Takes all given arguments and creates a new password.
   */
  newPassword() {
    this.password = '';

    for(let i = 0; i < this.length; i++)
      this.password += this.characters[randomNumber(0, this.characters.length - 1)];
  }

  /**
   * Returns a-z|A-Z characters.
   * @param {boolean} isUpper The characters returned will be uppercase.  This is false by default.
   * @returns {string|string}
   */
  getLetters(isUpper = false) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    return isUpper ? letters.toUpperCase() : letters;
  }

  /**
   * Returns a string of special characters.
   * @returns {string}
   */
  getSpecial() {
    return ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  }

  /**
   * Returns a string of numeric characters.
   * @returns {string}
   */
  getNumeric() {
    return '01234567890';
  }
}

/**
 * Prompts the user if they want to include argument as a character type.  Then returns a boolean as the user's choice.
 * @param {string} characterType This is the character type in question
 * @returns {boolean}
 */
function characterConfirm(characterType) {
  return window.confirm(`Would your like to include ${characterType} characters?`);
}

/**
 * This function captures the user's input.
 * If the user does not select an input we will run recursively.
 * @returns {{isSpecial: boolean, isUpper: boolean, isNumeric: boolean, isLower: boolean}}
 */
function selectCharacterType() {
  /**
   * This object allows us to better manage the user's character selections.
   * @type {{isSpecial: boolean, isUpper: boolean, isNumeric: boolean, isLower: boolean, noneSelected(): *}}
   */
  const returnMe = {
    isLower: characterConfirm('lowercase'),
    isUpper: characterConfirm('uppercase'),
    isSpecial: characterConfirm('special'),
    isNumeric: characterConfirm('numerical'),

    /**
     * If the user does not select a character type then this method returns true.
     * Else it will return false.
     * @returns {boolean}
     */
    noneSelected() {
      return !this.isLower && !this.isUpper && !this.isSpecial && !this.isNumeric
    }
  }

  // If noneSelected returns true then we will call selectCharacterType recursively.
  if(returnMe.noneSelected()) {
    alert('You must select at least one character type.  Select Lowercase, Uppercase, Numeric, or Special Characters.');
    return selectCharacterType();
  }

  // Returning only the boolean's to keep the remaining of the code intact.
  return { isLower, isUpper, isSpecial, isNumeric } = returnMe;
}

/**
 * Event Listener for the click event.
 * @returns {*}
 */
function writePassword() {
  // Captured the user's input as an integer.
  const length = parseInt(prompt('How long would you like the password to be?  (8-128)'));

  // If length is falsy and does not equal 0 then they pushed cancel.
  if(!length && length !== 0) return;

  // If the length is not less than 8 or greater than 128 then we call writePassword recursively.
  if(length < 8 || length > 128) {
    alert(`The password length must be between 8 and 128 characters.  ${length} is not valid`);
    return writePassword();
  }

  // User's character selections.  These are all boolean.
  const { isLower, isUpper, isSpecial, isNumeric } = selectCharacterType();

  // Creating the password generator.
  const passGen = new PasswordGenerator(isLower, isUpper, isSpecial, isNumeric, length);

  passwordText.value = passGen.password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
