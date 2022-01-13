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
    this.length = length;
    this.characters = new Characters(isLower, isUpper, isSpecial, isNumeric);
    this.password = '';

    this.newPassword();
  }

  /**
   * Takes all given arguments and creates a new password.
   */
  newPassword() {
    let password = '';

    for(let i = 0; i < this.length; i++)
      password += this.characters.char;

    this.password = password
        .split('')
        .sort(() => (Math.random() > .5) ? 1 : -1)
        .join('');
  }
}

class Characters {
  #states = [];
  #currentState = 0;
  #maxState = 0;

  constructor(isLower, isUpper, isSpecial, isNumeric) {
    if(isLower) this.#states.push('abcdefghijklmnopqrstuvwxyz');
    if(isUpper) this.#states.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if(isSpecial) this.#states.push(' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~');
    if(isNumeric) this.#states.push('0123456789');

    this.#maxState = this.#states.length - 1;
    // TODO:  Iterate through state.
    // TODO:  Remove states that are not requested.
  }

  get #charList() {
    return this.#states[this.#currentState];
  }

  get #randomIndex() {
    return randomNumber(0, this.#charList.length - 1);
  }

  #tickState() {
    if(this.#currentState === this.#maxState) this.#currentState = 0;
    else this.#currentState++;
  }

  get char() {
    let char = this.#charList[this.#randomIndex];
    this.#tickState();

    return char;
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
