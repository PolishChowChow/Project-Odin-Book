import { ButtonHTMLAttributes } from "react";

export default function Button({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`py-2 text-center w-full bg-blue-700 rounded text-slate-50 text-md font-bold hover:bg-blue-900 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}