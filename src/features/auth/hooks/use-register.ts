import * as React from "react";

import { RegisterContext } from "@/shared/context/register-context";

export default function useRegister() {
  const ctx = React.useContext(RegisterContext);
  if (!ctx) {
    throw new Error("useRegister must be used within RegisterContextProvider");
  }

  return ctx;
}

// const [openEmailForm, setOpenEmailForm] = useState(false);
//   const [openVerifyEmailForm, setOpenVerifyEmailForm] = useState(false);
//   const [openUserInfoForm, setOpenUserInfoForm] = useState(false);
//   const [openPasswordForm, setOpenPasswordForm] = useState(false);
