import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { useEffect, useState } from "react";

type OtpProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function Otp({ value, onChange }: OtpProps) {
   const [time, setTime] = useState(60);

  useEffect(() => {
    if (time === 0) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);
  return (
    <>
      <InputOTP maxLength={6} value={value} onChange={onChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="mt-6 font-mono font-medium text-sm text-gray-500">
        You can request another code in: {time}s
      </p>
    </>
  );
}
