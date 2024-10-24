import isEmailCorrect from "../basicValidators/isEmailCorrect";
import isPasswordCorrect from "../basicValidators/isPasswordCorrect";
import { isStringSizeOf } from "../basicValidators/isStringSizeOf";

function defaultValidator(value: string) {
  return isStringSizeOf(value, 3, 30);
}

function passwordValidator(value: string) {
  let validationResult = isStringSizeOf(value, 8, 50);
  if (validationResult === "") {
    validationResult = isPasswordCorrect(value);
  }
  return validationResult;
}
function emailValidator(value: string) {
  let validationResult = isStringSizeOf(value, 3, 50);
  if (validationResult === "") {
    validationResult = isEmailCorrect(value);
  }
  return validationResult;
}
function fieldValidator(id: string, value: string) {
  switch (id) {
    case "email":
      return emailValidator(value);
    case "password":
      return passwordValidator(value);
    default:
      return defaultValidator(value);
  }
}

export default fieldValidator;
