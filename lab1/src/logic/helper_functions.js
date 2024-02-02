const lowestLowercaseCode = 97;
const highestLowercaseCode = 122;
const lowestUppercaseCode = 65;
const highestUppercaseCode = 90;
const lettersInAlphabet = 26;

export function mod(number, value)
{
    number %= value;
    if (number < 0)
        number += value;
    return number;
}

export function isLowercaseLatin(letter)
{
    let code = letter.codePointAt(0);
    if (code >= lowestLowercaseCode && code <= highestLowercaseCode)
        return true;
    return false;
}

export function isUppercaseLatin(letter)
{
    let code = letter.codePointAt(0);
    if (code >= lowestUppercaseCode && code <= highestUppercaseCode)
        return true;
    return false;
}

export function getLowercaseLetterNumber(letter)
{
    let code = letter.codePointAt(0);

    return code - lowestLowercaseCode;
}

export function getUppercaseLetterNumber(letter)
{
    let code = letter.codePointAt(0);

    return code - lowestUppercaseCode;
}

export function getLowercaseLetterByNumber(number)
{
    number += lowestLowercaseCode;

    return String.fromCodePoint(number);
}

export function getUppercaseLetterByNumber(number)
{
    number += lowestUppercaseCode;

    return String.fromCodePoint(number);
}

export function shiftLowercaseLatin(letter, shift)
{
    let number = getLowercaseLetterNumber(letter);

    number += shift;
    number = mod(number, lettersInAlphabet);
    
    return getLowercaseLetterByNumber(number);
}

export function shiftUppercaseLatin(letter, shift)
{
    let number = getUppercaseLetterNumber(letter);

    number += shift;
    number = mod(number, lettersInAlphabet);

    return getUppercaseLetterByNumber(number);
}