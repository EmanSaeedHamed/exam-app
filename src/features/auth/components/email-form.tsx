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
import { emailSchema, TEmailSchema } from "../schemas/email.schema";
import { sendEmailVerify } from "@/shared/lib/api/auth/register.api";
import { toast } from "sonner";
import { useContext, useEffect, useRef } from "react";
import { RegisterContext } from "@/shared/context/register-context";
export default function EmailForm() {
  const ctx = useContext(RegisterContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(emailSchema),
  });
  const { handleSubmit } = form;
  useEffect(() => {
    if (ctx?.step === "email") {
      inputRef.current?.focus();
    }
  }, [ctx?.step]);

  async function handleRegister(values: TEmailSchema) {
    console.log(values);
    const payload = await sendEmailVerify(values);
    console.log(payload);
    toast(payload.message);
    if (payload.status) {
      ctx?.setStep("verifyEmail");
      ctx?.setEmail(values.email);
    }
  }
  return (
    <>
      <h2 className="font-inter font-bold text-3xl text-gray-800 mb-10">
        Create Account
      </h2>
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
                  ref={(el) => {
                    field.ref(el);
                    inputRef.current = el;
                  }}
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

        <Button variant={"outline"} type="submit" className="w-full mt-10">
          {" "}
          Next <ChevronRight />{" "}
        </Button>
      </form>

      <div className="space-x-2 font-mono text-sm font-medium text-center mt-9">
        <span className="text-gray-500">Already have an account?</span>
        <Link href={"/login"} className="text-blue-600 hover:text-blue-700">
          Login
        </Link>
      </div>
    </>
  );
}
