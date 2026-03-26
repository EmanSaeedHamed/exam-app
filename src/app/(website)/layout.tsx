import OffCanvas from "@/components/shared/off-canvas";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <OffCanvas/>
      <main className="ml-96 bg-red-400">
      {children}
      </main>
    </>
  );
}
