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
 * Event Listener for the click event.
 * @returns {*}
 */
function writePassword() {
  const length = parseInt(prompt('How long would you like the password to be?  (8-128)'));

  if(length < 8 || length > 128) {
    alert(`The password length must be between 8 and 128 characters.  ${length} is not valid`);
    return writePassword();
  }

  const isLower = confirm('Would you like to include lowercase characters?');
  const isUpper = confirm('Would you like to include uppercase characters?');
  const isSpecial = confirm('Would you like to include special characters?');
  const isNumeric = confirm('Would you like to include numerical characters?');

  const passGen = new PasswordGenerator(isLower, isUpper, isSpecial, isNumeric, length);

  passwordText.value = passGen.password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
