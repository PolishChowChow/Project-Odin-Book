export default function isConfirmPasswordCorrect(password1: string, password2: string){
    return password1 === password2 ? "" : "Passwords do not match. Please ensure both fields are identical.";
}