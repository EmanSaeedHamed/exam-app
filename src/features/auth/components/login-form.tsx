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
import { loginSchema, TLoginSchema } from "../schemas/login.schema";
import Link from "next/link";
import { CircleX, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {signIn} from "next-auth/react";
import { toast } from "sonner";
export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const form = useForm<TLoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitted },
  } = form;
  async function handleLogin(values: TLoginSchema) {
    console.log(values);
    const res = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
      callbackUrl: "/"
    })
    console.log(res);
    if(res?.ok){
      toast.success("you logges successfully");
      window.location.href = "/";
    }else{
      toast.error(res?.error);
    }
    
  }

  return (
    <>
      <div className="py-60">
        <div className="max-w-113 mx-auto">
          <h2 className="font-inter font-bold text-3xl text-gray-800 mb-10">
            Login
          </h2>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-username">Username</FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="form-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="user123"
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

            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-password">Password</FieldLabel>
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
              <Link
                href={"/forgot-password"}
                className="text-right font-mono font-medium text-sm text-blue-600 hover:text-blue-700"
              >
                Forgot your password?
              </Link>
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
              Login{" "}
            </Button>
          </form>
          <div className="space-x-2 font-mono text-sm font-medium text-center mt-9">
            <span className="text-gray-500">Don’t have an account?</span>
            <Link
              href={"/register"}
              className="text-blue-600 hover:text-blue-700"
            >
              Create yours
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
