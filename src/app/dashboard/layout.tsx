import OffCanvas from "@/shared/components/shared/off-canvas";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OffCanvas />
      <main className="ml-92.5 ">{children}</main>
    </>
  );
}
