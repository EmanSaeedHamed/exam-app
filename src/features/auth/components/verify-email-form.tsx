"use client";
import Otp from "@/shared/components/ui/otp";
import Stepper from "./stepper";
import { Controller, useForm } from "react-hook-form";
import {
  TVerifyEmailSchema,
  verifyEmailSchema,
} from "../schemas/verify-email-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { useContext } from "react";
import { RegisterContext } from "@/shared/context/register-context";
import { confirmEmailVerify } from "@/shared/lib/api/auth/register.api";
import { toast } from "sonner";

export default function VerifyEmailForm() {
  const ctx = useContext(RegisterContext);
  const form = useForm({
    defaultValues: {
      email: ctx?.email || "",
      code: "",
    },
    resolver: zodResolver(verifyEmailSchema),
  });
  const { handleSubmit } = form;

  async function handleRegister(values: TVerifyEmailSchema) {
    console.log(values);
    const payload = await confirmEmailVerify(values);
    console.log(payload);
    toast(payload.message);
    if (payload.status) {
      ctx?.setStep("userInfo");
    }
  }

  return (
    <>
      {/* header */}
      <header>
        <Stepper steps={4} currentStep={2} />
        <h2 className="font-inter font-bold text-3xl text-gray-800 mt-2.5">
          Create Account
        </h2>
      </header>
      {/* description */}
      <div className="my-4">
        <h3 className="font-inter font-bold text-2xl text-blue-600 mb-2.5">
          Verify OTP
        </h3>
        <p className="font-mono text-gray-500">
          Please enter the 6-digits code we have sent to:
        </p>
        <span className="font-mono font-medium text-base text-gray-800 mr-2">
          {ctx?.email || "user@example.com."}
        </span>
        <button
          onClick={() => {
            ctx?.setStep("email");
          }}
          type="button"
          className="underline font-mono font-medium text-base text-blue-600 cursor-pointer"
        >
          Edit
        </button>
      </div>

      <form onSubmit={handleSubmit(handleRegister)}>
        <FieldGroup>
          <Controller
            name="code"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-code" className="block">
                  Phone
                  <span className="text-red-600">*</span>
                </FieldLabel>
                {/* otp */}
                <div className="flex flex-col items-center py-2.5">
                  <Otp value={field.value} onChange={field.onChange} />
                </div>

                {fieldState.invalid && (
                  <FieldError
                    className="text-red-600 font-mono"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        {/* verify button */}
        <button
          type="submit"
          className="font-mono text-sm font-medium text-gray-800 w-full py-3.5 mt-10 cursor-pointer"
        >
          Verify Code
        </button>
      </form>
    </>
  );
}
