import { InputHTMLAttributes, useEffect, useState } from "react";
import TextErrorElement from "../Error/TextErrorElement";
type FormInputProps = {
  // errorMessage: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({ id, type, ...props }: FormInputProps) {
  const [isPasswordType, setIsPasswordType] = useState(true);
  const toggleType = () => {
    setIsPasswordType((prevPasswordType) => !prevPasswordType);
  };
  useEffect(()=>{
    console.log(props.value)
  },[props.value])

  return (
    <>
      <label htmlFor={id} className="relative">
        <input
          type={`${isPasswordType ? type : "text"}`}
          id={id}
          className="text-sm border border-gray-400 p-2 rounded outline-none focus:border-blue-900 transition-colors focus:placeholder:text-stone-800 w-full"
          {...props}
        />
        <button
          onClick={toggleType}
          className={`${
            type === "password" ? "block" : "hidden"
          } absolute top-2 right-2 text-sm text-blue-600 hover:text-blue-900`}
        >
          {isPasswordType ? "show" : "hide"}
        </button>
        <TextErrorElement message="" />
      </label>
    </>
  );
}
