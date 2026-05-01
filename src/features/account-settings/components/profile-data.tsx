'use client';
import { PencilLine, X } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import {
  Field,
  FieldLabel,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useContext, useEffect } from "react";
import { RegisterContext } from "@/shared/context/register-context";
import { Button } from "@/shared/components/ui/button";
import NewEmailContainer from "./new-email-container";
import OtpContainer from "./otp-container";
import { getUserProfile } from "@/shared/lib/api/account-setting/user-data.api";
import DeleteAccount from "./delete-account";
export default function ProfileData() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteAccount, setIsDeleteAccount] = useState(false);
    const queryClient = useQueryClient();
    const ctx = useContext(RegisterContext);
    const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });
   if (error) return <p>Something went wrong</p>;
     if (!ctx) {
    throw new Error("RegisterForm must be used within RegisterContextProvider");
  }
   const { step } = ctx;
  useEffect(() => {
    if (ctx?.step === "email") {
    }
  }, [ctx?.step]);
  if (isLoading) return <p>Loading...</p>;
  function saveChanges() {
    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  }
  return <>
      {/* content */}
      <div className="space-y-4">
        <div className="flex items-center gap-2.5 ">
            {/* first name */}
        <Field>
            <FieldLabel htmlFor="form-firstName" className="block">
                      First name
        </FieldLabel>
        <Input
                      value={data?.payload.user.firstName || ""}
                      readOnly
                      type="text"
                      id="form-firstName"
                      placeholder="Ahmed"
                      autoComplete="off"
        />
        </Field>

        {/* last name */}
        <Field>
                    <FieldLabel htmlFor="form-lastName" className="block">
                      Last name
                    </FieldLabel>
                    <Input
                      value={data?.payload.user.lastName || ""}
                      readOnly
                      type="text"
                      id="form-lastName"
                      placeholder="Abdullah"
                      autoComplete="off"
                    />
                  </Field>
        </div>

        {/* username */}
        <Field>
                  <FieldLabel htmlFor="form-username" className="block">
                    Username
                  </FieldLabel>
                  <Input
                    readOnly
                    value={data?.payload.user.username || ""}
                    type="text"
                    id="form-username"
                    placeholder="user123"
                    autoComplete="off"
                  />
        </Field>

        {/* email */}
        <Field>
                <div className="flex justify-between items-center">
                    <FieldLabel htmlFor="form-email">Email</FieldLabel>
                    <div onClick={()=>{setIsOpen(true)}} className="flex items-center gap-1.5 cursor-pointer text-blue-600 hover:text-blue-700">
                        <PencilLine className="size-4" />
                        <span className="font-mono text-sm font-medium">Change</span>
                    </div>
                </div>
                <Input
                  disabled
                  value={data?.payload.user.email || ""}
                  type="email"
                  id="form-email"
                  placeholder="user@example.com"
                  autoComplete="off"
                />
              </Field>

        {/* phone */}
     <Field>
        <FieldLabel htmlFor="form-phone" className="block">
          Phone 
        </FieldLabel>

        {/* wrapper */}
        <div
          className={`
            flex items-center gap-2 w-full p-1 border
            transition
          `}
        >
          <PhoneInput 
  defaultCountry="eg"
  value={data?.payload.user.phone || ""}
  onChange={() => {}}
  inputClassName="
    !border-none
    !outline-none
    !shadow-none
    !w-full
    !text-sm
    !font-mono
    !bg-transparent
  "
  inputProps={{
    readOnly: true,
  }}
  disableCountryGuess
  countrySelectorStyleProps={{
    buttonStyle: {
      pointerEvents: "none"
    },
  }}
/>


        </div>
      </Field>
       {/* footer */}
       <div className="flex items-center gap-3.5 mt-4">
        <Button onClick={()=>{setIsDeleteAccount(!isDeleteAccount)}} className="flex-1 bg-red-50 text-red-600 text-sm font-mono font-medium hover:bg-red-100">Delete My Account</Button>
        <Button onClick={saveChanges} className="flex-1 text-sm font-mono font-medium">Save Changes</Button>
       </div>
      </div>
      {/* blur background */}
      <div className={`${isOpen || isDeleteAccount? "absolute inset-0 bg-black/50 backdrop-blur-sm" : "hidden"}`}>
        {/* container */} 
      <div className="w-144.75 bg-white absolute z-999 top-1/2 left-1/2 -translate-1/2">
         {/* close button */}
         <button onClick={()=>{setIsOpen(false); setIsDeleteAccount(false)}} type="button" className="cursor-pointer"><X className="size-4.5 text-gray-500 absolute top-4 right-4" /></button>
         {/* content */}
         { step === "email" && isOpen && <NewEmailContainer/> }
         { step === "verifyEmail" && <OtpContainer close={setIsOpen}/> }
         { isDeleteAccount && <DeleteAccount setIsDeleteAccount={setIsDeleteAccount}/>}
      </div>
      </div>
      {/* delete account */}
     
  </>
}
