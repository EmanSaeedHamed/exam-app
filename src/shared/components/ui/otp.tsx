import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";

type OtpProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export default function Otp({ value, onChange }: OtpProps) {
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
        You can request another code in: 60s
      </p>
    </>
  );
}
