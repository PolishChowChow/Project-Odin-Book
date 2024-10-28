import { ChangeEvent, FormEvent, Key, useState } from "react";
import Button from "../components/Controls/Button";
import FormInput from "../components/Controls/FormInput";
import CustomLink from "../components/Controls/CustomLink";
import fieldValidator from "../validators/fieldValidators/fieldValidator";
import isConfirmPasswordCorrect from "../validators/basicValidators/isConfirmPasswordCorrect";
import Header from "../components/StructureElements/Header";
import Footer from "../components/StructureElements/Footer";

type RegisterDataType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

type RegisterFormDataType = {
  confirmPassword: string;
} & RegisterDataType;

const initialDataType: RegisterFormDataType = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};
export default function RegisterPage() {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  const [formData, setFormData] =
    useState<RegisterFormDataType>(initialDataType);
  const [formValidationResult, setFormValidationResult] =
    useState<RegisterFormDataType>(initialDataType);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [id]: value,
      };
    });
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "confirmPassword") {
      setFormValidationResult((prevFormValidationResult) => {
        return {
          ...prevFormValidationResult,
          [id]: isConfirmPasswordCorrect(value, formData.password),
        };
      });
    } else {
      setFormValidationResult((prevFormValidationResult) => {
        return {
          ...prevFormValidationResult,
          [id]: fieldValidator(id, value),
        };
      });
    }
  };
  return (
    <div className="h-lvh flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center items-center text-md">
        <form
          onSubmit={onSubmit}
          className="border-slate-300 border rounded px-10 py-6 shadow-slate-300 shadow-md flex flex-col items-start gap-3"
        >
          <h2 className="text-3xl mt-5">Register</h2>
          <p className="text-sm">Join our awesome community</p>
          <FormInput
            placeholder="First Name"
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            onBlur={handleBlur}
            errorMessage={formValidationResult.firstName}
          />
          <FormInput
            placeholder="Last name"
            type="text"
            id="lastName"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            onBlur={handleBlur}
            errorMessage={formValidationResult.lastName}
          />
          <FormInput
            placeholder="Email address"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            onBlur={handleBlur}
            errorMessage={formValidationResult.email}
          />
          <FormInput
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={formData.username}
            onBlur={handleBlur}
            errorMessage={formValidationResult.username}
          />
          <FormInput
            type="password"
            placeholder="Password"
            id="password"
            name="confirmPassword"
            onChange={handleChange}
            value={formData.password}
            onBlur={handleBlur}
            errorMessage={formValidationResult.password}
          />
          <FormInput
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            value={formData.confirmPassword}
            onBlur={handleBlur}
            errorMessage={formValidationResult.confirmPassword}
          />
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
      <Footer />
    </div>
  );
}
