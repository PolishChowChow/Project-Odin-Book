export function isStringSizeOf(value: string, min?: number, max?: number) {
  if (!value || value === "") {
    return "Field is empty";
  }
  if (min) {
    if (value.length < min) {
      return `Field must contain minimum ${min} characters`;
    }
  }
  if (max) {
    if (value.length > max) {
      return `Field must contain max ${max} characters`;
    }
  }
  return "";
}
