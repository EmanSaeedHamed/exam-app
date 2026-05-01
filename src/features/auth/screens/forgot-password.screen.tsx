import AuthHero from "../components/auth-hero";
import ForgotPasswordForm from "../components/forgot-password-form";

export default function ForgotPasswordScreen() {
  return <>
         <main className="grid grid-cols-2 min-h-screen">
        <AuthHero/>
        <ForgotPasswordForm/>
      </main>
    </>
}
