import { InputHTMLAttributes } from "react";
import TextErrorElement from "../Error/TextErrorElement";
type FormInputProps = {
  // errorMessage: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({ id, ...props }: FormInputProps) {
  return (
    <>
      <label htmlFor={id}>
        <input
          className="text-sm border border-gray-400 p-2 rounded outline-none focus:border-blue-900 transition-colors focus:placeholder:text-stone-800 w-full"
          {...props}
        />
        <TextErrorElement message="" />
      </label>
    </>
  );
}
