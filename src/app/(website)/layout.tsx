import OffCanvas from "@/components/shared/off-canvas";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OffCanvas/>
      {children}
    </>
  );
}
