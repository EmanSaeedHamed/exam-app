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
import { ChevronRight, CircleX } from "lucide-react";
import Stepper from "./stepper";
import { TUserInfoSchema, userInfoSchema } from "../schemas/user-info.schema";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import { useContext } from "react";
import { RegisterContext } from "@/shared/context/register-context";

export default function UserInfoForm() {
  const ctx = useContext(RegisterContext);
  const form = useForm<TUserInfoSchema>({
    defaultValues: {
      firstName: "",
      username: "",
      lastName: "",
      phone: "",
    },
    resolver: zodResolver(userInfoSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitted },
  } = form;
  function handleRegister(values: TUserInfoSchema) {
    console.log(values);
    ctx?.setFirstName(values.firstName);
    ctx?.setUsername(values.username);
    ctx?.setLastName(values.lastName);
    ctx?.setPhone(values.phone);
    ctx?.setStep("password");
  }
  return (
    <>
      {/* header */}
      <header>
        <Stepper steps={4} currentStep={3} />
        <h2 className="font-inter font-bold text-3xl text-gray-800 mt-2.5">
          Create Account
        </h2>
        <h3 className="font-inter font-bold text-2xl text-blue-600 mt-4">
          Tell us more about you
        </h3>
      </header>

      <div>
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          <div className="flex gap-2.5 mt-8">
            {/* first name */}
            <FieldGroup className="w-1/2">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-firstName" className="block">
                      First name
                      <span className="text-red-600">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="form-firstName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Ahmed"
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

            {/* last name */}
            <FieldGroup className="w-1/2">
              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-lastName" className="block">
                      Last name
                      <span className="text-red-600">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id="form-lastName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Abdullah"
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
          </div>

          {/* username */}
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-username" className="block">
                    Username
                    <span className="text-red-600">*</span>
                  </FieldLabel>
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

          {/* phone */}

          <FieldGroup>
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-phone" className="block">
                    Phone
                    <span className="text-red-600">*</span>
                  </FieldLabel>

                  <PhoneInput
                    defaultCountry="eg"
                    value={field.value}
                    onChange={(phone) => field.onChange(phone)}
                    inputProps={{
                      id: "form-phone",
                      "aria-invalid": fieldState.invalid,
                      autoComplete: "off",
                      placeholder: "+20 1012345678",
                    }}
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

          {isSubmitted && Object.keys(errors).length > 0 && (
            <div className="border border-red-600 mt-10 bg-red-50 w-full py-2.5 text-center relative">
              <p className="text-sm font-mono text-red-600">
                Something went wrong
              </p>
              <CircleX className="absolute text-red-600 size-[18px] bg-white left-1/2 -translate-1/2 top-0" />
            </div>
          )}

          <Button variant={"outline"} type="submit" className="w-full mt-10">
            {" "}
            Next <ChevronRight />{" "}
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
    </>
  );
}
