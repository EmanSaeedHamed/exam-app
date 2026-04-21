import Image from "next/image";
import type { IDiploma } from "@/shared/lib/types/diplomas";
import Link from "next/link";
export default function DiplomaItem({ diploma }: { diploma: IDiploma }) {
  const { image, title, description, id } = diploma;
  return (
    <>
      <Link
        href={`/diplomas/${id}`}
        className="h-[400px] overflow-hidden relative group"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-center"
          unoptimized
        />
        {/* layer */}
        <div className="bg-[rgba(21,93,252,0.70)] backdrop-blur-md absolute bottom-2.5 left-2.5 right-2.5 p-4">
          <h3 className="2xl:text-xl text-lg font-semibold font-mono text-white">
            {title}
          </h3>
          <p className="text-sm font-mono text-white line-clamp-1 group-hover:line-clamp-none">
            {description}
          </p>
        </div>
      </Link>
    </>
  );
}
