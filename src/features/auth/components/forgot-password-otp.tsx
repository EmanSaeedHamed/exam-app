import { RegisterContext } from "@/shared/context/register-context";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export default function ForgotPasswordOtp() {
    const ctx = useContext(RegisterContext);
  return <>
   {/* row back */}
   <div onClick={()=>{ctx?.setStep("email");}} className="size-10 border-gray-200 border-[1.5px] flex items-center justify-center cursor-pointer mb-10"><MoveLeft className="size-6 text-gray-800"/></div>
   {/* form */}
   <div>
    <h2 className="font-inter font-bold text-3xl text-gray-800">
        Password Reset Sent
      </h2>
      <p className="font-mono text-gray-800 mt-4">We have sent a password reset link to:</p>
      <span className="font-mono text-base text-blue-600">
          {ctx?.email || "user@example.com"}
          <span className="text-gray-800">.</span>
        </span>
        <p className="font-mono text-gray-800 my-4">Please check your inbox and follow the instructions to reset your password.</p>
        <p className="font-mono text-gray-500 mb-4">If you don’t see the email within a few minutes, check your spam or junk folder.</p>
        <div className="space-x-2 font-mono text-sm font-medium mt-10">
        <span className="text-gray-500">Don’t have an account?</span>
        <Link href={"/register"} className="text-blue-600 hover:text-blue-700">
          Create yours
        </Link>
      </div>
   </div>
  </>
}
