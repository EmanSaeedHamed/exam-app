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
import { useContext, useEffect, useState } from "react";
import { RegisterContext } from "@/shared/context/register-context";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { resetPassword } from "@/shared/lib/api/auth/forgot-password.api";
import { changePasswordSchema, TChangePasswordSchema } from "../schemas/change-password.schema";
import { changePassword } from "@/shared/lib/api/account-setting/change-password.api";

export default function ChangePasswordForm() {
     const [showPass, setShowPass] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<TChangePasswordSchema>({
    defaultValues: {
      currentPassword: "" ,
      confirmPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = form;
   async function handleRegister(values: TChangePasswordSchema) {
    console.log(values);
    const payload = await changePassword(values);
    console.log(payload);
    toast(payload.message);
    if (payload.status) {
      toast(payload.message);
      reset();
    }else{
      toast(payload.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
        <FieldGroup className="border-b border-b-gray-100 pb-6">
          <Controller
            name="currentPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="currentPassword" className="block">
                  <span className="text-base">Current Password</span>
                </FieldLabel>
                <div className="relative flex items-center">
                  <Input
                    {...field}
                    type={`${showCurrentPass ? "text" : "password"}`}
                    id="currentPassword"
                    aria-invalid={fieldState.invalid}
                    placeholder="********"
                    autoComplete="off"
                  />
                  {showCurrentPass ? (
                    <Eye
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-2.5 size-4.5 text-gray-400 cursor-pointer"
                    />
                  ) : (
                    <EyeOff
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
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
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="newPassword" className="block">
                  <span className="text-base">New Password</span>
                </FieldLabel>
                <div className="relative flex items-center">
                  <Input
                    {...field}
                    type={`${showPass ? "text" : "password"}`}
                    id="newPassword"
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
                  <span className="text-base">Confirm New Password</span>
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
          Update Password{" "}
        </Button>
      </form>
    </>
  );
}
