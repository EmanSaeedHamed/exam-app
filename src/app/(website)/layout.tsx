import OffCanvas from "@/shared/components/shared/off-canvas";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OffCanvas />
      <main className="ml-[370px] bg-red-400">{children}</main>
    </>
  );
}
