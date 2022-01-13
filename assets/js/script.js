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

/**
 * A random number generator.
 * @param {number} min the min number you wish to get.
 * @param {number} max The max number you wish to get.
 * @returns {number}
 */
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
   * Utilizing the Character object we create a custom, random, password.
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

/**
 * one or more character types were not being included in the password even though they were selected.
 * So this class was created to ensure that a random character for each type is included.
 * Each character type is managed, and we use states to ensure that they are delivered as evenly as possible.
 */
class Characters {
  #states = [];
  #currentState = 0;
  #maxState = 0;

  /**
   * Constructor for this class.
   * @param {boolean} isLower
   * @param {boolean} isUpper
   * @param {boolean} isSpecial
   * @param {boolean} isNumeric
   */
  constructor(isLower, isUpper, isSpecial, isNumeric) {
    // Checking if these character types are needed.
    if(isLower) this.#states.push('abcdefghijklmnopqrstuvwxyz');
    if(isUpper) this.#states.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if(isSpecial) this.#states.push(' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~');
    if(isNumeric) this.#states.push('0123456789');

    // Setting a max length for the state array.
    this.#maxState = this.#states.length - 1;
  }

  /**
   * This getter is used to retrieve the current character type that is being focused.
   * @returns {string}
   */
  get #charList() {
    return this.#states[this.#currentState];
  }

  /**
   * An easy access to a random index selected based on the current character type of focus.
   * @returns {number}
   */
  get #randomIndex() {
    return randomNumber(0, this.#charList.length);
  }

  /**
   * This method ticks from one character type to the next.  Once we have reached the last one it will start over.
   */
  #tickState() {
    if(this.#currentState === this.#maxState) this.#currentState = 0;
    else this.#currentState++;
  }

  /**
   * Returns a single character inside a string then moves onto the next character type if one is available.
   * @returns {string}
   */
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
