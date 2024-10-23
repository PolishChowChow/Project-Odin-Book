type TextErrorElementProps = {
  message: string;
  className?: string;
};

export default function TextErrorElement({
  message,
  className,
}: TextErrorElementProps) {
  return <span className={`text-red-500 ${className}`}>{message}</span>;
}
