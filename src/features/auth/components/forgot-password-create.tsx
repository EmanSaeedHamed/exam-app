"use client";
import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { CircleX, Eye, EyeOff } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { resetPasswordSchema, TResetPasswordSchema } from "../schemas/password.schema";
import { RegisterContext } from "@/shared/context/register-context";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { resetPassword } from "@/shared/lib/api/auth/forgot-password.api";

export default function ForgotPasswordCreate() {
  const router = useRouter();
  const ctx = useContext(RegisterContext);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
 

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<TResetPasswordSchema>({
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
      token: token || ""
    },
    resolver: zodResolver(resetPasswordSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitted },
  } = form;
   async function handleRegister(values: TResetPasswordSchema) {
    console.log(values);
    const payload = await resetPassword(values);
    console.log(payload);
    toast(payload.message);
    if (payload.status) {
      toast(payload.message);
      router.push('/login');
    }else{
      toast(payload.message);
    }
  }

  return (
    <>
      {/* header */}
      <div>
        <h2 className="font-inter font-bold text-3xl text-gray-800">
        Create a New Password
      </h2>
      <p className="mb-10 mt-2.5 font-mono text-gray-500">Create a new strong password for your account.</p>
      </div>
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4 mt-8">
        <FieldGroup>
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-password" className="block">
                  New Password
                </FieldLabel>
                <div className="relative flex items-center">
                  <Input
                    {...field}
                    type={`${showPass ? "text" : "password"}`}
                    id="form-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    autoComplete="off"
                  />
                  {showPass ? (
                    <Eye
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-2.5 size-4.5 text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <EyeOff
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-2.5 size-4.5 text-gray-400 cursor-pointer"
                    />
                  )}
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

        <FieldGroup>
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-confirmPassword" className="block">
                  Confirm New Password
                </FieldLabel>
                <div className="relative flex items-center">
                  <Input
                    {...field}
                    type={`${showConfirmPassword ? "text" : "password"}`}
                    id="form-confirmPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    autoComplete="off"
                  />
                  {showConfirmPassword ? (
                    <Eye
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-2.5 size-4.5 text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <EyeOff
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-2.5 size-4.5 text-gray-400 cursor-pointer"
                    />
                  )}
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

        {isSubmitted && Object.keys(errors).length > 0 && (
          <div className="border border-red-600 mt-10 bg-red-50 w-full py-2.5 text-center relative">
            <p className="text-sm font-mono text-red-600">
              Something went wrong
            </p>
            <CircleX className="absolute text-red-600 size-4.5 bg-white left-1/2 -translate-1/2 top-0" />
          </div>
        )}

        <Button type="submit" className="w-full mt-6">
          {" "}
          Reset Password{" "}
        </Button>
      </form>
      <div className="space-x-2 font-mono text-sm font-medium text-center mt-9">
        <span className="text-gray-500">Don’t have an account?</span>
        <Link href={"/register"} className="text-blue-600 hover:text-blue-700">
          Create yours
        </Link>
      </div>
    </>
  );
}
