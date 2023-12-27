export const generatePassword = (
  length: number,
  isUppercase: boolean,
  isLowercase: boolean,
  isNumbers: boolean,
  isSymbols: boolean
): string => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?";

  let allowedChars = "";
  if (isUppercase) allowedChars += uppercase;
  if (isLowercase) allowedChars += lowercase;
  if (isNumbers) allowedChars += numbers;
  if (isSymbols) allowedChars += symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars.charAt(randomIndex);
  }

  if (length <= 0) return "";

  return password;
};
