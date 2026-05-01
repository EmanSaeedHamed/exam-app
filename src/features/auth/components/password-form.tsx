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
import { CircleX, Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import Stepper from "./stepper";
import { passwordSchema, TPasswordSchema } from "../schemas/password.schema";
import { RegisterContext } from "@/shared/context/register-context";
import { register } from "@/shared/lib/api/auth/register.api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PasswordForm() {
  const router = useRouter();
  const ctx = useContext(RegisterContext);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<TPasswordSchema>({
    defaultValues: {
      email: ctx?.email || "",
      confirmPassword: "",
      password: "",
      firstName: ctx?.firstName || "",
      username: ctx?.username || "",
      lastName: ctx?.lastName || "",
      phone: ctx?.phone || "",
    },
    resolver: zodResolver(passwordSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitted },
  } = form;
   async function handleRegister(values: TPasswordSchema) {
    console.log(values);
    const payload = await register(values);
    console.log(payload);
    toast(payload.message);
    if (payload.status) {
      toast("Account created successfully");
      router.push('/login');
    }else{
      toast(payload.message);
    }
  }

  return (
    <>
      {/* header */}
      <header>
        <Stepper steps={4} currentStep={4} />
        <h2 className="font-inter font-bold text-3xl text-gray-800 mt-2.5">
          Create Account
        </h2>
        <h3 className="font-inter font-bold text-2xl text-blue-600 mt-4">
          Create a strong password
        </h3>
      </header>
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4 mt-8">
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-password" className="block">
                  Password
                  <span className="text-red-600">*</span>
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
                  Confirm Password
                  <span className="text-red-600">*</span>
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
          Create Account{" "}
        </Button>
      </form>
    </>
  );
}
