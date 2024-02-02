import {isLowercaseLatin, isUppercaseLatin, getLowercaseLetterNumber, getUppercaseLetterNumber, shiftLowercaseLatin, shiftUppercaseLatin} from "./helper_functions.js"

export function Compress(text, key)
{
    let result = "";
    let keyIndex = 0;

    for(let i = 0; i < text.length; i++)
    {
        let letter = key[keyIndex++ % key.length];
        let shift;
        if (isLowercaseLatin(letter))
            shift = getLowercaseLetterNumber(letter);
        else if (isUppercaseLatin(letter))
            shift = getUppercaseLetterNumber(letter);
        else
            shift = 0;

        if (isLowercaseLatin(text[i]))
        {
            result += shiftLowercaseLatin(text[i], shift);
        }
        else if (isUppercaseLatin(text[i]))
        {
            result += shiftUppercaseLatin(text[i], shift);
        }
        else 
        {
            keyIndex--;
            result += text[i];
        }
    }

    return result;
}

export function Decompress(text, key)
{
    let result = "";
    let keyIndex = 0;

    for(let i = 0; i < text.length; i++)
    {
        let letter = key[keyIndex++ % key.length];
        let shift;
        if (isLowercaseLatin(letter))
            shift = getLowercaseLetterNumber(letter);
        else if (isUppercaseLatin(letter))
            shift = getUppercaseLetterNumber(letter);
        else
            shift = 0;

        if (isLowercaseLatin(text[i]))
        {
            result += shiftLowercaseLatin(text[i], -shift);
        }
        else if (isUppercaseLatin(text[i]))
        {
            result += shiftUppercaseLatin(text[i], -shift);
        }
        else 
        {
            keyIndex--;
            result += text[i];
        }
    }

    return result;
}