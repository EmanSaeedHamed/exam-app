'use client';
import { useContext, useEffect } from "react";
import { RegisterContext } from "@/shared/context/register-context";
import ForgotPasswordEmail from "./forgot-password-email";
import ForgotPasswordOtp from "./forgot-password-otp";
import ForgotPasswordCreate from "./forgot-password-create";
import { useSearchParams } from "next/navigation";

export default function ForgotPasswordForm() {
  const ctx = useContext(RegisterContext);
  if (!ctx) {
    throw new Error("RegisterForm must be used within RegisterContextProvider");
  }
  const { step } = ctx;
  const searchParams = useSearchParams();
const token = searchParams.get("token");

useEffect(() => {
  if (token) {
    ctx.setStep("password");
  }
}, [token]);

  return (
    <>
      <div className="py-60">
        <div className="max-w-113 mx-auto">
          {step == "email" && <ForgotPasswordEmail />}
          {step == "verifyEmail" && <ForgotPasswordOtp />}
          {step == "password" && <ForgotPasswordCreate />}
        </div>
      </div>
    </>
  );
}
