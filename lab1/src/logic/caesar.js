import {isLowercaseLatin, isUppercaseLatin, shiftLowercaseLatin, shiftUppercaseLatin} from "./helper_functions.js"

export function Compress(text, shift)
{
    let result = "";
    
    for(const letter of text)
    {
        if (isLowercaseLatin(letter))
        {
            result += shiftLowercaseLatin(letter, shift);
        }
        else if (isUppercaseLatin(letter))
        {
            result += shiftUppercaseLatin(letter, shift);
        }
        else 
        {
            result += letter;
        }
    }

    return result;
}

export function Decompress(text, shift)
{
    return Compress(text, -shift);
}