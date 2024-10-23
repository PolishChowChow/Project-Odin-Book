import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../components/Controls/Button";
import FormInput from "../components/Controls/FormInput";
import CustomLink from "../components/Controls/CustomLink";

type RegisterDataType = {
    email: string;
    username: string;
    password: string;    
}

type RegisterFormDataType = {
    confirmPassword: string;
} & RegisterDataType

const initialDataType:RegisterFormDataType = {
    email: "",
    username: "",
    password: "",    
    confirmPassword: ""    
}
export default function RegisterPage() {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const [formData, setFormData] = useState<RegisterFormDataType>(initialDataType);
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    console.log(id, value)
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [id]: value
        }
    })
  }

  return (
    <div className="h-lvh flex flex-col">
      <header>
        <h1>Logo</h1>
      </header>
      <main className="flex-1 flex flex-col justify-center items-center text-md">
        <form
          onSubmit={onSubmit}
          className="border-slate-300 border rounded px-10 py-6 shadow-slate-300 shadow-md flex flex-col items-start gap-3"
        >
          <h2 className="text-3xl mt-5">Register</h2>
          <p className="text-sm">Join our awesome community</p>
          <FormInput placeholder="Email address" type="email" id="email" name="email" onChange={handleChange} value={formData.email}/>
          <FormInput placeholder="Username" type="text" id="username" name="username"  onChange={handleChange} value={formData.username}/>
          <FormInput type="password" placeholder="Password" id="password" name="confirmPassword"  onChange={handleChange} value={formData.password}/>
          <FormInput type="password" placeholder="Confirm Password" id="confirmPassword" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />
          <Button type="submit">Submit</Button>
        </form>
        <p className="mt-5">
          Already have an account?{" "}
          <CustomLink
            to="/login"
            className="text-blue-700 hover:text-blue-900 transition-colors"
          >
            Log In
          </CustomLink>
        </p>
      </main>
      <footer>Footer </footer>
    </div>
  );
}
