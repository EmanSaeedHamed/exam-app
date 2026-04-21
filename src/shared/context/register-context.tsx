"use client";

import { createContext, useState } from "react";

type TStep = "email" | "verifyEmail" | "userInfo" | "password";

type TRegisterContext = {
    step: TStep;
    setStep: React.Dispatch<React.SetStateAction<TStep>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    phone: string;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
  };

export const RegisterContext = createContext<TRegisterContext | null>(null);

type Props = {
  children: React.ReactNode;
};

export function RegisterContextProvider({ children }: Props) {
  const [step, setStep] = useState<TStep>("email");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <RegisterContext.Provider value={{ step, setStep, email, setEmail, firstName, setFirstName, username, setUsername, lastName, setLastName, phone, setPhone }}>
      {children}
    </RegisterContext.Provider>
  );
}

