import { TranslationsTypes } from "@/types/signForm";

// We need validationsTypes just once and just here
interface validationsTypes {
  email: RegExp;
  password: RegExp;
}

export const TRANSLATIONS: TranslationsTypes = {
  user: "User",
  email: "Email",
  password: "Password",
  register: {
    title: "REGISTER",
    btn: "Register",
    footerText: "Already Registered?",
    footerAction: "Login",
  },
  login: {
    title: "LOGIN",
    btn: "Login",
    footerText: "Don’t have account?",
    footerAction: "Register Now",
  },
};
export const validations: validationsTypes = {
  email: /^[^s@]+@[^s@]+.[^s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.{4,10}$)(?=.*d)/,
};
