"use client";

import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordEmailSchema,
  TForgotPasswordEmailSchema,
} from "../schemas/email.schema";
import { toast } from "sonner";
import { sendEmailForgotPassword } from "@/shared/lib/api/auth/forgot-password.api";
import { useContext } from "react";
import { RegisterContext } from "@/shared/context/register-context";

export default function ForgotPasswordEmail() {
  const ctx = useContext(RegisterContext);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordEmailSchema),
  });

  const { handleSubmit } = form;

  async function handleRegister(values: TForgotPasswordEmailSchema) {
    const redirectUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/forgot-password`
        : "";

    const payload = await sendEmailForgotPassword({
      ...values,
      redirectUrl,
    });

    toast(payload.message);

    if (payload.status) {
      ctx?.setStep("verifyEmail");
      ctx?.setEmail(values.email);
    }
  }

  return (
    <>
      <h2 className="font-inter font-bold text-3xl text-gray-800">
        Forgot Password
      </h2>

      <p className="mb-10 mt-2.5 font-mono text-gray-500">
        Don’t worry, we will help you recover your account.
      </p>

      <form onSubmit={handleSubmit(handleRegister)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-email">Email</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  id="form-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="user@example.com"
                  autoComplete="off"
                />
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

        <Button type="submit" className="w-full mt-10">
          Next <ChevronRight />
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
