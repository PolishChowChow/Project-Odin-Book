export default function isPasswordCorrect(password: string) {
  const hasLowerCase: RegExp = /[a-z]/;
  const hasUpperCase: RegExp = /[A-Z]/;
  const hasDigit: RegExp = /\d/;
  const hasSpecialChar: RegExp = /[@$!%*?&]/;
  if (!hasLowerCase.test(password)) {
    return "Ensure that you included at least 1 lowercase letter.";
  }
  if (!hasUpperCase.test(password)) {
    return "Ensure that you included at least 1 uppercase letter.";
  }
  if (!hasDigit.test(password)) {
    return "Ensure that you included at least 1 digit.";
  }
  if (!hasSpecialChar.test(password)) {
    return "Ensure that you included at least 1 special character.";
  }
  return "";
}
