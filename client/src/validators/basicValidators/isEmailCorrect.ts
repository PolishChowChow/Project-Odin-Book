export default function isEmailCorrect(email: string) {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Incorrect email format. It should be something like: test@email.com";
  }
  return "";
}
