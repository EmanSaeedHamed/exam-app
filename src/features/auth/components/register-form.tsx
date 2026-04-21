"use client";
import { useContext } from "react";
import EmailForm from "./email-form";
import PasswordForm from "./password-form";
import UserInfoForm from "./user-info-form";
import VerifyEmailForm from "./verify-email-form";
import { RegisterContext } from "@/shared/context/register-context";

export default function RegisterForm() {
  const ctx = useContext(RegisterContext);
  if (!ctx) {
    throw new Error("RegisterForm must be used within RegisterContextProvider");
  }
  const { step } = ctx;
  return (
    <>
      <div className="py-60">
        <div className="max-w-[452px] mx-auto">
          {step == "email" && <EmailForm />}
          {step == "verifyEmail" && <VerifyEmailForm />}
          {step == "userInfo" && <UserInfoForm />}
          {step == "password" && <PasswordForm />}
        </div>
      </div>
    </>
  );
}
