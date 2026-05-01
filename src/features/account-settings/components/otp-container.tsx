import Stepper from "@/features/auth/components/stepper";
import {
  Field,
  FieldError,
  FieldGroup,
} from "@/shared/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useContext } from "react";
import { RegisterContext } from "@/shared/context/register-context";
import { Button } from "@/shared/components/ui/button";
import { otpSchema, TOtpSchema } from "../schemas/otp.schema";
import { changeEmailWithOtp } from "@/shared/lib/api/account-setting/otp.api";
import Otp from "@/shared/components/ui/otp";
import { useQueryClient } from "@tanstack/react-query";
type Props = {
  close: (value: boolean) => void;
};

export default function OtpContainer({close}:Props) {
  const ctx = useContext(RegisterContext);
  const form = useForm({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(otpSchema),
  });
  const { handleSubmit } = form;

  async function handleRegister(values: TOtpSchema) {
    console.log(values);
    const payload = await changeEmailWithOtp(values);
    console.log(payload);
    toast("email changed successfully");
    if (payload.status) {
        close(false);
      ctx?.setStep("email");
    }
  }
  return <>
      <div className="px-9 mt-3">
            {/* progress */}
            <Stepper steps={2} currentStep={2} />
            {/* header */}
            <div className="space-y-7.5 mt-2.5 mb-6">
                <h3 className="font-inter font-bold text-3xl text-gray-800">Change Email</h3>
                {/* description */}
      <div className="my-4">
        <h4 className="font-inter font-bold text-2xl text-blue-600 mb-2.5">
          Verify OTP
        </h4>
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
                {/* verify email with otp */}
                <form onSubmit={handleSubmit(handleRegister)}>
        <FieldGroup>
          <Controller
            name="code"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
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
        <div className="border-t border-t-gray-200  mt-10 -mx-9">
                          <div className="px-9">
                <Button type="submit" className="w-full mt-10">
                          {" "}
                          Verify Code{" "}
                </Button>
                </div>
        </div>
  
      </form>
            </div>
         </div>
  </>
}


