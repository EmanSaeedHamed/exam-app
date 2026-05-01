import Stepper from "@/features/auth/components/stepper";
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
import { toast } from "sonner";
import { useContext, useEffect, useRef } from "react";
import { RegisterContext } from "@/shared/context/register-context";
import { newEmailSchema, TNewEmailSchema } from "../schemas/new-email.schema";
import { Button } from "@/shared/components/ui/button";
import { newEmailVerify } from "@/shared/lib/api/account-setting/new-email.api";
export default function NewEmailContainer() {
  const ctx = useContext(RegisterContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm({
    defaultValues: {
      newEmail: "",
    },
    resolver: zodResolver(newEmailSchema),
  });
  const { handleSubmit } = form;
  useEffect(() => {
    if (ctx?.step === "email") {
      inputRef.current?.focus();
    }
  }, [ctx?.step]);

  async function handleRegister(values: TNewEmailSchema) {
    console.log(values);
    const payload = await newEmailVerify(values);
    console.log(payload);
    toast(payload.message);
    if (payload.status) {
      ctx?.setStep("verifyEmail");
      ctx?.setEmail(values.newEmail);
    }
  }
  return <>
       <div className="px-9 mt-3">
            {/* progress */}
            <Stepper steps={2} currentStep={1} />
            {/* header */}
            <div className="space-y-7.5 mt-2.5 mb-6">
                <h3 className="font-inter font-bold text-3xl text-gray-800">Change Email</h3>
                <h4 className="font-inter font-bold text-2xl text-blue-600">Enter your new email</h4>
                {/* email */}
                <form onSubmit={handleSubmit(handleRegister)}>
                        <FieldGroup>
                          <Controller
                            name="newEmail"
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
                         <div className="border-t border-t-gray-200  mt-10 -mx-9">
                          <div className="px-9">
                            <Button type="submit" className="w-full mt-8">
                          {" "}
                          Next <ChevronRight />{" "}
                        </Button>
                          </div>
                         </div>
                      </form>
            </div>
         </div>
  </>
}
